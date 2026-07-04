#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""PeatBidウイスキー買取相場指数（Phase 2: 一次データの資産化・被リンク向け）
price-history/{slug}.json の週次中央値から合成指数を算出して data/souba-index.json を出力。
- 基準: 全銘柄の履歴が揃う最初の週 = 100
- 指数 = 各銘柄の (当週中央値 / 基準週中央値) の単純平均 × 100（等ウェイト）
- 全銘柄 / ジャパニーズ / スコッチ の3系列
週次cron（weekly-yahoo-update.sh）から呼び出して自動更新・自動成熟する。
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRANDS = json.load(open(os.path.join(ROOT, "data", "brands.json"), encoding="utf-8"))
HIST_DIR = os.path.join(ROOT, "data", "price-history")

# データ品質ゲート（souba-reportと同基準に統一・2026-07-04）:
# クエリ汚染銘柄・insufficient・週次3倍超の系列不連続（talisker-25型の汚染）を除外
import sys as _sys
_sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from opportunity_band import DATA_QUALITY_EXCLUDE  # noqa: E402
SERIES_JUMP_RATIO = 3.0

series = {}  # slug -> {date: median}
cats = {}
for b in BRANDS:
    slug = b["slug"]
    if slug in DATA_QUALITY_EXCLUDE:
        continue
    p = os.path.join(HIST_DIR, f"{slug}.json")
    if not os.path.exists(p):
        continue
    d = json.load(open(p, encoding="utf-8"))
    if (d.get("latest") or {}).get("insufficient"):
        continue
    h = d.get("history", [])
    pts = {x["date"]: x["median_jpy"] for x in h if x.get("median_jpy")}
    vals = [pts[k] for k in sorted(pts)]
    if any(max(a, b2) / max(1, min(a, b2)) > SERIES_JUMP_RATIO for a, b2 in zip(vals, vals[1:])):
        continue  # 系列不連続＝汚染疑い
    if len(pts) >= 2:
        series[slug] = pts
        cats[slug] = b.get("category", "")

# 全銘柄に共通して存在する週だけを採用（欠測週を含む銘柄があれば共通部分で計算）
common_dates = None
for pts in series.values():
    ds = set(pts.keys())
    common_dates = ds if common_dates is None else (common_dates & ds)
dates = sorted(common_dates or [])

def calc(slugs):
    if not dates or not slugs:
        return []
    base = dates[0]
    out = []
    for d in dates:
        ratios = [series[s][d] / series[s][base] for s in slugs if series[s].get(base)]
        out.append({"date": d, "value": round(sum(ratios) / len(ratios) * 100, 2), "n": len(ratios)})
    return out

all_slugs = list(series.keys())
jp = [s for s in all_slugs if cats.get(s) == "japanese-whisky"]
sc = [s for s in all_slugs if cats.get(s) == "scotch-whisky"]

out = {
    "updated": dates[-1] if dates else "",
    "base_date": dates[0] if dates else "",
    "weeks": len(dates),
    "n_brands": len(all_slugs),
    "methodology": "Yahoo!オークション過去180日落札データの週次中央値（IQR外れ値除去）をもとに、基準週=100とした各銘柄の変化率の等ウェイト平均。PeatBid編集部の独自集計。",
    "series": {
        "all": calc(all_slugs),
        "japanese": calc(jp),
        "scotch": calc(sc),
    },
    "counts": {"all": len(all_slugs), "japanese": len(jp), "scotch": len(sc)},
}
dst = os.path.join(ROOT, "data", "souba-index.json")
json.dump(out, open(dst, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print(f"✓ {dst}: {len(dates)}週分 / 全{len(all_slugs)}銘柄(JP{len(jp)}/SC{len(sc)}) / 最新 {out['updated']}: all={out['series']['all'][-1]['value'] if dates else '-'}")
