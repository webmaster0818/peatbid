#!/usr/bin/env python3
"""tier2 リーフの地元業者表 福ちゃん行を公式（2026-11-16 確認）に合わせる。冪等。

fuku-chan.jp トップ・/liquor/・/site-info/company.php を 11/16 curl:
  運営=株式会社REGATE（本社 大阪府大阪市東成区中本3-10-6）。/liquor/ の「福ちゃん店舗一覧」11店（店舗ごとの営業時間・住所は
  同ページの店舗モーダル）・会社概要の事業所14拠点は 11/15 と同じ。
  - 奈良・沖縄: 店舗・事業所なし → 11/15 と同じ形（旧「奈良県奈良市」「沖縄県那覇市」は所在地として誤り）。
  - 神奈川: 店舗なし・事業所「横浜センター」（横浜市神奈川区新浦島町）のみ → 旧「店頭」「全国大手の横浜支店」は誤り。
    会社概要の「各事業所ではお品物を買取することができません」は 11/16 時点で HTML コメント内（非表示）＝書かない。
  - 埼玉・千葉・静岡・京都・大阪・兵庫・広島: 県内に実店舗1店 → 店名・住所・営業時間を公式どおりに（愛知 10/25 の形）。
    埼玉は旧「さいたま市」が誤り（白岡市）。大阪の旧「全国12店舗展開」は店舗一覧11店と食い違い、「即日対応可」は公式で未確認。
    京都の旧「京都全域カバー」・各行の「全国大手」は公式の表現に無い。
  出張の対応エリアの文言は A/B 判断待ちのため、この行には書かない。
  「県全域」行（青森・岩手・秋田・山形・福島・鳥取・島根）は出張エリア文言の A/B と絡むため対象外。
"""
import glob

D = "株式会社REGATEが運営する買取専門店。"
M3 = "お酒の買取ページに出張・宅配・店舗の3方式を記載"
DT = "（2026年11月16日確認）"
YOYAKU = "10:00〜18:00・完全予約制（不定休）"
MUKYU = "10:00〜18:00・年中無休（年末年始除く）"


def none_row(ja):
    return ("福ちゃん", f"{ja}県内に店舗・事業所なし", "出張・宅配",
            f"{D}店舗一覧（11店）・会社概要の事業所（14拠点）に{ja}県はありません。{M3}{DT}")


def store_row(name, addr, hours, pre=D):
    return (name, addr, "出張・宅配・店頭", f"{pre}{M3}。営業時間 {hours}{DT}")


JOBS = {
    "nara": (("福ちゃん 奈良", "奈良県奈良市", "出張・宅配", "全国大手"), none_row("奈良")),
    "okinawa": (("福ちゃん 那覇", "沖縄県那覇市", "宅配・出張", "全国大手"), none_row("沖縄")),
    "kanagawa": (("福ちゃん 横浜", "神奈川県横浜市", "出張・宅配・店頭", "全国大手の横浜支店"),
                 ("福ちゃん", "神奈川県内に店舗なし（横浜市神奈川区の「横浜センター」は事業所）", "出張・宅配",
                  f"{D}店舗一覧（11店）に神奈川県の店舗はなく、会社概要の事業所（14拠点）に横浜センターの記載があります。{M3}{DT}")),
    "saitama": (("福ちゃん さいたま", "埼玉県さいたま市", "出張・宅配・店頭", "全国大手"),
                store_row("福ちゃん さいたま 白岡店", "埼玉県白岡市西6-12-5", YOYAKU)),
    "chiba": (("福ちゃん 千葉", "千葉県千葉市", "出張・宅配・店頭", "全国大手"),
              store_row("福ちゃん 千葉 祐光店", "千葉県千葉市中央区祐光3丁目7-11", YOYAKU)),
    "shizuoka": (("福ちゃん 静岡", "静岡県静岡市", "出張・宅配・店頭", "全国大手"),
                 store_row("福ちゃん 静岡 西脇店", "静岡県静岡市駿河区西脇33-1", YOYAKU)),
    "kyoto": (("福ちゃん 京都", "京都府内対応", "出張", "全国展開の大手で京都全域カバー"),
              store_row("福ちゃん 京都 伏見店", "京都府京都市伏見区下鳥羽上三栖町106", YOYAKU)),
    "osaka": (("福ちゃん（大阪本社）", "大阪府大阪市", "出張・宅配・店頭", "全国12店舗展開の大手。即日対応可"),
              store_row("福ちゃん 大阪 豊中店", "大阪府豊中市少路1-2-7 リッツサントノーレ1階", MUKYU,
                        pre="株式会社REGATE（本社 大阪市東成区）が運営する買取専門店。")),
    "hyogo": (("福ちゃん 神戸", "兵庫県神戸市", "出張・宅配・店頭", "全国大手"),
              store_row("福ちゃん 神戸 長田店", "兵庫県神戸市長田区林山町1-1", YOYAKU)),
    "hiroshima": (("福ちゃん 広島", "広島県広島市", "出張・宅配・店頭", "全国大手"),
                  store_row("福ちゃん 広島 出汐店", "広島県広島市南区出汐1-6-12", YOYAKU)),
}


def row(t):
    return f"<tr><td><strong>{t[0]}</strong></td><td>{t[1]}</td><td>{t[2]}</td><td>{t[3]}</td></tr>"


def py(t):
    return "(" + ", ".join(f'"{x}"' for x in t) + ")"


p = "data/prefectures.py"
ps = open(p, encoding="utf-8").read()
for slug, (old, new) in JOBS.items():
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
    done = sum(row(new) in open(f, encoding="utf-8").read() for f in files)
    print(f"{slug} {old[0]}: app {n}/{len(files)} / prefectures.py {m} / 残り {left} / 新行 {done}")
open(p, "w", encoding="utf-8").write(ps)
