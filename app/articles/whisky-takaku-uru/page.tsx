import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "【2026年最新】ウイスキーを高く売る5つのコツ — 最高入札を引き出す実践テクニック",
  description:
    "ウイスキーを最高値で売るための実践テクニックを徹底解説。相見積もり・付属品・売却タイミング・業者選び・状態保持の5つのコツで、最高入札を引き出します。",
};

function FaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "ウイスキーを高く売る最大のコツは？", acceptedAnswer: { "@type": "Answer", text: "最大のコツは「複数業者で必ず相見積もりを取ること」。同じボトルでも業者により数万〜数十万円の差が出るため、相場感を掴んだ上で最高値を提示した業者に売却するのが鉄則です。" } },
      { "@type": "Question", name: "売り時はいつがベストですか？", acceptedAnswer: { "@type": "Answer", text: "業界的には需給が逼迫する年末年始・お中元時期が高値傾向。ただし価格は日々変動するため「自分が納得できる価格になったら売る」のが実践的です。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function WhiskyTakakuUruPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">ウイスキーを高く売るコツ</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/article-takaku-uru.png" alt="ウイスキーを高く売るコツ" width={1200} height={400} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ウイスキーを高く売る5つのコツ</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月11日</p>

          <p>「家にある山崎18年、いくらで売れるのだろう？」「相続したウイスキーを少しでも高く売りたい」——同じボトルでも、売り方を間違えると<strong>数万〜数十万円の損失</strong>になります。本記事では、PeatBid編集部が推奨する<strong>最高入札を引き出すための5つの実践テクニック</strong>を解説します。</p>

          <h2>コツ1: 必ず複数業者で相見積もり</h2>

          <p>これが<strong>最重要のテクニック</strong>です。同じ山崎25年でも、業者によって査定額に<strong>5〜10万円の差</strong>が出ることはザラ。希少銘柄では<strong>20〜50万円の差</strong>になることもあります。</p>

          <h3>具体的な進め方</h3>
          <ul>
            <li><strong>一括査定サイト</strong>（ヒカカク等）で最大20社の見積もりを同時取得 → 相場感を把握</li>
            <li><strong>お酒買取専門店</strong>（JOYLAB、リカスタ等）に個別見積もり → 専門店は希少銘柄を高く評価</li>
            <li>3社以上の見積もりを比較 → 最高値を提示した業者に売却</li>
          </ul>

          <p><strong>1社だけで決めるのは絶対に避けましょう</strong>。査定無料・キャンセル無料なので、複数業者を回るコストはゼロです。</p>

          <h2>コツ2: 付属品をすべて揃える</h2>

          <p>ウイスキーの査定は<strong>「ボトル本体だけ」ではない</strong>のがポイント。付属品の有無で査定額が10〜30%変動します。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>付属品</th><th>査定への影響</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>外箱（化粧箱）</strong></td><td>有無で-10〜20%</td></tr>
                <tr><td><strong>冊子・パンフレット</strong></td><td>有無で-5〜10%</td></tr>
                <tr><td><strong>カートン（輸送用箱）</strong></td><td>希少銘柄で-5〜10%</td></tr>
                <tr><td><strong>ホログラムシール（山崎・響等）</strong></td><td>偽物との区別で必須</td></tr>
                <tr><td><strong>購入レシート</strong></td><td>正規品証明として有効</td></tr>
              </tbody>
            </table>
          </div>

          <p>探せば家のどこかにある可能性が高いので、売却前に必ず確認しましょう。</p>

          <h2>コツ3: 売却タイミングを見極める</h2>

          <p>ウイスキー相場は需給で動くため、タイミングで査定額が変わります。</p>

          <h3>相場が上がりやすい時期</h3>
          <ul>
            <li><strong>年末年始（12月〜1月）</strong> — お正月需要、ボーナス商戦</li>
            <li><strong>お中元・お歳暮シーズン</strong> — 贈答需要</li>
            <li><strong>海外オークションの直前後</strong> — Sotheby's・Bonhamsの落札結果が反映される</li>
            <li><strong>終売・休売報道直後</strong> — 供給制限による高騰期</li>
          </ul>

          <h3>相場が下がりやすい時期</h3>
          <ul>
            <li><strong>夏場（7〜8月）</strong> — ウイスキー需要が一時的に低下</li>
            <li><strong>大規模な経済ショック直後</strong> — 投資需要が一時的に冷える</li>
          </ul>

          <p>急ぎでなければ、<strong>年末や終売報道後の数ヶ月以内</strong>に売却するのが理想的です。</p>

          <h2>コツ4: 業者選びの基準</h2>

          <p>ウイスキー買取に強い業者を選ぶことが大切です。一般リサイクル業者では希少銘柄の価値が分からず安く査定されがちです。</p>

          <h3>信頼できる業者の見分け方</h3>
          <ul>
            <li><strong>お酒・洋酒の専門知識がある</strong>（公式サイトに銘柄別相場表がある）</li>
            <li><strong>査定料・キャンセル料・送料がすべて無料</strong></li>
            <li><strong>古物商許可・酒類販売業免許の両方を取得している</strong></li>
            <li><strong>査定額の根拠（オークション相場・状態評価）を説明してくれる</strong></li>
            <li><strong>レビュー・口コミが安定している</strong></li>
          </ul>

          <p>PeatBidでは編集部基準で厳選した4社（ヒカカク／バイセル／JOYLAB／リカスタ）を推奨しています。</p>

          <h2>コツ5: ボトルの状態保持</h2>

          <p>査定額は<strong>ボトル本体の状態</strong>に大きく左右されます。長期保管しているコレクターも、売却前にこれだけはチェックしましょう。</p>

          <h3>保管環境の基本</h3>
          <ul>
            <li><strong>直射日光・蛍光灯を避ける</strong> — ラベルの褪色防止</li>
            <li><strong>室温15〜20℃、湿度50〜70%</strong> — 揺れの少ない場所</li>
            <li><strong>縦置き保管</strong> — コルクの劣化と液面減少を防ぐ（ワインとは逆）</li>
            <li><strong>箱に入れて保管</strong> — ラベル・ガラスの摩耗を防止</li>
          </ul>

          <h3>避けるべきこと</h3>
          <ul>
            <li>キッチンや浴室付近（湿度・温度変化が激しい）</li>
            <li>窓際・暖房器具の近く</li>
            <li>段ボール直置き（湿気でラベル痛みやすい）</li>
          </ul>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">今すぐ無料で査定を比較</h3>
            <p className="text-sm text-warm-gray text-center mb-4">5つのコツを実践したら、まずは一括査定で最高入札を確認しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
            </div>
          </div>

          <h2>まとめ：最高入札への5ステップ</h2>
          <ol>
            <li>付属品を全て揃える</li>
            <li>状態を確認・整える</li>
            <li>一括査定で複数社の見積もりを取る</li>
            <li>専門店で個別査定（精度確認）</li>
            <li>最高値を提示した業者に売却</li>
          </ol>

          <h2>関連記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">相場情報</span><p className="text-sm font-bold mt-1">ウイスキー買取相場一覧</p></Link>
            <Link href="/articles/yamazaki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">山崎の買取相場と高く売る方法</p></Link>
            <Link href="/articles/hibiki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">響の買取相場ガイド</p></Link>
            <Link href="/faq/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">よくある質問</span><p className="text-sm font-bold mt-1">ウイスキー買取FAQ</p></Link>
          </div>
          <p className="text-xs text-warm-gray mt-8">※本記事はPRリンクを含みます。掲載業者は編集部基準で選定しています。</p>
        </article>
      </div>
    </>
  );
}
