#!/usr/bin/env python3
"""tier2 茨城 バイセル行に店頭（11/18 開店）・青森 福ちゃん行の店舗数の誤りを直す（2026-11-18 公式確認）。冪等。

公式（11/18 curl）:
- バイセル 店舗検索 API /wp-json/bsportal/v1/stores の map_list（201店）: 茨城県は「そよらひたち野うしく店」1店（直営・NEW OPEN 11/18）
- /store/soyora-hitachinoushiku/: 店舗OPEN日 2026年11月18日／〒300-1207 茨城県牛久市ひたち野東1丁目23-1 そよらひたち野うしく 2F／
  「酒類の買取に関しては20歳以上のお客様のみ対象」
- /area/liquor-ibaraki/: 「茨城県の店舗案内」にそよらひたち野うしく店・「茨城県全域の各市町村にて対応可能」
- 福ちゃん fuku-chan.jp トップ・/liquor/ の店舗一覧は11店（北20条・白岡・祐光・八王子・西脇・高針・緑滝ノ水・伏見・豊中・長田・出汐）
  → 青森行の特徴「全国12店舗展開大手」は公式と食い違うため、他県の行と同じ「全国大手」に。所在地「青森県全域」は A/B 待ちで据え置き。
- 特徴欄「東証上場大手」は A/B 判断待ちのため据え置き。
"""
import glob

FIXES = {
    "ibaraki": (("バイセル 茨城", "茨城県全域", "出張・宅配", "東証上場大手"),
                ("バイセル そよらひたち野うしく店", "牛久市ひたち野東1丁目23-1 そよらひたち野うしく 2F（2026年11月18日開店）。出張は茨城県全域",
                 "店頭・出張・宅配", "東証上場大手")),
    "aomori": (("福ちゃん 青森", "青森県全域", "出張・宅配", "全国12店舗展開大手"),
               ("福ちゃん 青森", "青森県全域", "出張・宅配", "全国大手")),
}


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


p = "data/prefectures.py"
ps = open(p, encoding="utf-8").read()
for slug, (old, new) in FIXES.items():
    files = sorted(glob.glob(f"app/tier2/{slug}/*/page.tsx"))
    n = 0
    for f in files:
        s = open(f, encoding="utf-8").read()
        if row(old) in s:
            open(f, "w", encoding="utf-8").write(s.replace(row(old), row(new)))
            n += 1
    m = 0
    if py(old) in ps:
        ps = ps.replace(py(old), py(new))
        m = 1
    left = sum(row(old) in open(f, encoding="utf-8").read() for f in files)
    print(f"{slug}: app {n}/{len(files)} / prefectures.py {m} / 残り {left}")
open(p, "w", encoding="utf-8").write(ps)
