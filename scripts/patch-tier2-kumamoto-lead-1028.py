#!/usr/bin/env python3
"""2026-10-28 16時 遅れ挽回（冪等）
「ウイスキー 買取」（GSC 9/28〜10/25 imp109・10.0位）が /tier2/kumamoto/ に着地。熊本からの検索と見て、
結論ボックスを県内の店頭（36店・市町村別・チェーン別）・出張・宅配の答えに（値は同ページの店舗表＝data/local-buyers.json kumamoto・2026-10-28 公式確認）。
gen-tier2-area.py kumamoto で再生成したら、national-link（1027）→ このスクリプトの順で再実行する。
"""
from pathlib import Path
P = Path(__file__).resolve().parent.parent / "app" / "tier2" / "kumamoto" / "page.tsx"
t = P.read_text()
OLD_H = '<p className="font-bold text-base mb-2">熊本県での売却方法について</p>'
if OLD_H in t:
    s = t.index(OLD_H)
    e = t.index('<a href="#osusume"', s)
    new = ('<p className="font-bold text-base mb-2">熊本県でウイスキーを売る先（先に結論）</p>\n'
           '        <ul className="text-sm leading-relaxed mb-4 list-disc pl-5 space-y-1">\n'
           '          <li><strong>店頭</strong>：県内でお酒の買取を確認できた店舗は<strong>36店</strong>（熊本市 18店・八代市 4店・荒尾市 3店・宇城市 2店・天草市・山鹿市・合志市・宇土市・玉名市・菊池市・菊陽町・大津町・錦町 各1店）。内訳は買取大吉 19店・ジュエルカフェ 6店・おたからや 3店・キングラム 3店・買取店わかば 2店・大黒屋・ファイブニーズ・バイセル 各1店です（<a href="#local-stores" className="text-amber-dark underline hover:text-burgundy">店舗一覧と営業時間</a>・2026-10-28確認）。熊本市中心部（下通・上通）には、お酒買取専門のファイブニーズ熊本店と大黒屋 質熊本下通店があります。</li>\n'
           '          <li><strong>出張</strong>：バイセル・福ちゃんは「熊本県全域」、LINXAS は「熊本県は無料出張エリア（九州）」と公式に記載しています。大黒屋とファイブニーズは対応する市町村を公式に掲載しています（下記「出張買取」）。</li>\n'
           '          <li><strong>宅配</strong>：リカスタ・ストックラボは「熊本県は宅配買取エリア」と記載。全国対応の宅配買取なら県内どこからでも送れて、複数社の査定を比べられます。買取額は市場相場（下記のヤフオク落札中央値）の60〜80%程度が業界一般の目安です。</li>\n'
           '        </ul>\n        ')
    t = t[:s] + new + t[e:]
    P.write_text(t)
    print("kumamoto lead replaced")
else:
    print("kumamoto lead: already done")
