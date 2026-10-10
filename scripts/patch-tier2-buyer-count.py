#!/usr/bin/env python3
"""tier2 リーフ（app/tier2/<pref>/<slug>-kaitori/page.tsx）の「4業者」表記を実数「3業者」に直す冪等パッチ。
2026-10-09: 8/4 の JOYLAB 撤去後も description / 本文 / h3 に「4業者」が残っていた（実際のリンクは
LINXAS・バイセル・福ちゃんの3社）。生成器 generate-tier2-v4-plan-a.py 側も同時に修正済み（再生成で戻らない）。
あわせて og:url（canonical と同値）を metadata に追加する（layout の openGraph は images だけ持つので
page 側で openGraph を定義するときは images を明記しないと og:image が消える＝2026-10-05 の教訓）。

tier2 の全再生成は禁止（price-history JSON の型不一致でビルドが落ちる）ので文字列差し替えのみ。

使い方: python3 scripts/patch-tier2-buyer-count.py [--dry] [--no-og]
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TIER2 = ROOT / "app" / "tier2"

PAIRS = [
    ("業者買取額は4業者の公式ページへ直リンク", "業者買取額は3業者の公式ページへ直リンク"),
    ("地元業者と4業者参考リンクを掲載。", "地元業者と3業者参考リンクを掲載。"),
    ("5-2. 全国対応の主要4業者（最新査定額の取得先）", "5-2. 全国対応の主要3業者（最新査定額の取得先）"),
    ("各業者の最新査定額は4業者ページから直接ご確認", "各業者の最新査定額は3業者ページから直接ご確認"),
    ("4業者への参考リンクを掲載しています", "3業者への参考リンクを掲載しています"),
    ("市場相場（Yahoo中央値）と4業者参考リンクを掲載。", "市場相場（Yahoo中央値）と3業者参考リンクを掲載。"),
]
RE_CANON = re.compile(r'^(  alternates: \{ canonical: "(https://peatbid\.com/tier2/[^"]+/)" \},)\n', re.M)
PARTNER_LINKS = ("https://linxas.shop/whiskey/", "https://buysell-kaitori.com/", "https://fuku-chan.jp/")


def main():
    dry = "--dry" in sys.argv
    do_og = "--no-og" not in sys.argv
    pages = sorted(TIER2.glob("*/*-kaitori/page.tsx"))
    changed = 0
    og_added = 0
    before = after = 0
    warn = 0
    for p in pages:
        s = p.read_text(encoding="utf-8")
        o = s
        # 実際に掲載している業者数が3でないページは触らない（事実と違う書き換えを防ぐ）
        n_links = sum(1 for u in PARTNER_LINKS if u in s)
        if n_links != 3:
            print(f"⚠️ {p.relative_to(ROOT)}: 業者リンク {n_links} 本（3 ではない）→ スキップ")
            warn += 1
            continue
        before += s.count("4業者")
        for a, b in PAIRS:
            s = s.replace(a, b)
        if do_og and "openGraph:" not in s:
            m = RE_CANON.search(s)
            if m:
                s = s[: m.end()] + f'  openGraph: {{ siteName: "PeatBid", locale: "ja_JP", url: "{m.group(2)}", images: ["/og-image.png"] }},\n' + s[m.end():]
                og_added += 1
        after += s.count("4業者")
        if s != o:
            changed += 1
            if not dry:
                p.write_text(s, encoding="utf-8")
    print(f"対象 {len(pages)} ページ / 変更 {changed} / og:url 追加 {og_added} / スキップ {warn}")
    print(f"「4業者」出現数 before={before} after={after}{'（dry-run）' if dry else ''}")


if __name__ == "__main__":
    main()
