#!/usr/bin/env python3
"""
Tier 2 PSEO サンプル生成（最初の10ページ）

URL構造: /tier2/{prefecture}/{brand}-kaitori/
組み合わせ: 主要都市 × 人気銘柄

最初のサンプルでデザイン・品質を承認してもらい、その後全2,350ページ展開予定。
"""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT / "app" / "tier2"

# 47都道府県の基本情報
PREFECTURES = {
    "tokyo": {
        "name_ja": "東京都", "region": "関東", "population": "1,400万人",
        "cities": "新宿・渋谷・池袋・銀座・上野",
        "demand": "国内最大の中古ウイスキー市場。コレクター・投資家が集中",
    },
    "osaka": {
        "name_ja": "大阪府", "region": "関西", "population": "880万人",
        "cities": "梅田・難波・心斎橋・天王寺・京橋",
        "demand": "関西最大の市場。インバウンド需要も活発",
    },
    "kyoto": {
        "name_ja": "京都府", "region": "関西", "population": "260万人",
        "cities": "四条・河原町・烏丸・京都駅周辺",
        "demand": "観光地・国際取引と相続案件が多い",
    },
    "kanagawa": {
        "name_ja": "神奈川県", "region": "関東", "population": "920万人",
        "cities": "横浜・川崎・湘南・横須賀",
        "demand": "東京近接で買取需要が高く、富裕層居住地多数",
    },
    "aichi": {
        "name_ja": "愛知県", "region": "中部", "population": "750万人",
        "cities": "名古屋・栄・金山・豊田",
        "demand": "中部最大市場。大手買取業者の支店多数",
    },
    "hokkaido": {
        "name_ja": "北海道", "region": "北海道", "population": "510万人",
        "cities": "札幌・旭川・函館・小樽",
        "demand": "ニッカ余市蒸溜所所在地、ウイスキー文化が根付く",
    },
    "fukuoka": {
        "name_ja": "福岡県", "region": "九州", "population": "510万人",
        "cities": "博多・天神・小倉・久留米",
        "demand": "九州の中心都市で買取業者集中",
    },
}

# サンプル銘柄（既に価格データがある銘柄から選定）
BRANDS = {
    "yamazaki-18": {
        "name_ja": "山崎18年",
        "ref_price": 230000,
        "category": "ジャパニーズウイスキー",
        "rarity": "high",
    },
    "hibiki-30": {
        "name_ja": "響30年",
        "ref_price": 1100000,
        "category": "ジャパニーズウイスキー",
        "rarity": "ultra",
    },
    "macallan-25": {
        "name_ja": "マッカラン25年",
        "ref_price": 400000,
        "category": "スコッチウイスキー",
        "rarity": "high",
    },
    "karuizawa-12": {
        "name_ja": "軽井沢12年",
        "ref_price": 1500000,
        "category": "ジャパニーズウイスキー",
        "rarity": "ultra-rare",
    },
}

# サンプル: 東京×4銘柄 + 大阪×山崎18 + 神奈川×響30 + 京都×マッカラン25 + 北海道×山崎18 + 福岡×山崎18 + 愛知×山崎18 = 10ページ
SAMPLES = [
    ("tokyo", "yamazaki-18"),
    ("tokyo", "hibiki-30"),
    ("tokyo", "macallan-25"),
    ("tokyo", "karuizawa-12"),
    ("osaka", "yamazaki-18"),
    ("kanagawa", "hibiki-30"),
    ("kyoto", "macallan-25"),
    ("hokkaido", "yamazaki-18"),
    ("fukuoka", "yamazaki-18"),
    ("aichi", "yamazaki-18"),
]


def build_page(pref_slug: str, brand_slug: str) -> str:
    p = PREFECTURES[pref_slug]
    b = BRANDS[brand_slug]
    title = f"【2026年最新】{p['name_ja']}で{b['name_ja']}を高く売る｜買取相場・出張対応業者比較"
    description = f"{p['name_ja']}（{p['cities']}）で{b['name_ja']}を売却するなら？最新買取相場 約{b['ref_price']:,}円、{p['region']}地方の出張買取対応業者、地域別の価格傾向を解説。"
    h1 = f"{p['name_ja']}で{b['name_ja']}を高く売る完全ガイド"

    faq = [
        (f"{p['name_ja']}で{b['name_ja']}は出張買取してもらえますか？", f"はい。主要な買取専門業者（バイセル、JOYLAB、お酒買取専門店、福ちゃんなど）は{p['name_ja']}全域を出張買取エリアにしています。{p['cities']}の主要駅近郊なら最短即日対応も可能です。"),
        (f"{p['name_ja']}の{b['name_ja']}買取相場は他県と差がありますか？", f"基本的な相場は全国共通ですが、{p['region']}地方は需要が安定しており、業者間競争があるため**相見積もりで高値が出やすい**傾向です。{p['name_ja']}の場合、約{b['ref_price']:,}円（未開封・箱付き）が現在の目安です。"),
        (f"{p['name_ja']}の店頭買取で{b['name_ja']}は売れますか？", f"はい、{p['cities']}を中心に楽器店・ブランド買取店・ウイスキー専門店で店頭買取可能です。高額銘柄である{b['name_ja']}は事前予約・専門査定を推奨します。"),
    ]
    faq_json = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in faq
        ],
    }
    article_json = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": h1,
        "datePublished": "2026-05-17",
        "dateModified": "2026-05-17",
        "author": {"@type": "Organization", "name": "PeatBid編集部"},
        "publisher": {"@type": "Organization", "name": "PeatBid"},
    }
    localbiz_json = {
        "@context": "https://schema.org",
        "@type": "Service",
        "areaServed": {"@type": "AdministrativeArea", "name": p["name_ja"]},
        "serviceType": "ウイスキー買取",
        "provider": {"@type": "Organization", "name": "PeatBid"},
    }

    return f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import PriceHistoryCard from "@/components/PriceHistoryCard";
import priceData from "@/data/price-history/{brand_slug}.json";

export const metadata: Metadata = {{
  title: "{title}",
  description: "{description}",
  robots: {{ index: true, follow: true }},
}};

function Schema() {{
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: {json.dumps(json.dumps(faq_json, ensure_ascii=False))} }}}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: {json.dumps(json.dumps(article_json, ensure_ascii=False))} }}}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: {json.dumps(json.dumps(localbiz_json, ensure_ascii=False))} }}}} />
    </>
  );
}}

export default function Page() {{
  return (
    <>
      <Schema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/whisky-kaitori-souba/" className="hover:text-amber-dark transition-colors">買取相場</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">{p['name_ja']}×{b['name_ja']}</span></li>
          </ol>
        </nav>

        <article className="prose">
          <div className="flex flex-wrap gap-2 mb-3 not-prose">
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">{p['region']}・{p['name_ja']}</span>
            <span className="bg-burgundy/15 text-burgundy text-xs font-bold px-3 py-1 rounded-full">{b['category']}</span>
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">2026年最新</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{h1}</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-05-17 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <PriceHistoryCard data={{priceData as Parameters<typeof PriceHistoryCard>[0]["data"]}} />

          <h2>1. {p['name_ja']}における{b['name_ja']}の市場状況</h2>
          <p>{p['name_ja']}（人口{p['population']}、主要都市: {p['cities']}）は{p['region']}地方の中核エリアであり、{p['demand']}。</p>
          <p>そのため{b['name_ja']}のような高額ウイスキー銘柄の二次流通も活発で、複数の買取業者が出張・店頭・宅配で対応しています。</p>

          <h2>2. {b['name_ja']}の最新買取相場（2026年5月）</h2>
          <p>{b['name_ja']}（未開封・箱付き）の現在の買取相場は<strong>約{b['ref_price']:,}円</strong>です。状態・付属品・買取業者により以下のレンジで変動します:</p>
          <ul>
            <li><strong>未開封・箱付き</strong>: 約{b['ref_price']:,}円 ±10%</li>
            <li><strong>未開封・箱なし</strong>: 約{int(b['ref_price']*0.75):,}円</li>
            <li><strong>開封済み（残量9割以上）</strong>: 約{int(b['ref_price']*0.40):,}円</li>
          </ul>

          <h2>3. {p['name_ja']}対応のおすすめ買取業者</h2>
          <p>{p['name_ja']}で{b['name_ja']}を売却する際の代表的な業者を紹介します:</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>業者</th><th>対応方式</th><th>{p['name_ja']}の特徴</th></tr></thead>
              <tbody>
                <tr><td>バイセル</td><td>出張・宅配・店頭</td><td>{p['cities']}の主要駅周辺なら即日出張対応可</td></tr>
                <tr><td>JOYLAB</td><td>出張・宅配</td><td>ウイスキー専門査定。高額品の鑑定実績あり</td></tr>
                <tr><td>お酒買取専門店</td><td>宅配中心</td><td>{p['name_ja']}全域から送料無料で受付</td></tr>
                <tr><td>福ちゃん</td><td>出張・宅配・店頭</td><td>大手で安心、まとめ売り対応</td></tr>
              </tbody>
            </table>
          </div>

          <h2>4. {p['name_ja']}で高く売る5つのコツ</h2>
          <ol>
            <li><strong>複数業者で相見積もり</strong>: 最低3社、できれば5社の見積もりで最高値を選ぶ</li>
            <li><strong>付属品を揃える</strong>: 外箱・冊子・カートン・保証書を揃えて査定額アップ</li>
            <li><strong>{p['region']}地方の需要期に売る</strong>: 年末年始・お中元・お歳暮シーズン</li>
            <li><strong>地域密着業者と全国業者を比較</strong>: {p['name_ja']}の地元業者と大手の両方で査定</li>
            <li><strong>出張買取の場合は事前予約</strong>: 高額銘柄は専門査定士の同行を依頼</li>
          </ol>

          <h2>5. {p['name_ja']}の{b['name_ja']}買取で注意すべき点</h2>
          <ul>
            <li><strong>身分証必須</strong>: 古物営業法により本人確認が必要</li>
            <li><strong>未成年（18歳未満）は売却不可</strong>: 親権者の同意も不可</li>
            <li><strong>偽物・贋作リスク</strong>: {b['name_ja']}は高額銘柄のため、専門査定士の鑑定推奨</li>
            <li><strong>輸送リスク</strong>: 宅配買取の場合、緩衝材を十分に</li>
          </ul>

          <h2>6. よくある質問</h2>
          {"".join(f'''<details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>{q}</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed">{a}</p>
          </details>''' for q, a in faq)}

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">📚 関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/{brand_slug}-kaitori/" className="text-amber-dark hover:text-burgundy underline">{b['name_ja']}の買取相場（全国版）</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}}
'''


def main():
    print(f"Generating {len(SAMPLES)} Tier 2 sample pages...")
    for pref, brand in SAMPLES:
        out_dir = ARTICLES_DIR / pref / f"{brand}-kaitori"
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "page.tsx").write_text(build_page(pref, brand), encoding="utf-8")
        print(f"  ✅ /tier2/{pref}/{brand}-kaitori/")
    print(f"\n✅ Done. {len(SAMPLES)} sample pages.")


if __name__ == "__main__":
    main()
