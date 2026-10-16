import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/hakushu-12.json";

export const metadata: Metadata = {
  title: "【2026年最新】沖縄県で白州12年を売る｜市場相場(Yahoo中央値)¥20,400・業者比較",
  description: "沖縄県（那覇・浦添・宜野湾・沖縄市・うるま）で白州12年を売却するなら？市場相場 ¥20,400（Yahoo Auctions 過去180日中央値）、九州地方の地元業者と3業者参考リンクを掲載。",
  alternates: { canonical: "https://peatbid.com/tier2/okinawa/hakushu-12-kaitori/" },
  openGraph: { type: "website", siteName: "PeatBid", locale: "ja_JP", url: "https://peatbid.com/tier2/okinawa/hakushu-12-kaitori/", images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

function Schema() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"\u6c96\u7e04\u770c\u3067\u767d\u5dde12\u5e74\u306f\u51fa\u5f35\u8cb7\u53d6\u3057\u3066\u3082\u3089\u3048\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u306f\u3044\u3002\u6c96\u7e04\u770c\uff08\u90a3\u8987\u30fb\u6d66\u6dfb\u30fb\u5b9c\u91ce\u6e7e\u30fb\u6c96\u7e04\u5e02\u30fb\u3046\u308b\u307e\uff09\u306f\u4e5d\u5dde\u5730\u65b9\u306e\u4e2d\u6838\u30a8\u30ea\u30a2\u3067\u3059\u3002\u63b2\u8f09\u3057\u3066\u3044\u308b\u30d0\u30a4\u30bb\u30eb\u306f\u51fa\u5f35\u8cb7\u53d6\u3092\u300c\u96e2\u5cf6\u3092\u9664\u304f\u65e5\u672c\u5168\u56fd\u300d\u3067\u53d7\u3051\u4ed8\u3051\u3066\u304a\u308a\u3001\u7533\u8fbc\u304b\u3089\u6700\u77ed\u5373\u65e5\u306e\u8a2a\u554f\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u3059\uff08\u516c\u5f0f\u30b5\u30a4\u30c8\u30fb2026\u5e7410\u670816\u65e5\u78ba\u8a8d\uff09\u3002\u798f\u3061\u3083\u3093\u3082\u51fa\u5f35\u8cb7\u53d6\u3092\u884c\u3063\u3066\u3044\u307e\u3059\u304c\u3001\u5bfe\u5fdc\u30a8\u30ea\u30a2\u306f\u516c\u5f0f\u30b5\u30a4\u30c8\u306b\u8a18\u8f09\u304c\u306a\u3044\u305f\u3081\u3001\u7533\u8fbc\u6642\u306b\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u6c96\u7e04\u770c\u306e\u767d\u5dde12\u5e74\u5e02\u5834\u76f8\u5834\u306f\u4ed6\u770c\u3068\u5dee\u304c\u3042\u308a\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u5e02\u5834\u76f8\u5834\uff08Yahoo\u4e2d\u592e\u5024\uff09\u306f\u5168\u56fd\u5171\u901a\u3067\u3059\u304c\u3001\u696d\u8005\u8cb7\u53d6\u984d\u306f\u5730\u57df\u3084\u696d\u8005\u3067\u7570\u306a\u308a\u307e\u3059\u3002\u767d\u5dde12\u5e74\u306e\u73fe\u5728\u306e\u5e02\u5834\u76f8\u5834\u306f \u00a520,400\uff08Yahoo Auctions \u4e2d\u592e\u5024\uff09\u3067\u3059\u3002\u5b9f\u969b\u306e\u696d\u8005\u306e\u67fb\u5b9a\u984d\u306f\u3001LINXAS / \u30d0\u30a4\u30bb\u30eb / \u798f\u3061\u3083\u3093 \u306e\u5404\u793e\u30da\u30fc\u30b8\u3067\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u6c96\u7e04\u770c\u306e\u5e97\u982d\u8cb7\u53d6\u3067\u767d\u5dde12\u5e74\u306f\u58f2\u308c\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u306f\u3044\u3001\u90a3\u8987\u30fb\u6d66\u6dfb\u30fb\u5b9c\u91ce\u6e7e\u30fb\u6c96\u7e04\u5e02\u30fb\u3046\u308b\u307e\u3092\u4e2d\u5fc3\u306b\u3001\u5c02\u9580\u5e97\u30fb\u304a\u9152\u306e\u8cb7\u53d6\u5e97\u3067\u5e97\u982d\u8cb7\u53d6\u3092\u53d7\u3051\u3089\u308c\u307e\u3059\u3002\u9ad8\u984d\u306a\u30dc\u30c8\u30eb\u306e\u5834\u5408\u306f\u3001\u4e8b\u524d\u4e88\u7d04\u306e\u3046\u3048\u3001\u5c02\u9580\u306e\u67fb\u5b9a\u58eb\u306b\u3088\u308b\u67fb\u5b9a\u3092\u53d7\u3051\u308b\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u767d\u5dde12\u5e74\u3092\u6c96\u7e04\u770c\u3067\u58f2\u308b\u6642\u671f\u306f\u3044\u3064\u304c\u3088\u3044\u3067\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u5e74\u672b\u5e74\u59cb\u30fb\u304a\u4e2d\u5143\u306e\u6642\u671f\uff0811\u301c12\u6708\u30016\u301c7\u6708\uff09\u306f\u9ad8\u5024\u306e\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u4e5d\u5dde\u5730\u65b9\u306e\u696d\u8005\u306f\u3001\u9700\u8981\u671f\u306b\u67fb\u5b9a\u984d\u304c10\u301c15%\u4e0a\u6607\u3059\u308b\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u65e9\u3081\u306b\u76f8\u898b\u7a4d\u3082\u308a\u3092\u53d6\u308b\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002\"}}]}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u6c96\u7e04\u770c\u5bfe\u5fdc|\u767d\u5dde12\u5e74\u306e\u8cb7\u53d6\u67fb\u5b9a\u30fb\u5e02\u5834\u76f8\u5834\u3068\u696d\u8005\u9078\u5b9a\", \"datePublished\": \"2026-05-19\", \"dateModified\": \"2026-10-12\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Service\", \"areaServed\": {\"@type\": \"AdministrativeArea\", \"name\": \"\u6c96\u7e04\u770c\"}, \"serviceType\": \"\u30a6\u30a4\u30b9\u30ad\u30fc\u8cb7\u53d6\u76f8\u5834\", \"provider\": {\"@type\": \"Organization\", \"name\": \"PeatBid\"}}" }} />
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
            <li><Link href="/tier2/" className="hover:text-amber-dark transition-colors">地域別買取</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/tier2/okinawa/" className="hover:text-amber-dark transition-colors">沖縄県</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">白州12年</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/hakushu-12.png" alt="白州12年の市場相場 沖縄県" width={1408} height={768} className="w-full h-[240px] md:h-[300px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <div className="flex flex-wrap gap-2 mb-3 not-prose">
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">九州・沖縄県</span>
            <span className="bg-burgundy/15 text-burgundy text-xs font-bold px-3 py-1 rounded-full">ジャパニーズウイスキー</span>
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">2026年版</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">沖縄県対応|白州12年の買取査定・市場相場と業者選定</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-12 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          <h2>1. 沖縄県における白州12年の市場概況</h2>
          <p>沖縄県で白州12年の査定・売却を検討している方向けのガイドです。沖縄県は1人あたり県民所得 240万円・県内総生産 約4.5兆円 の経済圏で、ウイスキー専門業者と大手総合業者の両方が出張・店頭・宅配で対応しています。本ページでは、市場相場（Yahoo中央値）と3業者への参考リンクを掲載しています。</p>
          <p><strong>地域の市場の特徴</strong>: 観光地・米軍関連で洋酒文化が独特に発達</p>
          <p>白州12年のような銘柄は二次流通が活発で、複数の買取業者が出張・店頭・宅配で対応しています。</p>
          <p>沖縄県には<strong>地域密着の専門業者</strong>と<strong>全国対応の大手</strong>の両方があるため、複数の業者で見積もりを比較できます。</p>

          <h2>2. 白州12年の市場相場（Yahoo中央値）</h2>
          <p>白州12年の市場相場は<strong>¥20,400</strong>です（¥20,400（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=232、取得日 2026-10-12））。白州12年。終売後高騰中</p>
          <p>業者の買取査定額は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。</p>

          <h3 className="!mt-6">2-1. 白州12年の基本プロフィール（公式情報）</h3>
          <div className="table-wrapper not-prose">
            <table className="text-sm">
              <tbody>
                <tr><th className="text-left bg-cream/30 px-3 py-2">流通ステータス</th><td className="px-3 py-2">現行品（出荷再開、品薄継続）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">国内発売年</th><td className="px-3 py-2">1994年</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">後継品</th><td className="px-3 py-2">なし（同銘柄継続。2018年一時休売→出荷再開）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">テイスティング特徴</th><td className="px-3 py-2">ミント、青リンゴ、爽やかなピート香。森のフレッシュさと熟成由来の柔らかい甘み、心地よいスモーキーフィニッシュ</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">コレクション価値</th><td className="px-3 py-2">2018年休売報道後にプレミア化。再開後も流通量限定で定価入手困難</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">海外オークション直近</th><td className="px-3 py-2">£100〜£200帯 (2026 Q1〜Q2, Whisky.Auction)</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">公式情報</th><td className="px-3 py-2"><a href="https://www.suntory.co.jp/whisky/hakushu/lineup/hakushu12y/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">https://www.suntory.co.jp/whisky/hakushu/lineup/hakushu12y/</a></td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※流通ステータスや後継品の情報は、2026年5月時点の公式情報にもとづきます。海外オークションの直近の落札は参照時点のものです。最新の市況は、各オークションの公式サイトでご確認ください。</p>

          <h2>3. 状態別の業界目安（パーセンテージ）</h2>
          <p>市場相場（Yahoo中央値）を基準（100%）とした業界一般の目安です。実際の査定額は業者により異なるため、最終的な金額は各業者ページでご確認ください。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>状態</th><th>業界目安（市場相場対比）</th></tr></thead>
              <tbody><tr><td>未開封・完璧（箱・冊子揃い）</td><td>市場相場の95〜100%程度</td></tr><tr><td>未開封・箱なし</td><td>市場相場の80〜90%程度</td></tr><tr><td>未開封・ラベル軽度汚れ</td><td>市場相場の75〜88%程度</td></tr><tr><td>未開封・液面減少</td><td>市場相場の55〜70%程度</td></tr><tr><td>開封済み・9割以上残</td><td>市場相場の30〜40%程度</td></tr><tr><td>開封済み・半分以下残</td><td>市場相場の15〜25%程度</td></tr></tbody>
            </table>
          </div>

          <h2>4. 沖縄県のウイスキー買取市場の特性（経済データ）</h2>
          <p>沖縄県は九州地方に位置し、人口145万人・61万世帯の地域です。ウイスキーの二次流通に関係する公的統計データは、以下のとおりです。</p>
          <div className="table-wrapper not-prose">
            <table className="text-sm">
              <tbody>
                <tr><th className="text-left bg-cream/30 px-3 py-2">県内総生産</th><td className="px-3 py-2">約4.5兆円（内閣府 県民経済計算 R3年度）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">1人あたり県民所得</th><td className="px-3 py-2">240万円（内閣府 R3年度確報）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">酒類消費量ランク</th><td className="px-3 py-2">全国46位前後（泡盛文化が強くウイスキー消費は限定的）（国税庁 酒のしおり R5年版）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">酒類小売業免許場数</th><td className="px-3 py-2">約1,100店（国税庁 R4年3月末）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">気候特性</th><td className="px-3 py-2">亜熱帯海洋性／年中高温多湿、台風常襲、塩害多い、ウイスキー保管は徹底空調必須（気象庁 気候区分）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">主要産業</th><td className="px-3 py-2">観光(リゾート/インバウンド)・米軍基地関連・泡盛醸造・農業(さとうきび/パイン)・IT・物流</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">主要駅・路線</th><td className="px-3 py-2">那覇空港駅(沖縄都市モノレール ゆいレール)・県庁前駅(ゆいレール)・首里駅(ゆいレール)・てだこ浦西駅(ゆいレール)</td></tr>
              </tbody>
            </table>
          </div>
          <p>経済規模・所得水準・酒類消費の動向は、ウイスキーの二次流通市場の活発さを示す指標の一つです。沖縄県の酒類消費は<strong>全国46位前後（泡盛文化が強くウイスキー消費は限定的）</strong>、主要産業は<strong>観光(リゾート/インバウンド)・米軍基地関連・泡盛醸造・農業(さとうきび/パイン)・IT・物流</strong>です。</p>

          <h2>5. 沖縄県で白州12年を売る — 業者の選び方と査定取得先</h2>
          <p>沖縄県で白州12年を売却する際の業者は、大きく2つのタイプに分かれます。両方のタイプから相見積もりを取ることをおすすめします。</p>

          <h3 className="!mt-6">5-1. 沖縄県の地元・対応買取業者</h3>
          <p>九州地方で出張・店頭・宅配に対応している業者です。地域に密着した専門知識と、迅速な対応が強みです。那覇空港駅(沖縄都市モノレール ゆいレール)・県庁前駅(ゆいレール)・首里駅(ゆいレール)・てだこ浦西駅(ゆいレール)周辺にも対応している場合が多くあります。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>業者</th><th>所在地・対応エリア</th><th>方式</th><th>特徴</th></tr></thead>
              <tbody><tr><td><strong>バイセル 沖縄</strong></td><td>沖縄県全域</td><td>宅配・出張</td><td>東証上場大手</td></tr><tr><td><strong>福ちゃん 那覇</strong></td><td>沖縄県那覇市</td><td>宅配・出張</td><td>全国大手</td></tr><tr><td><strong>リサイクルマート那覇</strong></td><td>沖縄県那覇市</td><td>店頭</td><td>地元密着</td></tr></tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※対応状況は変更される場合があります。事前に公式サイトでご確認いただくか、複数の業者に同時に査定を依頼することをおすすめします。</p>

          <h3 className="!mt-6">5-2. 全国対応の主要3業者（最新査定額の取得先）</h3>
          <p>当サイトでは買取額の固定値は掲載していません。各業者の最新の査定額・キャンペーン情報は、以下の公式ページでご確認いただけます。地域の業者とあわせて、3〜5社で相見積もりを取ることをおすすめします。</p>
          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店です</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">バイセル</a> — 東証グロース上場企業が運営し、出張・店頭・宅配の3つの方式に対応しています。出張は離島を除き沖縄県全域に対応しています</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">福ちゃん</a> — 総合買取の大手で、お酒の査定にも対応しています。出張・宅配・店舗の3つの方式があります（出張の対応エリアは公式サイトに記載がないため、申込時にご確認ください）</li>
            
          </ul>

          <h2>6. 白州12年の保管と輸送 — 沖縄県の気候特性を踏まえて</h2>
          <p>沖縄県の気候特性は「<strong>亜熱帯海洋性／年中高温多湿、台風常襲、塩害多い、ウイスキー保管は徹底空調必須</strong>」（気象庁の気候区分）です。白州12年の保管・輸送の際は、以下の点にご留意ください。</p>
          <p><strong>保管時の基本</strong>: アルコール度数43%。15-20℃の冷暗所で縦置き。開栓後1年以内推奨</p>
          <ul>
            <li><strong>温度管理</strong>: 夏季は冷暗所で保管し、冬季は凍結を避けてください（特に北日本・日本海側）</li>
            <li><strong>湿度</strong>: 湿度50〜70%が適しています。湿度が低すぎるとコルクが乾燥して液漏れの原因となり、高すぎるとラベルが劣化します</li>
            <li><strong>振動の回避</strong>: 縦置きでの保管が基本です。横置きはコルクの劣化を早めるため、おすすめしません</li>
            <li><strong>輸送時</strong>: 宅配買取の場合は、緩衝材を十分にご使用ください。破損した場合は買取不可となるため、業者が指定する梱包方法に従ってください</li>
            <li><strong>発送の時期</strong>: 季節による温度差が大きい時期の発送は避け、春・秋の気候が安定した時期の発送をおすすめします</li>
          </ul>

          <h2>7. 白州12年の最新オークション動向と査定への影響</h2>
          <p>白州12年の市場価値は、国内市場（Yahoo Auctions）と海外オークションの両方で形成されます。直近の動向を踏まえて、売却の時期をご判断ください。</p>
          <ul>
            <li><strong>国内市場（Yahoo Auctions 過去180日中央値）</strong>: ¥20,400（¥20,400（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=232、取得日 2026-10-12））</li>
            <li><strong>海外オークション直近</strong>: £100〜£200帯 (2026 Q1〜Q2, Whisky.Auction)</li>
            <li><strong>コレクション価値</strong>: 2018年休売報道後にプレミア化。再開後も流通量限定で定価入手困難</li>
            <li><strong>流通ステータス</strong>: 現行品（出荷再開、品薄継続）（1994年発売）</li>
          </ul>
          <p>海外オークションで高値が付いた直後は、国内の業者の買取査定額も上昇する傾向があります。一方、下落の局面では業者の買取意欲も低下するため、上昇傾向の時期に複数の業者で相見積もりを取ることをおすすめします。</p>

          <h2>8. 沖縄県で白州12年を高く売る3つのポイント</h2>
          <ol>
            <li>
              <strong>複数の業者で相見積もりを取る</strong>: 3社以上、できれば5社（地域の業者と全国対応の業者）から見積もりを取り、比較することをおすすめします。同じ白州12年でも業者ごとに在庫状況・キャンペーン・査定基準が異なり、業界の目安として<strong>10〜20%の査定差</strong>が生じる場合があります。同じ日に複数の業者へ査定を依頼すると、比較しやすくなります。
            </li>
            <li>
              <strong>付属品を揃える</strong>: 外箱・冊子・カートン・保証書・ギャランティカードを揃えることで、業界の目安として<strong>市場相場の10〜20%</strong>査定額が上がります。白州12年のような銘柄では、付属品の有無が査定額に大きく影響します。発売当時の包装紙やコルク表面の状態、ボトルナンバーの読み取りの可否も評価の対象となるため、購入時の状態をできる限り保ってください。
            </li>
            <li>
              <strong>需要期に売る</strong>: 年末年始（11〜12月）、お中元・お歳暮の時期（6〜7月、11〜12月）、新生活の前（2〜3月）は高値の傾向があります。これらの時期は贈答需要やコレクター需要が高まり、業者の仕入れ意欲も高まります。年末年始と春先の需要期には、査定額が<strong>10〜15%上昇</strong>する傾向があります。一方、夏場（8〜9月）や年明け（1月下旬〜2月）は需要が落ち着き、査定額もやや下がる傾向があります。海外オークションの動向も、売却の時期の参考になります。
            </li>
            
            
          </ol>

          <h2>9. 沖縄県の白州12年買取で注意すべき点</h2>
          <ul>
            <li><strong>本人確認書類が必要です</strong>: 古物営業法により、本人確認が必要です（運転免許証・マイナンバーカード等）。出張査定の場合も、事前に本人確認書類をご準備ください。住所・氏名・生年月日が確認できる公的書類が必要で、健康保険証など顔写真のない書類の場合は、補助書類（公共料金の請求書等）が必要な場合もあります。</li>
            <li><strong>未成年（18歳未満）の方は売却できません</strong>: 親権者の同意がある場合も同様です。古物営業法により、未成年からの買取は厳格に禁止されています。所有者が未成年の場合は、相続・贈与の手続きを経て、成人が売却する必要があります。</li>
            
            <li><strong>輸送のリスク</strong>: 宅配買取の場合は、緩衝材を十分に使用し、業者が指定する梱包方法に従ってください。季節によっては、輸送中の温度変化が品質に影響する場合があります。できる限り、温度変化の小さい時期（春・秋）の発送をおすすめします。輸送中の破損は買取不可となる場合が多く、業者の保険の対象外となる場合もあります。</li>
            
            <li><strong>査定額の根拠の確認</strong>: 業者から提示された査定額の根拠（市場相場・在庫状況・状態評価）を必ずご確認ください。透明性のある業者ほど、根拠を明確に説明する傾向があります。白州12年の市場相場（Yahoo中央値 ¥20,400）と比較し、提示額が市場相場の60〜80%の範囲から大きく外れる場合は、その理由をご確認ください。</li>
            <li><strong>キャンセル・取消の取り扱い</strong>: 査定後すぐに契約を急がせる業者にはご注意ください。出張買取（訪問購入）の場合は、特定商取引法により8日以内のクーリング・オフが認められています（店頭への持ち込みは対象外です）。査定額に納得できない場合は、その場でお断りいただいて問題ありません。</li>
          </ul>

          <h2>10. よくある質問</h2>
          <details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>沖縄県で白州12年は出張買取してもらえますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u306f\u3044\u3002\u6c96\u7e04\u770c\uff08\u90a3\u8987\u30fb\u6d66\u6dfb\u30fb\u5b9c\u91ce\u6e7e\u30fb\u6c96\u7e04\u5e02\u30fb\u3046\u308b\u307e\uff09\u306f\u4e5d\u5dde\u5730\u65b9\u306e\u4e2d\u6838\u30a8\u30ea\u30a2\u3067\u3059\u3002\u63b2\u8f09\u3057\u3066\u3044\u308b\u30d0\u30a4\u30bb\u30eb\u306f\u51fa\u5f35\u8cb7\u53d6\u3092\u300c\u96e2\u5cf6\u3092\u9664\u304f\u65e5\u672c\u5168\u56fd\u300d\u3067\u53d7\u3051\u4ed8\u3051\u3066\u304a\u308a\u3001\u7533\u8fbc\u304b\u3089\u6700\u77ed\u5373\u65e5\u306e\u8a2a\u554f\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u3059\uff08\u516c\u5f0f\u30b5\u30a4\u30c8\u30fb2026\u5e7410\u670816\u65e5\u78ba\u8a8d\uff09\u3002\u798f\u3061\u3083\u3093\u3082\u51fa\u5f35\u8cb7\u53d6\u3092\u884c\u3063\u3066\u3044\u307e\u3059\u304c\u3001\u5bfe\u5fdc\u30a8\u30ea\u30a2\u306f\u516c\u5f0f\u30b5\u30a4\u30c8\u306b\u8a18\u8f09\u304c\u306a\u3044\u305f\u3081\u3001\u7533\u8fbc\u6642\u306b\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>沖縄県の白州12年市場相場は他県と差がありますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u5e02\u5834\u76f8\u5834\uff08Yahoo\u4e2d\u592e\u5024\uff09\u306f\u5168\u56fd\u5171\u901a\u3067\u3059\u304c\u3001\u696d\u8005\u8cb7\u53d6\u984d\u306f\u5730\u57df\u3084\u696d\u8005\u3067\u7570\u306a\u308a\u307e\u3059\u3002\u767d\u5dde12\u5e74\u306e\u73fe\u5728\u306e\u5e02\u5834\u76f8\u5834\u306f \u00a520,400\uff08Yahoo Auctions \u4e2d\u592e\u5024\uff09\u3067\u3059\u3002\u5b9f\u969b\u306e\u696d\u8005\u306e\u67fb\u5b9a\u984d\u306f\u3001LINXAS / \u30d0\u30a4\u30bb\u30eb / \u798f\u3061\u3083\u3093 \u306e\u5404\u793e\u30da\u30fc\u30b8\u3067\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>沖縄県の店頭買取で白州12年は売れますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u306f\u3044\u3001\u90a3\u8987\u30fb\u6d66\u6dfb\u30fb\u5b9c\u91ce\u6e7e\u30fb\u6c96\u7e04\u5e02\u30fb\u3046\u308b\u307e\u3092\u4e2d\u5fc3\u306b\u3001\u5c02\u9580\u5e97\u30fb\u304a\u9152\u306e\u8cb7\u53d6\u5e97\u3067\u5e97\u982d\u8cb7\u53d6\u3092\u53d7\u3051\u3089\u308c\u307e\u3059\u3002\u9ad8\u984d\u306a\u30dc\u30c8\u30eb\u306e\u5834\u5408\u306f\u3001\u4e8b\u524d\u4e88\u7d04\u306e\u3046\u3048\u3001\u5c02\u9580\u306e\u67fb\u5b9a\u58eb\u306b\u3088\u308b\u67fb\u5b9a\u3092\u53d7\u3051\u308b\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>白州12年を沖縄県で売る時期はいつがよいですか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u5e74\u672b\u5e74\u59cb\u30fb\u304a\u4e2d\u5143\u306e\u6642\u671f\uff0811\u301c12\u6708\u30016\u301c7\u6708\uff09\u306f\u9ad8\u5024\u306e\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u4e5d\u5dde\u5730\u65b9\u306e\u696d\u8005\u306f\u3001\u9700\u8981\u671f\u306b\u67fb\u5b9a\u984d\u304c10\u301c15%\u4e0a\u6607\u3059\u308b\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u65e9\u3081\u306b\u76f8\u898b\u7a4d\u3082\u308a\u3092\u53d6\u308b\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002" }} />
          </details>

          {/* tier2-related-links:begin */}
          <div className="not-prose my-8">
            <h2 className="font-display text-xl font-semibold mb-2 text-ink !border-none !pb-0 !mt-0">近隣エリアで白州12年を売る</h2>
            <p className="text-sm text-warm-gray mb-3">沖縄県の近隣エリアで白州12年を売る場合のガイドです。</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/tier2/kagoshima/hakushu-12-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">鹿児島県</Link>
            </div>
          </div>
          <div className="not-prose my-8">
            <h2 className="font-display text-xl font-semibold mb-2 text-ink !border-none !pb-0 !mt-0">沖縄県で売れる関連銘柄</h2>
            <p className="text-sm text-warm-gray mb-3">白州12年と同じジャパニーズウイスキーの銘柄を沖縄県で売る場合のガイドです。</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/tier2/okinawa/hakushu-18-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">白州18年</Link>
              <Link href="/tier2/okinawa/hakushu-25-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">白州25年</Link>
              <Link href="/tier2/okinawa/hakushu-nv-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">白州ノンエイジ</Link>
              <Link href="/tier2/okinawa/" className="inline-block bg-amber/15 border border-amber/40 rounded-full px-3 py-1 text-xs font-semibold text-amber-dark hover:bg-amber/25 transition-all">沖縄県の銘柄一覧 →</Link>
            </div>
          </div>
          {/* tier2-related-links:end */}

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">📚 関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/hakushu-12-kaitori/" className="text-amber-dark hover:text-burgundy underline">白州12年の市場相場（全国版）</Link></li>
              {/* nv-receiver-link-202608 */}<li><Link href="/articles/hakushu-nv-kaitori/" className="text-amber-dark hover:text-burgundy underline">白州の年代指定なし（ノンエイジ）の買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー市場相場一覧</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
            </ul>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-12）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
