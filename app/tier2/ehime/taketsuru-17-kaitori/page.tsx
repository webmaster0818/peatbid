import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/taketsuru-17.json";

export const metadata: Metadata = {
  title: "【2026年最新】愛媛県で竹鶴17年を売る｜市場相場(Yahoo中央値)¥31,350・業者比較",
  description: "愛媛県（松山・今治・新居浜・西条）で竹鶴17年を売却するなら？市場相場 ¥31,350（Yahoo Auctions 過去180日中央値）、四国地方の地元業者と3業者参考リンクを掲載。",
  alternates: { canonical: "https://peatbid.com/tier2/ehime/taketsuru-17-kaitori/" },
  openGraph: { type: "website", siteName: "PeatBid", locale: "ja_JP", url: "https://peatbid.com/tier2/ehime/taketsuru-17-kaitori/", images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

function Schema() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"FAQPage\", \"mainEntity\": [{\"@type\": \"Question\", \"name\": \"\u611b\u5a9b\u770c\u3067\u7af9\u9db417\u5e74\u306f\u51fa\u5f35\u8cb7\u53d6\u3057\u3066\u3082\u3089\u3048\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u306f\u3044\u3002\u611b\u5a9b\u770c\uff08\u677e\u5c71\u30fb\u4eca\u6cbb\u30fb\u65b0\u5c45\u6d5c\u30fb\u897f\u6761\uff09\u306f\u56db\u56fd\u5730\u65b9\u306e\u4e2d\u6838\u30a8\u30ea\u30a2\u3067\u3059\u3002\u63b2\u8f09\u3057\u3066\u3044\u308b\u30d0\u30a4\u30bb\u30eb\u306f\u51fa\u5f35\u8cb7\u53d6\u3092\u300c\u96e2\u5cf6\u3092\u9664\u304f\u65e5\u672c\u5168\u56fd\u300d\u3067\u53d7\u3051\u4ed8\u3051\u3066\u304a\u308a\u3001\u7533\u8fbc\u304b\u3089\u6700\u77ed\u5373\u65e5\u306e\u8a2a\u554f\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u3059\uff08\u516c\u5f0f\u30b5\u30a4\u30c8\u30fb2026\u5e7410\u670816\u65e5\u78ba\u8a8d\uff09\u3002\u798f\u3061\u3083\u3093\u3082\u51fa\u5f35\u8cb7\u53d6\u3092\u884c\u3063\u3066\u3044\u307e\u3059\u304c\u3001\u5bfe\u5fdc\u30a8\u30ea\u30a2\u306f\u516c\u5f0f\u30b5\u30a4\u30c8\u306b\u8a18\u8f09\u304c\u306a\u3044\u305f\u3081\u3001\u7533\u8fbc\u6642\u306b\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u611b\u5a9b\u770c\u306e\u7af9\u9db417\u5e74\u5e02\u5834\u76f8\u5834\u306f\u4ed6\u770c\u3068\u5dee\u304c\u3042\u308a\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u5e02\u5834\u76f8\u5834\uff08Yahoo\u4e2d\u592e\u5024\uff09\u306f\u5168\u56fd\u5171\u901a\u3067\u3059\u304c\u3001\u696d\u8005\u8cb7\u53d6\u984d\u306f\u5730\u57df\u3084\u696d\u8005\u3067\u7570\u306a\u308a\u307e\u3059\u3002\u7af9\u9db417\u5e74\u306e\u73fe\u5728\u306e\u5e02\u5834\u76f8\u5834\u306f \u00a531,350\uff08Yahoo Auctions \u4e2d\u592e\u5024\uff09\u3067\u3059\u3002\u5b9f\u969b\u306e\u696d\u8005\u306e\u67fb\u5b9a\u984d\u306f\u3001LINXAS / \u30d0\u30a4\u30bb\u30eb / \u798f\u3061\u3083\u3093 \u306e\u5404\u793e\u30da\u30fc\u30b8\u3067\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u611b\u5a9b\u770c\u306e\u5e97\u982d\u8cb7\u53d6\u3067\u7af9\u9db417\u5e74\u306f\u58f2\u308c\u307e\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u306f\u3044\u3001\u677e\u5c71\u30fb\u4eca\u6cbb\u30fb\u65b0\u5c45\u6d5c\u30fb\u897f\u6761\u3092\u4e2d\u5fc3\u306b\u3001\u5c02\u9580\u5e97\u30fb\u304a\u9152\u306e\u8cb7\u53d6\u5e97\u3067\u5e97\u982d\u8cb7\u53d6\u3092\u53d7\u3051\u3089\u308c\u307e\u3059\u3002\u9ad8\u984d\u306a\u30dc\u30c8\u30eb\u306e\u5834\u5408\u306f\u3001\u4e8b\u524d\u4e88\u7d04\u306e\u3046\u3048\u3001\u5c02\u9580\u306e\u67fb\u5b9a\u58eb\u306b\u3088\u308b\u67fb\u5b9a\u3092\u53d7\u3051\u308b\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002\"}}, {\"@type\": \"Question\", \"name\": \"\u7af9\u9db417\u5e74\u3092\u611b\u5a9b\u770c\u3067\u58f2\u308b\u6642\u671f\u306f\u3044\u3064\u304c\u3088\u3044\u3067\u3059\u304b\uff1f\", \"acceptedAnswer\": {\"@type\": \"Answer\", \"text\": \"\u5e74\u672b\u5e74\u59cb\u30fb\u304a\u4e2d\u5143\u306e\u6642\u671f\uff0811\u301c12\u6708\u30016\u301c7\u6708\uff09\u306f\u9ad8\u5024\u306e\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u56db\u56fd\u5730\u65b9\u306e\u696d\u8005\u306f\u3001\u9700\u8981\u671f\u306b\u67fb\u5b9a\u984d\u304c10\u301c15%\u4e0a\u6607\u3059\u308b\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u65e9\u3081\u306b\u76f8\u898b\u7a4d\u3082\u308a\u3092\u53d6\u308b\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002\"}}]}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u611b\u5a9b\u770c\u306e\u7af9\u9db417\u5e74\u5e02\u5834\u76f8\u5834\u3068\u696d\u8005\u6bd4\u8f03\", \"datePublished\": \"2026-05-19\", \"dateModified\": \"2026-10-26\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Service\", \"areaServed\": {\"@type\": \"AdministrativeArea\", \"name\": \"\u611b\u5a9b\u770c\"}, \"serviceType\": \"\u30a6\u30a4\u30b9\u30ad\u30fc\u8cb7\u53d6\u76f8\u5834\", \"provider\": {\"@type\": \"Organization\", \"name\": \"PeatBid\"}}" }} />
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
            <li><Link href="/tier2/ehime/" className="hover:text-amber-dark transition-colors">愛媛県</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">竹鶴17年</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/taketsuru-17.png" alt="竹鶴17年の市場相場 愛媛県" width={1408} height={768} className="w-full h-[240px] md:h-[300px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <div className="flex flex-wrap gap-2 mb-3 not-prose">
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">四国・愛媛県</span>
            <span className="bg-burgundy/15 text-burgundy text-xs font-bold px-3 py-1 rounded-full">ジャパニーズウイスキー</span>
            <span className="bg-amber/15 text-amber-dark text-xs font-bold px-3 py-1 rounded-full">2026年版</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">愛媛県の竹鶴17年市場相場と業者比較</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-26 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          <h2>1. 愛媛県における竹鶴17年の市場概況</h2>
          <p>竹鶴17年を愛媛県で査定に出したい方のためのガイドです。愛媛県の人口は1（30万人59万世帯）で、主要都市は松山・今治・新居浜・西条です。四国地方の主要な経済圏（県内総生産 約5.0兆円）で、ウイスキー買取の需要もあります。</p>
          <p><strong>地域の市場の特徴</strong>: 四国西部の主要都市、松山を中心に買取需要</p>
          <p>竹鶴17年のような銘柄は二次流通が活発で、複数の買取業者が出張・店頭・宅配で対応しています。</p>
          <p>愛媛県には<strong>地域密着の専門業者</strong>と<strong>全国対応の大手</strong>の両方があるため、複数の業者で見積もりを比較できます。</p>

          <h2>2. 竹鶴17年の市場相場（Yahoo中央値）</h2>
          <p>竹鶴17年の市場相場は<strong>¥31,350</strong>です（¥31,350（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=286、取得日 2026-10-26））。竹鶴17年。ニッカの最高傑作の一つ</p>
          <p>業者の買取査定額は、この市場相場をベースに各社が在庫状況・キャンペーン・状態評価・利益率を加味して算出するため、市場相場よりも低めに出るのが一般的です（業界一般の目安として市場相場の60〜80%程度のレンジ）。</p>

          <h3 className="!mt-6">2-1. 竹鶴17年の基本プロフィール（公式情報）</h3>
          <div className="table-wrapper not-prose">
            <table className="text-sm">
              <tbody>
                <tr><th className="text-left bg-cream/30 px-3 py-2">流通ステータス</th><td className="px-3 py-2">終売（現行ラインアップに掲載なし）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">国内発売年</th><td className="px-3 py-2">2000年</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">後継品</th><td className="px-3 py-2">なし</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">テイスティング特徴</th><td className="px-3 py-2">果実の甘み、シェリー樽の複雑さ、軽やかなピート香。バランスの取れた長期熟成由来の余韻</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">コレクション価値</th><td className="px-3 py-2">WWA世界一複数回受賞。終売後プレミア化、コレクター需要堅調</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">海外オークション直近</th><td className="px-3 py-2">£300〜£500帯 (2026 Q1〜Q2, Whisky Auctioneer)</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">公式情報</th><td className="px-3 py-2"><a href="https://www.nikka.com/brands/taketsuru/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">https://www.nikka.com/brands/taketsuru/</a></td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※流通ステータスや後継品の情報は、2026年10月17日時点の公式情報にもとづきます。海外オークションの直近の落札は参照時点のものです。最新の市況は、各オークションの公式サイトでご確認ください。</p>

          <h2>3. 状態別の業界目安（パーセンテージ）</h2>
          <p>市場相場（Yahoo中央値）を基準（100%）とした業界一般の目安です。実際の査定額は業者により異なるため、最終的な金額は各業者ページでご確認ください。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>状態</th><th>業界目安（市場相場対比）</th></tr></thead>
              <tbody><tr><td>未開封・付属品完備（箱・冊子揃い）</td><td>市場相場の95〜100%程度</td></tr><tr><td>未開封・箱なし</td><td>市場相場の80〜90%程度</td></tr><tr><td>未開封・ラベル軽度汚れ</td><td>市場相場の75〜88%程度</td></tr><tr><td>未開封・液面減少</td><td>市場相場の55〜70%程度</td></tr><tr><td>開封済み・9割以上残</td><td>市場相場の30〜40%程度</td></tr><tr><td>開封済み・半分以下残</td><td>市場相場の15〜25%程度</td></tr></tbody>
            </table>
          </div>

          <h2>4. 愛媛県のウイスキー買取市場の特性（経済データ）</h2>
          <p>愛媛県は四国地方に位置し、人口130万人・59万世帯の地域です。ウイスキーの二次流通に関係する公的統計データは、以下のとおりです。</p>
          <div className="table-wrapper not-prose">
            <table className="text-sm">
              <tbody>
                <tr><th className="text-left bg-cream/30 px-3 py-2">県内総生産</th><td className="px-3 py-2">約5.0兆円（内閣府 県民経済計算 R3年度）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">1人あたり県民所得</th><td className="px-3 py-2">263万円（内閣府 R3年度確報）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">酒類消費量ランク</th><td className="px-3 py-2">全国39位前後（国税庁 酒のしおり R5年版）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">酒類小売業免許場数</th><td className="px-3 py-2">約1,100店（国税庁 R4年3月末）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">気候特性</th><td className="px-3 py-2">瀬戸内式／中予北予は温暖少雨、南予は太平洋側で多雨、冬温和（気象庁 気候区分）</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">主要産業</th><td className="px-3 py-2">化学・タオル(今治)・造船・農業(みかん/伊予柑)・観光(道後温泉/しまなみ)</td></tr>
                <tr><th className="text-left bg-cream/30 px-3 py-2">主要駅・路線</th><td className="px-3 py-2">松山駅(JR予讃/予土線)・松山市駅(伊予鉄道)・今治駅(JR予讃線)・新居浜駅(JR予讃線)</td></tr>
              </tbody>
            </table>
          </div>
          <p>経済規模・所得水準・酒類消費の動向は、ウイスキーの二次流通市場の活発さを示す指標の一つです。愛媛県の酒類消費は<strong>全国39位前後</strong>、主要産業は<strong>化学・タオル(今治)・造船・農業(みかん/伊予柑)・観光(道後温泉/しまなみ)</strong>です。</p>

          <h2>5. 愛媛県で竹鶴17年を売る — 業者の選び方と査定取得先</h2>
          <p>愛媛県で竹鶴17年を売却する際の業者は、大きく2つのタイプに分かれます。両方のタイプから相見積もりを取ることをおすすめします。</p>

          <h3 className="!mt-6">5-1. 愛媛県の地元・対応買取業者</h3>
          <p>四国地方で出張・店頭・宅配に対応している業者です。地域に密着した専門知識と、迅速な対応が強みです。松山駅(JR予讃/予土線)・松山市駅(伊予鉄道)・今治駅(JR予讃線)・新居浜駅(JR予讃線)周辺にも対応している場合が多くあります。</p>
          <div className="table-wrapper">
            <table>
              <thead><tr><th>業者</th><th>所在地・対応エリア</th><th>方式</th><th>特徴</th></tr></thead>
              <tbody><tr><td><strong>バイセル 愛媛</strong></td><td>愛媛県全域</td><td>出張・宅配</td><td>東証上場大手</td></tr><tr><td><strong>福ちゃん 松山</strong></td><td>愛媛県松山市</td><td>出張・宅配</td><td>全国大手</td></tr><tr><td><strong>リサイクルマート松山</strong></td><td>愛媛県松山市</td><td>店頭</td><td>地元密着</td></tr></tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">※対応状況は変更される場合があります。事前に公式サイトでご確認いただくか、複数の業者に同時に査定を依頼することをおすすめします。</p>

          <h3 className="!mt-6">5-2. 全国対応の主要3業者（最新査定額の取得先）</h3>
          <p>当サイトでは買取額の固定値は掲載していません。各業者の最新の査定額・キャンペーン情報は、以下の公式ページでご確認いただけます。地域の業者とあわせて、3〜5社で相見積もりを取ることをおすすめします。</p>
          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店です</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">バイセル</a> — 東証グロース上場企業が運営し、出張・店頭・宅配の3つの方式に対応しています。出張は離島を除き愛媛県全域に対応しています</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">福ちゃん</a> — 株式会社REGATEが運営する買取専門店で、お酒の査定にも対応しています。出張・宅配・店舗の3つの方式があります（出張の対応エリアは公式サイトに記載がないため、申込時にご確認ください）</li>
            
          </ul>

          <h2>6. 竹鶴17年の保管と輸送 — 愛媛県の気候特性を踏まえて</h2>
          <p>愛媛県の気候特性は「<strong>瀬戸内式／中予北予は温暖少雨、南予は太平洋側で多雨、冬温和</strong>」（気象庁の気候区分）です。竹鶴17年の保管・輸送の際は、以下の点にご留意ください。</p>
          <p><strong>保管時の基本</strong>: アルコール度数43%。終売後の希少品、15-18℃の冷暗所・縦置き、コルク状態を定期確認</p>
          <ul>
            <li><strong>温度管理</strong>: 夏季は冷暗所で保管し、冬季は凍結を避けてください（特に北日本・日本海側）</li>
            <li><strong>湿度</strong>: 湿度50〜70%が適しています。湿度が低すぎるとコルクが乾燥して液漏れの原因となり、高すぎるとラベルが劣化します</li>
            <li><strong>振動の回避</strong>: 縦置きでの保管が基本です。横置きはコルクの劣化を早めるため、おすすめしません</li>
            <li><strong>輸送時</strong>: 宅配買取の場合は、緩衝材を十分にご使用ください。破損した場合は買取不可となるため、業者が指定する梱包方法に従ってください</li>
            <li><strong>発送の時期</strong>: 季節による温度差が大きい時期の発送は避け、春・秋の気候が安定した時期の発送をおすすめします</li>
          </ul>

          <h2>7. 竹鶴17年の最新オークション動向と査定への影響</h2>
          <p>竹鶴17年の市場価値は、国内市場（Yahoo Auctions）と海外オークションの両方で形成されます。直近の動向を踏まえて、売却の時期をご判断ください。</p>
          <ul>
            <li><strong>国内市場（Yahoo Auctions 過去180日中央値）</strong>: ¥31,350（¥31,350（Yahoo Auctions 過去180日の落札中央値、サンプル数 n=286、取得日 2026-10-26））</li>
            <li><strong>海外オークション直近</strong>: £300〜£500帯 (2026 Q1〜Q2, Whisky Auctioneer)</li>
            <li><strong>コレクション価値</strong>: WWA世界一複数回受賞。終売後プレミア化、コレクター需要堅調</li>
            <li><strong>流通ステータス</strong>: 終売（現行ラインアップに掲載なし）（2000年発売）</li>
          </ul>
          <p>海外オークションで高値が付いた直後は、国内の業者の買取査定額も上昇する傾向があります。一方、下落の局面では業者の買取意欲も低下するため、上昇傾向の時期に複数の業者で相見積もりを取ることをおすすめします。</p>

          <h2>8. 愛媛県で竹鶴17年を高く売る3つのポイント</h2>
          <ol>
            <li>
              <strong>複数の業者で相見積もりを取る</strong>: 3社以上、できれば5社（地域の業者と全国対応の業者）から見積もりを取り、比較することをおすすめします。同じ竹鶴17年でも業者ごとに在庫状況・キャンペーン・査定基準が異なり、業界の目安として<strong>10〜20%の査定差</strong>が生じる場合があります。同じ日に複数の業者へ査定を依頼すると、比較しやすくなります。
            </li>
            <li>
              <strong>付属品を揃える</strong>: 外箱・冊子・カートン・保証書・ギャランティカードを揃えることで、業界の目安として<strong>市場相場の10〜20%</strong>査定額が上がります。竹鶴17年のような銘柄では、付属品の有無が査定額に大きく影響します。発売当時の包装紙やコルク表面の状態、ボトルナンバーの読み取りの可否も評価の対象となるため、購入時の状態をできる限り保ってください。
            </li>
            <li>
              <strong>需要期に売る</strong>: 年末年始（11〜12月）、お中元・お歳暮の時期（6〜7月、11〜12月）、新生活の前（2〜3月）は高値の傾向があります。これらの時期は贈答需要やコレクター需要が高まり、業者の仕入れ意欲も高まります。年末年始と春先の需要期には、査定額が<strong>10〜15%上昇</strong>する傾向があります。一方、夏場（8〜9月）や年明け（1月下旬〜2月）は需要が落ち着き、査定額もやや下がる傾向があります。海外オークションの動向も、売却の時期の参考になります。
            </li>
            
            
          </ol>

          <h2>9. 愛媛県の竹鶴17年買取で注意すべき点</h2>
          <ul>
            <li><strong>本人確認書類が必要です</strong>: 古物営業法により、本人確認が必要です（運転免許証・マイナンバーカード等）。出張査定の場合も、事前に本人確認書類をご準備ください。住所・氏名・生年月日が確認できる公的書類が必要で、健康保険証など顔写真のない書類の場合は、補助書類（公共料金の請求書等）が必要な場合もあります。</li>
            <li><strong>未成年（18歳未満）の方は売却できません</strong>: 親権者の同意がある場合も同様です。古物営業法により、未成年からの買取は厳格に禁止されています。所有者が未成年の場合は、相続・贈与の手続きを経て、成人が売却する必要があります。</li>
            
            <li><strong>輸送のリスク</strong>: 宅配買取の場合は、緩衝材を十分に使用し、業者が指定する梱包方法に従ってください。季節によっては、輸送中の温度変化が品質に影響する場合があります。できる限り、温度変化の小さい時期（春・秋）の発送をおすすめします。輸送中の破損は買取不可となる場合が多く、業者の保険の対象外となる場合もあります。</li>
            
            <li><strong>査定額の根拠の確認</strong>: 業者から提示された査定額の根拠（市場相場・在庫状況・状態評価）を必ずご確認ください。透明性のある業者ほど、根拠を明確に説明する傾向があります。竹鶴17年の市場相場（Yahoo中央値 ¥31,350）と比較し、提示額が市場相場の60〜80%の範囲から大きく外れる場合は、その理由をご確認ください。</li>
            <li><strong>キャンセル・取消の取り扱い</strong>: 査定後すぐに契約を急がせる業者にはご注意ください。出張買取（訪問購入）の場合は、特定商取引法により8日以内のクーリング・オフが認められています（店頭への持ち込みは対象外です）。査定額に納得できない場合は、その場でお断りいただいて問題ありません。</li>
          </ul>

          <h2>10. よくある質問</h2>
          <details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>愛媛県で竹鶴17年は出張買取してもらえますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u306f\u3044\u3002\u611b\u5a9b\u770c\uff08\u677e\u5c71\u30fb\u4eca\u6cbb\u30fb\u65b0\u5c45\u6d5c\u30fb\u897f\u6761\uff09\u306f\u56db\u56fd\u5730\u65b9\u306e\u4e2d\u6838\u30a8\u30ea\u30a2\u3067\u3059\u3002\u63b2\u8f09\u3057\u3066\u3044\u308b\u30d0\u30a4\u30bb\u30eb\u306f\u51fa\u5f35\u8cb7\u53d6\u3092\u300c\u96e2\u5cf6\u3092\u9664\u304f\u65e5\u672c\u5168\u56fd\u300d\u3067\u53d7\u3051\u4ed8\u3051\u3066\u304a\u308a\u3001\u7533\u8fbc\u304b\u3089\u6700\u77ed\u5373\u65e5\u306e\u8a2a\u554f\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u3059\uff08\u516c\u5f0f\u30b5\u30a4\u30c8\u30fb2026\u5e7410\u670816\u65e5\u78ba\u8a8d\uff09\u3002\u798f\u3061\u3083\u3093\u3082\u51fa\u5f35\u8cb7\u53d6\u3092\u884c\u3063\u3066\u3044\u307e\u3059\u304c\u3001\u5bfe\u5fdc\u30a8\u30ea\u30a2\u306f\u516c\u5f0f\u30b5\u30a4\u30c8\u306b\u8a18\u8f09\u304c\u306a\u3044\u305f\u3081\u3001\u7533\u8fbc\u6642\u306b\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>愛媛県の竹鶴17年市場相場は他県と差がありますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u5e02\u5834\u76f8\u5834\uff08Yahoo\u4e2d\u592e\u5024\uff09\u306f\u5168\u56fd\u5171\u901a\u3067\u3059\u304c\u3001\u696d\u8005\u8cb7\u53d6\u984d\u306f\u5730\u57df\u3084\u696d\u8005\u3067\u7570\u306a\u308a\u307e\u3059\u3002\u7af9\u9db417\u5e74\u306e\u73fe\u5728\u306e\u5e02\u5834\u76f8\u5834\u306f \u00a531,350\uff08Yahoo Auctions \u4e2d\u592e\u5024\uff09\u3067\u3059\u3002\u5b9f\u969b\u306e\u696d\u8005\u306e\u67fb\u5b9a\u984d\u306f\u3001LINXAS / \u30d0\u30a4\u30bb\u30eb / \u798f\u3061\u3083\u3093 \u306e\u5404\u793e\u30da\u30fc\u30b8\u3067\u3054\u78ba\u8a8d\u304f\u3060\u3055\u3044\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>愛媛県の店頭買取で竹鶴17年は売れますか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u306f\u3044\u3001\u677e\u5c71\u30fb\u4eca\u6cbb\u30fb\u65b0\u5c45\u6d5c\u30fb\u897f\u6761\u3092\u4e2d\u5fc3\u306b\u3001\u5c02\u9580\u5e97\u30fb\u304a\u9152\u306e\u8cb7\u53d6\u5e97\u3067\u5e97\u982d\u8cb7\u53d6\u3092\u53d7\u3051\u3089\u308c\u307e\u3059\u3002\u9ad8\u984d\u306a\u30dc\u30c8\u30eb\u306e\u5834\u5408\u306f\u3001\u4e8b\u524d\u4e88\u7d04\u306e\u3046\u3048\u3001\u5c02\u9580\u306e\u67fb\u5b9a\u58eb\u306b\u3088\u308b\u67fb\u5b9a\u3092\u53d7\u3051\u308b\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002" }} />
          </details><details className="border-b border-warm-border py-4 group not-prose">
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              <span>竹鶴17年を愛媛県で売る時期はいつがよいですか？</span>
              <span className="text-2xl ml-4 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: "\u5e74\u672b\u5e74\u59cb\u30fb\u304a\u4e2d\u5143\u306e\u6642\u671f\uff0811\u301c12\u6708\u30016\u301c7\u6708\uff09\u306f\u9ad8\u5024\u306e\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u56db\u56fd\u5730\u65b9\u306e\u696d\u8005\u306f\u3001\u9700\u8981\u671f\u306b\u67fb\u5b9a\u984d\u304c10\u301c15%\u4e0a\u6607\u3059\u308b\u50be\u5411\u304c\u3042\u308a\u307e\u3059\u3002\u65e9\u3081\u306b\u76f8\u898b\u7a4d\u3082\u308a\u3092\u53d6\u308b\u3053\u3068\u3092\u304a\u3059\u3059\u3081\u3057\u307e\u3059\u3002" }} />
          </details>

          {/* tier2-related-links:begin */}
          <div className="not-prose my-8">
            <h2 className="font-display text-xl font-semibold mb-2 text-ink !border-none !pb-0 !mt-0">近隣エリアで竹鶴17年を売る</h2>
            <p className="text-sm text-warm-gray mb-3">愛媛県の近隣エリアで竹鶴17年を売る場合のガイドです。</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/tier2/kagawa/taketsuru-17-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">香川県</Link>
              <Link href="/tier2/tokushima/taketsuru-17-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">徳島県</Link>
              <Link href="/tier2/kochi/taketsuru-17-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">高知県</Link>
              <Link href="/tier2/hiroshima/taketsuru-17-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">広島県</Link>
              <Link href="/tier2/oita/taketsuru-17-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">大分県</Link>
            </div>
          </div>
          <div className="not-prose my-8">
            <h2 className="font-display text-xl font-semibold mb-2 text-ink !border-none !pb-0 !mt-0">愛媛県で売れる関連銘柄</h2>
            <p className="text-sm text-warm-gray mb-3">竹鶴17年と同じジャパニーズウイスキーの銘柄を愛媛県で売る場合のガイドです。</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/tier2/ehime/taketsuru-21-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">竹鶴21年</Link>
              <Link href="/tier2/ehime/taketsuru-25-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">竹鶴25年</Link>
              <Link href="/tier2/ehime/taketsuru-pure-kaitori/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">竹鶴ピュアモルト</Link>
              <Link href="/tier2/ehime/" className="inline-block bg-amber/15 border border-amber/40 rounded-full px-3 py-1 text-xs font-semibold text-amber-dark hover:bg-amber/25 transition-all">愛媛県の銘柄一覧 →</Link>
            </div>
          </div>
          {/* tier2-related-links:end */}

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">📚 関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/taketsuru-17-kaitori/" className="text-amber-dark hover:text-burgundy underline">竹鶴17年の市場相場（全国版）</Link></li>
              {/* nv-receiver-link-202608 */}<li><Link href="/articles/taketsuru-pure-kaitori/" className="text-amber-dark hover:text-burgundy underline">竹鶴の年代指定なし（ノンエイジ）の買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー市場相場一覧</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
            </ul>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-26）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
