#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""PeatBid買取相場指数・週次相場レポート生成（フュージョン打ち手④ 2026-07-04）

data/price-history/{slug}.json の週次中央値から、
  1. PeatBid買取相場指数（基準週=100 の合成インデックス・週次系列）
  2. 前週比・4週比の指数変化率
  3. 上昇TOP5 / 下落TOP5（前週比）
  4. カテゴリ別サブ指数（japanese-whisky / scotch-whisky）
を算出して data/souba-report.json を出力する（冪等・new Date()/today()禁止＝
updated はデータ内の最新週）。/souba-report/ ページ（app/souba-report/page.tsx）が読む。

品質ゲート（正直設計・架空禁止）:
  - opportunity_band.DATA_QUALITY_EXCLUDE（fetchクエリ汚染銘柄）を除外
  - latest.insufficient（n<20）の銘柄を除外
  - 有効履歴2点未満の銘柄を除外
  - 基準週（採用銘柄共通の最古週）にデータが無い銘柄は「蓄積中」として除外
    （途中参加銘柄を含めると共通週が縮み系列が壊れるため）
  - 系列不連続ゲート: 週次で中央値が SERIES_JUMP_RATIO 倍超（または1/比未満）に
    跳ねた銘柄は fetch クエリ汚染の疑いとして除外（blackbowmore と同類の問題の自動検知。
    2026-07-04 時点では talisker-25 が該当: ¥8,097→¥41,250 の一週跳躍＝実勢変動ではない）

指数 = 各銘柄の (当週中央値 / 基準週中央値) の単純平均 × 100（等ウェイト）。
TODO: 流動性（sample_n）や価格帯による加重は将来課題。現状は souba-index と
      同じ等ウェイトで、採用銘柄数 n を明記して透明性を担保する。

週次cron（weekly-yahoo-update.sh）から fetch 後に呼ばれて自動更新される。
"""
import csv
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))
from opportunity_band import DATA_QUALITY_EXCLUDE  # noqa: E402

HIST_DIR = os.path.join(ROOT, "data", "price-history")
DST = os.path.join(ROOT, "data", "souba-report.json")

CATEGORY_LABELS = {
    "japanese-whisky": "ジャパニーズ",
    "scotch-whisky": "スコッチ",
}

# 週次で中央値がこの倍率を超えて跳ねたら系列不連続（クエリ汚染疑い）として除外。
# 実勢の週次変動は大きくても数十%（taketsuru-pure +47% が観測上限級）で、
# 3倍超の一週跳躍は取得系列の断絶とみなす。
SERIES_JUMP_RATIO = 3.0


def load_brands():
    """brands.csv（source of truth。brands.json は週次再生成で遅延することがある）"""
    brands = []
    with open(os.path.join(ROOT, "data", "brands.csv"), encoding="utf-8") as f:
        for r in csv.DictReader(f):
            brands.append({
                "slug": r["slug"].strip(),
                "name": r["name_ja"].strip(),
                "category": r.get("category", "").strip(),
            })
    return brands


def load_history(slug):
    p = os.path.join(HIST_DIR, f"{slug}.json")
    if not os.path.exists(p):
        return None
    return json.load(open(p, encoding="utf-8"))


def main():
    brands = load_brands()

    excluded = {"data_quality": [], "insufficient": [], "short_history": [], "series_jump": [], "late_start": [], "no_data": []}
    series = {}   # slug -> {date: {"median": int, "n": int}}
    meta = {}     # slug -> brand meta

    for b in brands:
        slug = b["slug"]
        if slug in DATA_QUALITY_EXCLUDE:
            excluded["data_quality"].append(slug)
            continue
        d = load_history(slug)
        if not d:
            excluded["no_data"].append(slug)
            continue
        if (d.get("latest") or {}).get("insufficient"):
            excluded["insufficient"].append(slug)
            continue
        pts = {
            h["date"]: {"median": int(h["median_jpy"]), "n": int(h.get("sample_n") or 0)}
            for h in (d.get("history") or [])
            if isinstance(h.get("median_jpy"), (int, float)) and h["median_jpy"] > 0
        }
        if len(pts) < 2:
            excluded["short_history"].append(slug)
            continue
        seq = [pts[d]["median"] for d in sorted(pts)]
        if any(b_ / a_ > SERIES_JUMP_RATIO or b_ / a_ < 1 / SERIES_JUMP_RATIO
               for a_, b_ in zip(seq, seq[1:])):
            excluded["series_jump"].append(slug)
            continue
        series[slug] = pts
        meta[slug] = b

    if not series:
        raise SystemExit("有効な銘柄がありません")

    # 基準週 = 有効銘柄群で最も古い週。基準週データが無い途中参加銘柄は除外
    # （含めると共通週の交差が縮んで系列が壊れる）。
    all_dates = sorted({d for pts in series.values() for d in pts})
    base = all_dates[0]
    for slug in [s for s, pts in series.items() if base not in pts]:
        excluded["late_start"].append(slug)
        del series[slug]

    # 採用銘柄全てにデータがある共通週のみで系列を構成
    common = None
    for pts in series.values():
        ds = set(pts.keys())
        common = ds if common is None else (common & ds)
    dates = sorted(common)
    assert dates and dates[0] == base

    slugs = sorted(series.keys())
    n_brands = len(slugs)

    def index_series(target_slugs):
        out = []
        for d in dates:
            ratios = [series[s][d]["median"] / series[s][base]["median"] for s in target_slugs]
            out.append({
                "date": d,
                "value": round(sum(ratios) / len(ratios) * 100, 2),
                "n": len(ratios),
            })
        return out

    def change_pct(pts, weeks_back):
        """指数系列の変化率(%)。データ不足は None。"""
        if len(pts) <= weeks_back:
            return None
        cur, prev = pts[-1]["value"], pts[-1 - weeks_back]["value"]
        if prev == 0:
            return None
        return round((cur / prev - 1) * 100, 2)

    idx = index_series(slugs)

    # カテゴリ別サブ指数（採用銘柄が2銘柄以上あるカテゴリのみ）
    categories = {}
    for cat, label in CATEGORY_LABELS.items():
        cat_slugs = [s for s in slugs if meta[s]["category"] == cat]
        if len(cat_slugs) < 2:
            continue
        cs = index_series(cat_slugs)
        categories[cat] = {
            "label": label,
            "n": len(cat_slugs),
            "series": cs,
            "latest": cs[-1]["value"],
            "change_1w_pct": change_pct(cs, 1),
        }

    # 上昇/下落 TOP5（前週比。共通週グリッドの直近2週で算出）
    movers_up, movers_down = [], []
    if len(dates) >= 2:
        last, prev = dates[-1], dates[-2]
        rows = []
        for s in slugs:
            cur_m, prev_m = series[s][last]["median"], series[s][prev]["median"]
            rows.append({
                "slug": s,
                "name": meta[s]["name"],
                "category": meta[s]["category"],
                "median": cur_m,
                "prev_median": prev_m,
                "diff_jpy": cur_m - prev_m,
                "change_pct": round((cur_m / prev_m - 1) * 100, 2),
                "sample_n": series[s][last]["n"],
            })
        movers_up = sorted(
            [r for r in rows if r["change_pct"] > 0],
            key=lambda r: (-r["change_pct"], -r["diff_jpy"]))[:5]
        movers_down = sorted(
            [r for r in rows if r["change_pct"] < 0],
            key=lambda r: (r["change_pct"], r["diff_jpy"]))[:5]

    out = {
        "updated": dates[-1],           # データ内の最新週（実行日ではない）
        "base_date": base,
        "weeks": len(dates),
        "n_brands": n_brands,
        "excluded": {
            "data_quality": sorted(excluded["data_quality"]),
            "insufficient": sorted(excluded["insufficient"]),
            "short_history": sorted(excluded["short_history"]),
            "series_jump": sorted(excluded["series_jump"]),
            "late_start": sorted(excluded["late_start"]),
            "no_data": sorted(excluded["no_data"]),
            "total": sum(len(v) for v in excluded.values()),
        },
        "index": {
            "series": idx,
            "latest": idx[-1]["value"],
            "change_1w_pct": change_pct(idx, 1),
            "change_4w_pct": change_pct(idx, 4),
        },
        "categories": categories,
        "movers": {"up": movers_up, "down": movers_down},
        "methodology": (
            "Yahoo!オークション過去180日落札データの週次中央値（IQR法で外れ値除去）をもとに、"
            f"基準週（{base}）=100とした各銘柄の変化率の等ウェイト平均。"
            f"採用{n_brands}銘柄（サンプル不足n<20・データ品質除外・履歴2週未満・系列不連続・基準週データ無しの銘柄を除外）。"
            "PeatBid編集部の独自集計。"
        ),
    }
    json.dump(out, open(DST, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    ch1 = out["index"]["change_1w_pct"]
    print(f"✓ {DST}")
    print(f"  指数: {out['index']['latest']}（前週比 {ch1:+}%・4週比 {out['index']['change_4w_pct']}%） / "
          f"{len(dates)}週分 / 採用{n_brands}銘柄・除外{out['excluded']['total']}銘柄")
    print(f"  除外内訳: 品質{len(excluded['data_quality'])} 不足{len(excluded['insufficient'])} "
          f"履歴短{len(excluded['short_history'])} 系列不連続{len(excluded['series_jump'])} "
          f"途中参加{len(excluded['late_start'])} 無データ{len(excluded['no_data'])}")
    print(f"  上昇TOP: {[(r['name'], r['change_pct']) for r in movers_up]}")
    print(f"  下落TOP: {[(r['name'], r['change_pct']) for r in movers_down]}")


if __name__ == "__main__":
    main()
