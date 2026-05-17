import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "【2026年最新】響の買取相場ガイド — ハーモニー・17年・21年・30年",
  description:
    "サントリー響の最新買取相場を全グレード網羅。ジャパニーズハーモニー・17年・21年・30年の価格、終売プレミア、ブレンデッドの査定基準、高く売るコツを徹底解説。",
};

function FaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "響30年は今いくらで売れますか？", acceptedAnswer: { "@type": "Answer", text: "2026年5月現在、響30年（未開封・箱付き）の買取相場は約100〜120万円前後です。古いラベルや特殊ボトルはさらに高値の場合があります。" } },
      { "@type": "Question", name: "響17年が終売後高騰しているのはなぜですか？", acceptedAnswer: { "@type": "Answer", text: "2018年の休売以降、市場流通量が激減。コレクター・投資需要に加え海外輸出需要も重なり、終売前の数倍の価格で取引されています。" } },
      { "@type": "Question", name: "響ジャパニーズハーモニーも買取対象ですか？", acceptedAnswer: { "@type": "Answer", text: "はい、現行品の響ハーモニーも買取対象です。相場は約13,000〜17,000円前後（未開封・箱付き）。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function HibikiKaitoriPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">響の買取相場</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-hibiki.png" alt="響の買取相場" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">響の買取相場ガイド</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月11日</p>

          <p>サントリーの<strong>「響」</strong>は、1989年に同社100周年を記念して誕生したプレステージ・ブレンデッドウイスキー。山崎・白州・知多の原酒を巧みにブレンドした調和の取れた味わいが、国際的にも高く評価されています。</p>

          <p>本記事では、響シリーズ全グレードの<strong>2026年5月時点の買取相場</strong>と、ブレンデッドウイスキーならではの査定ポイントを解説します。</p>

          <h2>響の買取相場一覧</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>グレード</th>
                  <th>買取相場（未開封・箱付き）</th>
                  <th>備考</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>響 ジャパニーズハーモニー</strong></td><td>13,000〜17,000円</td><td>現行品。ノンエイジ定番</td></tr>
                <tr><td><strong>響17年</strong></td><td>160,000〜200,000円</td><td>2018年休売後にプレミア化</td></tr>
                <tr><td><strong>響21年</strong></td><td>380,000〜450,000円</td><td>世界的賞獲得の常連</td></tr>
                <tr><td><strong>響30年</strong></td><td>1,000,000〜1,200,000円</td><td>究極の長期熟成ブレンド</td></tr>
              </tbody>
            </table>
          </div>

          <p>※相場は2026年5月11日時点の参考値。古いラベルや限定ボトル（マイスターズセレクション等）はさらに高値になることがあります。</p>

          <h2>響シリーズの特徴と評価ポイント</h2>

          <h3>調和の美学を体現する世界最高峰のブレンデッド</h3>
          <p>響は山崎・白州（モルト原酒）と知多（グレーン原酒）を、サントリーのチーフブレンダーが調和させたウイスキー。<strong>「Japanese Harmony」</strong>という名の通り、複数の原酒が織りなすバランスの良さが特長です。</p>

          <h3>国際的評価</h3>
          <ul>
            <li>2003年〜現在まで、ISC（インターナショナル・スピリッツ・チャレンジ）で金賞・トロフィー賞を多数受賞</li>
            <li>『キル・ビル』『LOST IN TRANSLATION』など海外映画に登場し世界的知名度が確立</li>
            <li>世界三大ウイスキー品評会で度々最高賞を獲得</li>
          </ul>

          <h3>2018年休売による市場変化</h3>
          <p>響17年・響21年・響30年は2018年6月に休売（実質的な販売停止）が発表され、市場流通量が激減。終売直前は1本2万円台で買えた響17年が、現在では16万円以上で取引されています。</p>

          <h2>古いラベルのプレミア</h2>

          <p>響には複数の世代があり、ラベルデザインによって買取価格が大きく変わります。</p>

          <h3>パーフェクトSUNTORY（モール栓・木箱）</h3>
          <p>1989年発売初期の響17年・21年・30年は、栓部分が木製モールド、木箱入りで「パーフェクトSUNTORY」と呼ばれます。希少性が極めて高く、通常品の<strong>1.5〜2倍</strong>の買取価格になることがあります。</p>

          <h3>2015年以前のラベル</h3>
          <p>ボトル形状・ラベルデザインが微妙に異なり、コレクター需要が存在します。査定時には<strong>「いつ購入したか・どのラベルか」を業者に伝える</strong>と適正評価につながります。</p>

          <h2>響を高く売る5つのポイント</h2>

          <ol>
            <li><strong>箱と冊子を必ず揃える</strong> — 響は箱の保存状態が査定に大きく影響します。シミ・破れがあると-15〜25%</li>
            <li><strong>未開封のまま売る</strong> — ブレンデッドは長期熟成感が魅力。開封でこの価値が大きく目減りします</li>
            <li><strong>ラベル世代を業者に伝える</strong> — 古ラベルは「ヴィンテージ価値」が査定額に加算されることがあります</li>
            <li><strong>複数業者で相見積もり</strong> — 響17年では業者間で<strong>3〜5万円の差</strong>が出ることもあります</li>
            <li><strong>セット売却を検討</strong> — 響17年・21年・30年の3本セットや響＋山崎セットは個別売却より高くなる場合があります</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">響の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">古いラベル・希少ボトルこそ専門家の査定を受けるべきです。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
            </div>
          </div>

          <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">山崎の買取相場と高く売る方法</p>
            </Link>
            <Link href="/articles/hakushu-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">白州の買取相場ガイド</p>
            </Link>
            <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">相場情報</span>
              <p className="text-sm font-bold mt-1">ウイスキー買取相場一覧</p>
            </Link>
            <Link href="/articles/whisky-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">売却ガイド</span>
              <p className="text-sm font-bold mt-1">ウイスキーを高く売る5つのコツ</p>
            </Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の相場は2026年5月11日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        
          {/* Plan E: Auto Internal Links */}
          <section className="bg-gold-bg/40 border border-warm-border rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">📚 関連記事</h2>
          <div className="not-prose mt-5">
            <h3 className="font-bold text-base mb-2 text-ink">🎯 関連ガイド</h3>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
            </ul>
          </div>
          </section>
          </article>
      </div>
    </>
  );
}
