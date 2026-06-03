import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import brandsData from "@/data/brands.json";

export const metadata: Metadata = {
  title: "響の買取相場2026 — NV/17年/21年/30年の全銘柄を徹底解説 [業者比較+高く売る7つのコツ]",
  description:
    "響シリーズ全銘柄（NV/17年/21年/30年）の市場相場（Yahoo Auctions 過去180日落札中央値）、銘柄ごとのテイスティング・価格背景、状態別の業界目安、高く売る7つのテクニック、偽物の見分け方、おすすめ業者4社比較、売却プロセス5ステップ、FAQ 10問まで網羅。",
};

type Brand = {
  slug: string;
  name_ja: string;
  origin: string;
  yahoo_median_jpy_180d: number | null;
  yahoo_sample_n: number;
  yahoo_fetched_at: string | null;
};

const brands = (brandsData as Brand[]).filter((b) => b.origin === 'サントリー');
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
      { "@type": "Question", name: "響の市場相場はいくらですか？", acceptedAnswer: { "@type": "Answer", text: "本サイト掲載の Yahoo Auctions 過去180日落札中央値（IQR外れ値除去後）は、響NV 約¥11,000、響17年 約¥47,999、響21年 約¥71,000、響30年 約¥550,000です。業者の買取査定額はこの市場相場をベースに、状態・付属品・販路で調整されます。" } },
      { "@type": "Question", name: "開封済みの響は買い取ってもらえますか？", acceptedAnswer: { "@type": "Answer", text: "業者によりますが、開封済みは買取不可とする業者が多くなっています。買取対応している場合でも査定額は市場相場の20〜40%程度に下がります。未開封維持を強く推奨します。" } },
      { "@type": "Question", name: "箱や付属品がなくても売れますか？", acceptedAnswer: { "@type": "Answer", text: "本体のみでも買取可能ですが、業界目安として化粧箱付きより10〜25%減額になります。特に響21年・30年は付属品の影響が大きく、可能な限り元の状態で保管しておくことが重要です。" } },
      { "@type": "Question", name: "響17年は終売だと聞きましたが、今後相場はどうなりますか？", acceptedAnswer: { "@type": "Answer", text: "2018年の休売以降、流通在庫が減少し、相場は中長期的な上昇基調にあります。ただし短期的にはオークション需給で変動するため、本サイトの週次中央値で直近相場を確認した上で売却タイミングを判断してください。" } },
      { "@type": "Question", name: "響と山崎、どちらが高く売れますか？", acceptedAnswer: { "@type": "Answer", text: "同熟成年数で比較した場合、シングルモルトである山崎の方が二次流通価値は高い傾向です（特に12年以上）。ブレンデッドの響は安定した需要があり、流動性は高い。" } },
      { "@type": "Question", name: "個人売買とプロ買取、どちらが有利ですか？", acceptedAnswer: { "@type": "Answer", text: "フリマアプリ・オークションは市場相場に近い金額で売却できる可能性がある一方、贋作トラブル・送料・梱包リスク・手数料が発生します。手間と保証を考えると、複数業者の相見積もりで売却するのが現実的な選択肢です。" } },
      { "@type": "Question", name: "査定で減額される主な理由は何ですか？", acceptedAnswer: { "@type": "Answer", text: "主な減額要因は (1)液面減少、(2)ラベル汚れ・破れ、(3)キャップ錆び、(4)外箱欠品・破損、(5)シリアル不鮮明、(6)保管環境の悪さによる劣化です。各要素ごとに業界目安の減額率があり、複合する場合は累積で影響します。" } },
      { "@type": "Question", name: "古い響でも買い取ってもらえますか？", acceptedAnswer: { "@type": "Answer", text: "古いロットはヴィンテージ価値が加算されるケースがあります。特に終売前の17年や旧ボトルデザインは、コレクター需要から高値が付く可能性があります。ヴィンテージ評価ができる専門業者での査定を推奨します。" } },
      { "@type": "Question", name: "査定後にキャンセルできますか？", acceptedAnswer: { "@type": "Answer", text: "多くの業者で査定後・契約前のキャンセルは可能です。出張買取の場合もクーリングオフ対象になることが多いですが、業者ごとに約款が異なるため、契約前に必ずキャンセル条件・期限を確認してください。" } },
      { "@type": "Question", name: "海外オークションに自分で出品する選択肢はありますか？", acceptedAnswer: { "@type": "Answer", text: "理論上可能ですが、出品手数料・落札手数料（合計15〜20%程度）、輸出書類・関税対応、梱包・配送のリスク管理、入金タイミングを考えると、個人での実施は現実的でないケースが多いです。海外バイヤー網を持つ業者を経由する方が、手取り・スピード両面で有利になる傾向があります。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function HibikiKaitoriPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u97ff\u306e\u5e02\u5834\u76f8\u5834\u3068\u696d\u8005\u6bd4\u8f03\u30ac\u30a4\u30c9\", \"description\": \"\u97ff\u306e\u5e02\u5834\u76f8\u5834\uff08Yahoo Auctions \u904e\u53bb180\u65e5\u843d\u672d\u4e2d\u592e\u5024\uff09\u3092\u5168\u30b0\u30ec\u30fc\u30c9\u7db2\u7f85\u3002\u6700\u65b0\u6570\u5024\u3001\u72b6\u614b\u5225\u306e\u696d\u754c\u76ee\u5b89\u3001\u696d\u8005\u6bd4\u8f03\u30ea\u30f3\u30af\u3092\u63b2\u8f09\u3002\", \"url\": \"https://peatbid.com/articles/hibiki-kaitori/\", \"datePublished\": \"2026-05-14T00:00:00+09:00\", \"dateModified\": \"2026-05-18T00:00:00+09:00\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\", \"url\": \"https://peatbid.com/editorial/\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\", \"url\": \"https://peatbid.com\"}, \"mainEntityOfPage\": {\"@type\": \"WebPage\", \"@id\": \"https://peatbid.com/articles/hibiki-kaitori/\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"\u30db\u30fc\u30e0\", \"item\": \"https://peatbid.com/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"\u97ff\u306e\u5e02\u5834\u76f8\u5834\"}]}" }} />
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">響の市場相場</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-hibiki.png" alt="響の市場相場" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">響の市場相場と業者比較ガイド</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: {latestFetch}（週次自動取得）</p>

          <p>サントリー響は、1989年に登場した日本を代表するブレンデッドウイスキー。山崎・白州・知多の3つの蒸溜所原酒をブレンドしたフラッグシップで、国際品評会での連続受賞、終売・休売による供給制限、アジア富裕層からの強い需要などを背景に、二次流通市場でも安定した高値で取引されています。</p>

          <p>本記事では、響シリーズの<strong>全銘柄を網羅</strong>し、それぞれの市場相場（Yahoo Auctions 過去180日落札中央値、IQR外れ値除去後）、特徴、価格背景、そして高値で売却するための実践テクニックまで一気通貫で解説します。</p>

          <div className="bg-cream border border-warm-border rounded-lg p-5 my-6 not-prose text-sm">
            <p className="font-bold mb-2 text-foreground">この記事でわかること</p>
            <ul className="list-disc pl-5 space-y-1 text-warm-gray">
              <li>響シリーズ全4銘柄（NV / 17年 / 21年 / 30年）の最新市場相場</li>
              <li>各銘柄の特徴・テイスティングノート・価格背景</li>
              <li>状態別の業界目安と査定額に影響する要素</li>
              <li>響を高く売るための実践テクニック7つ</li>
              <li>偽物・贋作を見分けるチェックポイント</li>
              <li>おすすめ買取業者4社の比較と選び方</li>
              <li>売却プロセスの5ステップ完全ガイド</li>
            </ul>
          </div>

          <h2 id="lineup">響シリーズ全銘柄の市場相場一覧</h2>

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

          <h2 id="each-lineup">響シリーズ 銘柄別ガイド</h2>

          <p>響は単一の商品ではなくシリーズで構成されており、銘柄ごとに価格帯・流通量・買い手層が大きく異なります。ここでは現行・代表的な4銘柄について、特徴・市場相場・価格背景を整理します。</p>

          <h3>響ジャパニーズハーモニー（NV）</h3>
          <p>響シリーズの入門グレードで、年数表記のないノンエイジ。2015年の発売以来、世界中で響ブランドの裾野を広げてきました。Yahoo中央値は <strong>¥11,000前後</strong>と、響シリーズの中では比較的入手しやすい価格帯です。サンプル数 n=264 と流通量も多く、市場が安定しているのが特徴です。</p>
          <ul>
            <li><strong>テイスティング傾向</strong>: 蜂蜜・オレンジピール・白檀のような甘やかさとフローラルな広がり。フィニッシュは短〜中程度で軽やか</li>
            <li><strong>買い手層</strong>: ウイスキー入門者から日常飲用層まで幅広い</li>
            <li><strong>査定の効きどころ</strong>: 付属の化粧箱の有無、未開封・液面、ラベルの汚れ。比較的相場通りの査定が出やすい銘柄</li>
            <li><Link href="/articles/hibiki-nv-kaitori/">響ジャパニーズハーモニー 詳細ガイド →</Link></li>
          </ul>

          <h3>響17年</h3>
          <p>長らく響シリーズの中核を担ってきた17年熟成。<strong>2018年に終売（公式には休売）</strong>が報じられて以降、市場流通量が急減し、現在のYahoo中央値は <strong>¥47,999前後</strong>と発売当時の数倍水準で取引されています。サンプル数 n=268 と取引は活発で、買取業者の在庫需要も継続的に高い水準です。</p>
          <ul>
            <li><strong>テイスティング傾向</strong>: 山崎・白州モルトを軸に、ミズナラ樽由来の伽羅・香木様の余韻が長く続く。バランスの良い厚みと複雑性</li>
            <li><strong>買い手層</strong>: ジャパニーズウイスキー愛飲家、コレクター、海外バイヤー</li>
            <li><strong>査定の効きどころ</strong>: 終売後ロットは付属品込みで査定が大きく変動。化粧箱・ホログラム・カートンの有無で <strong>20〜40%</strong> の差が出ます</li>
            <li><Link href="/articles/hibiki-17-kaitori/">響17年 詳細ガイド →</Link></li>
          </ul>

          <h3>響21年</h3>
          <p>21年以上熟成原酒のみをブレンドした、響シリーズの最高峰の一つ。<strong>ISC（International Spirits Challenge）で2010年・2013年など複数回トロフィー受賞</strong>歴を持つフラッグシップです。Yahoo中央値は <strong>¥71,000前後</strong>、サンプル数 n=240。</p>
          <ul>
            <li><strong>テイスティング傾向</strong>: 熟したフルーツ、蜂蜜、シェリー樽由来の重層的な甘み、ミズナラの伽羅香。フィニッシュは非常に長い</li>
            <li><strong>買い手層</strong>: 中級〜上級コレクター、贈答用需要、海外オークション参加層</li>
            <li><strong>査定の効きどころ</strong>: 付属品の有無、化粧箱の傷み、ラベルの色褪せ。シリアル管理や購入証明があれば査定が伸びる傾向</li>
            <li><Link href="/articles/hibiki-21-kaitori/">響21年 詳細ガイド →</Link></li>
          </ul>

          <h3>響30年</h3>
          <p>響シリーズの頂点に位置する超長期熟成ボトル。年間生産本数が極端に限られ、Yahoo中央値は <strong>¥550,000前後</strong>、サンプル数 n=74 と、希少性が直接価格に反映される銘柄です。国内オークション・海外オークションの双方で高額落札が常態化しています。</p>
          <ul>
            <li><strong>テイスティング傾向</strong>: 深い琥珀色、濃厚なドライフルーツ、ナッツ、シガーボックス、ミズナラ由来の伽羅香が複合的に重なる</li>
            <li><strong>買い手層</strong>: 国内外コレクター、投資家、海外ハイエンドオークション参加層</li>
            <li><strong>査定の効きどころ</strong>: 木箱・冊子・保証書・カートンが揃っているかが最重要。輸出向け査定ルートを持つ業者で大きな差が出ます</li>
            <li><Link href="/articles/hibiki-30-kaitori/">響30年 詳細ガイド →</Link></li>
          </ul>

          <div className="bg-cream border border-warm-border rounded-lg p-5 my-6 not-prose">
            <p className="text-sm font-bold mb-2">編集部メモ：銘柄選びと売却タイミング</p>
            <p className="text-sm text-warm-gray leading-relaxed">同じ「響」でも、年式が上がるにつれて<strong>付属品の重要度</strong>と<strong>査定業者の選定精度</strong>が査定額に与える影響が指数関数的に大きくなります。NV→17→21→30と進むほど、地元のリサイクルショップではなく<strong>ウイスキー専門業者・海外バイヤー網を持つ業者</strong>での査定が必須です。</p>
          </div>

          <h2 id="history">響ブランドの歴史と市場価値の形成</h2>

          <h3>1. 1989年: サントリー創業90周年記念ボトルとしての誕生</h3>
          <p>響は、サントリー創業90周年を記念して1989年に登場しました。当初は<strong>「響17年」</strong>のみのラインナップで、山崎・白州・知多原酒の高度なブレンドにより、ジャパニーズウイスキーの新基準を打ち立てた製品です。</p>

          <h3>2. 国際的品評会での連続受賞</h3>
          <p>2003年以降、響17年・21年・30年は ISC（International Spirits Challenge）、WSC（Whisky Magazine Awards 等）で最高賞を複数回獲得。日本のブレンデッドウイスキーが世界最高水準であることを示し、海外コレクター需要を急拡大させました。</p>

          <h3>3. 2018年: 響17年の休売と市場急変</h3>
          <p>2018年9月、サントリーは響17年の<strong>休売（事実上の終売）</strong>を発表。流通在庫が急減する中、コレクター・投資家・海外バイヤーが一斉に取得に動き、終売直前の希望小売価格を大きく上回る価格で取引される状況が定着しました。これは響シリーズ全体の市場価値再評価のきっかけとなっています。</p>

          <h3>4. アジア富裕層の参入</h3>
          <p>2010年代後半以降、中国本土・香港・台湾・シンガポール・中東圏の富裕層がジャパニーズウイスキー市場に本格参入。ボウモア・マッカランと並んで響はアジア圏の二次流通市場で看板銘柄となり、国内相場を海外落札が押し上げる構造が定着しました。</p>

          <h3>5. 「液体資産」としての地位</h3>
          <p>近年、株式・債券・不動産以外の代替資産として、ジャパニーズウイスキーは<strong>「液体資産」</strong>と呼ばれる投資対象として認知されています。響はこのカテゴリーの中核銘柄で、ポートフォリオの一部として保有されるケースが増えています。</p>

          <h3>6. 模倣品・贋作リスクの増加</h3>
          <p>市場価格の上昇に伴い、模倣品・贋作も国内外で確認されています。後述の<a href="#fake">偽物の見分け方</a>で具体的なチェックポイントを解説しますが、特に響21年・30年は購入経路・付属品の整合性確認が高額査定の鍵となります。</p>

          <h2 id="why-expensive">なぜ響シリーズは高額になるのか</h2>

          <p>響の市場価格が高水準で安定している背景には、需給両面の構造的な要因があります。</p>

          <h3>需給ギャップが恒常的に大きい</h3>
          <ul>
            <li><strong>原酒の枯渇</strong>: 山崎・白州蒸溜所の高熟成原酒（17年以上）は仕込み年が限られ、現在の出荷ペースで枯渇に向かっている</li>
            <li><strong>新規仕込み増産の効果は最低17年後</strong>: 増産策が市場に反映されるまで物理的なタイムラグが大きく、短期的な需給改善は困難</li>
            <li><strong>世界的な日本ウイスキー需要拡大</strong>: 既存ファン層 + 新興市場（特にアジア）からの需要が継続的に拡大</li>
          </ul>

          <h3>ブランド価値の三層構造</h3>
          <ul>
            <li><strong>飲用価値</strong>: テイスティング体験そのものの価値</li>
            <li><strong>コレクション価値</strong>: ボトル所有によるステータス・ライフスタイル価値</li>
            <li><strong>投資価値</strong>: 値上がり益を期待した資産保有としての価値</li>
          </ul>
          <p>響はこの3層すべてに該当する稀有なブランドで、需要層が広いため、相場が下落しにくい特性を持ちます。</p>

          <h2 id="state-price">状態別の業界目安（パーセンテージ）</h2>

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

          <h2 id="takaku-uru">響を高く売る7つの実践テクニック</h2>

          <ol>
            <li>
              <strong>付属品をすべて揃える</strong> — 外箱・冊子・カートン・ホログラムシールの有無で査定額は業界目安として10〜25%変動します。年式が上がる（21年・30年）ほど影響度が大きく、特に木箱・保証書は欠かさず保管しましょう。
            </li>
            <li>
              <strong>未開封のまま売却する</strong> — 開封後の査定額は業界目安で市場相場の20〜40%まで下がります。コレクション・投資目的で取得した個体は未開封維持が鉄則です。
            </li>
            <li>
              <strong>複数業者で必ず相見積もりを取る</strong> — 同じ響でも業者ごとの販路（国内卸 / 海外バイヤー網 / オークション出品）の違いで <strong>数万〜数十万円</strong>の差が出ます。最低3社、可能なら5社の見積もり比較を推奨します。
            </li>
            <li>
              <strong>適切な保管環境を維持する</strong> — 直射日光と急激な温度変化を避け、室温（15〜20℃）の暗所で<strong>縦置き</strong>保管。横置きはコルク劣化の原因になります。
            </li>
            <li>
              <strong>需要が高まる時期を狙う</strong> — 12月の歳暮シーズン、3月の年度末贈答需要、お盆前など、業者の在庫補充タイミングを狙うとキャンペーン上乗せが期待できます。
            </li>
            <li>
              <strong>購入証明・シリアル・購入経路を明示する</strong> — 正規輸入品・並行輸入品・抽選当選品など、購入経路を説明できる個体は査定が伸びる傾向があります。特に響30年は <strong>シリアル番号・購入時のレシート</strong>の保管が査定額に影響します。
            </li>
            <li>
              <strong>ウイスキー専門業者を優先する</strong> — 総合リサイクル業者と専門業者では、響の二次流通価値を正しく評価できる体制が異なります。海外オークション出品ルートを持つ業者ほど、響21年・30年の査定上限が高くなる傾向にあります。
            </li>
          </ol>

          <h2 id="fake">響の偽物・贋作を見分けるチェックポイント</h2>

          <p>市場価格の上昇とともに、響シリーズの模倣品・贋作も国内外で確認されています。買取に出す前に、自分自身でも以下のポイントを確認しておくと安心です。</p>

          <h3>パッケージ・ラベルのチェック</h3>
          <ul>
            <li><strong>箱の質感・印字</strong>: 正規品は紙質・箔押しの精度が高い。色味が薄い、印字がずれている、フォントが微妙に異なる場合は要注意</li>
            <li><strong>ラベルの貼付精度</strong>: わずかな傾き、糊のはみ出し、文字の滲みがあれば疑わしい</li>
            <li><strong>ホログラムシール</strong>: 響17年・21年・30年には正規品識別の要素が含まれており、角度を変えて見たときの輝き方が均一かを確認</li>
          </ul>

          <h3>ボトル本体のチェック</h3>
          <ul>
            <li><strong>24面カット</strong>: 響のシグネチャーである24面カットボトル。面の角度・対称性が雑な個体は要注意</li>
            <li><strong>ガラスの厚み・重量感</strong>: 正規品はしっかりとした重量があり、底面の刻印やロゴが鮮明</li>
            <li><strong>液面・色合い</strong>: 同年式・同熟成度の他個体と比較して、色味が極端に異なる場合は疑わしい</li>
          </ul>

          <h3>キャップ・封緘のチェック</h3>
          <ul>
            <li><strong>キャップの色・印字</strong>: 響17年・21年などはキャップに細かな印字が施されている。版ずれ・かすれは要警戒</li>
            <li><strong>封緘シール</strong>: 開封防止の封緘が雑、または明らかに再貼付された痕跡がある場合は注意</li>
          </ul>

          <div className="bg-cream border border-warm-border rounded-lg p-5 my-6 not-prose">
            <p className="text-sm font-bold mb-2">編集部メモ：疑わしい場合は</p>
            <p className="text-sm text-warm-gray leading-relaxed">「もしかして偽物では？」と少しでも感じたら、ウイスキー専門の買取業者で<strong>真贋鑑定を含む査定</strong>を依頼するのが安全です。専門業者は鑑定経験が豊富で、買取後の流通責任を負う立場から、無料で鑑定を行ってくれるケースが多くなっています。</p>
          </div>

          <h2 id="partners">おすすめ買取業者4社の特徴と選び方</h2>

          <p>響の買取に対応している主要業者は多数ありますが、響シリーズに適した販路と査定体制を持つ業者を選ぶことで、最終手取り額が大きく変わります。ここでは、編集部が選定した主要4社の特徴を整理します。</p>

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

          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="border border-warm-border bg-white rounded-lg p-5">
              <p className="text-xs text-amber-dark font-bold mb-1">LINXAS</p>
              <p className="text-sm font-bold mb-2">ウイスキー専門の高額査定路線</p>
              <p className="text-xs text-warm-gray leading-relaxed">ジャパニーズウイスキー専門の査定体制。海外バイヤー網を持ち、響21年・30年など高額帯で強い見積もりが出やすい傾向。</p>
            </div>
            <div className="border border-warm-border bg-white rounded-lg p-5">
              <p className="text-xs text-amber-dark font-bold mb-1">バイセル</p>
              <p className="text-sm font-bold mb-2">出張買取の全国対応力</p>
              <p className="text-xs text-warm-gray leading-relaxed">全国出張対応・申込から最短当日訪問。複数本まとめ・引っ越し時の処分など、まとまった量で利便性が高い。</p>
            </div>
            <div className="border border-warm-border bg-white rounded-lg p-5">
              <p className="text-xs text-amber-dark font-bold mb-1">福ちゃん</p>
              <p className="text-sm font-bold mb-2">古酒対応とバランス型</p>
              <p className="text-xs text-warm-gray leading-relaxed">骨董・古酒を含めた幅広い取扱で、響NV〜17年など流通量の多い銘柄で安定した買取実績。</p>
            </div>
            <div className="border border-warm-border bg-white rounded-lg p-5">
              <p className="text-xs text-amber-dark font-bold mb-1">JOYLAB</p>
              <p className="text-sm font-bold mb-2">スピード重視のオンライン査定</p>
              <p className="text-xs text-warm-gray leading-relaxed">LINE査定など簡便な仮見積もりに強み。事前の概算把握用としても活用しやすい。</p>
            </div>
          </div>

          <p className="text-xs text-warm-gray">※ 上記は各社の公式情報・編集部の独自評価に基づく。最終的な査定額は個別状況により異なるため、複数社の相見積もりを推奨します。アフィリエイトリンクを含みます。</p>

          <h2 id="process">響を売却する5ステップ（完全ガイド）</h2>

          <ol>
            <li>
              <strong>STEP 1: 銘柄・状態の確認</strong>
              <p>手元の響がどのグレードか（NV / 17年 / 21年 / 30年）、付属品（外箱・冊子・カートン・ホログラム）が揃っているか、未開封かどうかを確認します。本記事の<a href="#lineup">相場一覧</a>で大まかな目安をつけましょう。</p>
            </li>
            <li>
              <strong>STEP 2: 複数業者で仮見積もりを取る</strong>
              <p>専門業者・総合業者を含めて3〜5社の仮見積もりを依頼。各社のLINE査定・写真送信査定を活用すると効率的です。</p>
            </li>
            <li>
              <strong>STEP 3: 査定方法を選ぶ</strong>
              <p>主な選択肢は<strong>出張買取 / 宅配買取 / 店頭買取</strong>の3つ。1本のみであれば店頭または宅配、複数本・高額（21年・30年）であれば出張が便利です。</p>
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

          <h2 id="faq">響シリーズに関するよくある質問（FAQ）</h2>

          <div className="not-prose space-y-3 my-6">
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q1. 響の市場相場はいくらですか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">本サイト掲載のYahoo Auctions 過去180日落札中央値（IQR外れ値除去後）は、NV 約¥11,000、17年 約¥47,999、21年 約¥71,000、30年 約¥550,000です。業者の買取査定額はこの市場相場をベースに、状態・付属品・販路で調整されます。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q2. 開封済みの響は買い取ってもらえますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">業者によりますが、開封済みは買取不可とする業者が多くなっています。買取対応している場合でも査定額は市場相場の20〜40%程度に下がります。未開封維持を強く推奨します。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q3. 箱や付属品がなくても売れますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">本体のみでも買取可能ですが、業界目安として化粧箱付きより<strong>10〜25%減額</strong>になります。特に響21年・30年は付属品の影響が大きく、可能な限り元の状態で保管しておくことが重要です。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q4. 響17年は終売だと聞きましたが、今後相場はどうなりますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">2018年の休売以降、流通在庫が減少し、相場は中長期的な上昇基調にあります。ただし短期的にはオークション需給で変動するため、本サイトの週次中央値で<strong>直近相場を確認した上で売却タイミング</strong>を判断してください。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q5. 響と山崎、どちらが高く売れますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">同熟成年数で比較した場合、シングルモルトである山崎の方が二次流通価値は高い傾向です（特に12年以上）。ブレンデッドの響は安定した需要があり、流動性は高い。詳細は <Link href="/articles/yamazaki-kaitori/">山崎の市場相場ガイド</Link> を参照してください。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q6. 個人売買とプロ買取、どちらが有利ですか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">フリマアプリ・オークションは市場相場に近い金額で売却できる可能性がある一方、贋作トラブル・送料・梱包リスク・手数料が発生します。手間と保証を考えると、複数業者の相見積もりで売却するのが現実的な選択肢です。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q7. 査定で減額される主な理由は何ですか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">主な減額要因は (1)液面減少、(2)ラベル汚れ・破れ、(3)キャップ錆び、(4)外箱欠品・破損、(5)シリアル不鮮明、(6)保管環境の悪さによる劣化です。各要素ごとに業界目安の減額率があり、複合する場合は累積で影響します。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q8. 古い響（10年以上前のロット）でも買い取ってもらえますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">古いロットは<strong>ヴィンテージ価値が加算</strong>されるケースがあります。特に終売前の17年や旧ボトルデザインは、コレクター需要から高値が付く可能性があります。ヴィンテージ評価ができる専門業者での査定を推奨します。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q9. 査定後にキャンセルできますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">多くの業者で査定後・契約前のキャンセルは可能です。出張買取の場合もクーリングオフ対象になることが多いですが、業者ごとに約款が異なるため、契約前に必ず<strong>キャンセル条件・期限</strong>を確認してください。</div>
            </details>
            <details className="bg-white border border-warm-border rounded-lg overflow-hidden">
              <summary className="p-4 font-semibold text-sm cursor-pointer hover:bg-cream">Q10. 海外オークションに自分で出品する選択肢はありますか？</summary>
              <div className="px-4 pb-4 text-sm text-warm-gray leading-relaxed">理論上可能ですが、(1)出品手数料・落札手数料（合計15〜20%程度）、(2)輸出書類・関税対応、(3)梱包・配送のリスク管理、(4)入金タイミングを考えると、個人での実施は現実的でないケースが多いです。海外バイヤー網を持つ業者を経由する方が、手取り・スピード両面で有利になる傾向があります。</div>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hokkaido/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hokkaido/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">青森県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/aomori/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aomori/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岩手県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/iwate/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/iwate/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">宮城県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/miyagi/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyagi/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">秋田県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/akita/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/akita/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山形県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamagata/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamagata/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukushima/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukushima/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ibaraki/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ibaraki/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">栃木県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tochigi/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tochigi/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">群馬県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/gunma/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gunma/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">埼玉県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/saitama/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saitama/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">千葉県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/chiba/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/chiba/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">東京都</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tokyo/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokyo/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">神奈川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kanagawa/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kanagawa/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/niigata/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/niigata/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">富山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/toyama/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/toyama/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">石川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ishikawa/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ishikawa/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">福井県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukui/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukui/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山梨県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamanashi/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamanashi/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">長野県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nagano/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagano/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岐阜県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/gifu/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/gifu/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">静岡県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shizuoka/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shizuoka/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">愛知県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/aichi/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/aichi/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/mie/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/mie/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">滋賀県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shiga/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shiga/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">京都府</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kyoto/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kyoto/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">大阪府</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/osaka/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/osaka/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">兵庫県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hyogo/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hyogo/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">奈良県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nara/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nara/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">和歌山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/wakayama/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/wakayama/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tottori/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tottori/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">島根県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/shimane/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/shimane/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">岡山県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/okayama/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okayama/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">広島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/hiroshima/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/hiroshima/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">山口県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/yamaguchi/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">徳島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/tokushima/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/tokushima/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">香川県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kagawa/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagawa/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">愛媛県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/ehime/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/ehime/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">高知県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kochi/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kochi/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
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
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/fukuoka/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/fukuoka/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">佐賀県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/saga/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/saga/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">長崎県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/nagasaki/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/nagasaki/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">熊本県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kumamoto/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kumamoto/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">大分県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/oita/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/oita/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">宮崎県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/miyazaki/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/miyazaki/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">鹿児島県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/kagoshima/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/kagoshima/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
              <div className="border-b border-warm-border pb-2 last:border-b-0">
                <p className="font-semibold text-sm mb-1">沖縄県</p>
                <ul className="flex flex-wrap"><li className="inline-block mr-3"><Link href="/tier2/okinawa/hibiki-nv-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響NV</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/hibiki-17-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響17年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/hibiki-21-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響21年</Link></li><li className="inline-block mr-3"><Link href="/tier2/okinawa/hibiki-30-kaitori/" className="text-amber-dark underline hover:text-burgundy text-xs">響30年</Link></li></ul>
              </div>
            </div>
          </details>

        </div>

        <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">山崎の市場相場ガイド</p>
            </Link>
            <Link href="/articles/hakushu-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">白州の市場相場ガイド</p>
            </Link>
            <Link href="/articles/macallan-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">マッカランの市場相場ガイド</p>
            </Link>
            <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">相場情報</span>
              <p className="text-sm font-bold mt-1">ウイスキー市場相場一覧</p>
            </Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 {latestFetch}）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
