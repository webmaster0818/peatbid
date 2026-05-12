import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "【2026年最新】白州の買取相場ガイド — NV・12年・18年・25年",
  description:
    "サントリー白州の最新買取相場と査定ポイント。森のウイスキー・白州12年の終売プレミア、18年・25年の長期熟成プライス、状態別の係数を徹底解説。",
};

function FaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "白州12年が高騰しているのはなぜ？", acceptedAnswer: { "@type": "Answer", text: "2018年6月の休売以降、市場流通量が激減。コレクター需要と海外輸出により、休売前の2倍以上の価格で取引されています。" } },
      { "@type": "Question", name: "白州25年は今いくらで売れますか？", acceptedAnswer: { "@type": "Answer", text: "2026年5月現在、白州25年（未開封・箱付き）は約90〜100万円前後の買取相場です。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function HakushuKaitoriPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">白州の買取相場</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-yamazaki.png" alt="白州の買取相場" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">白州の買取相場ガイド</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月11日</p>

          <p>サントリー白州蒸溜所は南アルプスの森の中、標高700mに位置する「<strong>森のウイスキー</strong>」と呼ばれる蒸溜所です。爽やかなスモーキーさと軽やかな飲み口で、ジャパニーズウイスキー4大蒸溜所の一角を担います。</p>

          <h2>白州の買取相場一覧</h2>

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
                <tr><td><strong>白州 NV（ノンエイジ）</strong></td><td>15,000〜19,000円</td><td>定番。流通量多め</td></tr>
                <tr><td><strong>白州12年</strong></td><td>38,000〜45,000円</td><td>2018年休売後にプレミア化</td></tr>
                <tr><td><strong>白州18年</strong></td><td>230,000〜280,000円</td><td>長期熟成、希少性増加中</td></tr>
                <tr><td><strong>白州25年</strong></td><td>900,000〜1,000,000円</td><td>サントリーの長期熟成最高峰</td></tr>
              </tbody>
            </table>
          </div>

          <h2>白州の特徴</h2>
          <p>白州蒸溜所の最大の特徴は<strong>「森の水」</strong>と<strong>「爽やかなスモーキーフレーバー」</strong>。山崎の力強い味わいと対照的に、軽やかで青葉や柑橘を思わせる飲み口が人気を集めています。</p>

          <h2>2018年休売の影響</h2>
          <p>白州12年は2018年6月に山崎12年と同時に休売（実質終売）が発表されました。これにより市場流通量が一気に減り、休売前は7,000〜10,000円程度だった買取相場が、現在では4万円前後まで上昇しています。</p>

          <h2>白州を高く売る4つのポイント</h2>
          <ol>
            <li><strong>付属品を揃える</strong> — 外箱・冊子・カートンの有無で査定額が変動</li>
            <li><strong>未開封のままで売却</strong> — 開封済みは20〜40%の価値に減少</li>
            <li><strong>複数業者で見積もり</strong> — 白州18年で<strong>2〜4万円の差</strong>が出ることがあります</li>
            <li><strong>セット売却の検討</strong> — 山崎・白州の同年代セットは個別より高くなる場合があります</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">白州の無料一括査定はこちら</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
            </div>
          </div>

          <h2>関連記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/yamazaki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">山崎の買取相場と高く売る方法</p></Link>
            <Link href="/articles/hibiki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">響の買取相場ガイド</p></Link>
            <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">相場情報</span><p className="text-sm font-bold mt-1">ウイスキー買取相場一覧</p></Link>
            <Link href="/articles/whisky-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">売却ガイド</span><p className="text-sm font-bold mt-1">ウイスキーを高く売る5つのコツ</p></Link>
          </div>
          <p className="text-xs text-warm-gray mt-8">※本記事の相場は2026年5月11日時点の参考値です。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
