import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "【2026年最新】マッカランの買取相場 — 12年・18年・25年・30年",
  description:
    "スコッチの王・マッカランの最新買取相場と査定ポイント。シェリーオーク長期熟成の希少ボトル、ファイン&レアシリーズ、状態別の係数を徹底解説。",
};

function FaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "マッカラン30年は今いくらで売れますか？", acceptedAnswer: { "@type": "Answer", text: "2026年5月現在、マッカラン30年シェリーオーク（未開封・箱付き）は約130〜170万円前後の買取相場です。" } },
      { "@type": "Question", name: "マッカラン12年は買取できますか？", acceptedAnswer: { "@type": "Answer", text: "はい、マッカラン12年シェリーオーク・ダブルカスク等は買取相場約13,000〜18,000円。現行品も評価対象です。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function MacallanKaitoriPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">マッカランの買取相場</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-hibiki.png" alt="マッカランの買取相場" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">マッカランの買取相場</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月11日</p>

          <p>マッカランは<strong>「スコッチの王」</strong>と称されるスペイサイドのシングルモルト。シェリーオーク樽で熟成させた濃密な味わいで、世界中のコレクターから絶大な支持を集めています。Sotheby's等の海外オークションでもジャパニーズウイスキーと並ぶ高値で取引される代表銘柄です。</p>

          <h2>マッカランの買取相場一覧</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>銘柄</th><th>買取相場（未開封・箱付き）</th><th>備考</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>マッカラン12年 シェリーオーク</strong></td><td>13,000〜18,000円</td><td>現行品の代表</td></tr>
                <tr><td><strong>マッカラン18年</strong></td><td>70,000〜90,000円</td><td>長期熟成シェリー</td></tr>
                <tr><td><strong>マッカラン25年</strong></td><td>350,000〜450,000円</td><td>プレミアスコッチの代表</td></tr>
                <tr><td><strong>マッカラン30年</strong></td><td>1,300,000〜1,700,000円</td><td>究極のシェリー長期熟成</td></tr>
                <tr><td><strong>ファイン&レア各種</strong></td><td>4,000,000〜7,000,000円</td><td>限定リリース・コレクター垂涎</td></tr>
              </tbody>
            </table>
          </div>

          <h2>マッカランの特徴と評価ポイント</h2>

          <h3>シェリーオーク熟成の濃密な味わい</h3>
          <p>マッカランは伝統的に<strong>ヨーロピアン・オークのシェリー樽</strong>で熟成。ドライフルーツ・ダークチョコレート・スパイスの複雑な香りは、世界のシングルモルトでも比類なき個性として評価されています。</p>

          <h3>1980年代以前のオールドボトル</h3>
          <p>1980年代以前にボトリングされたマッカランは「<strong>オールドマッカラン</strong>」として現代品とは別格の扱い。30年・35年クラスでも数百万〜数千万円で取引される伝説的銘柄です。</p>

          <h3>ファイン&レア・限定リリース</h3>
          <p>マッカランはコレクター向け限定シリーズが多く、特に「ファイン&レア」「アニバーサリー」「マスターズオブフォト」などのシリーズは、希少性と物語性で<strong>数百万〜千万円超</strong>の値がつくこともあります。</p>

          <h2>マッカランを高く売る4つのポイント</h2>
          <ol>
            <li><strong>外箱と冊子の保存</strong> — マッカランは外箱の保存状態が査定に強く影響します</li>
            <li><strong>ボトリングイヤー（瓶詰め年）を業者に伝える</strong> — 同じ銘柄でも年代でプレミアが変わります</li>
            <li><strong>未開封の維持</strong> — シェリー熟成の風味は開封で揮発するため、未開封の価値が高い</li>
            <li><strong>洋酒専門店で見積もり</strong> — マッカランは海外オークション相場を反映できる専門業者で差が出ます</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">マッカランの無料一括査定はこちら</h3>
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
