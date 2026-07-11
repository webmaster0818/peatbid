#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Peatbid買取相場指数の生成: data/price-history/*.json → data/souba-index.json
週次cron(weekly-yahoo-update.sh)に組込み、毎週自動更新される。
指数 = 基準週(最初の共通週)の各銘柄中央値を100とした相対値の単純平均(等ウェイト)。
サンプル不足銘柄(sample_n<20の週がある銘柄)は除外し、母数を明示する（捏造回避）。
"""
import csv, glob, json, os
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cat = {}
for r in csv.DictReader(open(os.path.join(ROOT, "data", "brands.csv"))):
    cat[r["slug"]] = r["category"]

# 品質ゲート（旧実装cca84b19から移植）: 明示除外リスト＋insufficient除外＋系列不連続3倍検知
import sys
sys.path.insert(0, os.path.join(ROOT, "scripts"))
try:
    from opportunity_band import DATA_QUALITY_EXCLUDE  # noqa: E402
except Exception:
    DATA_QUALITY_EXCLUDE = set()
SERIES_JUMP_RATIO = 3.0

series = {}  # slug -> {date: median}
for f in glob.glob(os.path.join(ROOT, "data", "price-history", "*.json")):
    d = json.load(open(f))
    if "slug" not in d:  # _index.json等のメタファイルはスキップ
        continue
    slug = d["slug"]
    if slug in DATA_QUALITY_EXCLUDE:
        continue
    if (d.get("latest") or {}).get("insufficient"):
        continue
    hist = {h["date"]: h for h in d.get("history", [])}
    # 全週で sample_n>=20 の銘柄のみ採用
    if not hist or any(h.get("sample_n", 0) < 20 or not h.get("median_jpy") for h in hist.values()):
        continue
    vals = [hist[k]["median_jpy"] for k in sorted(hist)]
    if any(max(a, b2) / max(1, min(a, b2)) > SERIES_JUMP_RATIO for a, b2 in zip(vals, vals[1:])):
        continue  # 系列不連続＝汚染疑い
    series[slug] = {dt: h["median_jpy"] for dt, h in hist.items()}

# 最頻の週セットを基準とし、その全週を持つ銘柄のみ採用（構成の一貫性を守る）
from collections import Counter
freq = Counter()
for s in series.values():
    for dt in s.keys():
        freq[dt] += 1
n_brands = len(series)
# 過半数の銘柄が持つ週を「正規の週」とする
dates = sorted([dt for dt, c in freq.items() if c >= n_brands * 0.8])
if len(dates) < 2:
    raise SystemExit("週次データ不足")
series = {s: v for s, v in series.items() if all(dt in v for dt in dates)}

def build_index(slugs):
    base = dates[0]
    out = []
    for dt in dates:
        rel = [series[s][dt] / series[s][base] * 100 for s in slugs]
        out.append({"date": dt, "index": round(sum(rel) / len(rel), 2)})
    return out

all_slugs = sorted(series.keys())
jp = [s for s in all_slugs if cat.get(s) == "japanese-whisky"]
sc = [s for s in all_slugs if cat.get(s) == "scotch-whisky"]

result = {
    "generated_note": "基準週=シリーズ最初の共通週を100とする等ウェイト指数。sample_n<20の週を含む銘柄は除外。",
    "base_date": dates[0],
    "latest_date": dates[-1],
    "constituents": {"total": len(all_slugs), "japanese": len(jp), "scotch": len(sc)},
    "slugs": all_slugs,
    "composite": build_index(all_slugs),
    "japanese": build_index(jp) if len(jp) >= 3 else None,
    "scotch": build_index(sc) if len(sc) >= 3 else None,
}
json.dump(result, open(os.path.join(ROOT, "data", "souba-index.json"), "w"), ensure_ascii=False, indent=1)
c = result["composite"]
print(f"index generated: {len(all_slugs)}銘柄({len(jp)}JP/{len(sc)}SC) {dates[0]}→{dates[-1]} 最新={c[-1]['index']} 前週比={round(c[-1]['index']-c[-2]['index'],2):+}")
