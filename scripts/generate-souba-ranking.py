#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""相場ランキング/ダッシュボード用データ生成（B：一次データの更新型コンテンツ）。
brands.json（当日の実勢中央値）＋ price-history/{slug}.json（週次スナップショット）から、
各銘柄の中央値・流通量・週次変化率を算出し data/souba-ranking.json を出力。
週次cron（weekly-yahoo-update.sh）から呼び出して自動更新する。
"""
import json, os, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRANDS = json.load(open(os.path.join(ROOT, "data", "brands.json"), encoding="utf-8"))
HIST_DIR = os.path.join(ROOT, "data", "price-history")

CAT_LABEL = {"japanese-whisky": "ジャパニーズ", "scotch-whisky": "スコッチ"}

def hist(slug):
    p = os.path.join(HIST_DIR, f"{slug}.json")
    if not os.path.exists(p):
        return []
    try:
        return json.load(open(p, encoding="utf-8")).get("history", [])
    except Exception:
        return []

rows = []
latest_date = ""
for b in BRANDS:
    median = b.get("yahoo_median_jpy_180d")
    if not isinstance(median, int) or median <= 0:
        continue
    h = [x for x in hist(b["slug"]) if isinstance(x.get("median_jpy"), int) and x["median_jpy"] > 0]
    change_1w = None
    change_2w = None
    prev = None
    if len(h) >= 2:
        prev = h[-2]["median_jpy"]
        if prev:
            change_1w = round((h[-1]["median_jpy"] - prev) / prev * 100, 1)
    if len(h) >= 3:
        base = h[-3]["median_jpy"]
        if base:
            change_2w = round((h[-1]["median_jpy"] - base) / base * 100, 1)
    if h:
        latest_date = max(latest_date, h[-1].get("date", ""))
    rows.append({
        "slug": b["slug"],
        "name": b["name_ja"],
        "category": CAT_LABEL.get(b.get("category"), "ウイスキー"),
        "origin": b.get("origin", ""),
        "rarity": b.get("rarity_tier", ""),
        "median": median,
        "sample_n": b.get("yahoo_sample_n", 0),
        "prev_median": prev,
        "change_1w": change_1w,
        "change_2w": change_2w,
    })

latest_date = latest_date or (BRANDS[0].get("yahoo_fetched_at", "") if BRANDS else "")
out = {"updated": latest_date, "count": len(rows), "brands": rows}
dst = os.path.join(ROOT, "data", "souba-ranking.json")
json.dump(out, open(dst, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
movers = [r for r in rows if r["change_1w"] is not None]
print(f"✓ {dst}: {len(rows)}銘柄 / 変化率算出可={len(movers)} / 基準日={latest_date}")
