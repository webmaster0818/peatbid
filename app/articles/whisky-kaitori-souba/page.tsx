import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "【2026年最新】ウイスキー買取相場一覧 — 主要50銘柄の最新価格",
  description:
    "ジャパニーズ・スコッチ・バーボン主要50銘柄のウイスキー買取相場を一覧で公開。山崎・響・白州・マッカランなど人気銘柄の最新価格と、状態別の係数を徹底解説。",
};

function FaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "ウイスキー買取相場はどう決まりますか？", acceptedAnswer: { "@type": "Answer", text: "国内外のオークション落札データ、需給バランス、業者の在庫状況、入手難易度の4要素で決まります。特にSotheby's、Bonhams、Whisky Auctioneer等の海外オークション価格が指標となります。" } },
      { "@type": "Question", name: "未開封と開封済みでどれくらい価格が変わりますか？", acceptedAnswer: { "@type": "Answer", text: "未開封は買取相場の100%、開封済みは状態により20〜40%程度まで下がるのが一般的です。希少銘柄ほど未開封プレミアが大きく、数十万円の差が生じることもあります。" } },
      { "@type": "Question", name: "箱や付属品がないと買取価格はいくら下がりますか？", acceptedAnswer: { "@type": "Answer", text: "一般的に箱なしで-10〜20%、冊子なしで-5〜10%が目安です。希少銘柄ほど付属品の有無が査定に影響します。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

const japaneseWhisky = [
  { name: "山崎 NV", price: "16,000〜20,000円" },
  { name: "山崎12年", price: "35,000〜42,000円" },
  { name: "山崎18年", price: "210,000〜250,000円" },
  { name: "山崎25年", price: "880,000〜950,000円" },
  { name: "山崎55年", price: "25,000,000〜35,000,000円" },
  { name: "響 ジャパニーズハーモニー", price: "13,000〜17,000円" },
  { name: "響17年", price: "160,000〜200,000円" },
  { name: "響21年", price: "380,000〜450,000円" },
  { name: "響30年", price: "1,000,000〜1,200,000円" },
  { name: "白州 NV", price: "15,000〜19,000円" },
  { name: "白州12年", price: "38,000〜45,000円" },
  { name: "白州18年", price: "230,000〜280,000円" },
  { name: "白州25年", price: "900,000〜1,000,000円" },
  { name: "竹鶴 ピュアモルト", price: "14,000〜18,000円" },
  { name: "竹鶴17年", price: "130,000〜170,000円" },
  { name: "竹鶴21年", price: "350,000〜420,000円" },
  { name: "竹鶴25年", price: "750,000〜850,000円" },
  { name: "余市 NV", price: "16,000〜20,000円" },
  { name: "余市10年", price: "30,000〜38,000円" },
  { name: "余市15年", price: "160,000〜200,000円" },
  { name: "余市20年", price: "600,000〜700,000円" },
  { name: "宮城峡 NV", price: "15,000〜19,000円" },
  { name: "宮城峡12年", price: "28,000〜35,000円" },
  { name: "イチローズモルト MWR", price: "70,000〜90,000円" },
  { name: "イチローズモルト ダブルディスティラリーズ", price: "100,000〜140,000円" },
  { name: "イチローズモルト カードシリーズ（フルセット）", price: "13,000,000〜18,000,000円" },
  { name: "軽井沢12年", price: "1,200,000〜1,800,000円" },
  { name: "軽井沢30年", price: "6,000,000〜10,000,000円" },
  { name: "羽生 カードシリーズ", price: "25,000,000〜35,000,000円" },
  { name: "秩父 ザ・ファースト", price: "3,000,000〜4,000,000円" },
];

const scotchWhisky = [
  { name: "マッカラン12年 シェリーオーク", price: "13,000〜18,000円" },
  { name: "マッカラン18年", price: "70,000〜90,000円" },
  { name: "マッカラン25年", price: "350,000〜450,000円" },
  { name: "マッカラン30年 シェリーオーク", price: "1,300,000〜1,700,000円" },
  { name: "マッカラン ファイン&レア各種", price: "4,000,000〜7,000,000円" },
  { name: "ボウモア18年", price: "16,000〜21,000円" },
  { name: "ボウモア25年", price: "130,000〜170,000円" },
  { name: "ブラックボウモア", price: "1,300,000〜1,800,000円" },
  { name: "スプリングバンク15年", price: "25,000〜32,000円" },
  { name: "スプリングバンク21年", price: "130,000〜170,000円" },
  { name: "ラフロイグ25年", price: "55,000〜75,000円" },
  { name: "アードベッグ ウーガダール", price: "10,000〜14,000円" },
  { name: "アードベッグ コリーヴレッカン", price: "12,000〜16,000円" },
  { name: "グレンファークラス25年", price: "26,000〜35,000円" },
  { name: "グレンフィディック30年", price: "160,000〜200,000円" },
  { name: "タリスカー25年", price: "35,000〜45,000円" },
  { name: "バルヴェニー ポートウッド21年", price: "24,000〜32,000円" },
  { name: "グレンモーレンジ シグネット", price: "28,000〜38,000円" },
];

export default function WhiskyKaitoriSoubaPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">ウイスキー買取相場一覧</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-souba.png" alt="ウイスキー買取相場一覧" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">【2026年最新】ウイスキー買取相場一覧</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月11日</p>

          <p>PeatBid編集部が、ジャパニーズ・スコッチを中心に主要50銘柄の<strong>2026年5月時点の買取相場</strong>を一覧で公開します。すべて<strong>未開封・箱付き</strong>の状態を前提とした参考価格です。実際の査定額は業者・状態・タイミングにより変動します。</p>

          <h2>ジャパニーズウイスキー 買取相場（30銘柄）</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>銘柄</th>
                  <th>買取相場（未開封・箱付き）</th>
                </tr>
              </thead>
              <tbody>
                {japaneseWhisky.map((w) => (
                  <tr key={w.name}>
                    <td><strong>{w.name}</strong></td>
                    <td>{w.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>スコッチウイスキー 買取相場（20銘柄）</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>銘柄</th>
                  <th>買取相場（未開封・箱付き）</th>
                </tr>
              </thead>
              <tbody>
                {scotchWhisky.map((w) => (
                  <tr key={w.name}>
                    <td><strong>{w.name}</strong></td>
                    <td>{w.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>状態別 買取係数</h2>

          <p>未開封・箱付きの基準価格に、以下の係数を掛けることで概算の査定額が算出できます。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>状態</th>
                  <th>付属品</th>
                  <th>係数</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>未開封・完璧</td><td>箱・冊子・カートン揃い</td><td><strong>1.00</strong>（基準）</td></tr>
                <tr><td>未開封・箱なし</td><td>ラベル良好</td><td>0.80〜0.90</td></tr>
                <tr><td>未開封・ラベル軽度汚れ</td><td>付属あり</td><td>0.80〜0.90</td></tr>
                <tr><td>未開封・液面減少</td><td>やや進行</td><td>0.55〜0.70</td></tr>
                <tr><td>開封済み</td><td>残量による</td><td>0.20〜0.40</td></tr>
              </tbody>
            </table>
          </div>

          <h2>相場を動かす5つの要因</h2>

          <ol>
            <li><strong>オークション落札データ</strong> — 国内外のオークションでの落札価格が業者の仕入れ価格の基準となります</li>
            <li><strong>需給バランス</strong> — 終売・休売銘柄は供給が断たれ価格が高騰します</li>
            <li><strong>為替レート</strong> — 海外バイヤー（中国・中東・米国）の参入により円安局面で価格上昇傾向</li>
            <li><strong>季節要因</strong> — 年末年始・お中元時期は需要増、相場が上がる傾向</li>
            <li><strong>業者の在庫状況</strong> — 同じボトルでも、業者の在庫量により提示額に差が出る</li>
          </ol>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">無料一括査定で最高値を確認</h3>
            <p className="text-sm text-warm-gray text-center mb-4">同じボトルでも業者により数万〜数十万円の差が出ます。一括査定で最高入札を引き出しましょう。</p>
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
            <Link href="/articles/hibiki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">銘柄ガイド</span>
              <p className="text-sm font-bold mt-1">響の買取相場ガイド</p>
            </Link>
            <Link href="/articles/whisky-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">売却ガイド</span>
              <p className="text-sm font-bold mt-1">ウイスキーを高く売る5つのコツ</p>
            </Link>
            <Link href="/faq/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
              <span className="text-xs text-amber-dark font-bold">よくある質問</span>
              <p className="text-sm font-bold mt-1">ウイスキー買取FAQ</p>
            </Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の相場は2026年5月11日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
