#!/usr/bin/env python3
"""
Tier 2 PSEO サンプル v2: SERP研究反映版

MediaXAI フィードバック反映:
1. SERP上位5位の勝ち要素を反映
2. 銘柄別ヒーロー画像を配置
3. 地元業者リスト追加
"""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARTICLES_DIR = ROOT / "app" / "tier2"

# 47都道府県の詳細情報（SERP研究で得た情報を反映）
PREFECTURES = {
    "tokyo": {
        "name_ja": "東京都", "region": "関東", "population": "1,400万人",
        "cities": "新宿・渋谷・池袋・銀座・上野・秋葉原・赤羽",
        "demand": "国内最大の中古ウイスキー市場で、コレクター・投資家が集中。複数の専門業者が出張対応",
        "local_dealers": [
            ("ライフバケーション", "東京都中央区銀座", "出張・宅配・店頭", "ウイスキー・ブランデー専門査定。実績豊富"),
            ("ルーディヤ", "池袋・秋葉原・赤羽・川崎", "店頭・郵送", "東京4店舗展開、ウイスキー店頭買取に強い"),
            ("ワンダーレックス", "東京都内多店舗", "店頭・宅配", "総合リサイクル、洋酒査定対応"),
            ("レッドバッカス", "東京都内", "店頭・出張", "ウイスキー・お酒専門の高価買取"),
        ],
    },
    "osaka": {
        "name_ja": "大阪府", "region": "関西", "population": "880万人",
        "cities": "梅田・難波・心斎橋・天王寺・京橋・大阪駅周辺",
        "demand": "関西最大の市場。インバウンド需要も活発で、福ちゃん本社所在地",
        "local_dealers": [
            ("福ちゃん（大阪本社）", "大阪府大阪市", "出張・宅配・店頭", "全国12店舗展開の大手。即日対応可"),
            ("OKURA（おお蔵）", "大阪府内", "店頭・出張", "ウイスキー専門査定。大量在庫の出張対応も実績"),
            ("DEゴザル", "大阪・東京・福岡対応", "出張・宅配", "ウイスキー特化キャンペーンを定期開催"),
            ("リカスタ", "大阪府内", "出張・宅配", "お酒のプロによる査定"),
        ],
    },
    "kyoto": {
        "name_ja": "京都府", "region": "関西", "population": "260万人",
        "cities": "四条・河原町・烏丸・京都駅周辺・祇園",
        "demand": "観光地・国際取引と相続案件が多い。富裕層居住地も多数",
        "local_dealers": [
            ("大吉 京都四条店", "京都府京都市下京区", "店頭", "総合買取で洋酒対応、即現金化"),
            ("リカスタ 京都", "京都府内対応", "出張・宅配", "お酒専門業者が出張対応"),
            ("福ちゃん 京都", "京都府内対応", "出張", "全国展開の大手で京都全域カバー"),
            ("OKURA 京都", "京都府内対応", "店頭・出張", "高額ウイスキーの査定実績"),
        ],
    },
    "kanagawa": {
        "name_ja": "神奈川県", "region": "関東", "population": "920万人",
        "cities": "横浜・川崎・湘南・横須賀・みなとみらい",
        "demand": "東京近接で買取需要が高く、富裕層居住地多数。横浜には専門店多数",
        "local_dealers": [
            ("LIQUORJOY（リカージョイ）", "神奈川県横浜市", "店頭・出張・宅配", "横浜のお酒買取専門店。マッカラン25年・響30年など高額品実績豊富"),
            ("福ちゃん 横浜", "神奈川県横浜市", "出張・宅配・店頭", "全国大手の横浜支店"),
            ("ルーディヤ 川崎", "神奈川県川崎市", "店頭・郵送", "京浜エリアで店頭買取対応"),
            ("バイセル 神奈川", "神奈川県全域", "出張・宅配", "東証上場の大手"),
        ],
    },
    "aichi": {
        "name_ja": "愛知県", "region": "中部", "population": "750万人",
        "cities": "名古屋・栄・金山・豊田・名駅",
        "demand": "中部最大市場。大手買取業者の支店多数。コレクター・トヨタ関連の富裕層需要も",
        "local_dealers": [
            ("JOYLAB 名古屋", "愛知県名古屋市", "出張・宅配・店頭", "全国店舗展開のウイスキー専門店"),
            ("福ちゃん 名古屋", "愛知県名古屋市", "出張・宅配・店頭", "大手で中部全域カバー"),
            ("大黒屋 名古屋", "愛知県名古屋市", "店頭・出張", "質屋系列で安心、即現金化"),
            ("ファイブニーズ 名古屋", "愛知県名古屋市", "出張・宅配", "10年以上の実績"),
        ],
    },
    "hokkaido": {
        "name_ja": "北海道", "region": "北海道", "population": "510万人",
        "cities": "札幌・旭川・函館・小樽・新千歳",
        "demand": "ニッカ余市蒸溜所所在地、ウイスキー文化が根付く。地酒・地ウイスキーも豊富",
        "local_dealers": [
            ("JOYLAB 札幌店", "北海道札幌市（中島公園駅近く）", "出張・宅配・店頭", "幅広い洋酒・古酒の高価買取"),
            ("ファイブニーズ 札幌店", "北海道札幌市", "出張・宅配", "10年以上の実績、全国15店舗展開"),
            ("ストックラボ 北海道", "北海道全域", "出張・宅配", "業界トップクラスのお酒買取実績"),
            ("大黒屋 質札幌店", "札幌駅/大通駅徒歩4分", "店頭・出張", "質屋系列で即現金化"),
        ],
    },
    "fukuoka": {
        "name_ja": "福岡県", "region": "九州", "population": "510万人",
        "cities": "博多・天神・小倉・久留米・北九州",
        "demand": "九州の中心都市で買取業者集中。インバウンド・地方コレクター需要",
        "local_dealers": [
            ("蔵zou（くらぞう）", "福岡県内・博多・北九州・久留米・行橋", "出張・店頭", "響30年 50万円〜の高額査定実績"),
            ("OKURA 福岡中洲店", "福岡県福岡市", "店頭・出張", "ウイスキー大量在庫の出張対応実績"),
            ("JOYLAB 福岡", "福岡県内", "出張・宅配", "全国対応の大手専門店"),
            ("DEゴザル 福岡", "福岡県内", "出張・宅配", "ウイスキー特化キャンペーン"),
        ],
    },
}

# 銘柄詳細データ（SERP情報反映）
BRANDS = {
    "yamazaki-18": {
        "name_ja": "山崎18年",
        "ref_price": 230000,
        "real_market_range": "85,000円〜130,000円（2025年8月時点・状態により変動）",
        "category": "ジャパニーズウイスキー",
        "rarity": "high",
        "hero": "/images/heroes/yamazaki-18.png",
        "recent_news": "2026年4月1日出荷分からメーカー希望小売価格が55,000円→61,000円へ値上げ。中古相場も連動して上昇傾向。",
        "price_factors": "未開封品が最も高額、開封済みや箱なしは大幅減額。付属品（外箱・内箱・冊子）が揃っていると更に高額査定が期待できる。",
    },
    "hibiki-30": {
        "name_ja": "響30年",
        "ref_price": 1100000,
        "real_market_range": "60万円〜80万円（プレミア相場、状態・年代により変動）",
        "category": "ジャパニーズウイスキー",
        "rarity": "ultra",
        "hero": "/images/heroes/hibiki-30.png",
        "recent_news": "年間2,000本限定の超希少銘柄。2007年以前の旧パッケージ（金色フタの旧箱付き）は更に高額。メーカー希望小売価格は360,000円。",
        "price_factors": "2007年以前の旧ボトル（金色フタの旧箱付き）は現行品の1.5〜2倍。アニバーサリーシリーズや限定品はさらにプレミア。",
    },
    "macallan-25": {
        "name_ja": "マッカラン25年",
        "ref_price": 400000,
        "real_market_range": "30万円〜45万円（アニバーサリーシリーズはさらに高値）",
        "category": "スコッチウイスキー",
        "rarity": "high",
        "hero": "/images/heroes/macallan-25.png",
        "recent_news": "最低25年以上熟成のシェリー樽原酒のみ使用。アニバーサリーモルトは特にコレクター需要が高い。",
        "price_factors": "木箱まで揃った状態・アニバーサリーシリーズ・保存状態の良い個体は高値。製造年代・ラベルデザインも査定に影響。",
    },
    "karuizawa-12": {
        "name_ja": "軽井沢12年",
        "ref_price": 1500000,
        "real_market_range": "100万円〜200万円（閉鎖蒸溜所プレミア）",
        "category": "ジャパニーズウイスキー",
        "rarity": "ultra-rare",
        "hero": "/images/heroes/karuizawa-12.png",
        "recent_news": "軽井沢蒸溜所は2011年に閉鎖、現存ボトルのみが市場に残るため希少性極高。海外オークションでも高値落札相次ぐ。",
        "price_factors": "閉鎖蒸溜所のため在庫が増えることはない。年代・カスクナンバー・ボトリングタイミングで価格が大きく変動。",
    },
}

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
    title = f"【2026年最新】{p['name_ja']}で{b['name_ja']}を高く売る｜買取相場 {b['real_market_range']}・出張対応業者比較"
    description = f"{p['name_ja']}（{p['cities']}）で{b['name_ja']}を売却するなら？最新買取相場 {b['real_market_range']}、{p['region']}地方の地元業者と全国業者を徹底比較。{b['recent_news']}"
    h1 = f"{p['name_ja']}で{b['name_ja']}を高く売る完全ガイド"

    # Real shops + national dealers
    local_dealer_rows = "".join(
        f"<tr><td><strong>{d[0]}</strong></td><td>{d[1]}</td><td>{d[2]}</td><td>{d[3]}</td></tr>"
        for d in p["local_dealers"]
    )

    faq = [
        (f"{p['name_ja']}で{b['name_ja']}は出張買取してもらえますか？", f"はい。{p['name_ja']}は{p['region']}地方の中核エリアであり、主要な買取専門業者（{', '.join(d[0] for d in p['local_dealers'][:3])}など）が出張買取対応エリアにしています。{p['cities']}の主要駅近郊なら最短即日対応も可能です。"),
        (f"{p['name_ja']}の{b['name_ja']}買取相場は他県と差がありますか？", f"基本的な相場は全国共通で、現在の市場相場は<strong>{b['real_market_range']}</strong>です。ただし{p['region']}地方は業者間競争があるため**相見積もりで高値が出やすい**傾向です。{p['name_ja']}には地域密着業者と全国大手の両方があり、比較しやすい環境です。"),
        (f"{p['name_ja']}の店頭買取で{b['name_ja']}は売れますか？", f"はい、{p['cities']}を中心に専門店・お酒買取店で店頭買取可能です。{b['name_ja']}は高額銘柄のため、事前予約・専門査定士の同行を推奨します。"),
        (f"{b['name_ja']}の最新相場の動向は？", f"{b['recent_news']}そのため、{p['name_ja']}での買取相場も連動して動いています。直近の市場動向を踏まえると、売却タイミングは慎重に判断しましょう。"),
    ]
    faq_json = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a.replace('<strong>', '').replace('</strong>', '').replace('**', '')}}
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
import Image from "next/image";
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

        <div className="article-hero mb-8">
          <Image src="{b['hero']}" alt="{b['name_ja']}のヒーロー画像" width={{1408}} height={{768}} className="w-full h-[240px] md:h-[300px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

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
          <p>そのため{b['name_ja']}のような高額ウイスキー銘柄の二次流通も活発で、複数の買取業者が出張・店頭・宅配で対応しています。{p['name_ja']}には**地域密着の専門業者**と**全国対応の大手**の両方があるため、比較しやすく相見積もりで高値を引き出しやすい環境です。</p>

          <h2>2. {b['name_ja']}の最新買取相場（2026年5月）</h2>
          <p>{b['name_ja']}の現在の市場相場は<strong>{b['real_market_range']}</strong>です。{b['price_factors']}</p>
          <ul>
            <li><strong>未開封・箱付き（最高額）</strong>: 約{b['ref_price']:,}円 ±10%</li>
            <li><strong>未開封・箱なし</strong>: 約{int(b['ref_price']*0.75):,}円（-25%）</li>
            <li><strong>開封済み（残量9割以上）</strong>: 約{int(b['ref_price']*0.40):,}円（-60%）</li>
            <li><strong>付属品完備（冊子・カートン含む）</strong>: 上記から+10〜20%</li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber/60 p-4 my-5 not-prose">
            <p className="text-sm font-bold text-ink mb-1">📢 最新ニュース</p>
            <p className="text-sm text-warm-gray">{b['recent_news']}</p>
          </div>

          <h2>3. {p['name_ja']}の地元・対応買取業者</h2>
          <p>{p['name_ja']}で{b['name_ja']}を売却する際の主要業者を紹介します。**地域密着の専門業者**から**全国対応の大手**まで、状況に合わせて選びましょう。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>業者</th><th>所在地・対応エリア</th><th>方式</th><th>特徴</th></tr></thead>
              <tbody>{local_dealer_rows}</tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※各業者の対応状況は変動する場合があります。事前に公式サイトで確認するか、複数業者へ同時に査定依頼を出すのがおすすめです。</p>

          <h2>4. 全国対応のおすすめ業者</h2>
          <p>地元業者と並行して、以下の全国対応業者でも見積もりを取ることで、最高値を引き出しやすくなります:</p>
          <ul>
            <li><strong>バイセル</strong>: 東証上場の大手、出張買取・宅配買取に対応</li>
            <li><strong>JOYLAB</strong>: ウイスキー専門査定、全国店舗展開</li>
            <li><strong>福ちゃん</strong>: 全国12店舗展開、大手で安心</li>
            <li><strong>リンクサス（LINXAS）</strong>: お酒高価買取の専門業者</li>
            <li><strong>大黒屋</strong>: 質屋系列で安心、即現金化</li>
          </ul>

          <h2>5. {p['name_ja']}で{b['name_ja']}を高く売る5つのコツ</h2>
          <ol>
            <li><strong>複数業者で相見積もり</strong>: 最低3社、できれば5社（地元業者+全国業者）の見積もりで最高値を選ぶ</li>
            <li><strong>付属品を揃える</strong>: 外箱・冊子・カートン・保証書を揃えて査定額10〜20%アップ</li>
            <li><strong>{p['region']}地方の需要期に売る</strong>: 年末年始・お中元・お歳暮シーズン、新生活前の3月</li>
            <li><strong>地域密着業者と全国業者を比較</strong>: {p['name_ja']}の地元業者は専門知識・足の早さ、全国業者は競争力ある提示が強み</li>
            <li><strong>出張買取の場合は事前予約</strong>: 高額銘柄は専門査定士の同行を依頼</li>
          </ol>

          <h2>6. {p['name_ja']}の{b['name_ja']}買取で注意すべき点</h2>
          <ul>
            <li><strong>身分証必須</strong>: 古物営業法により本人確認が必要（運転免許証・マイナンバーカード等）</li>
            <li><strong>未成年（18歳未満）は売却不可</strong>: 親権者の同意も不可</li>
            <li><strong>偽物・贋作リスク</strong>: {b['name_ja']}は高額銘柄のため、専門査定士の鑑定推奨</li>
            <li><strong>輸送リスク</strong>: 宅配買取の場合、緩衝材を十分に</li>
            <li><strong>業者の評判確認</strong>: クチコミ・Googleレビュー・実績件数を事前にチェック</li>
          </ul>

          <h2>7. よくある質問</h2>
          {"".join(f'''<details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>{q}</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{{{ __html: {json.dumps(a)} }}}} />
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
    print(f"Generating {len(SAMPLES)} Tier 2 v2 sample pages (SERP-enhanced)...")
    for pref, brand in SAMPLES:
        out_dir = ARTICLES_DIR / pref / f"{brand}-kaitori"
        out_dir.mkdir(parents=True, exist_ok=True)
        (out_dir / "page.tsx").write_text(build_page(pref, brand), encoding="utf-8")
        print(f"  ✅ /tier2/{pref}/{brand}-kaitori/")
    print(f"\n✅ Done. {len(SAMPLES)} pages with SERP-enhanced content.")


if __name__ == "__main__":
    main()
