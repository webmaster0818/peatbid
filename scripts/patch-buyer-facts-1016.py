#!/usr/bin/env python3
"""掲載業者の根拠未確認だった3点を各社公式で確認して直す（2026-10-16・冪等）。

公式で確認した値（2026-10-16）:
- 福ちゃん（fuku-chan.jp・会社概要）: 買取方法は出張・宅配・店舗の3つ。出張買取の対応エリア（地域）の記載はない
  （会社概要の事業所は「各事業所ではお品物を買取することができません」）。
  → tier2「{主要都市}を中心に対応」／県ハブ「宅配・出張で全国をカバー」は根拠なし。
- ヒカカク！（hikakaku.com / hikakaku.com/lp/）: 「最大20社から一括査定」「査定は完全無料」
  「査定価格に納得しない場合は買取依頼しなくてもOK」「査定結果については、最短1日で登録したアドレスにメールが届きます」。
  「業界最多」「しつこい営業なし」に当たる記載はない。
- バイセル（buysell-kaitori.com/liquor/japanese-whisky/）: 「最短で即日のご訪問が可能」、出張は「離島を除く日本全国」、
  出張・店頭とも「その場で査定」。
- リカスタ（licasta.com）: 「営業時間内のお問い合わせにつきましては、1営業日以内にご連絡」
  「本数などにより2営業日以上お時間を頂戴する場合がございます」「即日現金化ももちろん可能」。
- 比較表の「1〜2日／即日〜2日／2〜5日」は上記のどれにも対応する記載がない → 公式の表記に置き換え。
- tier2 FAQ「{地元業者}など主要業者が出張買取対応エリアにしています。最短即日対応も可能です。」は
  掲載していない業者の対応エリアを断定していた → 掲載業者の公式記載に置き換え。

対象: app/**/page.tsx（tier2 含む・全再生成はしない）と生成器（再生成で戻らないように）。
使い方: python3 scripts/patch-buyer-facts-1016.py [--dry-run]
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRY = "--dry-run" in sys.argv

FUKU_NEW = "出張・宅配・店舗の3方式（出張の対応エリアは公式サイトに記載がないため申込時に確認）"
FAQ_NEW = ("掲載しているバイセルは出張買取を「離島を除く日本全国」で受け付けており、申込から最短即日の訪問に対応しています"
           "（公式サイト・2026年10月16日確認）。福ちゃんも出張買取を行っていますが、対応エリアは公式サイトに記載がないため、"
           "申込時にご確認ください。")
FAQ_OLD_TAIL = "など主要業者が出張買取対応エリアにしています。最短即日対応も可能です。"

# (旧, 新) 単純置換。どれも新文字列に旧文字列を含まない＝2回目は変更0。app と生成器の両方に適用。
PAIRS = [
    # ヒカカク！
    ("最大20社一括査定（業界最多級）", "最大20社から一括査定（公式）"),
    ("完全無料・しつこい営業なし", "査定は完全無料・納得できなければ買取依頼しなくてOK"),
    ("1サイトで業界最多級の見積もりが取得可能で", "1回の申し込みで最大20社から査定結果が届く仕組みで"),
    ("業界最多級20社一括", "最大20社から一括査定"),
    # 比較表の所要日数
    ("<th>査定スピード</th>", "<th>査定スピード（各社公式・2026年10月16日確認）</th>"),
    ("<td>一括査定（20社）</td><td>1〜2日</td>", "<td>一括査定（最大20社）</td><td>査定結果メールは最短1日</td>"),
    ("<td>大手の安心感</td><td>即日〜2日</td>", "<td>大手の安心感</td><td>出張は最短即日訪問・その場で査定</td>"),
    ("<td>宅配買取</td><td>2〜5日</td>", "<td>宅配買取</td><td>査定の連絡は1営業日以内（本数により2営業日以上）</td>"),
    # 手書き記事（yamazaki-kaitori / hibiki-kaitori）のバイセル
    ("全国出張対応・申込から最短当日訪問。", "出張は離島を除く全国・申込から最短即日訪問（公式）。"),
]

# tier2 リーフ（page.tsx）: 福ちゃんの「{主要都市}を中心に対応」
FUKU_RE = re.compile(r"(お酒査定にも対応。)[^<]{1,80}?を中心に対応</li>")
# tier2 リーフ（page.tsx）: FAQ（json.dumps で \uXXXX エスケープされている。可視部と JSON-LD の2か所）
def esc(s):
    return json.dumps(s)[1:-1]
FAQ_RE = re.compile(re.escape(esc("の中核エリアで、")) + r'[^"<]{1,600}?' + re.escape(esc(FAQ_OLD_TAIL)))
FAQ_SUB = esc("の中核エリアです。" + FAQ_NEW)

# 生成器（f-string）
GEN_PAIRS = [
    ("お酒査定にも対応。{p['cities']}を中心に対応</li>", "お酒査定にも対応。" + FUKU_NEW + "</li>"),
    ("は{p['region']}地方の中核エリアで、{', '.join(d[0] for d in p['local_dealers'][:3])}" + FAQ_OLD_TAIL,
     "は{p['region']}地方の中核エリアです。" + FAQ_NEW),
    ("総合買取の大手で、お酒・ウイスキーの査定にも対応。宅配・出張で全国をカバー。\", \"宅配・出張\")",
     "総合買取の大手で、お酒・ウイスキーの査定にも対応。出張・宅配・店舗の3方式（出張の対応エリアは公式サイトに記載なし）。\", \"出張・宅配・店舗\")"),
]

GENERATORS = sorted(set(glob.glob(os.path.join(ROOT, "scripts", "generate-*.py"))
                        + glob.glob(os.path.join(ROOT, "scripts", "gen-*.py"))))


def patch_text(t, is_gen):
    n = 0
    for old, new in PAIRS + (GEN_PAIRS if is_gen else []):
        c = t.count(old)
        if c:
            t = t.replace(old, new)
            n += c
    if not is_gen:
        t, c = FUKU_RE.subn(lambda m: m.group(1) + FUKU_NEW + "</li>", t)
        n += c
        t, c = FAQ_RE.subn(lambda m: FAQ_SUB, t)
        n += c
    return t, n


def main():
    files = [(p, False) for p in glob.glob(os.path.join(ROOT, "app", "**", "*.tsx"), recursive=True)]
    files += [(g, True) for g in GENERATORS]
    changed_files = total = 0
    for path, is_gen in files:
        t = open(path, encoding="utf-8").read()
        nt, n = patch_text(t, is_gen)
        if n:
            changed_files += 1
            total += n
            if not DRY:
                open(path, "w", encoding="utf-8").write(nt)
            if is_gen:
                print(f"GEN {os.path.relpath(path, ROOT)}: {n}")
    print(f"{'DRY ' if DRY else ''}files changed={changed_files} replacements={total}")


if __name__ == "__main__":
    main()
