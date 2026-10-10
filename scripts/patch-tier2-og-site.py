#!/usr/bin/env python3
"""tier2 の page.tsx の openGraph に siteName / locale を補う（冪等・2026-10-10）。

tier2 はページ側で openGraph を持つので layout の siteName/locale が継承されない。
値は lib/og.ts の pageOpenGraph() と同じ（siteName "PeatBid" / locale "ja_JP"）。
⚠️ tier2 の全再生成は禁止（price-history の型不一致）＝既存 page.tsx への文字列挿入のみ。
生成器（generate-tier2-v4-plan-a.py / gen-tier2-area.py）にも同じ値を入れてある。
"""
import glob, re, sys, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
INSERT = 'siteName: "PeatBid", locale: "ja_JP", '
pat = re.compile(r"openGraph: \{ ")

files = sorted(glob.glob(os.path.join(ROOT, "app/tier2/**/page.tsx"), recursive=True))
changed = skipped_has = no_og = 0
for p in files:
    s = open(p, encoding="utf-8").read()
    if "openGraph:" not in s:
        no_og += 1
        continue
    if "siteName:" in s and "locale:" in s:
        skipped_has += 1
        continue
    if "siteName:" in s or "locale:" in s or len(pat.findall(s)) != 1:
        print("WARN unexpected form:", os.path.relpath(p, ROOT), file=sys.stderr)
        continue
    s = pat.sub("openGraph: { " + INSERT, s, count=1)
    open(p, "w", encoding="utf-8").write(s)
    changed += 1
print(f"対象 {len(files)} / 変更 {changed} / 既に有り {skipped_has} / openGraph無し {no_og}")
