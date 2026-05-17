import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PriceHistoryCard from "@/components/PriceHistoryCard";
import priceData from "@/data/price-history/chichibu-the-first.json";

export const metadata: Metadata = {
  title: "【2026年最新】宮崎県で秩父ザファーストを高く売る｜買取相場・出張対応業者比較",
  description: "宮崎県（宮崎・都城・延岡・日向）で秩父ザファーストを売却するなら？最新買取相場 約3,500,000円、九州地方の地元業者と全国業者を徹底比較。",
  robots: { index: true, follow: true },
};

function Schema() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"\u5bae\u5d0e\u770c\u3067\u79e9\u7236\u30b6\u30d5\u30a1\u30fc\u30b9\u30c8\u306f\u51fa\u5f35\u8cb7\u53d6\u3057\u3066\u3082\u3089\u3048\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u306f\u3044\u3002\u5bae\u5d0e\u770c\uff08\u5bae\u5d0e\u30fb\u90fd\u57ce\u30fb\u5ef6\u5ca1\u30fb\u65e5\u5411\uff09\u306f\u4e5d\u5dde\u5730\u65b9\u306e\u4e2d\u6838\u30a8\u30ea\u30a2\u3067\u3001\u30d0\u30a4\u30bb\u30eb \u5bae\u5d0e, \u798f\u3061\u3083\u3093 \u5bae\u5d0e, \u30ea\u30b5\u30a4\u30af\u30eb\u30de\u30fc\u30c8\u5bae\u5d0e\u306a\u3069\u4e3b\u8981\u696d\u8005\u304c\u51fa\u5f35\u8cb7\u53d6\u5bfe\u5fdc\u30a8\u30ea\u30a2\u306b\u3057\u3066\u3044\u307e\u3059\u3002\u6700\u77ed\u5373\u65e5\u5bfe\u5fdc\u3082\u53ef\u80fd\u3067\u3059\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u5bae\u5d0e\u770c\u306e\u79e9\u7236\u30b6\u30d5\u30a1\u30fc\u30b9\u30c8\u8cb7\u53d6\u76f8\u5834\u306f\u4ed6\u770c\u3068\u5dee\u304c\u3042\u308a\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u57fa\u672c\u76f8\u5834\u306f\u5168\u56fd\u5171\u901a\u3067\u3059\u304c\u3001\u4e5d\u5dde\u5730\u65b9\u306f\u696d\u8005\u9593\u7af6\u4e89\u304c\u3042\u308b\u305f\u3081\u76f8\u898b\u7a4d\u3082\u308a\u3067\u9ad8\u5024\u304c\u51fa\u3084\u3059\u3044\u50be\u5411\u3067\u3059\u3002\u79e9\u7236\u30b6\u30d5\u30a1\u30fc\u30b9\u30c8\u306f\u73fe\u5728\u7d043,500,000\u5186\u304c\u76ee\u5b89\u3067\u3059\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u5bae\u5d0e\u770c\u306e\u5e97\u982d\u8cb7\u53d6\u3067\u79e9\u7236\u30b6\u30d5\u30a1\u30fc\u30b9\u30c8\u306f\u58f2\u308c\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u306f\u3044\u3001\u5bae\u5d0e\u30fb\u90fd\u57ce\u30fb\u5ef6\u5ca1\u30fb\u65e5\u5411\u3092\u4e2d\u5fc3\u306b\u5c02\u9580\u5e97\u30fb\u304a\u9152\u8cb7\u53d6\u5e97\u3067\u5e97\u982d\u8cb7\u53d6\u53ef\u80fd\u3067\u3059\u3002\u79e9\u7236\u30b6\u30d5\u30a1\u30fc\u30b9\u30c8\u306fultra-rare\u30af\u30e9\u30b9\u306e\u9298\u67c4\u306e\u305f\u3081\u3001\u4e8b\u524d\u4e88\u7d04\u30fb\u5c02\u9580\u67fb\u5b9a\u58eb\u306e\u540c\u884c\u3092\u63a8\u5968\u3057\u307e\u3059\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u79e9\u7236\u30b6\u30d5\u30a1\u30fc\u30b9\u30c8\u3092\u5bae\u5d0e\u770c\u3067\u58f2\u308b\u30d9\u30b9\u30c8\u30bf\u30a4\u30df\u30f3\u30b0\u306f\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u5e74\u672b\u5e74\u59cb\u30fb\u304a\u4e2d\u5143\u30b7\u30fc\u30ba\u30f3\uff0811\u301c12\u6708\u30016\u301c7\u6708\uff09\u304c\u9ad8\u5024\u50be\u5411\u3002\u4e5d\u5dde\u5730\u65b9\u306e\u696d\u8005\u306f\u9700\u8981\u671f\u306b\u67fb\u5b9a\u984d\u304c10\u301c15%\u4e0a\u6607\u3059\u308b\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u65e9\u3081\u306e\u76f8\u898b\u7a4d\u3082\u308a\u63a8\u5968\u3002\"}}]}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u79e9\u7236\u30b6\u30d5\u30a1\u30fc\u30b9\u30c8\u8cb7\u53d6\u76f8\u5834\u30fb\u696d\u8005\u6bd4\u8f03\u3010\u5bae\u5d0e\u770c\u6700\u65b0\u7248\u3011\", \"datePublished\": \"2026-05-17\", \"dateModified\": \"2026-05-17\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Service\", \"areaServed\": {\"@type\": \"AdministrativeArea\", \"name\": \"\u5bae\u5d0e\u770c\"}, \"serviceType\": \"\u30a6\u30a4\u30b9\u30ad\u30fc\u8cb7\u53d6\", \"provider\": {\"@type\": \"Organization\", \"name\": \"PeatBid\"}}" }} />
    </>
  );
}

export default function Page() {
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
            <li><span className="text-foreground">宮崎県×秩父ザファースト</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/chichibu-the-first.png" alt="秩父ザファーストの買取相場 宮崎県" width={1408} height={768} className="w-full h-[240px] md:h-[300px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <div className="flex flex-wrap gap-2 mb-3 not-prose">
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">九州・宮崎県</span>
            <span className="bg-burgundy/15 text-burgundy text-xs font-bold px-3 py-1 rounded-full">japanese-whisky</span>
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">2026年最新</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">秩父ザファースト買取相場・業者比較【宮崎県最新版】</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-05-17 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <PriceHistoryCard data={priceData as Parameters<typeof PriceHistoryCard>[0]["data"]} />

          <h2>1. 宮崎県における秩父ザファーストの市場概況</h2>
          <p>秩父ザファーストの買取を宮崎県で検討中の方へ。108万人が居住する宮崎県（宮崎・都城・延岡・日向）には、地域密着業者と全国大手の両方が出張・店頭で対応しており、相見積もりで高値が出やすい環境です。</p>
          <p>九州南東部、宮崎市を中心に買取需要。そのため秩父ザファーストのようなjapanese-whiskyカテゴリの銘柄も二次流通が活発で、複数の買取業者が出張・店頭・宅配で対応しています。</p>
          <p>宮崎県には<strong>地域密着の専門業者</strong>と<strong>全国対応の大手</strong>の両方があるため、比較しやすく相見積もりで高値を引き出しやすい環境です。</p>

          <h2>2. 秩父ザファーストの最新買取相場（2026年5月）</h2>
          <p>秩父ザファーストの現在の市場相場は<strong>約3,500,000円（未開封・箱付き）</strong>です。秩父蒸溜所の初リリース</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>状態</th><th>買取相場目安</th><th>備考</th></tr></thead>
              <tbody><tr><td>未開封・箱付き</td><td>約3,500,000円</td><td>最高額。コレクター需要層が買い</td></tr><tr><td>未開封・箱なし</td><td>約2,625,000円</td><td>箱がないと-25%程度減額</td></tr><tr><td>開封済み（残量9割以上）</td><td>約1,400,000円</td><td>残量9割以上で60%減程度</td></tr><tr><td>開封済み（残量半分）</td><td>約700,000円</td><td>半分以下は買取不可の業者も</td></tr></tbody>
            </table>
          </div>
          <p>※相場は2026年5月時点の参考値です。状態・付属品・買取業者により上下します。</p>

          <h2>3. 宮崎県の地元・対応買取業者</h2>
          <p>宮崎県で秩父ザファーストを売却する際の主要業者を紹介します。**地域密着の専門業者**から**全国対応の大手**まで、状況に合わせて選びましょう。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>業者</th><th>所在地・対応エリア</th><th>方式</th><th>特徴</th></tr></thead>
              <tbody><tr><td><strong>バイセル 宮崎</strong></td><td>宮崎県全域</td><td>宅配・出張</td><td>東証上場大手</td></tr><tr><td><strong>福ちゃん 宮崎</strong></td><td>宮崎県宮崎市</td><td>宅配・出張</td><td>全国大手</td></tr><tr><td><strong>リサイクルマート宮崎</strong></td><td>宮崎県宮崎市</td><td>店頭</td><td>地元密着</td></tr><tr><td><strong>JOYLAB 宅配</strong></td><td>全国対応</td><td>宅配</td><td>ウイスキー専門</td></tr></tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※対応状況は変動する場合があります。事前に公式サイトで確認するか、複数業者へ同時に査定依頼を出すのがおすすめです。</p>

          <h2>4. 全国対応のおすすめ業者</h2>
          <p>地元業者と並行して、以下の全国対応業者でも見積もりを取ることで、最高値を引き出しやすくなります:</p>
          <ul>
            <li><strong>バイセル</strong>: 東証上場の大手、出張買取・宅配買取に対応</li>
            <li><strong>JOYLAB</strong>: ウイスキー専門査定、全国店舗展開</li>
            <li><strong>福ちゃん</strong>: 全国12店舗展開、大手で安心</li>
            <li><strong>リンクサス（LINXAS）</strong>: お酒高価買取の専門業者</li>
            <li><strong>大黒屋</strong>: 質屋系列で安心、即現金化</li>
          </ul>

          <h2>5. 宮崎県で秩父ザファーストを高く売る5つのコツ</h2>
          <ol>
            <li><strong>複数業者で相見積もり</strong>: 最低3社、できれば5社（地元業者+全国業者）の見積もりで最高値を選ぶ</li>
            <li><strong>付属品を揃える</strong>: 外箱・冊子・カートン・保証書を揃えて査定額10〜20%アップ</li>
            <li><strong>九州地方の需要期に売る</strong>: 年末年始・お中元・お歳暮シーズン、新生活前の3月</li>
            <li><strong>地域密着業者と全国業者を比較</strong>: 宮崎県の地元業者は専門知識・足の早さ、全国業者は競争力ある提示が強み</li>
            <li><strong>出張買取の場合は事前予約</strong>: 秩父ザファーストはultra-rareクラスの銘柄のため、専門査定士の同行を依頼</li>
          </ol>

          <h2>6. 宮崎県の秩父ザファースト買取で注意すべき点</h2>
          <ul>
            <li><strong>身分証必須</strong>: 古物営業法により本人確認が必要（運転免許証・マイナンバーカード等）</li>
            <li><strong>未成年（18歳未満）は売却不可</strong>: 親権者の同意も不可</li>
            <li><strong>偽物・贋作リスク</strong>: 秩父ザファーストのような高額銘柄は、専門査定士の鑑定推奨</li>
            <li><strong>輸送リスク</strong>: 宅配買取の場合、緩衝材を十分に</li>
            <li><strong>業者の評判確認</strong>: クチコミ・Googleレビュー・実績件数を事前にチェック</li>
          </ul>

          <h2>7. よくある質問</h2>
          <details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>宮崎県で秩父ザファーストは出張買取してもらえますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u306f\u3044\u3002\u5bae\u5d0e\u770c\uff08\u5bae\u5d0e\u30fb\u90fd\u57ce\u30fb\u5ef6\u5ca1\u30fb\u65e5\u5411\uff09\u306f\u4e5d\u5dde\u5730\u65b9\u306e\u4e2d\u6838\u30a8\u30ea\u30a2\u3067\u3001\u30d0\u30a4\u30bb\u30eb \u5bae\u5d0e, \u798f\u3061\u3083\u3093 \u5bae\u5d0e, \u30ea\u30b5\u30a4\u30af\u30eb\u30de\u30fc\u30c8\u5bae\u5d0e\u306a\u3069\u4e3b\u8981\u696d\u8005\u304c\u51fa\u5f35\u8cb7\u53d6\u5bfe\u5fdc\u30a8\u30ea\u30a2\u306b\u3057\u3066\u3044\u307e\u3059\u3002\u6700\u77ed\u5373\u65e5\u5bfe\u5fdc\u3082\u53ef\u80fd\u3067\u3059\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>宮崎県の秩父ザファースト買取相場は他県と差がありますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u57fa\u672c\u76f8\u5834\u306f\u5168\u56fd\u5171\u901a\u3067\u3059\u304c\u3001\u4e5d\u5dde\u5730\u65b9\u306f\u696d\u8005\u9593\u7af6\u4e89\u304c\u3042\u308b\u305f\u3081**\u76f8\u898b\u7a4d\u3082\u308a\u3067\u9ad8\u5024\u304c\u51fa\u3084\u3059\u3044**\u50be\u5411\u3067\u3059\u3002\u79e9\u7236\u30b6\u30d5\u30a1\u30fc\u30b9\u30c8\u306f\u73fe\u5728\u7d04<strong>3,500,000\u5186</strong>\u304c\u76ee\u5b89\u3067\u3059\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>宮崎県の店頭買取で秩父ザファーストは売れますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u306f\u3044\u3001\u5bae\u5d0e\u30fb\u90fd\u57ce\u30fb\u5ef6\u5ca1\u30fb\u65e5\u5411\u3092\u4e2d\u5fc3\u306b\u5c02\u9580\u5e97\u30fb\u304a\u9152\u8cb7\u53d6\u5e97\u3067\u5e97\u982d\u8cb7\u53d6\u53ef\u80fd\u3067\u3059\u3002\u79e9\u7236\u30b6\u30d5\u30a1\u30fc\u30b9\u30c8\u306fultra-rare\u30af\u30e9\u30b9\u306e\u9298\u67c4\u306e\u305f\u3081\u3001\u4e8b\u524d\u4e88\u7d04\u30fb\u5c02\u9580\u67fb\u5b9a\u58eb\u306e\u540c\u884c\u3092\u63a8\u5968\u3057\u307e\u3059\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>秩父ザファーストを宮崎県で売るベストタイミングは？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u5e74\u672b\u5e74\u59cb\u30fb\u304a\u4e2d\u5143\u30b7\u30fc\u30ba\u30f3\uff0811\u301c12\u6708\u30016\u301c7\u6708\uff09\u304c\u9ad8\u5024\u50be\u5411\u3002\u4e5d\u5dde\u5730\u65b9\u306e\u696d\u8005\u306f\u9700\u8981\u671f\u306b\u67fb\u5b9a\u984d\u304c10\u301c15%\u4e0a\u6607\u3059\u308b\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u65e9\u3081\u306e\u76f8\u898b\u7a4d\u3082\u308a\u63a8\u5968\u3002" }} />
          </details>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">📚 関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/chichibu-the-first-kaitori/" className="text-amber-dark hover:text-burgundy underline">秩父ザファーストの買取相場（全国版）</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
