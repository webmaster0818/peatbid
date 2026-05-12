import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "【2026年最新】山崎の買取相場と高く売る方法 — NV・12年・18年・25年・55年",
  description:
    "サントリー山崎の最新買取相場を全グレード網羅。NV・12年・18年・25年・55年の価格、終売プレミア、状態別の査定額、高く売るための実践ポイントを解説。",
};

function FaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "山崎25年は今いくらで売れますか？", acceptedAnswer: { "@type": "Answer", text: "2026年5月現在、山崎25年（未開封・箱付き）の買取相場は1本あたり約88〜95万円前後です。状態により上下します。" } },
      { "@type": "Question", name: "山崎12年が高騰している理由は？", acceptedAnswer: { "@type": "Answer", text: "山崎12年は2018年前後の終売報道以降、供給が逼迫しプレミア化しました。国際的な品評会受賞も評価を後押ししています。" } },
      { "@type": "Question", name: "山崎を高く売るには？", acceptedAnswer: { "@type": "Answer", text: "(1)付属品（箱・冊子・カートン）を揃える、(2)未開封のまま売る、(3)複数業者で見積もりを取る、(4)直射日光を避け縦置きで保管、の4つが基本です。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function YamazakiKaitoriPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">山崎の買取相場</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt="山崎の買取相場" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">山崎の買取相場と高く売る方法</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月11日</p>

          <p>サントリー山崎は、1923年に誕生した日本最初の本格モルトウイスキー蒸溜所のフラッグシップ銘柄です。<strong>ジャパニーズウイスキーの代名詞</strong>として国際的評価が確立し、二次流通市場でも極めて高い価格で取引されています。</p>

          <p>この記事では、山崎全グレード（NV・12年・18年・25年・55年）の<strong>2026年5月時点の買取相場</strong>と、最高入札を引き出すためのポイントを解説します。</p>

          <h2>山崎の買取相場一覧</h2>

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
                <tr><td><strong>山崎 NV（ノンエイジ）</strong></td><td>16,000〜20,000円</td><td>定番。流通量多め</td></tr>
                <tr><td><strong>山崎12年</strong></td><td>35,000〜42,000円</td><td>終売報道後にプレミア化</td></tr>
                <tr><td><strong>山崎18年</strong></td><td>210,000〜250,000円</td><td>世界的評価最高峰</td></tr>
                <tr><td><strong>山崎25年</strong></td><td>880,000〜950,000円</td><td>2008年から17倍以上に高騰</td></tr>
                <tr><td><strong>山崎55年</strong></td><td>25,000,000〜35,000,000円</td><td>100本限定、伝説のボトル</td></tr>
              </tbody>
            </table>
          </div>

          <p>※相場は2026年5月11日時点の参考値。業者により提示額は変動します。</p>

          <h2>なぜ山崎はここまで高騰したのか</h2>

          <p>山崎25年を例にとると、2008年の発売当時は5〜7万円台で店頭に並んでいました。それが2026年現在では<strong>約88〜95万円、17年で17倍以上</strong>。背景には以下の構造的要因があります。</p>

          <h3>1. 国際的品評会での連続受賞</h3>
          <p>2003年のISC（インターナショナル・スピリッツ・チャレンジ）金賞を皮切りに、ワールド・ウイスキー・アワードで山崎18年・25年が複数回最高賞を受賞。日本国外での認知が一気に広がりました。</p>

          <h3>2. アジア富裕層・中国・中東からの需要</h3>
          <p>2010年代後半以降、中国・台湾・シンガポール・中東の富裕層によるコレクター需要が急増。海外オークション（Sotheby's、Bonhams、Whisky Auctioneer等）で日本のウイスキーが連日高値で落札される現象が定着しました。</p>

          <h3>3. 終売・休売による供給制限</h3>
          <p>2018年に山崎12年・白州12年の休売が報じられ、市場流通量が一気に減少。「いずれ買えなくなる」という心理が需要をさらに押し上げました。</p>

          <h3>4. 投資対象としての地位</h3>
          <p>ジャパニーズウイスキーは「飲むもの」から「投資対象」へと位置付けが変化。長期保管によりプレミアが乗るアセットとして、富裕層のポートフォリオに組み込まれるようになっています。</p>

          <h2>状態別の査定額（山崎25年を例に）</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>状態</th>
                  <th>付属品</th>
                  <th>査定額の目安</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>未開封・完璧</td><td>箱・冊子・カートン揃い</td><td><strong>880,000〜950,000円</strong></td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td>750,000〜820,000円</td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td>700,000〜780,000円</td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td>480,000〜620,000円</td></tr>
                <tr><td>開封済み</td><td>残量による</td><td>個別査定</td></tr>
              </tbody>
            </table>
          </div>

          <h2>山崎を高く売る4つのポイント</h2>

          <ol>
            <li><strong>付属品をすべて揃える</strong> — 外箱・冊子・カートン・ホログラムシールの有無で査定額は10〜20%変動します。購入時の状態を維持しましょう。</li>
            <li><strong>未開封のままで売却</strong> — 開封済みは査定額が大幅に下がります。コレクション目的で購入したものは未開封維持が鉄則です。</li>
            <li><strong>複数業者で相見積もり</strong> — 同じ山崎25年でも業者により<strong>数万〜数十万円</strong>の差が出ます。ヒカカク等の一括査定でまず相場感を把握しましょう。</li>
            <li><strong>適切な保管環境</strong> — 直射日光を避け、室温（15〜20℃）で縦置き保管。ラベルの色あせや液面の目減りを防ぎます。</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">山崎の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
            </div>
          </div>

          <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/hibiki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">響の買取相場ガイド</p>
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
        </article>
      </div>
    </>
  );
}
