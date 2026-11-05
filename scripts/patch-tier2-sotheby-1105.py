#!/usr/bin/env python3
"""tier2 リーフ（4銘柄×47県）のサザビーズ言及を /methodology/ の記述に合わせる。冪等。data/brands_extra.py と同文。

/methodology/「海外オークションの落札結果は集計に使用していない。個別の結果は落札額と出典を確認できたものだけ出典URLつきで掲載」に対し、
出典のない「Sotheby's/Bonhams 出品実績多数、投資対象」等を削除。macallan-fine-rare の「£2.7M」は米ドル額の誤記（US$2.7M）で、
サザビーズの記事（2026-11-05 確認）では Valerio Adami ラベル £2,187,500（2023-11-18）・Fine & Rare ラベル £1,452,000（2019）。出典リンクつきで訂正。
"""
import glob

LINK = ('<a href="https://www.sothebys.com/en/articles/the-macallan-valerio-adami-60-year-old-revisiting-the-most-expensive-whisky-ever-sold" '
        'target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">出典</a>')
PAIRS = {
    "yamazaki-25": [("情報なし（個別ロット差大、Bonhams/Sotheby's 出品履歴あり）", "情報なし（個別ロット差大）")],
    "karuizawa-30": [("閉鎖蒸溜所の長期熟成品。Bonhams/Sotheby's 出品実績多数、投資対象として最上位", "閉鎖蒸溜所の長期熟成品です")],
    "macallan-fine-rare": [
        ("Macallan 1926 (Fine & Rare) £2.7M (Sotheby's 2023、ボトル単体世界最高額)",
         f"The Macallan 1926 Fine & Rare ラベル 1,452,000ポンド（2019年）／同 Valerio Adami ラベル 2,187,500ポンド（2023年11月18日）。いずれもサザビーズ（{LINK}）"),
        ("ウイスキー投資の頂点。Sotheby's/Bonhams で歴代世界記録を更新する常連シリーズ", "ヴィンテージ別に展開する長期熟成のシリーズです"),
    ],
    "bowmore-blackbowmore": [("Bowmore最高峰、1993〜2016年の5回限定リリース。Sotheby's/Bonhams出品実績多数、投資対象として極上位", "1993〜2016年の5回限定リリースです")],
}
changed = 0
for slug, pairs in PAIRS.items():
    for f in sorted(glob.glob(f"app/tier2/*/{slug}-kaitori/page.tsx")):
        s = t = open(f, encoding="utf-8").read()
        for a, b in pairs:
            t = t.replace(a, b)
        if t != s:
            open(f, "w", encoding="utf-8").write(t)
            changed += 1
print(f"changed {changed}")
