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
      { "@type": "Question", name: "ウイスキーを高く売る最大のコツは？", acceptedAnswer: { "@type": "Answer", text: "最大のコツは「複数業者で必ず相見積もりを取ること」。同じボトルでも業者により査定額に大きな差が出るため、市場相場を把握した上で最高値を提示した業者に売却するのが鉄則です。" } },
      { "@type": "Question", name: "売り時はいつがベストですか？", acceptedAnswer: { "@type": "Answer", text: "業界的には需給が逼迫する年末年始・お中元時期が高値傾向。ただし価格は日々変動するため「自分が納得できる価格になったら売る」のが実践的です。" } },
      { "@type": "Question", name: "市場相場はどこで確認できますか？", acceptedAnswer: { "@type": "Answer", text: "本サイトでは Yahoo Auctions 過去180日の落札中央値（IQR外れ値除去後）を主要50銘柄について公開しています。各銘柄ページでサンプル数と取得日も合わせて確認できます。" } },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export default function WhiskyTakakuUruPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"\u30a6\u30a4\u30b9\u30ad\u30fc\u3092\u9ad8\u304f\u58f2\u308b5\u3064\u306e\u30b3\u30c4\", \"description\": \"\u30a6\u30a4\u30b9\u30ad\u30fc\u3092\u6700\u9ad8\u5024\u3067\u58f2\u308b\u305f\u3081\u306e\u5b9f\u8df5\u30c6\u30af\u30cb\u30c3\u30af\u3092\u5fb9\u5e95\u89e3\u8aac\u3002\u76f8\u898b\u7a4d\u3082\u308a\u30fb\u4ed8\u5c5e\u54c1\u30fb\u58f2\u5374\u30bf\u30a4\u30df\u30f3\u30b0\u30fb\u696d\u8005\u9078\u3073\u30fb\u72b6\u614b\u4fdd\u6301\u306e5\u3064\u306e\u30b3\u30c4\u3067\u3001\u6700\u9ad8\u5165\u672d\u3092\u5f15\u304d\u51fa\u3057\u307e\u3059\u3002\", \"url\": \"https://peatbid.com/articles/whisky-takaku-uru/\", \"datePublished\": \"2026-05-14T00:00:00+09:00\", \"dateModified\": \"2026-05-18T00:00:00+09:00\", \"author\": {\"@type\": \"Organization\", \"name\": \"PeatBid\u7de8\u96c6\u90e8\", \"url\": \"https://peatbid.com/editorial/\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"PeatBid\", \"url\": \"https://peatbid.com\"}, \"mainEntityOfPage\": {\"@type\": \"WebPage\", \"@id\": \"https://peatbid.com/articles/whisky-takaku-uru/\"}}" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\": \"https://schema.org\", \"@type\": \"BreadcrumbList\", \"itemListElement\": [{\"@type\": \"ListItem\", \"position\": 1, \"name\": \"\u30db\u30fc\u30e0\", \"item\": \"https://peatbid.com/\"}, {\"@type\": \"ListItem\", \"position\": 2, \"name\": \"\u30a6\u30a4\u30b9\u30ad\u30fc\u3092\u9ad8\u304f\u58f2\u308b\u30b3\u30c4\"}]}" }} />
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
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026-05-19</p>

          <p>「家にある山崎18年、いくらで売れるのだろう？」「相続したウイスキーを少しでも高く売りたい」——同じボトルでも、売り方を間違えると損失になります。本記事では、PeatBid編集部が推奨する<strong>最高入札を引き出すための5つの実践テクニック</strong>を解説します。</p>

          <p>まず売る前に必ず<Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark underline">市場相場（Yahoo中央値）一覧</Link>で対象銘柄の現在の相場感を把握してください。市場相場は業者買取額の基準になります。</p>

          <h2>コツ1: 必ず複数業者で相見積もり</h2>

          <p>これが<strong>最重要のテクニック</strong>です。同じ銘柄でも、業者によって査定額に<strong>業界一般で10〜20%程度の差</strong>が出ます。希少銘柄ではさらに大きな差になることもあります。</p>

          <h3>具体的な進め方</h3>
          <ul>
            <li>本サイトの<Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark underline">市場相場一覧</Link>で対象銘柄の Yahoo中央値を確認 → 妥当な業者買取額の基準を把握</li>
            <li><strong>LINXAS</strong>（銘柄別の買取参考価格を公開）で具体的な業者公表値を確認</li>
            <li><strong>バイセル / 福ちゃん / JOYLAB</strong> など複数業者に個別見積もり依頼 → 3社以上で比較</li>
            <li>最高値を提示した業者に売却</li>
          </ul>

          <p><strong>1社だけで決めるのは絶対に避けましょう</strong>。査定無料・キャンセル無料の業者が多いため、複数業者を回るコストはほぼゼロです。</p>

          <h2>コツ2: 付属品をすべて揃える</h2>

          <p>ウイスキーの査定は<strong>「ボトル本体だけ」ではない</strong>のがポイント。業界一般の目安として、付属品の有無で査定額が10〜30%程度変動します。</p>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>付属品</th><th>査定への影響（業界目安）</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>外箱（化粧箱）</strong></td><td>有無で-10〜20%程度</td></tr>
                <tr><td><strong>冊子・パンフレット</strong></td><td>有無で-5〜10%程度</td></tr>
                <tr><td><strong>カートン（輸送用箱）</strong></td><td>希少銘柄で-5〜10%程度</td></tr>
                <tr><td><strong>ホログラムシール（山崎・響等）</strong></td><td>偽物との区別で必須</td></tr>
                <tr><td><strong>購入レシート</strong></td><td>正規品証明として有効</td></tr>
              </tbody>
            </table>
          </div>

          <p>探せば家のどこかにある可能性が高いので、売却前に必ず確認しましょう。実際の評価は業者により異なるため、最終的な査定額は各業者ページでご確認ください。</p>

          <h2>コツ3: 売却タイミングを見極める</h2>

          <p>ウイスキー相場は需給で動くため、タイミングで査定額が変わります。</p>

          <h3>相場が上がりやすい時期</h3>
          <ul>
            <li><strong>年末年始（12月〜1月）</strong> — お正月需要、ボーナス商戦</li>
            <li><strong>お中元・お歳暮シーズン</strong> — 贈答需要</li>
            <li><strong>海外オークションの直前後</strong> — Sotheby&apos;s・Bonhamsの落札結果が反映される</li>
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

          <p>本サイトでは編集部基準で選定した4業者の参考リンクを掲載しています：</p>

          <ul>
            <li><a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">LINXAS</a> — 銘柄別の買取参考価格を公開している専門店</li>
            <li><a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">バイセル</a> — 東証グロース上場、出張・店頭・宅配の3チャネル対応</li>
            <li><a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">福ちゃん</a> — 総合買取の大手、お酒査定にも対応</li>
            <li><a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-amber-dark underline">JOYLAB</a> — お酒買取専門、希少銘柄の鑑定査定に強み</li>
          </ul>

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
            <h3 className="font-bold text-base mb-3 text-center">参考買取相場（各業者公式ページ）</h3>
            <p className="text-sm text-warm-gray text-center mb-4">業者買取額は各社の在庫状況・キャンペーンにより変動します。最新の査定額は各業者ページで直接ご確認ください。</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a href="https://linxas.shop/whiskey/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">LINXAS →</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">バイセル →</a>
              <a href="https://fuku-chan.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">福ちゃん →</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-white border border-amber/40 rounded-lg text-amber-dark text-center text-sm font-semibold py-2 hover:bg-amber/10 transition-colors">JOYLAB →</a>
            </div>
          </div>

          <h2>まとめ：最高入札への5ステップ</h2>
          <ol>
            <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark underline">市場相場（Yahoo中央値）</Link>を確認して相場感を把握</li>
            <li>付属品を全て揃える</li>
            <li>状態を確認・整える</li>
            <li>複数業者に見積もり依頼（業者ページで個別査定）</li>
            <li>最高値を提示した業者に売却</li>
          </ol>

          <h2>関連記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">相場情報</span><p className="text-sm font-bold mt-1">ウイスキー市場相場一覧</p></Link>
            <Link href="/articles/yamazaki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">山崎の市場相場ガイド</p></Link>
            <Link href="/articles/hibiki-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">響の市場相場ガイド</p></Link>
            <Link href="/faq/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">よくある質問</span><p className="text-sm font-bold mt-1">ウイスキー買取FAQ</p></Link>
          </div>
          <p className="text-xs text-warm-gray mt-8">※業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
