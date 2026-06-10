#!/usr/bin/env python3
"""
Generate app/tier2/page.tsx — the regional hub INDEX that aggregates all 47
prefecture hubs. This was missing (so /articles/ linked to a dead /tier2/ and
all 47 prefecture hubs were orphaned / uncrawlable). One keystone page that
makes the entire tier2 subtree reachable: home/footer -> /tier2/ -> {pref} -> leaf.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from data.prefectures import PREFECTURES

REGION_ORDER = ["北海道", "東北", "関東", "中部", "関西", "中国", "四国", "九州"]


def region_blocks() -> str:
    by_region = {r: [] for r in REGION_ORDER}
    for slug, p in PREFECTURES.items():
        by_region.setdefault(p["region"], []).append((slug, p))
    out = []
    for region in REGION_ORDER:
        prefs = by_region.get(region, [])
        if not prefs:
            continue
        cards = "\n".join(
            f'''          <Link href="/tier2/{slug}/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">{p["name_ja"]}</p>
            <p className="text-xs text-warm-gray mt-0.5">{p["cities"].split("・")[0]}ほか・50銘柄</p>
          </Link>'''
            for slug, p in prefs
        )
        out.append(
            f'''        <section className="mb-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4 border-b border-amber/30 pb-2">{region}地方</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
{cards}
          </div>
        </section>'''
        )
    return "\n".join(out)


def build() -> str:
    blocks = region_blocks()
    return f'''import type {{ Metadata }} from "next";
import Link from "next/link";

const URL = "https://peatbid.com/tier2/";

export const metadata: Metadata = {{
  title: "地域別ウイスキー買取相場｜47都道府県から探す",
  description: "お住まいの都道府県からウイスキーの買取相場と地元対応業者を探せます。山崎・響・白州・マッカランなど50銘柄 × 47都道府県の市場相場（Yahoo中央値）と、出張・店頭・宅配対応の業者情報を掲載。",
  alternates: {{ canonical: URL }},
  robots: {{ index: true, follow: true }},
}};

export default function Page() {{
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1 flex-wrap">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">地域別の買取相場</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">地域別ウイスキー買取相場｜47都道府県から探す</h1>
      <p className="text-warm-gray text-sm mb-6">最終更新: 2026-05-22 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link></p>

      <section className="prose mb-8">
        <p>
          お住まいの都道府県を選ぶと、その地域での <strong>ウイスキー50銘柄の市場相場（Yahoo Auctions 過去180日落札中央値）</strong> と、
          出張・店頭・宅配に対応する地元業者を確認できます。市場相場は全国共通ですが、業者の買取査定額は地域・業者により差が出るため、
          複数業者の相見積もりが高値売却の近道です。
        </p>
        <p className="text-sm">
          銘柄から探したい方は <Link href="/articles/" className="text-amber-dark underline hover:text-burgundy">銘柄一覧（全50銘柄）</Link>、
          今週の値動きは <Link href="/souba-ranking/" className="text-amber-dark underline hover:text-burgundy">相場ランキング</Link> をご覧ください。
        </p>
      </section>

{blocks}

      <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10">
        <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
        <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
          <li><Link href="/articles/" className="text-amber-dark hover:text-burgundy underline">銘柄一覧（全50銘柄の買取相場）</Link></li>
          <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー市場相場一覧</Link></li>
          <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
          <li><Link href="/souba-ranking/" className="text-amber-dark hover:text-burgundy underline">相場ランキング（今週の値上がり・値下がり）</Link></li>
        </ul>
      </div>
    </div>
  );
}}
'''


def main():
    out = ROOT / "app" / "tier2" / "page.tsx"
    out.write_text(build(), encoding="utf-8")
    print(f"wrote {out} ({len(PREFECTURES)} prefectures)")


if __name__ == "__main__":
    main()
