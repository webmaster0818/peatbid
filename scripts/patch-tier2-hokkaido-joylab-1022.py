#!/usr/bin/env python3
"""tier2 北海道リーフの地元業者表「ファイブニーズ 札幌店」行を公式（joylab.jp・2026-10-22確認）に合わせる。冪等。
公式: 店名=JOYLAB 札幌店（運営 株式会社ファイブニーズ）／札幌市中央区南12条西6丁目・札幌市電 中島公園通駅/行啓通駅 徒歩約4分／
店頭・出張・宅配の3方式／店舗一覧は JOYLAB 10店（「全国15店舗」は誤り）／札幌店ページ「北海道内全域対応」。「10年以上の実績」は公式に記載なし→削除。"""
import glob
OLD = "<tr><td><strong>ファイブニーズ 札幌店</strong></td><td>北海道札幌市</td><td>出張・宅配</td><td>10年以上の実績、全国15店舗展開</td></tr>"
NEW = ("<tr><td><strong>JOYLAB 札幌店（ファイブニーズ）</strong></td><td>札幌市中央区（市電 中島公園通駅・行啓通駅 徒歩約4分）</td><td>店頭・出張・宅配</td>"
       "<td>札幌店は北海道内全域に対応。JOYLAB は全国10店（2026年10月22日確認）</td></tr>")
n = 0
for f in sorted(glob.glob("app/tier2/hokkaido/*/page.tsx")):
    s = open(f, encoding="utf-8").read()
    if OLD in s:
        open(f, "w", encoding="utf-8").write(s.replace(OLD, NEW)); n += 1
print("changed", n)
