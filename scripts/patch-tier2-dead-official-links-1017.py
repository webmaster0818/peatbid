#!/usr/bin/env python3
"""2026-10-17 tier2 リーフの「公式情報」リンクのうち、ドメインがパーキング／DNS 不在のものを外す（冪等）。

one-drinks.com（GoDaddy パーキング）・chichibu-distillery.jp（DNS 解決なし）は第三者に取得される
おそれがあるため、リンクを外して「—」にする。銘柄の掲載・本文は変えない。
元データ data/brands_extra.py は distillery_official_url を "" に、生成器は空なら「—」を出す。
使い方: python3 scripts/patch-tier2-dead-official-links-1017.py [--dry-run]
"""
import glob
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DRY = "--dry-run" in sys.argv
DEAD = ["https://www.one-drinks.com/", "http://www.chichibu-distillery.jp/"]
CLS = 'target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline"'

changed = 0
residual = 0
for fp in sorted(glob.glob(str(ROOT / "app/tier2/*/*/page.tsx"))):
    t = Path(fp).read_text(encoding="utf-8")
    o = t
    for u in DEAD:
        t = t.replace(f'<a href="{u}" {CLS}>{u}</a>', "—")
    if t != o:
        changed += 1
        if not DRY:
            Path(fp).write_text(t, encoding="utf-8")
    residual += sum(t.count(u.split("//")[1].rstrip("/")) for u in DEAD)
print(f"changed={changed} residual={residual} dry={DRY}")
sys.exit(1 if residual else 0)
