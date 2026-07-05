#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""週次相場指数レポートのDiscord通知テキストを生成（souba-index.json + souba-ranking.json）。
weekly-yahoo-update.sh の完了通知に組み込み、毎週このチャンネルへ自動投稿する。
出力はDiscord向けプレーンテキスト（1900字以内）。"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load(p):
    with open(os.path.join(ROOT, "data", p), encoding="utf-8") as f:
        return json.load(f)

idx = load("souba-index.json")
rank = load("souba-ranking.json")

def latest_change(series_key):
    s = idx.get("series", {}).get(series_key, [])
    if len(s) < 1:
        return None, None
    cur = s[-1]["value"]
    prev = s[-2]["value"] if len(s) >= 2 else 100.0
    chg = (cur / prev - 1) * 100 if prev else 0.0
    return cur, chg

def fmt_chg(c):
    if c is None:
        return "—"
    return f"{'+' if c >= 0 else ''}{c:.1f}%"

all_v, all_c = latest_change("all")
jp_v, jp_c = latest_change("japanese")
sc_v, sc_c = latest_change("scotch")

brands = [b for b in rank.get("brands", []) if b.get("change_1w") is not None]
movers = [b for b in brands if abs(b.get("change_1w", 0)) > 0.01]
gainers = sorted(movers, key=lambda b: b["change_1w"], reverse=True)[:5]
losers = sorted(movers, key=lambda b: b["change_1w"])[:5]

lines = []
lines.append(f"📊 **PeatBid ウイスキー買取相場指数（週次）** {idx.get('updated','')}時点")
lines.append(f"総合 **{all_v:.2f}**（前週比 {fmt_chg(all_c)}／基準週={idx.get('base_date','')}=100・{idx.get('n_brands','')}銘柄）")
lines.append(f"┗ ジャパニーズ {jp_v:.2f}（{fmt_chg(jp_c)}）／ スコッチ {sc_v:.2f}（{fmt_chg(sc_c)}）")
if gainers:
    lines.append("")
    lines.append("**📈 今週の値上がりTOP5（前週比）**")
    for b in gainers:
        lines.append(f"・{b['name']}　{fmt_chg(b['change_1w'])}（中央値 ¥{b['median']:,}）")
if losers:
    lines.append("")
    lines.append("**📉 今週の値下がりTOP5（前週比）**")
    for b in losers:
        lines.append(f"・{b['name']}　{fmt_chg(b['change_1w'])}（中央値 ¥{b['median']:,}）")
if not gainers and not losers:
    lines.append("")
    lines.append("※今週は前週比の変動が集計できた銘柄がありません（データ蓄積中）。")
lines.append("")
lines.append("詳細（引用歓迎）→ https://peatbid.com/souba-report/")

text = "\n".join(lines)
print(text[:1900])
