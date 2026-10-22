#!/usr/bin/env python3
"""tier2 北海道リーフの地元業者表「ストックラボ 北海道」行を公式（2026-10-22確認）に合わせる。冪等。
公式: stock-lab.com/osake-kaitori/area/hokkaido/「北海道は宅配買取エリアです」／店舗一覧に北海道店なし／
出張買取は「関東・関西・沖縄などを中心とする一部地域」（宅配/出張/店頭エリア=東京・千葉・茨城・神奈川・大阪・兵庫・沖縄）。
data/prefectures.py の local_dealers も同じ値に変更済み（生成器 generate-tier2-v4-plan-a.py が読む）。"""
import glob, sys
OLD = "<tr><td><strong>ストックラボ 北海道</strong></td><td>北海道全域</td><td>出張・宅配</td><td>業界トップクラスのお酒買取実績</td></tr>"
NEW = ("<tr><td><strong>ストックラボ</strong></td><td>北海道全域（道内に店舗なし）</td><td>宅配</td>"
       "<td>公式で北海道は「宅配買取エリア」。出張買取は関東・関西・沖縄が中心（2026年10月22日確認）</td></tr>")
n = 0
for f in sorted(glob.glob("app/tier2/hokkaido/*/page.tsx")):
    s = open(f, encoding="utf-8").read()
    if OLD in s:
        open(f, "w", encoding="utf-8").write(s.replace(OLD, NEW)); n += 1
print("changed", n)
