import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/miyagikyo-nv.json";

export const metadata: Metadata = {
  title: "【2026年最新】山形県で宮城峡ノンエイジを売る｜業者比較・買取査定ガイド",
  description: "山形県（山形・米沢・天童・酒田）で宮城峡ノンエイジを売却するなら？東北地方の地元業者と4業者参考リンクを掲載。市場相場は現在データ蓄積中で、確定額は各業者の最新査定でご確認ください。",
  alternates: { canonical: "https://peatbid.com/tier2/yamagata/miyagikyo-nv-kaitori/" },
  robots: { index: false, follow: false },
};

function Schema() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"\u5c71\u5f62\u770c\u3067\u5bae\u57ce\u5ce1\u30ce\u30f3\u30a8\u30a4\u30b8\u306f\u51fa\u5f35\u8cb7\u53d6\u3057\u3066\u3082\u3089\u3048\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u306f\u3044\u3002\u5c71\u5f62\u770c\uff08\u5c71\u5f62\u30fb\u7c73\u6ca2\u30fb\u5929\u7ae5\u30fb\u9152\u7530\uff09\u306f\u6771\u5317\u5730\u65b9\u306e\u4e2d\u6838\u30a8\u30ea\u30a2\u3067\u3001\u30d0\u30a4\u30bb\u30eb \u5c71\u5f62, \u798f\u3061\u3083\u3093 \u5c71\u5f62, \u8cb7\u53d6\u5c02\u9580\u5e97 \u5c71\u5f62\u306a\u3069\u4e3b\u8981\u696d\u8005\u304c\u51fa\u5f35\u8cb7\u53d6\u5bfe\u5fdc\u30a8\u30ea\u30a2\u306b\u3057\u3066\u3044\u307e\u3059\u3002\u6700\u77ed\u5373\u65e5\u5bfe\u5fdc\u3082\u53ef\u80fd\u3067\u3059\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u5c71\u5f62\u770c\u306e\u5bae\u57ce\u5ce1\u30ce\u30f3\u30a8\u30a4\u30b8\u5e02\u5834\u76f8\u5834\u306f\u4ed6\u770c\u3068\u5dee\u304c\u3042\u308a\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u5e02\u5834\u76f8\u5834\uff08Yahoo\u4e2d\u592e\u5024\uff09\u306f\u5168\u56fd\u5171\u901a\u3067\u3059\u304c\u3001\u696d\u8005\u8cb7\u53d6\u984d\u306f\u5730\u57df\u3084\u696d\u8005\u3067\u7570\u306a\u308a\u307e\u3059\u3002\u5bae\u57ce\u5ce1\u30ce\u30f3\u30a8\u30a4\u30b8\u306e\u73fe\u5728\u306e\u5e02\u5834\u76f8\u5834\u306f \u73fe\u5728\u96c6\u8a08\u4e2d\uff08Yahoo Auctions \u4e2d\u592e\u5024\uff09\u3002\u5b9f\u969b\u306e\u696d\u8005\u67fb\u5b9a\u306f LINXAS / \u30d0\u30a4\u30bb\u30eb / \u798f\u3061\u3083\u3093 / JOYLAB \u5404\u793e\u30da\u30fc\u30b8\u3067\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u5c71\u5f62\u770c\u306e\u5e97\u982d\u8cb7\u53d6\u3067\u5bae\u57ce\u5ce1\u30ce\u30f3\u30a8\u30a4\u30b8\u306f\u58f2\u308c\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u306f\u3044\u3001\u5c71\u5f62\u30fb\u7c73\u6ca2\u30fb\u5929\u7ae5\u30fb\u9152\u7530\u3092\u4e2d\u5fc3\u306b\u5c02\u9580\u5e97\u30fb\u304a\u9152\u8cb7\u53d6\u5e97\u3067\u5e97\u982d\u8cb7\u53d6\u53ef\u80fd\u3067\u3059\u3002\u5bae\u57ce\u5ce1\u30ce\u30f3\u30a8\u30a4\u30b8\u306fcommon\u30af\u30e9\u30b9\u306e\u9298\u67c4\u306e\u305f\u3081\u3001\u4e8b\u524d\u4e88\u7d04\u30fb\u5c02\u9580\u67fb\u5b9a\u58eb\u306e\u540c\u884c\u3092\u63a8\u5968\u3057\u307e\u3059\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u5bae\u57ce\u5ce1\u30ce\u30f3\u30a8\u30a4\u30b8\u3092\u5c71\u5f62\u770c\u3067\u58f2\u308b\u30d9\u30b9\u30c8\u30bf\u30a4\u30df\u30f3\u30b0\u306f\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u5e74\u672b\u5e74\u59cb\u30fb\u304a\u4e2d\u5143\u30b7\u30fc\u30ba\u30f3\uff0811\u301c12\u6708\u30016\u301c7\u6708\uff09\u304c\u9ad8\u5024\u50be\u5411\u3002\u6771\u5317\u5730\u65b9\u306e\u696d\u8005\u306f\u9700\u8981\u671f\u306b\u67fb\u5b9a\u984d\u304c10\u301c15%\u4e0a\u6607\u3059\u308b\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u65e9\u3081\u306e\u76f8\u898b\u7a4d\u3082\u308a\u63a8\u5968\u3002\"}}]}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u5bae\u57ce\u5ce1\u30ce\u30f3\u30a8\u30a4\u30b8\u3092\u5c71\u5f62\u770c\u3067\u58f2\u308b \u2014 \u696d\u8005\u9078\u3073\u3068\u76f8\u898b\u7a4d\u3082\u308a\u306e\u30b3\u30c4\", \"datePublished\": \"2026-05-19\", \"dateModified\": \"2026-05-25\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Service\", \"areaServed\": {\"@type\": \"AdministrativeArea\", \"name\": \"\u5c71\u5f62\u770c\"}, \"serviceType\": \"\u30a6\u30a4\u30b9\u30ad\u30fc\u8cb7\u53d6\u76f8\u5834\", \"provider\": {\"@type\": \"Organization\", \"name\": \"PeatBid\"}}" }} />
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
            <li><Link href="/articles/whisky-kaitori-souba/" className="hover:text-amber-dark transition-colors">市場相場</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">山形県×宮城峡ノンエイジ</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/miyagikyo-nv.png" alt="宮城峡ノンエイジの市場相場 山形県" width={1408} height={768} className="w-full h-[240px] md:h-[300px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <div className="flex flex-wrap gap-2 mb-3 not-prose">
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">東北・山形県</span>
            <span className="bg-burgundy/15 text-burgundy text-xs font-bold px-3 py-1 rounded-full">japanese-whisky</span>
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">2026年最新</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">宮城峡ノンエイジを山形県で売る — 業者選びと相見積もりのコツ</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-05-25 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          <h2>1. 山形県における宮城峡ノンエイジの市場概況</h2>
          <p>「山形県で宮城峡ノンエイジを売りたい」という方のためのガイドです。山形県は東北地方の中核（人口105万人、山形・米沢・天童・酒田が主要都市）で、ウイスキー専門業者・大手総合業者の両方が出張・店頭・宅配で対応しています。</p>
          <p>果樹・ワインの産地でもあり、洋酒文化が比較的根付いている。そのため宮城峡ノンエイジのようなjapanese-whiskyカテゴリの銘柄も二次流通が活発で、複数の買取業者が出張・店頭・宅配で対応しています。</p>
          <p>山形県には<strong>地域密着の専門業者</strong>と<strong>全国対応の大手</strong>の両方があるため、複数業者で見積もりを比較できる環境です。</p>

          <h2>2. 宮城峡ノンエイジの市場相場（Yahoo中央値）</h2>
          <p>宮城峡ノンエイジの市場相場は<strong>現在集計中</strong>です（現在、過去180日の落札データが20件に満たないため市場相場の中央値は集計できていません（取得日 2026-05-25、サンプル数 n=4））。ニッカ宮城峡。仙台ふもとの蒸溜所</p>
          <p>業者の買取査定額は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。</p>

          <h2>3. 状態別の業界目安（パーセンテージ）</h2>
          <p>市場相場（Yahoo中央値）を基準（100%）とした業界一般の目安です。実際の査定額は業者により異なるため、最終的な金額は各業者ページでご確認ください。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>状態</th><th>業界目安（市場相場対比）</th></tr></thead>
              <tbody><tr><td>未開封・完璧（箱・冊子揃い）</td><td>市場相場の95〜100%程度</td></tr><tr><td>未開封・箱なし</td><td>市場相場の80〜90%程度</td></tr><tr><td>未開封・ラベル軽度汚れ</td><td>市場相場の75〜88%程度</td></tr><tr><td>未開封・液面減少</td><td>市場相場の55〜70%程度</td></tr><tr><td>開封済み・9割以上残</td><td>市場相場の30〜40%程度</td></tr><tr><td>開封済み・半分以下残</td><td>市場相場の15〜25%程度</td></tr></tbody>
            </table>
          </div>

          <h2>4. 山形県で宮城峡ノンエイジを売る — 業者の選び方と査定取得先</h2>
          <p>山形県で宮城峡ノンエイジを売却する際の業者は大きく2タイプに分かれます。最高値を引き出すには、両方から相見積もりを取るのが鉄則です。</p>

          <h3 className="!mt-6">4-1. 山形県の地元・対応買取業者</h3>
          <p>東北地方を出張・店頭・宅配でカバーしている業者です。地域密着の専門知識と、足の早い対応が強み。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>業者</th><th>所在地・対応エリア</th><th>方式</th><th>特徴</th></tr></thead>
              <tbody><tr><td><strong>バイセル 山形</strong></td><td>山形県全域</td><td>出張・宅配</td><td>東証上場大手</td></tr><tr><td><strong>福ちゃん 山形</strong></td><td>山形県全域</td><td>出張・宅配</td><td>全国大手</td></tr><tr><td><strong>買取専門店 山形</strong></td><td>山形県山形市</td><td>店頭</td><td>地元密着</td></tr><tr><td><strong>JOYLAB 宅配</strong></td><td>全国対応</td><td>宅配</td><td>ウイスキー専門</td></tr></tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※対応状況は変動する場合があります。事前に公式サイトで確認するか、複数業者へ同時に査定依頼を出すのがおすすめです。</p>

          <h3 className="!mt-6">4-2. 全国対応の主要4業者（最新査定額の取得先）</h3>
          <p>本サイトでは買取額の固定値は提示せず、各業者の最新の査定額・キャンペーン情報を以下の公式ページから直接確認できます。地元業者と合わせて、最低 3〜5 社で相見積もりするのが推奨です。</p>
          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">バイセル</a> — 東証グロース上場、出張・店頭・宅配の3チャネル対応</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">福ちゃん</a> — 総合買取の大手、お酒査定にも対応</li>
            <li><a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">JOYLAB</a> — お酒買取専門、希少銘柄の鑑定査定に強み</li>
          </ul>

          <h2>5. 山形県で宮城峡ノンエイジを高く売る5つのコツ</h2>
          <ol>
            <li><strong>複数業者で相見積もり</strong>: 最低3社、できれば5社（地元業者+全国業者）の見積もりで最高値を選ぶ</li>
            <li><strong>付属品を揃える</strong>: 外箱・冊子・カートン・保証書を揃えて業界目安として10〜20%の差</li>
            <li><strong>東北地方の需要期に売る</strong>: 年末年始・お中元・お歳暮シーズン、新生活前の3月</li>
            <li><strong>地域密着業者と全国業者を比較</strong>: 山形県の地元業者は専門知識・足の早さ、全国業者は競争力ある提示が強み</li>
            <li><strong>出張買取の場合は事前予約</strong>: 宮城峡ノンエイジはcommonクラスの銘柄のため、専門査定士の同行を依頼</li>
          </ol>

          <h2>6. 山形県の宮城峡ノンエイジ買取で注意すべき点</h2>
          <ul>
            <li><strong>身分証必須</strong>: 古物営業法により本人確認が必要（運転免許証・マイナンバーカード等）</li>
            <li><strong>未成年（18歳未満）は売却不可</strong>: 親権者の同意も不可</li>
            <li><strong>偽物・贋作リスク</strong>: 宮城峡ノンエイジのような銘柄は、専門査定士の鑑定推奨</li>
            <li><strong>輸送リスク</strong>: 宅配買取の場合、緩衝材を十分に</li>
            <li><strong>業者の評判確認</strong>: クチコミ・Googleレビュー・実績件数を事前にチェック</li>
          </ul>

          <h2>7. よくある質問</h2>
          <details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>山形県で宮城峡ノンエイジは出張買取してもらえますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u306f\u3044\u3002\u5c71\u5f62\u770c\uff08\u5c71\u5f62\u30fb\u7c73\u6ca2\u30fb\u5929\u7ae5\u30fb\u9152\u7530\uff09\u306f\u6771\u5317\u5730\u65b9\u306e\u4e2d\u6838\u30a8\u30ea\u30a2\u3067\u3001\u30d0\u30a4\u30bb\u30eb \u5c71\u5f62, \u798f\u3061\u3083\u3093 \u5c71\u5f62, \u8cb7\u53d6\u5c02\u9580\u5e97 \u5c71\u5f62\u306a\u3069\u4e3b\u8981\u696d\u8005\u304c\u51fa\u5f35\u8cb7\u53d6\u5bfe\u5fdc\u30a8\u30ea\u30a2\u306b\u3057\u3066\u3044\u307e\u3059\u3002\u6700\u77ed\u5373\u65e5\u5bfe\u5fdc\u3082\u53ef\u80fd\u3067\u3059\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>山形県の宮城峡ノンエイジ市場相場は他県と差がありますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u5e02\u5834\u76f8\u5834\uff08Yahoo\u4e2d\u592e\u5024\uff09\u306f\u5168\u56fd\u5171\u901a\u3067\u3059\u304c\u3001\u696d\u8005\u8cb7\u53d6\u984d\u306f\u5730\u57df\u3084\u696d\u8005\u3067\u7570\u306a\u308a\u307e\u3059\u3002\u5bae\u57ce\u5ce1\u30ce\u30f3\u30a8\u30a4\u30b8\u306e\u73fe\u5728\u306e\u5e02\u5834\u76f8\u5834\u306f \u73fe\u5728\u96c6\u8a08\u4e2d\uff08Yahoo Auctions \u4e2d\u592e\u5024\uff09\u3002\u5b9f\u969b\u306e\u696d\u8005\u67fb\u5b9a\u306f LINXAS / \u30d0\u30a4\u30bb\u30eb / \u798f\u3061\u3083\u3093 / JOYLAB \u5404\u793e\u30da\u30fc\u30b8\u3067\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>山形県の店頭買取で宮城峡ノンエイジは売れますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u306f\u3044\u3001\u5c71\u5f62\u30fb\u7c73\u6ca2\u30fb\u5929\u7ae5\u30fb\u9152\u7530\u3092\u4e2d\u5fc3\u306b\u5c02\u9580\u5e97\u30fb\u304a\u9152\u8cb7\u53d6\u5e97\u3067\u5e97\u982d\u8cb7\u53d6\u53ef\u80fd\u3067\u3059\u3002\u5bae\u57ce\u5ce1\u30ce\u30f3\u30a8\u30a4\u30b8\u306fcommon\u30af\u30e9\u30b9\u306e\u9298\u67c4\u306e\u305f\u3081\u3001\u4e8b\u524d\u4e88\u7d04\u30fb\u5c02\u9580\u67fb\u5b9a\u58eb\u306e\u540c\u884c\u3092\u63a8\u5968\u3057\u307e\u3059\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>宮城峡ノンエイジを山形県で売るベストタイミングは？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u5e74\u672b\u5e74\u59cb\u30fb\u304a\u4e2d\u5143\u30b7\u30fc\u30ba\u30f3\uff0811\u301c12\u6708\u30016\u301c7\u6708\uff09\u304c\u9ad8\u5024\u50be\u5411\u3002\u6771\u5317\u5730\u65b9\u306e\u696d\u8005\u306f\u9700\u8981\u671f\u306b\u67fb\u5b9a\u984d\u304c10\u301c15%\u4e0a\u6607\u3059\u308b\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u65e9\u3081\u306e\u76f8\u898b\u7a4d\u3082\u308a\u63a8\u5968\u3002" }} />
          </details>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">📚 関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/miyagikyo-nv-kaitori/" className="text-amber-dark hover:text-burgundy underline">宮城峡ノンエイジの市場相場（全国版）</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー市場相場一覧</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
            </ul>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-05-25）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。本ページは noindex 設定（検索エンジン非収録）です。</p>
        </article>
      </div>
    </>
  );
}
