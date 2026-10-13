#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fetch Yahoo Auctions closed-search final prices for all 50 brands,
compute median (180d, IQR-filtered), and write back to:
  - data/brands.csv (yahoo_median_jpy_180d, yahoo_sample_n, yahoo_fetched_at, yahoo_query_used)
  - data/yahoo-medians.json (full report)
  - data/price-history/<slug>.json (single data point per slug)

Methodology (MediaXAI承認 2026-05-18):
  - Query: `{brand_query} 700ml` (full bottle filter)
  - Max 3 pages (~150 listings)
  - IQR outlier removal
  - n < 20 → mark insufficient
"""
from __future__ import annotations
import csv
import json
import re
import statistics
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BRANDS_CSV = ROOT / "data" / "brands.csv"
OUT_JSON = ROOT / "data" / "yahoo-medians.json"
HISTORY_DIR = ROOT / "data" / "price-history"

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"

# Brand query mapping (slug -> base query). Aligned with level3-monitor.py
BRAND_QUERIES = {
    "yamazaki-nv": "山崎 ノンエイジ ウイスキー",
    "bowmore-nv": "ボウモア No.1 700ml",
    "talisker-nv": "タリスカー ストーム 700ml",
    "laphroaig-nv": "ラフロイグ セレクト 700ml",
    # brands.csv の slug は glenfarclas-105（キーが旧 glenfarclas-nv のままで SKIP され、2026-06-29 で固定されていた。2026-10-08 修正）
    "glenfarclas-105": "グレンファークラス 105 700ml",
    "springbank-10": "スプリングバンク10年 700ml",
    "yamazaki-12": "山崎12年",
    "yamazaki-18": "山崎18年",
    "yamazaki-25": "山崎25年",
    "yamazaki-55": "山崎55年",
    "hibiki-nv": "響 ジャパニーズハーモニー",
    "hibiki-17": "響17年",
    "hibiki-21": "響21年",
    "hibiki-30": "響30年",
    "hakushu-nv": "白州 ノンエイジ",
    "hakushu-12": "白州12年",
    "hakushu-18": "白州18年",
    "hakushu-25": "白州25年",
    "taketsuru-pure": "竹鶴 ピュアモルト",
    "taketsuru-17": "竹鶴17年",
    "taketsuru-21": "竹鶴21年",
    "taketsuru-25": "竹鶴25年",
    "yoichi-nv": "余市 ノンエイジ",
    "yoichi-10": "余市10年",
    "yoichi-15": "余市15年",
    "yoichi-20": "余市20年",
    "miyagikyo-nv": "宮城峡 ノンエイジ",
    "miyagikyo-12": "宮城峡12年",
    "miyagikyo-15": "宮城峡15年",
    "karuizawa-12": "軽井沢 12年 ウイスキー",
    "karuizawa-30": "軽井沢 30年 ウイスキー",
    "hanyu-card": "羽生 カード ウイスキー",
    "chichibu-the-first": "秩父 ザファースト",
    "ichirosu-card": "イチローズモルト カード",
    "ichirosu-double-distilleries": "イチローズモルト ダブルディスティラリーズ",
    "ichirosu-mwr": "イチローズモルト MWR",
    "mars-komagatake": "マルス 駒ヶ岳",
    "macallan-12": "マッカラン12年",
    "macallan-18": "マッカラン18年",
    "macallan-25": "マッカラン25年",
    "macallan-30": "マッカラン30年",
    "macallan-fine-rare": "マッカラン Fine Rare",
    "bowmore-18": "ボウモア18年",
    "bowmore-25": "ボウモア25年",
    "bowmore-blackbowmore": "ブラックボウモア",
    "ardbeg-uigeadail": "アードベッグ ウーガダール",
    "ardbeg-corryvreckan": "アードベッグ コリーヴレッカン",
    "springbank-15": "スプリングバンク15年",
    "springbank-21": "スプリングバンク21年",
    "laphroaig-25": "ラフロイグ25年",
    "talisker-25": "タリスカー25年",
    "glenfiddich-30": "グレンフィディック30年",
    "glenfarclas-25": "グレンファークラス25年",
    "balvenie-portwood-21": "バルヴェニー ポートウッド",
    "glenmorangie-signet": "グレンモーレンジ シグネット",
}

MIN_SAMPLE = 20
MAX_PAGES = 3
TODAY = datetime.now().strftime("%Y-%m-%d")

# ===== 出品タイトルによる絞り込み（2026-10-13）=====
# 10/10 品質ゲートで「目安」表示に落ちた6銘柄は、クエリ結果に空瓶・空箱・別銘柄（山崎12年/NV・バランタイン30年・
# 響30年）・「検:山崎25年/白州25年…」型のキーワード詰め込み出品が大量に混ざり、中央値が実物の数%になっていた。
# ここに登録した slug だけ、検索結果 JSON の items（title/price/auctionId）を読み、
#   require に一致し exclude（＋共通の JUNK）に一致しないタイトルの落札価格だけで中央値を出す。
# 登録外の slug は従来どおり HTML 中の "price" を正規表現で拾う（＝他銘柄の結果は変わらない）。
# 2026-10-13 の dry（実データ）で n>=20 かつ品質ゲート通過＝yamazaki-25 のみ。他5銘柄は本体の出品が
# 180日で 0〜15 件しか無く insufficient のまま（汚染値より「目安」表示が正しい）。
JUNK_RE = re.compile(
    r"空[瓶箱]|空き[瓶箱]|空ボトル|箱のみ|ボトルなし|冊子のみ|小冊子|\d\s*枚"
    r"|ミニ|miniature|検[:：]|検索|好きの方"
    r"|セット|まとめ|[2-9２-９]\s*本(?!物)|[×x]\s*\d"
)
ML_RE = re.compile(r"(\d+)\s*(?:ml|ｍｌ|mL|ML)")

TITLE_FILTERS = {
    # 「山崎25年 700ml」: 山崎12年/18年/10年・山崎NV、キャパドニック25年等が混入。ミズナラ(48%)は別商品なので除外
    "yamazaki-25": {"require": r"山崎\s*25\s*年", "exclude": r"ミズナラ"},
    "hakushu-25": {"require": r"白州\s*25\s*年"},
    # 「軽井沢 30年 ウイスキー」: バランタイン30年・響30年が大半。軽井沢30年の本体は 180日で2件
    "karuizawa-30": {"require": r"軽井沢\s*30\s*年"},
    # 羽生蒸溜所のカードシリーズ＝出品名は「イチローズモルト カードシリーズ」。現クエリは無関係な出品のみ
    "hanyu-card": {"require": r"カード"},
    # 「ザ・ファースト テン（秩父10年 2020）」は別ボトル
    "chichibu-the-first": {"require": r"ザ[・\s]*ファースト(?![・\s]*テン)", "exclude": r"10\s*年"},
    "ichirosu-card": {"require": r"カード"},
}


def title_ok(title: str, flt: dict) -> bool:
    if not re.search(flt["require"], title):
        return False
    if JUNK_RE.search(title):
        return False
    ex = flt.get("exclude")
    if ex and re.search(ex, title):
        return False
    if any(int(m) != 700 for m in ML_RE.findall(title)):
        return False
    return True


def extract_items(html: str) -> list[dict]:
    """検索結果ページの listing.items（title/price/auctionId）を取り出す。"""
    start = html.find('"listing":{')
    i = html.find('"items":[', start if start >= 0 else 0)
    if i < 0:
        return []
    try:
        items, _ = json.JSONDecoder().raw_decode(html[i + len('"items":'):])
    except ValueError:
        return []
    return [it for it in items if isinstance(it, dict) and "price" in it and "title" in it]

# brands.csv には載せない（＝銘柄ページ10系統を量産しない）が、
# 受け皿ページ（glenfiddich-kaitori / ardbeg-nv-kaitori）で実勢中央値として使う銘柄。
# main() は brands.csv の行を回すため、ここは別パスで取得して yahoo-medians.json に合流させる。
# ⚠️ これを消すと受け皿ページの比較表から実数が落ちる（架空値で埋めないこと）。
EXTRA_SLUGS = {
    "glenfiddich-12": "グレンフィディック12年",
    "glenfiddich-15": "グレンフィディック15年",
    "glenfiddich-18": "グレンフィディック18年",
    "ardbeg-10": "アードベッグ 10年",
    "ardbeg-an-oa": "アードベッグ アンオー",
    # N3②（2026-08-29）グレンモーレンジの受け皿ページ用。全てn>=20を満たしている。
    "glenmorangie-10": "グレンモーレンジ オリジナル 10年",
    "glenmorangie-lasanta": "グレンモーレンジ ラサンタ",
    "glenmorangie-quinta-ruban": "グレンモーレンジ キンタルバン",
    "glenmorangie-nectar-dor": "グレンモーレンジ ネクタードール",
    "glenmorangie-18": "グレンモーレンジ 18年",
}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as res:
        return res.read().decode("utf-8", errors="replace")


def extract_prices(html: str) -> list[int]:
    out = []
    for m in re.finditer(r'"price"\s*:\s*(\d+)', html):
        try:
            v = int(m.group(1))
            if 500 <= v <= 50_000_000:
                out.append(v)
        except ValueError:
            pass
    return out


def iqr_filter(prices: list[int]) -> list[int]:
    if len(prices) < 4:
        return prices
    s = sorted(prices)
    n = len(s)
    q1 = s[n // 4]
    q3 = s[(3 * n) // 4]
    iqr = q3 - q1
    lo = q1 - 1.5 * iqr
    hi = q3 + 1.5 * iqr
    return [p for p in s if lo <= p <= hi]


def median_for_query_filtered(base_query: str, flt: dict, keep_titles: bool = False) -> dict:
    """TITLE_FILTERS 登録銘柄用。出品タイトルで本体のみに絞ってから IQR→中央値（クエリ・ページ数・n>=20 は従来と同じ）。"""
    query = f"{base_query} 700ml"
    seen: dict[str, dict] = {}
    pages_fetched = 0
    for page in range(1, MAX_PAGES + 1):
        b = 1 + (page - 1) * 50
        url = f"https://auctions.yahoo.co.jp/closedsearch/closedsearch?p={urllib.parse.quote(query)}&b={b}&n=50"
        try:
            html = fetch(url)
        except Exception as e:
            return {"error": f"fetch_failed: {e}", "query_used": query, "fetched_at": TODAY}
        items = extract_items(html)
        pages_fetched += 1
        if not items:
            break
        for it in items:
            seen[str(it.get("auctionId"))] = it
        if len(items) < 50:
            break
        if page < MAX_PAGES:
            time.sleep(1.5)
    kept, dropped = [], []
    for it in seen.values():
        p = it.get("price")
        ok = isinstance(p, int) and 500 <= p <= 50_000_000 and title_ok(it["title"], flt)
        (kept if ok else dropped).append(it)
    prices = [it["price"] for it in kept]
    filtered = iqr_filter(prices)
    r = {
        "query_used": query,
        "pages_fetched": pages_fetched,
        "raw_n": len(seen),
        "title_filtered_n": len(kept),
        "filtered_n": len(filtered),
        "median": int(statistics.median(filtered)) if filtered else None,
        "mean": int(statistics.mean(filtered)) if filtered else None,
        "min": min(filtered) if filtered else None,
        "max": max(filtered) if filtered else None,
        "insufficient": len(filtered) < MIN_SAMPLE,
        "fetched_at": TODAY,
        "method": "title_filter",
    }
    if keep_titles:
        r["_kept"] = sorted(((it["price"], it["title"]) for it in kept), reverse=True)
        r["_dropped"] = sorted(((it["price"], it["title"]) for it in dropped), reverse=True)
    return r


def median_for_query(base_query: str) -> dict:
    query = f"{base_query} 700ml"
    raw_all = []
    pages_fetched = 0
    for page in range(1, MAX_PAGES + 1):
        b = 1 + (page - 1) * 50
        q = urllib.parse.quote(query)
        url = f"https://auctions.yahoo.co.jp/closedsearch/closedsearch?p={q}&b={b}&n=50"
        try:
            html = fetch(url)
        except Exception as e:
            return {"error": f"fetch_failed: {e}", "query_used": query, "fetched_at": TODAY}
        page_prices = extract_prices(html)
        pages_fetched += 1
        if not page_prices:
            break
        raw_all.extend(page_prices)
        if page < MAX_PAGES:
            time.sleep(1.5)
    if not raw_all:
        return {"query_used": query, "raw_n": 0, "filtered_n": 0, "median": None, "insufficient": True, "fetched_at": TODAY}
    filtered = iqr_filter(raw_all)
    return {
        "query_used": query,
        "pages_fetched": pages_fetched,
        "raw_n": len(raw_all),
        "filtered_n": len(filtered),
        "median": int(statistics.median(filtered)) if filtered else None,
        "mean": int(statistics.mean(filtered)) if filtered else None,
        "min": min(filtered) if filtered else None,
        "max": max(filtered) if filtered else None,
        "insufficient": len(filtered) < MIN_SAMPLE,
        "fetched_at": TODAY,
    }


def quality_gate(r: dict, reference_price) -> None:
    """クエリ汚染（ミニチュア・空瓶・箱のみ・別ボトル混入）の自動検知。該当したら insufficient にして実数を出さない。

    2026-10-10: 山崎25年が中央値¥26,935（平均¥368,980・最大¥1,451,998）で本番 title に出ていた。
    白州25年・軽井沢30年・羽生カード・秩父ザ・ファーストも同類。
    - 平均/中央値 > 2: 安値の混入品と実物で分布が二山になっている
    - 中央値 < 参考価格(reference_price_jpy_2026_05)の5%: 実物の桁と合わない
    """
    m, mean = r.get("median"), r.get("mean")
    if not m or r.get("insufficient"):
        return
    reasons = []
    if mean and mean / m > 2:
        reasons.append(f"mean/median={mean / m:.1f}")
    try:
        ref = float(reference_price) if reference_price else 0
    except ValueError:
        ref = 0
    if ref and m < ref * 0.05:
        reasons.append(f"median<5%ref({int(ref)})")
    if reasons:
        r["insufficient"] = True
        r["quality_flag"] = ",".join(reasons)


def write_history(slug: str, label: str, result: dict) -> None:
    """Append new data point to history (line-graph friendly accumulation).

    - If a record for the same date exists, overwrite that point only.
    - Otherwise append. Keeps all past points so the line graph shows the trend.
    """
    HISTORY_DIR.mkdir(exist_ok=True)
    path = HISTORY_DIR / f"{slug}.json"

    # Load existing history (if any) so past data is preserved
    existing_history = []
    if path.exists():
        try:
            existing = json.loads(path.read_text(encoding="utf-8"))
            existing_history = existing.get("history", []) or []
        except (json.JSONDecodeError, OSError):
            existing_history = []

    median_val = result.get("median")
    fetched_at = result.get("fetched_at")
    new_point = (
        {
            "date": fetched_at,
            "median_jpy": median_val,
            "sample_n": result.get("filtered_n"),
            "raw_n": result.get("raw_n"),
        }
        if median_val is not None and not result.get("insufficient")
        else None
    )

    # Merge: replace same-date entry, otherwise append
    merged = [h for h in existing_history if h.get("date") != fetched_at]
    if new_point is not None:
        merged.append(new_point)
    # Keep chronologically sorted
    merged.sort(key=lambda h: h.get("date") or "")

    data = {
        "slug": slug,
        "label": label,
        "source": "yahoo_auctions_closed_search_180d",
        "methodology": "median of individual lot final-prices, IQR outlier removal",
        "query_used": result.get("query_used"),
        "history": merged,
        "latest": {
            "date": fetched_at,
            "median_jpy": median_val,
            "sample_n": result.get("filtered_n"),
            "raw_n": result.get("raw_n"),
            "insufficient": result.get("insufficient", False),
        },
        "note": "週次自動更新で履歴を蓄積中。詳細は /methodology/ を参照。",
    }
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def main():
    # --dry-run: 取得・判定だけしてファイルは書かない（--only slug1,slug2 で対象を絞る。TITLE_FILTERS 銘柄は残した/除いたタイトルを全件表示）
    dry_run = "--dry-run" in sys.argv
    only = set()
    if "--only" in sys.argv:
        only = set(sys.argv[sys.argv.index("--only") + 1].split(","))
    print(f"🔍 Yahoo median fetch ({TODAY}) — {len(BRAND_QUERIES)} brands{' [DRY-RUN]' if dry_run else ''}")

    # Read brands.csv
    rows = []
    with BRANDS_CSV.open("r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        for r in reader:
            rows.append(r)

    # Ensure new columns exist
    for col in ["yahoo_median_jpy_180d", "yahoo_sample_n", "yahoo_fetched_at", "yahoo_query_used"]:
        if col not in fieldnames:
            fieldnames.append(col)

    results = {}
    for i, row in enumerate(rows, 1):
        slug = row["slug"]
        query = BRAND_QUERIES.get(slug)
        if not query:
            print(f"  [{i}/{len(rows)}] {slug}: SKIP (no query mapping)")
            continue
        if only and slug not in only:
            continue
        print(f"  [{i}/{len(rows)}] {slug} '{query}'...", end=" ", flush=True)
        flt = TITLE_FILTERS.get(slug)
        r = median_for_query_filtered(query, flt, keep_titles=dry_run) if flt else median_for_query(query)
        # データ品質強制フラグ: クエリ汚染で中央値が実物と乖離する銘柄は insufficient 固定
        # bowmore-blackbowmore: ミニチュア/空瓶混入で¥4,000(実物は数百万円級)。クエリ精査まで実数を出さない
        if slug in {"bowmore-blackbowmore"}:
            r["insufficient"] = True
        quality_gate(r, row.get("reference_price_jpy_2026_05"))
        results[slug] = r
        if r.get("median") and not r.get("insufficient"):
            row["yahoo_median_jpy_180d"] = r["median"]
            row["yahoo_sample_n"] = r["filtered_n"]
            row["yahoo_fetched_at"] = r["fetched_at"]
            row["yahoo_query_used"] = r["query_used"]
            print(f"median=¥{r['median']:,} n={r['filtered_n']}")
        else:
            row["yahoo_median_jpy_180d"] = ""
            row["yahoo_sample_n"] = r.get("filtered_n", 0)
            row["yahoo_fetched_at"] = r.get("fetched_at", TODAY)
            row["yahoo_query_used"] = r.get("query_used", "")
            print(f"INSUFFICIENT n={r.get('filtered_n', 0)}{' ' + r['quality_flag'] if r.get('quality_flag') else ''}")
        if dry_run:
            print(f"      raw={r.get('raw_n')} title_ok={r.get('title_filtered_n', '-')} iqr={r.get('filtered_n')} "
                  f"median={r.get('median')} mean={r.get('mean')} min={r.get('min')} max={r.get('max')}")
            for tag in ("_kept", "_dropped"):
                for p, t in r.pop(tag, []):
                    print(f"      {'○' if tag == '_kept' else '×'} {p:>9,} {t}")
            time.sleep(0.8)
            continue
        r.pop("_kept", None); r.pop("_dropped", None)
        write_history(slug, row.get("name_ja", slug), r)
        time.sleep(0.8)

    if dry_run:
        print("\n(dry-run: brands.csv / yahoo-medians.json / price-history は未変更)")
        return

    # brands.csv 外の受け皿用銘柄（EXTRA_SLUGS）も取得して results に合流させる。
    # ここを回さないと、週次でJSONが上書きされた際に受け皿ページの実数が消える。
    for j, (slug, query) in enumerate(EXTRA_SLUGS.items(), 1):
        print(f"  [extra {j}/{len(EXTRA_SLUGS)}] {slug} '{query}'...", end=" ", flush=True)
        r = median_for_query(query)
        results[slug] = r
        if r.get("median") and not r.get("insufficient"):
            print(f"median=¥{r['median']:,} n={r['filtered_n']}")
        else:
            print(f"INSUFFICIENT n={r.get('filtered_n', 0)}")
        write_history(slug, slug, r)
        time.sleep(0.8)

    # Save back to brands.csv
    with BRANDS_CSV.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    OUT_JSON.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    success = sum(1 for r in results.values() if r.get("median") and not r.get("insufficient"))
    print(f"\n✅ {success}/{len(results)} brands have reliable median data")
    print(f"   Saved: {OUT_JSON}")
    print(f"   Updated: {BRANDS_CSV}")


if __name__ == "__main__":
    main()
