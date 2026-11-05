#!/usr/bin/env python3
"""和歌山の福ちゃん「出張の対応エリアの記載なし」を公式に合わせる。冪等。

fuku-chan.jp には地域の記載が無いが、同じ REGATE の公式 https://www.fuku-chan.info/liquor/area/wakayama/ に
「和歌山市をはじめ、田辺市、橋本市、紀の川市、海南市など、和歌山県全域がお酒買取対象エリアです。」（2026-11-05 確認）。
県ハブは gen-tier2-area.py 側で同文に置換。店舗・事業所が県内に無いことは従来どおり。
"""
import glob

QUOTE = "公式のエリアページに「和歌山県全域がお酒買取対象エリアです」と記載"
PAIRS = [
    ("出張の対応エリアの記載なし（2026年11月1日確認）", f"出張の対応エリアは{QUOTE}（2026年11月5日確認）"),
    ("（出張の対応エリアは公式サイトに記載がないため、申込時にご確認ください）", f"（{QUOTE}されています）"),
]
n = 0
for f in sorted(glob.glob("app/tier2/wakayama/*/page.tsx")) + ["data/prefectures.py"]:
    s = t = open(f, encoding="utf-8").read()
    for a, b in PAIRS:
        t = t.replace(a, b)
    if t != s:
        open(f, "w", encoding="utf-8").write(t)
        n += 1
print(f"changed {n}")
