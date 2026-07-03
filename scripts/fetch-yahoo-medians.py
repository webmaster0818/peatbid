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
    print(f"🔍 Yahoo median fetch ({TODAY}) — {len(BRAND_QUERIES)} brands")

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
        print(f"  [{i}/{len(rows)}] {slug} '{query}'...", end=" ", flush=True)
        r = median_for_query(query)
        # データ品質強制フラグ: クエリ汚染で中央値が実物と乖離する銘柄は insufficient 固定
        # bowmore-blackbowmore: ミニチュア/空瓶混入で¥4,000(実物は数百万円級)。クエリ精査まで実数を出さない
        if slug in {"bowmore-blackbowmore"}:
            r["insufficient"] = True
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
            print(f"INSUFFICIENT n={r.get('filtered_n', 0)}")
        write_history(slug, row.get("name_ja", slug), r)
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
