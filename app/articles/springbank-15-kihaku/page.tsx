import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/springbank-15.json";

export const metadata: Metadata = {
  title: 'スプリングバンク15年の希少性と買取・投資価値【2026年10月最新】保有と売却の判断基準',
  description: 'スプリングバンク15年の希少性と投資対象としての評価を解説しています。価格推移、需給動向、長期保有と売却の判断基準、税制について、コレクターの方向けにまとめています。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": 'スプリングバンク15年を売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じスプリングバンク15年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": 'スプリングバンク15年の売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": 'スプリングバンク15年を売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" } }] }) }} />;
}

export default function Springbank15KihakuPage() {
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
            <li><Link href="/articles/springbank-15-kaitori/" className="hover:text-amber-dark transition-colors">スプリングバンク15年</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">希少性・投資価値</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/springbank-15.png" alt='スプリングバンク15年の希少性と投資価値' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">スプリングバンク15年の希少性と投資価値</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-12 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">スプリングバンク15年</p>
            <p className="text-xs text-warm-gray mt-1">スコッチウイスキー / キャンベルタウン / 15年熟成 / 希少度 ミッド / 市場相場 35,000円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/springbank-15-kaitori/" className="text-amber-dark underline">スプリングバンク15年の買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. スプリングバンク15年の市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 希少性のランク評価</a></li>
              <li><a href="#section-2" className="hover:underline">3. 価格推移の歴史</a></li>
              <li><a href="#section-3" className="hover:underline">4. 投資資産としての位置付け</a></li>
              <li><a href="#section-4" className="hover:underline">5. 長期保有のメリット</a></li>
              <li><a href="#section-5" className="hover:underline">6. 長期保有のデメリット</a></li>
              <li><a href="#section-6" className="hover:underline">7. 売却を判断する5つの基準</a></li>
              <li><a href="#section-7" className="hover:underline">8. 税制の確認</a></li>
            </ol>
          </div>

          <p>スプリングバンク15年は希少度終売プレミアクラスのボトルです。直近の実勢中央値は約35,000円で、投資対象として保有を続けるか、売却するかの判断について、データと市場動向をもとに解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションではスプリングバンク15年の落札が約138件確認でき、落札額の中央値は35,000円でした。取引が活発で、換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>


          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/collector-vault.png" alt="コレクター向けの保管庫" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <h2 id="section-0">1. スプリングバンク15年の市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>スプリングバンク15年</strong>はスコッチウイスキー（キャンベルタウン）の15年熟成、度数46%、希少度は中程度の希少度に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>35,000円</strong>（流通サンプル138件、当サイトの集計）。価格帯としては<strong>中位帯</strong>にあたり、付属品の有無や保管状態で査定額が変動しやすく、状態の管理が査定額に影響します。</p><p>流通量は<strong>標準的</strong>の水準です。一定の流通量があり相場が形成されやすいため、複数の業者を比較することで適正な金額を判断しやすい銘柄です。</p><p>スコッチは蒸溜所・地域（キャンベルタウン）やボトリング、熟成年数で評価が大きく分かれます。同じ年数でも蒸溜所の人気により査定額に差が出るため、銘柄ごとの相場を踏まえた業者選びが有効です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 希少性のランク評価</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>スプリングバンク15年は希少度カテゴリで「<strong>終売プレミア</strong>」に分類されます。希少度は、以下の4つの要素で決まります。</p><ol><li>生産終了・休売の有無</li><li>市場流通量</li><li>コレクター需要</li><li>国際的評価

一般に、希少度が高いほど二次流通市場で価格が上昇しやすい傾向があります。</li></ol>` }} />

          <h2 id="section-2">3. 価格推移の歴史</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>スプリングバンク15年は過去5〜10年にわたって、二次流通市場で価格が上昇基調にあります。特に2018年以降の世界的ジャパニーズウイスキーブーム以降は、長期熟成・終売銘柄を中心に<strong>3〜10倍</strong>の値上がりを記録した銘柄も少なくありません。</p><p>2020年: コロナ禍で一時的に需要減少も、すぐに回復<br/>2021〜2022年: アジア富裕層の参入加速、価格急騰<br/>2023〜2024年: 上昇ペースは緩和、安定推移<br/>2025〜2026年: 円安効果と海外需要継続で高値維持</p><p>将来の価格は保証されるものではありません。</p>` }} />

          <h2 id="section-3">4. 投資資産としての位置付け</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ウイスキーは<strong>「液体資産（Liquid Asset）」</strong>と呼ばれることがあります。</p><p><strong>Knight Frank Luxury Investment Index</strong>（高級資産投資指数）でも、ウイスキーは過去10年で値上がり率の高い投資対象の一つとされ、クラシックカー・ワイン・アートと並ぶ実物資産として扱われています。</p><p>保管環境が整っていれば、<strong>換金しやすい実物資産</strong>として扱われる場合があります。</p>` }} />

          <h2 id="section-4">5. 長期保有のメリット</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>メリット</strong>:</p><ol><li>希少性の高まりによる価格上昇の可能性</li><li>税制優遇（5年超の長期譲渡所得は1/2軽減）</li><li>趣味と投資の両立</li><li>インフレヘッジ機能</li><li>物理資産としての安心感</li><li>相続・贈与対象としての価値</li><li>国際市場での換金性</li></ol>` }} />

          <h2 id="section-5">6. 長期保有のデメリット</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>デメリット</strong>:</p><ol><li>保管コスト（湿度・温度管理）</li><li>盗難・破損リスク</li><li>市場の流動性低下リスク</li><li>トレンド変化リスク（次世代のウイスキー嗜好が変わる可能性）</li><li>保険加入コスト</li><li>維持の手間</li><li>機会費用（他の投資先と比較した収益率）

これらのデメリットを踏まえ、購入価格を下回る可能性も考慮してください。</li></ol>` }} />

          <h2 id="section-6">7. 売却を判断する5つの基準</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>売却の時期を判断するためのチェックリスト</strong></p><ol><li>納得できる価格に達した</li><li>次の投資先・現金化のニーズがある</li><li>当該銘柄の需給バランスが転換点を迎えた</li><li>保管コストが値上がり期待を上回ると判断</li><li>ライフイベント（相続・住宅購入・教育費等）への対応

1つの条件だけでなく、複数の条件が重なった時点での売却をおすすめします。</li></ol>` }} />

          <h2 id="section-7">8. 税制の確認</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ウイスキーの売却益は<strong>譲渡所得</strong>として課税対象になります。主なポイントは以下のとおりです。</p><ol><li><strong>年間50万円の特別控除</strong> — この範囲内であれば課税されません</li><li><strong>5年超保有で長期譲渡所得</strong> — 特別控除後の課税対象額が1/2に軽減</li><li><strong>生活用動産の非課税</strong> — 1点30万円以下は非課税

例えば取得費が売却額の30%程度のボトルなら譲渡所得は売却額の約70%。さらに年間50万円の特別控除を差し引き、5年超保有なら長期譲渡で課税対象額が1/2に軽減されるため、単発売却なら課税が発生しないケースも多くあります。

長期間保有している方は、購入時期・取得価格の記録を残しておくことをおすすめします。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">スプリングバンク15年の無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>スプリングバンク15年に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: 'スプリングバンク15年を売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じスプリングバンク15年でも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: 'スプリングバンク15年の売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: 'スプリングバンク15年を売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" }].map((faq) => (
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
            <Link href="/articles/springbank-15-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">スプリングバンク15年の高価売却のポイント</p></Link>
            <Link href="/articles/springbank-15-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">売る前チェック（真贋と相場）</span><p className="text-sm font-bold mt-1">スプリングバンク15年の売る前チェック（真贋と相場）</p></Link>
            <Link href="/articles/springbank-15-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">スプリングバンク15年の買取業者ランキング</p></Link>
            <Link href="/articles/springbank-15-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">スプリングバンク15年の歴史と特徴</p></Link>
            <Link href="/articles/springbank-15-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">スプリングバンク15年のオークション推移</p></Link>
            <Link href="/articles/springbank-15-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みボトルの買取</span><p className="text-sm font-bold mt-1">スプリングバンク15年の開封済みボトルの買取</p></Link>
            <Link href="/articles/springbank-15-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">スプリングバンク15年の箱なしボトルの買取</p></Link>
            <Link href="/articles/springbank-15-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">スプリングバンク15年のラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/springbank-15-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">スプリングバンク15年の買取相場ガイド</p></Link>
            <Link href="/articles/springbank-nisemono-mikata/" className="block bg-white border border-burgundy/30 rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-burgundy font-bold">真贋の確認</span><p className="text-sm font-bold mt-1">スプリングバンク（全種）の偽物の見分け方</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-12）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
