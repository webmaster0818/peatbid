import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/glenmorangie-signet.json";

export const metadata: Metadata = {
  title: 'グレンモーレンジ シグネットの歴史・特徴と買取価値【2026年10月最新】市場で評価される理由',
  description: 'グレンモーレンジ シグネットの歴史的背景、ハイランドの沿革、味わいの特徴、世界的な評価、市場価値が高い理由を解説しています。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'グレンモーレンジ シグネットを売る前に何を準備すればよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じグレンモーレンジ シグネットでも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'グレンモーレンジ シグネットの売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'グレンモーレンジ シグネットを売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" } }] }) }} />;
}

export default function GlenmorangieSignetRekishiPage() {
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/" className="hover:text-amber-dark transition-colors">銘柄一覧</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/glenmorangie-signet-kaitori/" className="hover:text-amber-dark transition-colors">グレンモーレンジ シグネット</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">歴史と特徴</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/glenmorangie-signet.png" alt='グレンモーレンジ シグネットの歴史と特徴' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グレンモーレンジ シグネットの歴史と特徴</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-19 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">グレンモーレンジ シグネット</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / ハイランド / ノンエイジ / 希少度 ミッド / 市場相場 20,130円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/glenmorangie-signet-kaitori/" className="text-amber-dark underline">グレンモーレンジ シグネットの買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. グレンモーレンジ シグネットの市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. ハイランドの創業と歴史</a></li>
              <li><a href="#section-2" className="hover:underline">3. グレンモーレンジ シグネットの誕生背景</a></li>
              <li><a href="#section-3" className="hover:underline">4. グレンモーレンジ シグネットの味わいプロファイル</a></li>
              <li><a href="#section-4" className="hover:underline">5. 世界的評価と受賞歴</a></li>
              <li><a href="#section-5" className="hover:underline">6. 二次流通市場での位置付け</a></li>
              <li><a href="#section-6" className="hover:underline">7. コレクター市場での需要動向</a></li>
              <li><a href="#section-7" className="hover:underline">8. 今後の市場見通し</a></li>
            </ol>
          </div>

          <p>グレンモーレンジ シグネットはスコッチウイスキーの代表的な銘柄の一つで、ハイランドが手がけるノンエイジのボトルです。本記事では、銘柄の誕生の背景、蒸溜所の沿革、味わいの特徴、世界的な評価、二次流通市場で高値が定着している理由を解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションではグレンモーレンジ シグネットの落札が約94件確認でき、落札額の中央値は20,130円でした。一定の流通があり、比較的換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>


          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/distillery-scotch.png" alt="ハイランドの蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>

          <h2 id="section-0">1. グレンモーレンジ シグネットの市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>グレンモーレンジ シグネット</strong>はスコッチウイスキー（ハイランド）のノンエイジ（NV）、度数46%、希少度は中程度の希少度に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>20,130円</strong>（流通サンプル94件、当サイトの集計）。価格帯としては<strong>実用帯</strong>にあたり、取引が多く、状態が良ければ売却しやすい価格帯です。</p><p>流通量は<strong>標準的</strong>の水準です。一定の流通量があり相場が形成されやすいため、複数の業者を比較することで適正な金額を判断しやすい銘柄です。</p><p>スコッチは蒸溜所・地域（ハイランド）やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気により査定額に差が出るため、銘柄ごとの相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. ハイランドの創業と歴史</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ハイランドは、スコッチウイスキーの蒸溜所・メーカーです。グレンモーレンジ シグネットを含む銘柄を製造しています。</p><p>ジャパニーズウイスキーの場合は1923年の山崎蒸溜所創設以降、スコッチの場合は18〜19世紀に遡る歴史を持つ銘柄も多数あります。各蒸溜所は独自の蒸溜方法・水・樽の選定によって個性を表現しており、それが現在の市場価値につながっています。</p>` }} />

          <h2 id="section-2">3. グレンモーレンジ シグネットの誕生背景</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>グレンモーレンジ シグネットは、ハイランドが製造するノンエイジのボトルです。樽熟成の過程で樽材から溶け出した成分と原酒が合わさり、その銘柄ならではの味わいが生まれます。</p><p>生産量が限られていることから、コレクターや愛好家から高い評価を得ています。</p>` }} />

          <h2 id="section-3">4. グレンモーレンジ シグネットの味わいプロファイル</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ウイスキーの味わいは、原料・水・蒸溜方法・熟成樽・熟成期間で決まります。

<strong>主要な構成要素</strong>:</p><ol><li>原料の麦芽（モルト）の質</li><li>仕込み水のミネラル成分</li><li>発酵に使う酵母の種類</li><li>ポットスチルの形状・蒸溜方法</li><li>熟成樽の種類（シェリー樽・バーボン樽・ミズナラ樽等）</li><li>熟成環境（温度・湿度）

これらの要素の組み合わせと熟成期間によって、{name}の味わいが形成されています。</li></ol>` }} />

          <h2 id="section-4">5. 世界的評価と受賞歴</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ハイランドの銘柄が評価を受けている主な国際品評会・評価には、以下があります。</p><ol><li>ISC（インターナショナル・スピリッツ・チャレンジ）</li><li>ワールド・ウイスキー・アワード（WWA）</li><li>サンフランシスコ・ワールド・スピリッツ・コンペティション</li><li>ジム・マーレイ氏のウイスキー・バイブル</li><li>ウイスキー・マガジン・アワード

こうした国際的な評価は、二次流通市場での価格に影響しています。</li></ol>` }} />

          <h2 id="section-5">6. 二次流通市場での位置付け</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>Sotheby's、Bonhams、Whisky Auctioneer</strong>等の海外オークションでは、グレンモーレンジ シグネットと同じ価格帯の銘柄が取引されており、その落札データは国内の買取相場の指標の一つとなっています。</p><p>終売や限定リリースの銘柄では、希少性によるプレミア価格が付く傾向があります。</p>` }} />

          <h2 id="section-6">7. コレクター市場での需要動向</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>グレンモーレンジ シグネットの主な需要層は以下のとおりです。</p><ol><li><strong>アジアの富裕層</strong>（中国・香港・台湾・シンガポール）</li><li><strong>欧米のコレクター</strong>（米・英・独）</li><li><strong>国内のコレクター・愛好家</strong></li><li><strong>投資家・ファンド</strong>

こうした需要層の広がりが、グレンモーレンジ シグネットの市場価値に影響しています。</li></ol>` }} />

          <h2 id="section-7">8. 今後の市場見通し</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>グレンモーレンジ シグネットを含むスコッチウイスキーの中長期見通しは、(1)世界的需要の継続、(2)供給制限、(3)新興市場の参入 の3つが価格を支える要因として挙げられます。</p><p>ただし、短期的には需給により価格が上下します。将来の価格は保証されるものではないため、ご自身が納得できる価格かどうかを売却の判断基準とすることをおすすめします。</p><p>長期保有を検討する場合は、適切な保管と保険への加入もご検討ください。</p>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">グレンモーレンジ シグネットの無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>グレンモーレンジ シグネットに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'グレンモーレンジ シグネットを売る前に何を準備すればよいですか？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じグレンモーレンジ シグネットでも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'グレンモーレンジ シグネットの売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'グレンモーレンジ シグネットを売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" }].map((faq) => (
              <details key={faq.q} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.a.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
              </details>
            ))}
          </div>

          <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <Link href="/articles/glenmorangie-signet-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">グレンモーレンジ シグネットの高価売却のポイント</p></Link>
            <Link href="/articles/glenmorangie-signet-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">グレンモーレンジ シグネットの偽物の見分け方</p></Link>
            <Link href="/articles/glenmorangie-signet-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">グレンモーレンジ シグネットの買取業者ランキング</p></Link>
            <Link href="/articles/glenmorangie-signet-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">グレンモーレンジ シグネットの希少性・投資価値</p></Link>
            <Link href="/articles/glenmorangie-signet-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">グレンモーレンジ シグネットのオークション推移</p></Link>
            <Link href="/articles/glenmorangie-signet-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">グレンモーレンジ シグネットの開封済みボトルの買取</p></Link>
            <Link href="/articles/glenmorangie-signet-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">グレンモーレンジ シグネットの箱なしボトルの買取</p></Link>
            <Link href="/articles/glenmorangie-signet-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">グレンモーレンジ シグネットのラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/glenmorangie-signet-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">グレンモーレンジ シグネットの買取相場ガイド</p></Link>
            <Link href="/articles/glenmorangie-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ブランド一覧</span><p className="text-sm font-bold mt-1">グレンモーレンジの買取価格一覧（全ボトル）</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-19）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
