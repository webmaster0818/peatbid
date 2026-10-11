#!/usr/bin/env python3
"""tier2 の page.tsx の openGraph に type: "website" を補う（冪等・2026-10-11）。

tier2 はページ側で openGraph を持つので layout の type が継承されず og:type が出ていなかった。
値は lib/og.ts の pageOpenGraph() の既定（"website"）と同じ＝kaitori 記事・/tier2/ 一覧・TOP と一致。
⚠️ tier2 の全再生成は禁止＝既存 page.tsx への文字列挿入のみ。
生成器（generate-tier2-v4-plan-a.py / gen-tier2-area.py / patch-tier2-buyer-count.py）にも同じ値を入れてある。
"""
import glob, re, sys, os

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
INSERT = 'type: "website", '
pat = re.compile(r"openGraph: \{ ")
has_type = re.compile(r"openGraph: \{[^}]*\btype:")

files = sorted(glob.glob(os.path.join(ROOT, "app/tier2/**/page.tsx"), recursive=True))
changed = skipped_has = no_og = warn = 0
for p in files:
    s = open(p, encoding="utf-8").read()
    if "openGraph:" not in s:
        no_og += 1
        continue
    if has_type.search(s):
        skipped_has += 1
        continue
    if len(pat.findall(s)) != 1:
        print("WARN unexpected form:", os.path.relpath(p, ROOT), file=sys.stderr)
        warn += 1
        continue
    s = pat.sub("openGraph: { " + INSERT, s, count=1)
    open(p, "w", encoding="utf-8").write(s)
    changed += 1
print(f"対象 {len(files)} / 変更 {changed} / 既に有り {skipped_has} / openGraph無し {no_og} / WARN {warn}")
