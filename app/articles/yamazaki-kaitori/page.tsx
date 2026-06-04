import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import brandsData from "@/data/brands.json";

export const metadata: Metadata = {
  title: "【2026年最新】山崎の市場相場 — NV・12年・18年・25年・55年の Yahoo中央値",
  description:
    "サントリー山崎の市場相場（Yahoo Auctions 過去180日落札中央値）を全グレード網羅。NV・12年・18年・25年・55年の最新数値、状態別の業界目安、業者比較リンクを掲載。",
};

type Brand = {
  slug: string;
  name_ja: string;
  origin: string;
  yahoo_median_jpy_180d: number | null;
  yahoo_sample_n: number;
  yahoo_fetched_at: string | null;
};

const brands = (brandsData as Brand[]).filter((b) => b.origin === "山崎蒸溜所");
const fetchedDates = brands
  .map((b) => b.yahoo_fetched_at)
  .filter((d): d is string => !!d)
  .sort();
const latestFetch = fetchedDates[fetchedDates.length - 1] ?? "—";

function formatJPY(n: number | null, sufficient: boolean): string {
  if (!sufficient || n == null) return "市場相場データ蓄積中";
  return `¥${n.toLocaleString("ja-JP")}`;
}

function FaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "山崎の市場相場はいくらですか？", acceptedAnswer: { "@type": "Answer", text: "本サイトでは Yahoo Auctions 過去180日の落札中央値（IQR外れ値除去後）を市場相場として公開しています。NV・12年・18年・25年・55年でグレードごとに大きく異なるため、各銘柄ページで最新値をご確認ください。業者の買取査定額は LINXAS / バイセル / 福ちゃん / JOYLAB など各社ページでご確認ください。" } },
      { "@type": "Question", name: "山崎12年が高騰している理由は？", acceptedAnswer: { "@type": "Answer", text: "山崎12年は2018年前後の品薄・出荷調整以降、供給が逼迫しプレミア化しました。1984年発売の日本初の本格シングルモルトという歴史的価値、国際品評会での受賞、アジア富裕層の需要拡大が評価を後押ししています。" } },
      { "@type": "Question", name: "山崎を高く売るには？", acceptedAnswer: { "@type": "Answer", text: "(1)付属品（箱・冊子・カートン）を揃える、(2)未開封のまま売る、(3)複数業者で相見積もりを取る、(4)直射日光を避け縦置きで保管、(5)購入証明・シリアルを明示、(6)需要期を狙う、(7)ウイスキー専門業者を優先、の7点が基本です。" } },
      { "@type": "Question", name: "開封済みの山崎は買い取ってもらえますか？", acceptedAnswer: { "@type": "Answer", text: "業者によります。買取対応していても査定額は市場相場の20〜40%程度に下がるのが一般的です。コレクション・投資目的の個体は未開封維持を強く推奨します。" } },
      { "@type": "Question", name: "箱や付属品がなくても売れますか？", acceptedAnswer: { "@type": "Answer", text: "本体のみでも買取可能ですが、業界目安として化粧箱付きより10〜20%減額になります。特に18年・25年・55年は付属品の影響が大きく、元箱・冊子・カートンの保管が重要です。" } },
      { "@type": "Question", name: "山崎と響、どちらが高く売れますか？", acceptedAnswer: { "@type": "Answer", text: "同熟成年数で比較した場合、シングルモルトである山崎の方が二次流通価値は高い傾向です（特に12年以上）。ブレンデッドの響は安定した需要があり流動性が高いのが特徴です。" } },
      { "@type": "Question", name: "山崎の偽物・贋作はありますか？", acceptedAnswer: { "@type": "Answer", text: "高額化に伴い模倣品が国内外で確認されています。ラベルの墨字書体・赤い角印、キャップの印字、ボトル底の刻印、液色、購入経路の整合性を確認し、不安な場合は専門業者で真贋鑑定を依頼してください。" } },
      { "@type": "Question", name: "古い山崎（オールドボトル）でも売れますか？", acceptedAnswer: { "@type": "Answer", text: "旧ラベル・旧ロットはヴィンテージ価値が加算されるケースがあります。特に終売前の12年旧ボトルや特級表記の個体はコレクター需要から高値が付くことがあり、専門業者での査定を推奨します。" } },
      { "@type": "Question", name: "山崎55年はどのくらいの価値がありますか？", acceptedAnswer: { "@type": "Answer", text: "山崎55年は2020年に国内100本限定の抽選販売（希望小売価格300万円）で登場し、海外オークションでは数千万円規模で落札された実績があります。流通量が極端に少なく、最新の落札データで個別に確認する必要があります。" } },
      { "@type": "Question", name: "査定後にキャンセルできますか？", acceptedAnswer: { "@type": "Answer", text: "多くの業者で査定後・契約前のキャンセルは可能です。出張買取はクーリングオフ対象になることが多いですが、約款は業者ごとに異なるため、契約前にキャンセル条件・期限を必ず確認してください。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function YamazakiKaitoriPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u5c71\u5d0e\u306e\u5e02\u5834\u76f8\u5834\u3068\u696d\u8005\u6bd4\u8f03\u30ac\u30a4\u30c9\", \"description\": \"\u30b5\u30f3\u30c8\u30ea\u30fc\u5c71\u5d0e\u306e\u5e02\u5834\u76f8\u5834\uff08Yahoo Auctions \u904e\u53bb180\u65e5\u843d\u672d\u4e2d\u592e\u5024\uff09\u3092\u5168\u30b0\u30ec\u30fc\u30c9\u7db2\u7f85\u3002NV\u30fb12\u5e74\u30fb18\u5e74\u30fb25\u5e74\u30fb55\u5e74\u306e\u6700\u65b0\u6570\u5024\u3001\u72b6\u614b\u5225\u306e\u696d\u754c\u76ee\u5b89\u3001\u696d\u8005\u6bd4\u8f03\u30ea\u30f3\u30af\u3092\u63b2\u8f09\u3002\", \"url\": \"https://peatbid.com/articles/yamazaki-kaitori/\", \"datePublished\": \"2026-05-14T00:00:00+09:00\", \"dateModified\": \"2026-05-18T00:00:00+09:00\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\", \"url\": \"https://peatbid.com/editorial/\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\", \"url\": \"https://peatbid.com\"}, \"mainEntityOfPage\": {\"@type\": \"WebPage\", \"@id\": \"https://peatbid.com/articles/yamazaki-kaitori/\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"\u30db\u30fc\u30e0\", \"item\": \"https://peatbid.com/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"\u5c71\u5d0e\u306e\u5e02\u5834\u76f8\u5834\"}]}" }} />
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">山崎の市場相場</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt="山崎の市場相場" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">山崎の市場相場と業者比較ガイド</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: {latestFetch}（週次自動取得）</p>

          <p>サントリー山崎は、1923年に誕生した日本最初の本格モルトウイスキー蒸溜所のフラッグシップ銘柄です。<strong>ジャパニーズウイスキーの代名詞</strong>として国際的評価が確立し、二次流通市場でも極めて高い価格で取引されています。</p>

          <p>この記事では、山崎全グレード（NV・12年・18年・25年・55年）の<strong>市場相場（Yahoo Auctions 過去180日落札中央値、IQR外れ値除去後）</strong>と、最高入札を引き出すためのポイントを解説します。</p>

          <h2>山崎の市場相場一覧</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>グレード</th>
                  <th>市場相場（Yahoo中央値）</th>
                  <th>サンプル数</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((b) => {
                  const sufficient = b.yahoo_median_jpy_180d != null && b.yahoo_sample_n >= 20;
                  return (
                    <tr key={b.slug}>
                      <td><Link href={`/articles/${b.slug}-kaitori/`} className="text-amber-dark hover:text-burgundy underline"><strong>{b.name_ja}</strong></Link></td>
                      <td>{formatJPY(b.yahoo_median_jpy_180d, sufficient)}</td>
                      <td className="text-xs text-warm-gray">{sufficient ? `n=${b.yahoo_sample_n}` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-warm-gray">※市場相場は Yahoo Auctions 過去180日の落札データ中央値（IQR外れ値除去後）。業者の買取査定額はこの市場相場をベースに各社の在庫・キャンペーン・状態評価で算出されます。最新の業者査定額は各業者ページでご確認ください。</p>

          <h2 id="each-lineup">山崎シリーズ 銘柄別ガイド</h2>

          <p>山崎は単一の商品ではなくシリーズで構成されており、グレードごとに価格帯・流通量・買い手層が大きく異なります。ここでは現行・代表的な5銘柄について、特徴・テイスティング傾向・査定の効きどころを整理します。</p>

          <h3>山崎ノンエイジ（NV / シングルモルト）</h3>
          <p>年数表記のない入門グレード。2014年に発売され、ミズナラ・シェリー・ワイン樽原酒のヴァッティングで山崎の世界観を手頃に体験できる一本です。シリーズの中では比較的入手しやすく、流通量も多いため市場が安定しています。</p>
          <ul>
            <li><strong>テイスティング傾向</strong>: いちご・さくらんぼのような赤い果実、ほのかなミズナラ由来の伽羅香。軽やかで親しみやすい</li>
            <li><strong>買い手層</strong>: ジャパニーズウイスキー入門者から日常飲用層</li>
            <li><strong>査定の効きどころ</strong>: 化粧箱の有無、未開封・液面、ラベルの汚れ。比較的相場通りの査定が出やすい銘柄</li>
            <li><Link href="/articles/yamazaki-nv-kaitori/">山崎ノンエイジ 詳細ガイド →</Link></li>
          </ul>

          <h3>山崎12年</h3>
          <p><strong>1984年発売の、日本初の本格シングルモルト</strong>として歴史的価値を持つフラッグシップ。ミズナラ樽由来の伽羅・白檀の香りとシェリーの甘みが調和します。2018年前後の品薄・出荷調整以降、市場流通量が減少しプレミア化しました。</p>
          <ul>
            <li><strong>テイスティング傾向</strong>: 蜂蜜、オレンジ、ミズナラ由来の伽羅・白檀、シェリー樽の甘やかさ。厚みとバランスに優れる</li>
            <li><strong>買い手層</strong>: 愛飲家、コレクター、海外バイヤー</li>
            <li><strong>査定の効きどころ</strong>: 旧ロット・特級表記など年代でヴィンテージ評価。化粧箱・カートンの有無で査定差が出ます</li>
            <li><Link href="/articles/yamazaki-12-kaitori/">山崎12年 詳細ガイド →</Link></li>
          </ul>

          <h3>山崎18年</h3>
          <p>深いシェリー樽熟成を軸にした濃厚な一本。特徴的な<strong>バーガンディ（ワインレッド）のラベル</strong>が目印で、贈答・コレクション需要が高いグレードです。</p>
          <ul>
            <li><strong>テイスティング傾向</strong>: 完熟果実、レーズン、シェリー樽由来の濃厚な甘みとビターチョコのような余韻</li>
            <li><strong>買い手層</strong>: 中級〜上級コレクター、贈答用需要、海外オークション参加層</li>
            <li><strong>査定の効きどころ</strong>: ラベルの色褪せ、付属品の有無、シリアル・購入証明があれば査定が伸びる傾向</li>
            <li><Link href="/articles/yamazaki-18-kaitori/">山崎18年 詳細ガイド →</Link></li>
          </ul>

          <h3>山崎25年</h3>
          <p>長期シェリー樽熟成原酒を中心にした山崎シリーズ最高峰の一つ。年間流通量が限られ、希少性が直接価格に反映される銘柄です。国内外オークションで高額落札が常態化しています。</p>
          <ul>
            <li><strong>テイスティング傾向</strong>: 深い琥珀色、ドライフルーツ、チョコレート、長期熟成由来の重層的な複雑性。非常に長い余韻</li>
            <li><strong>買い手層</strong>: 国内外コレクター、投資家、ハイエンドオークション参加層</li>
            <li><strong>査定の効きどころ</strong>: 木箱・冊子・保証書の有無が最重要。輸出向け査定ルートを持つ業者で差が出ます</li>
            <li><Link href="/articles/yamazaki-25-kaitori/">山崎25年 詳細ガイド →</Link></li>
          </ul>

          <h3>山崎55年</h3>
          <p>山崎シリーズの頂点に位置する超長期熟成ボトル。<strong>2020年に国内100本限定の抽選販売（希望小売価格300万円）</strong>で登場し、海外オークションでは数千万円規模で落札された実績があります。市場に出ること自体が稀少なグレードです。</p>
          <ul>
            <li><strong>テイスティング傾向</strong>: 半世紀超の熟成による究極の複雑性。ごく少量しか存在しない伝説的ボトル</li>
            <li><strong>買い手層</strong>: 世界的コレクター、投資家、ハイエンドオークション</li>
            <li><strong>査定の効きどころ</strong>: 木箱・保証書・購入証明・シリアルの完全性。真贋鑑定と輸出ルートを持つ専門業者が必須</li>
            <li><Link href="/articles/yamazaki-25-kaitori/">山崎の高額銘柄を売る →</Link></li>
          </ul>

          <div className="bg-cream border border-warm-border rounded-lg p-5 my-6 not-prose">
            <p className="text-sm font-bold mb-2">編集部メモ：グレードと業者選び</p>
            <p className="text-sm text-warm-gray leading-relaxed">同じ「山崎」でも、年式が上がるにつれて<strong>付属品の重要度</strong>と<strong>査定業者の選定精度</strong>が査定額に与える影響が大きくなります。NV→12→18→25→55と進むほど、地元のリサイクルショップではなく<strong>ウイスキー専門業者・海外バイヤー網を持つ業者</strong>での査定が必須です。</p>
          </div>

          <h2>なぜ山崎はここまで高騰したのか</h2>

          <p>山崎25年を例にとると、2008年の発売当時は5〜7万円台で店頭に並んでいました。それが2026年現在では極めて高値で取引されています。背景には以下の構造的要因があります。</p>

          <h3>1. 国際的品評会での連続受賞</h3>
          <p>2003年のISC（インターナショナル・スピリッツ・チャレンジ）金賞を皮切りに、ワールド・ウイスキー・アワードで山崎18年・25年が複数回最高賞を受賞。日本国外での認知が一気に広がりました。</p>

          <h3>2. アジア富裕層・中国・中東からの需要</h3>
          <p>2010年代後半以降、中国・台湾・シンガポール・中東の富裕層によるコレクター需要が急増。海外オークション（Sotheby&apos;s、Bonhams、Whisky Auctioneer等）で日本のウイスキーが連日高値で落札される現象が定着しました。</p>

          <h3>3. 終売・休売による供給制限</h3>
          <p>2018年に山崎12年・白州12年の休売が報じられ、市場流通量が一気に減少。「いずれ買えなくなる」という心理が需要をさらに押し上げました。</p>

          <h3>4. 投資対象としての地位</h3>
          <p>ジャパニーズウイスキーは「飲むもの」から「投資対象」へと位置付けが変化。長期保管によりプレミアが乗るアセットとして、富裕層のポートフォリオに組み込まれるようになっています。</p>

          <h2>状態別の業界目安（パーセンテージ）</h2>

          <p>市場相場（Yahoo中央値）を基準（100%）とした、業界一般の目安です。実際の査定額は業者により異なるため、最終的な金額は各業者ページでご確認ください。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>状態</th>
                  <th>付属品</th>
                  <th>業界目安（市場相場対比）</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>未開封・完璧</td><td>箱・冊子・カートン揃い</td><td><strong>市場相場の95〜100%程度</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td><strong>市場相場の80〜90%程度</strong></td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td><strong>市場相場の75〜88%程度</strong></td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td><strong>市場相場の55〜70%程度</strong></td></tr>
                <tr><td>開封済み</td><td>残量による</td><td><strong>市場相場の20〜40%程度</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2 id="takaku-uru">山崎を高く売る7つの実践テクニック</h2>

          <ol>
            <li><strong>付属品をすべて揃える</strong> — 外箱・冊子・カートン・ホログラムシールの有無で査定額は業界目安として10〜20%変動します。年式が上がる（18年・25年・55年）ほど影響度が大きく、木箱・保証書は欠かさず保管しましょう。</li>
            <li><strong>未開封のまま売却する</strong> — 開封後の査定額は業界目安で市場相場の20〜40%まで下がります。コレクション・投資目的で取得した個体は未開封維持が鉄則です。</li>
            <li><strong>複数業者で必ず相見積もりを取る</strong> — 同じ山崎でも業者ごとの販路（国内卸 / 海外バイヤー網 / オークション出品）の違いで<strong>数万〜数十万円</strong>の差が出ます。最低3社、可能なら5社の比較を推奨します。</li>
            <li><strong>適切な保管環境を維持する</strong> — 直射日光と急激な温度変化を避け、室温（15〜20℃）の暗所で<strong>縦置き</strong>保管。横置きはコルク劣化の原因になります。</li>
            <li><strong>需要が高まる時期を狙う</strong> — 12月の歳暮シーズン、3月の年度末贈答需要、お盆前など、業者の在庫補充タイミングを狙うとキャンペーン上乗せが期待できます。</li>
            <li><strong>購入証明・シリアル・購入経路を明示する</strong> — 正規流通品・抽選当選品など購入経路を説明できる個体は査定が伸びる傾向があります。特に25年・55年は<strong>シリアル番号・購入時のレシート</strong>の保管が査定額に影響します。</li>
            <li><strong>ウイスキー専門業者を優先する</strong> — 総合リサイクル業者と専門業者では、山崎の二次流通価値を正しく評価できる体制が異なります。海外オークション出品ルートを持つ業者ほど、18年以上の査定上限が高くなる傾向にあります。</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">参考買取相場（各業者公式ページ）</h3>
            <p className="text-sm text-warm-gray text-center mb-4">業者買取額は各社の在庫状況・キャンペーンにより変動します。最新の査定額は各業者ページで直接ご確認ください。</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">LINXAS →</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">バイセル →</a>
              <a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">福ちゃん →</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">JOYLAB →</a>
            </div>
          </div>

          
          <h2 id="fake">山崎の偽物・贋作を見分けるチェックポイント</h2>

          <p>市場価格の上昇とともに、山崎シリーズの模倣品・贋作も国内外で確認されています。買取に出す前に、自分自身でも以下のポイントを確認しておくと安心です。</p>

          <h3>パッケージ・ラベルのチェック</h3>
          <ul>
            <li><strong>「山崎」墨字の書体</strong>: 正規品は筆書きの「山崎」が自然で力強い。線が均一・機械的、にじみ方が不自然なものは要注意</li>
            <li><strong>赤い角印シール</strong>: ラベルの朱色の角印の位置・色味・印影の鮮明さを確認</li>
            <li><strong>箱の質感・印字</strong>: 正規品は紙質・箔押しの精度が高い。色味が薄い、印字がずれている、フォントが微妙に異なる場合は疑わしい</li>
          </ul>

          <h3>ボトル本体のチェック</h3>
          <ul>
            <li><strong>ボトル底の刻印</strong>: 山崎のボトル底面には製造に関わる刻印がある。不鮮明・欠落しているものは要確認</li>
            <li><strong>ガラスの厚み・重量感</strong>: 正規品はしっかりとした重量があり、成形が精緻</li>
            <li><strong>液面・色合い</strong>: 同年式・同熟成度の他個体と比較して、色味が極端に異なる場合は疑わしい</li>
          </ul>

          <h3>キャップ・封緘のチェック</h3>
          <ul>
            <li><strong>キャップの印字</strong>: 版ずれ・かすれ・印字位置のずれは要警戒</li>
            <li><strong>封緘シール</strong>: 開封防止の封緘が雑、または再貼付の痕跡がある場合は注意</li>
          </ul>

          <div className="bg-cream border border-warm-border rounded-lg p-5 my-6 not-prose">
            <p className="text-sm font-bold mb-2">編集部メモ：疑わしい場合は</p>
            <p className="text-sm text-warm-gray leading-relaxed">「もしかして偽物では？」と少しでも感じたら、ウイスキー専門の買取業者で<strong>真贋鑑定を含む査定</strong>を依頼するのが安全です。専門業者は鑑定経験が豊富で、買取後の流通責任を負う立場から、無料で鑑定を行ってくれるケースが多くなっています。</p>
          </div>

          <h2 id="partners">おすすめ買取業者4社の特徴と選び方</h2>

          <p>山崎の買取に対応している主要業者は多数ありますが、山崎シリーズに適した販路と査定体制を持つ業者を選ぶことで、最終手取り額が大きく変わります。ここでは、編集部が選定した主要4社の特徴を整理します。</p>

          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="border border-warm-border bg-white rounded-lg p-5">
              <p className="text-xs text-amber-dark font-bold mb-1">LINXAS</p>
              <p className="text-sm font-bold mb-2">ウイスキー専門の高額査定路線</p>
              <p className="text-xs text-warm-gray leading-relaxed">ジャパニーズウイスキー専門の査定体制。海外バイヤー網を持ち、山崎18年・25年・55年など高額帯で強い見積もりが出やすい傾向。</p>
            </div>
            <div className="border border-warm-border bg-white rounded-lg p-5">
              <p className="text-xs text-amber-dark font-bold mb-1">バイセル</p>
              <p className="text-sm font-bold mb-2">出張買取の全国対応力</p>
              <p className="text-xs text-warm-gray leading-relaxed">全国出張対応・申込から最短当日訪問。複数本まとめ・引っ越し時の処分など、まとまった量で利便性が高い。</p>
            </div>
            <div className="border border-warm-border bg-white rounded-lg p-5">
              <p className="text-xs text-amber-dark font-bold mb-1">福ちゃん</p>
              <p className="text-sm font-bold mb-2">古酒対応とバランス型</p>
              <p className="text-xs text-warm-gray leading-relaxed">骨董・古酒を含めた幅広い取扱で、山崎NV〜12年など流通量の多い銘柄やオールドボトルで安定した買取実績。</p>
            </div>
            <div className="border border-warm-border bg-white rounded-lg p-5">
              <p className="text-xs text-amber-dark font-bold mb-1">JOYLAB</p>
              <p className="text-sm font-bold mb-2">スピード重視のオンライン査定</p>
              <p className="text-xs text-warm-gray leading-relaxed">LINE査定など簡便な仮見積もりに強み。事前の概算把握用としても活用しやすい。</p>
            </div>
          </div>

          <p className="text-xs text-warm-gray">※ 上記は各社の公式情報・編集部の独自評価に基づく。最終的な査定額は個別状況により異なるため、複数社の相見積もりを推奨します。アフィリエイトリンクを含みます。</p>

          <h2 id="process">山崎を売却する5ステップ（完全ガイド）</h2>

          <ol>
            <li>
              <strong>STEP 1: 銘柄・状態の確認</strong>
              <p>手元の山崎がどのグレードか（NV / 12年 / 18年 / 25年 / 55年）、付属品（外箱・冊子・カートン）が揃っているか、未開封かどうかを確認します。本記事の相場一覧で大まかな目安をつけましょう。</p>
            </li>
            <li>
              <strong>STEP 2: 複数業者で仮見積もりを取る</strong>
              <p>専門業者・総合業者を含めて3〜5社の仮見積もりを依頼。各社のLINE査定・写真送信査定を活用すると効率的です。</p>
            </li>
            <li>
              <strong>STEP 3: 査定方法を選ぶ</strong>
              <p>主な選択肢は<strong>出張買取 / 宅配買取 / 店頭買取</strong>の3つ。1本のみであれば店頭または宅配、複数本・高額（25年・55年）であれば出張が便利です。</p>
            </li>
            <li>
              <strong>STEP 4: 正式査定を受ける</strong>
              <p>業者の鑑定担当者による正式査定を受け、提示金額を確認。査定明細（市場相場、状態評価、減額理由）を必ず確認し、納得した上で買取契約に進みます。</p>
            </li>
            <li>
              <strong>STEP 5: 支払い・引渡し</strong>
              <p>多くの業者で当日現金支払または銀行振込（即日〜翌営業日）が選べます。クーリングオフ対応の有無、買取契約書の控え保管も忘れずに。</p>
            </li>
          </ol>

          <h2 id="faq">山崎シリーズに関するよくある質問（FAQ）</h2>

          <div className="not-prose space-y-3 my-6">
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q1. 山崎の市場相場はいくらですか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">本サイト掲載のYahoo Auctions 過去180日落札中央値（IQR外れ値除去後）を、NV・12年・18年・25年・55年のグレード別に上の相場一覧で公開しています。業者の買取査定額はこの市場相場をベースに、状態・付属品・販路で調整されます。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q2. 山崎12年が高騰している理由は？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">2018年前後の品薄・出荷調整以降、供給が逼迫しプレミア化しました。1984年発売の日本初の本格シングルモルトという歴史的価値、国際品評会での受賞、アジア富裕層の需要拡大が評価を後押ししています。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q3. 開封済みの山崎は買い取ってもらえますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">業者によります。買取対応していても査定額は市場相場の20〜40%程度に下がるのが一般的です。コレクション・投資目的の個体は未開封維持を強く推奨します。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q4. 箱や付属品がなくても売れますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">本体のみでも買取可能ですが、業界目安として化粧箱付きより<strong>10〜20%減額</strong>になります。特に18年・25年・55年は付属品の影響が大きく、元箱・冊子・カートンの保管が重要です。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q5. 山崎と響、どちらが高く売れますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">同熟成年数で比較した場合、シングルモルトである山崎の方が二次流通価値は高い傾向です（特に12年以上）。ブレンデッドの響は安定した需要があり流動性が高いのが特徴です。詳細は <Link href="/articles/hibiki-kaitori/">響の市場相場ガイド</Link> を参照してください。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q6. 山崎の偽物・贋作はありますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">高額化に伴い模倣品が国内外で確認されています。ラベルの墨字書体・赤い角印、キャップの印字、ボトル底の刻印、液色、購入経路の整合性を確認し、不安な場合は専門業者で真贋鑑定を依頼してください。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q7. 古い山崎（オールドボトル）でも売れますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">旧ラベル・旧ロットはヴィンテージ価値が加算されるケースがあります。特に終売前の12年旧ボトルや特級表記の個体はコレクター需要から高値が付くことがあり、専門業者での査定を推奨します。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q8. 山崎55年はどのくらいの価値がありますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">山崎55年は2020年に国内100本限定の抽選販売（希望小売価格300万円）で登場し、海外オークションでは数千万円規模で落札された実績があります。流通量が極端に少なく、最新の落札データで個別に確認する必要があります。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q9. 査定後にキャンセルできますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">多くの業者で査定後・契約前のキャンセルは可能です。出張買取はクーリングオフ対象になることが多いですが、約款は業者ごとに異なるため、契約前にキャンセル条件・期限を必ず確認してください。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q10. 山崎を売るのに最適なタイミングは？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">需要が高まる年末年始・お中元・お歳暮シーズンが高値傾向です。海外オークションの落札結果が反映された直後や、終売・休売報道直後もプレミアが上昇する局面があります。本サイトの週次中央値で直近相場を確認した上で判断してください。</div>
            </details>
          </div>

        <h2 className="font-display text-xl md:text-2xl font-semibold mt-12 mb-4 text-foreground">都道府県別に売る</h2>
        <p className="text-warm-gray text-sm mb-4">お住まいの地域での年式別買取相場をご確認ください。47都道府県 × 各銘柄ごとに地元業者・地域別査定額傾向を解説しています。</p>

        <div className="not-prose space-y-3 mb-8">

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>北海道・東北（7都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">北海道</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">青森県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岩手県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">宮城県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">秋田県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山形県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>関東（7都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">茨城県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">栃木県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">群馬県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">埼玉県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">千葉県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">東京都</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">神奈川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>中部（9都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">新潟県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">富山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">石川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福井県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山梨県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">長野県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岐阜県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">静岡県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">愛知県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>近畿（7都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">三重県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">滋賀県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">京都府</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">大阪府</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">兵庫県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">奈良県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">和歌山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>中国・四国（9都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">鳥取県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">島根県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岡山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">広島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山口県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">徳島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">香川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">愛媛県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">高知県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
            </div>
          </details>

          <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
            <summary className="flex justify-between items-center p-4 font-bold cursor-pointer hover:bg-cream">
              <span>九州・沖縄（8都道府県）</span>
              <svg className="w-5 h-5 text-warm-gray faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-5 pt-2 space-y-3">
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福岡県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">佐賀県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">長崎県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">熊本県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">大分県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">宮崎県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">鹿児島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">沖縄県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-12-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎12年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-18-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎18年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-25-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎25年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/yamazaki-55-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">山崎55年</Link></li></ul>
              </div>
            </div>
          </details>

        </div>

        <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/hibiki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">響の市場相場ガイド</p>
            </Link>
            <Link href="/articles/hakushu-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">白州の市場相場ガイド</p>
            </Link>
            <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">相場情報</span>
              <p className="text-sm font-bold mt-1">ウイスキー市場相場一覧</p>
            </Link>
            <Link href="/articles/whisky-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">売却ガイド</span>
              <p className="text-sm font-bold mt-1">ウイスキーを高く売る5つのコツ</p>
            </Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {latestFetch}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
