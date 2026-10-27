#!/usr/bin/env python3
"""2026-10-27 16時 遅れ挽回（冪等）
1) 「ウイスキー 買取」（全国語）が /tier2/kumamoto/ に着地（GSC 9/27〜10/24 imp110・10.0位）。
   全国向けの主ページ＝トップ（/・title「ウイスキー買取の最高入札比較」）なので、47県ハブの結論ボックスからトップへ文脈リンク。
2) 「ウイスキー 買取 富山」10.9位: 富山県ハブの結論ボックスを、県内の店舗数・市町村・営業時間・出張の答えに（値は同ページの店舗表＝2026-10-17・10-24 公式確認）。
"""
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent / "app" / "tier2"
CTA = 'おすすめの宅配買取業者を見る →</a>'
MARK = 'data-national-link="1"'
NAT = ('\n        <p ' + MARK + ' className="text-sm text-warm-gray mt-3 leading-relaxed">県を限らず、全国対応の買取業者と銘柄別の買取相場を比べる場合は '
       '<Link href="/" className="text-amber-dark underline hover:text-burgundy">ウイスキー買取の業者比較と相場（全国）→</Link></p>')
n = 0
for p in sorted(ROOT.glob("*/page.tsx")):
    t = p.read_text()
    if MARK in t:
        continue
    assert t.count(CTA) == 1, p
    t = t.replace(CTA, CTA + NAT, 1)
    p.write_text(t); n += 1
print("national link added:", n)

ty = ROOT / "toyama" / "page.tsx"
t = ty.read_text()
OLD_H = '<p className="font-bold text-base mb-2">富山県での売却方法について</p>'
if OLD_H in t:
    s = t.index(OLD_H)
    e = t.index('<a href="#osusume"', s)
    new = ('<p className="font-bold text-base mb-2">富山県でウイスキーを売る先（先に結論）</p>\n'
           '        <ul className="text-sm leading-relaxed mb-4 list-disc pl-5 space-y-1">\n'
           '          <li><strong>店頭</strong>：県内でお酒の買取を確認できた店舗は<strong>28店</strong>（富山市 10店・高岡市 8店・射水市 4店・砺波市 2店・滑川市・氷見市・小矢部市・魚津市 各1店）。内訳は買取大吉 19店・おたからや 4店・銀座蔵や 4店・ジュエルカフェ 1店で、営業時間は各店の公式で 10:00〜18:00 または 10:00〜19:00 です（<a href="#local-stores" className="text-amber-dark underline hover:text-burgundy">店舗一覧</a>・2026-10-17／10-24確認）。</li>\n'
           '          <li><strong>出張</strong>：バイセルは「富山県全域の各市町村で対応可能」、LINXAS は「富山県は無料出張エリア」と公式に記載しています（どちらも県内に店舗なし）。</li>\n'
           '          <li><strong>宅配</strong>：全国対応の宅配買取なら県内どこからでも送れて、複数社の査定を比べられます。買取額は市場相場（下記のヤフオク落札中央値）の60〜80%程度が業界一般の目安です。</li>\n'
           '        </ul>\n        ')
    t = t[:s] + new + t[e:]
    ty.write_text(t); print("toyama lead replaced")
else:
    print("toyama lead: already done")
