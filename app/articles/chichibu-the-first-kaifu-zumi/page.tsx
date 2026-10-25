import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/chichibu-the-first.json";

export const metadata: Metadata = {
  title: '秩父ザファーストは開封済みでも売れる?【2026年10月最新】残量別の買取査定額と売却方法',
  description: '秩父ザファーストを開封済みで売る場合の査定額と注意点を解説しています。残量別の価格の目安、状態を保つ方法、開封済みに対する業者ごとの対応、売却前の準備を掲載しています。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '秩父ザファーストを売る前に何を準備すればよいですか？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' } }, { "@type": "Question", "name": '複数の業者の比較は必要ですか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、おすすめします。同じ秩父ザファーストでも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' } }, { "@type": "Question", "name": '買取後のキャンセルはできますか？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '秩父ザファーストの売却益に税金はかかりますか？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '秩父ザファーストを売る時期はいつがよいですか？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" } }] }) }} />;
}

export default function ChichibuTheFirstKaifuZumiPage() {
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
            <li><Link href="/articles/chichibu-the-first-kaitori/" className="hover:text-amber-dark transition-colors">秩父ザファースト</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">開封済みボトルの買取</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/chichibu-the-first.png" alt='秩父ザファーストが開封済みでも売れる？' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">秩父ザファーストが開封済みでも売れる？</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-10-26 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">秩父ザファースト</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / 秩父蒸溜所 / 3年熟成 / 希少度 ウルトラレア / 市場相場 市場相場データ集計中</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/chichibu-the-first-kaitori/" className="text-amber-dark underline">秩父ザファーストの買取相場ガイド</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 秩父ザファーストの市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 開封済み秩父ザファーストの査定額の目安</a></li>
              <li><a href="#section-2" className="hover:underline">3. 開封済みの査定で重視される5要素</a></li>
              <li><a href="#section-3" className="hover:underline">4. 開封済みでも価値が高くなる条件</a></li>
              <li><a href="#section-4" className="hover:underline">5. 売却までの保管のコツ</a></li>
              <li><a href="#section-5" className="hover:underline">6. 開封済みに対する各社の対応</a></li>
              <li><a href="#section-6" className="hover:underline">7. 開封済みを高く売る5つのコツ</a></li>
              <li><a href="#section-7" className="hover:underline">8. 売れない場合の対処法</a></li>
            </ol>
          </div>

          <p>開封済みの秩父ザファーストも、状態と残量によっては買取の対象となります。ただし、未開封品のみを買取の対象とする業者もあります。本記事では、開封済みの秩父ザファーストを売却する際の査定額の目安と注意点を解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">秩父ザファーストは二次流通の落札データが十分ではないため、本記事の金額は同じ価格帯の銘柄を参考にした一般的な目安です。最新の実勢は各買取業者の査定でご確認ください。</p>
          </div>


          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-5 not-prose">
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-perfect.png" alt="未開封・付属品完備" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>付属品完備</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-no-box.png" alt="未開封・箱なし" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>箱なし</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-label-dirty.png" alt="ラベル汚れ" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">ラベル<br/>汚れ</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-low-liquid.png" alt="液面減少" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">液面<br/>減少</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-opened.png" alt="開封済み" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">開封済み</p>
            </div>
          </div>

          <h2 id="section-0">1. 秩父ザファーストの市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>秩父ザファースト</strong>はジャパニーズウイスキー（秩父蒸溜所）の3年熟成、度数61.8%、希少度は超希少に分類される銘柄です。</p><p>本銘柄は二次流通の落札サンプルが少ないため、実勢中央値は掲載していません。相場が定まりにくいため、複数の業者の査定で実際の金額をご確認ください。</p><p>ジャパニーズウイスキーは世界的な評価の高まりにより需要が強く、特に終売・長期熟成の銘柄は中長期で価格が上昇しやすい傾向があります。一方で、短期的には為替やオークションの結果により変動するため、売却の時期の判断が重要です。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 開封済み秩父ザファーストの査定額の目安</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>未開封・箱付きの市場相場を基準として、開封済みは状態により以下の範囲で査定されます。</p><ol><li><strong>9割以上残</strong>: 市場相場の30〜40%程度</li><li><strong>7割以上残</strong>: 市場相場の25〜35%程度</li><li><strong>5割以上残</strong>: 市場相場の20〜30%程度</li><li><strong>3割以上残</strong>: 基準の10〜20%</li><li><strong>1割以下残</strong>: 買取不可の場合があります。空き瓶として数千円で買い取られる場合もあります</li></ol>` }} />

          <h2 id="section-2">3. 開封済みの査定で重視される5要素</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>開封済みボトルの査定では、以下の5つの要素が総合的に評価されます。</p><ol><li><strong>残量</strong> — 多いほど評価額が高くなります。9割以上が査定の目安です</li><li><strong>保管状態</strong> — コルクの劣化・香味の揮発の度合い</li><li><strong>付属品</strong> — 外箱・冊子・カートンの有無</li><li><strong>ラベルの状態</strong> — 未開封品と同様に評価されます</li><li><strong>キャップ・栓の状態</strong> — 確実に閉まっているか、隙間からの揮発がないか

評価基準は業者により異なりますが、上記の5つの要素は共通の判断材料です。</li></ol>` }} />

          <h2 id="section-3">4. 開封済みでも価値が高くなる条件</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>以下のような秩父ザファーストは、開封済みでも比較的高い査定額となる傾向があります。</p><ol><li><strong>終売・希少銘柄</strong>（流通量が極小）</li><li><strong>古いボトリング</strong>（ヴィンテージ価値）</li><li><strong>外箱・冊子が完全保存</strong></li><li><strong>残量が9割以上で、蓋が確実に閉まっている</strong></li><li><strong>特殊な限定品・記念ボトル</strong></li><li><strong>海外コレクター需要が高い銘柄</strong></li><li><strong>正規流通店での購入を証明できる</strong></li></ol>` }} />

          <h2 id="section-4">5. 売却までの保管のコツ</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>開封後の秩父ザファーストは、早めに売却するか、適切に保管してください。</p><ol><li><strong>立てて保管</strong>（横置きはコルク劣化）</li><li><strong>直射日光を避け、室温20℃以下で保管</strong></li><li><strong>未開封品と同等の環境で保管</strong></li><li><strong>売却まで開栓せず、注ぎ足しをしない</strong></li><li><strong>キャップを確実に閉める</strong></li><li><strong>湿度50〜70%を維持</strong></li><li><strong>振動・衝撃を避ける</strong>

適切に保管することで、香味・品質の劣化を抑えることができます。</li></ol>` }} />

          <h2 id="section-5">6. 開封済みに対する各社の対応</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>PeatBid掲載の3社でも、開封済みの扱いは分かれます（各社公式サイト・2026年10月14日確認）。

<strong>各社の開封済み買取の特徴</strong>:</p><ol><li><strong>ヒカカク！</strong> — 査定・買取は紹介先の買取店が行うため、開封済みと明記して申し込み、各店の回答で受付可否を確認</li><li><strong>バイセル</strong> — 公式で開封済みのお酒は「買取できないことがほとんど」と案内（未開封が前提）</li><li><strong>リカスタ</strong> — 公式で「未開封品のみの買取対象」と案内

開封済みの受付自体を断る業者もあるため、申し込みの前に必ずご確認ください。</li></ol>` }} />

          <h2 id="section-6">7. 開封済みを高く売る5つのコツ</h2>
          <div dangerouslySetInnerHTML={{ __html: `<ol><li><strong>早めに売却する</strong> — 時間の経過とともに香味の揮発・酸化が進み、価値が下がります</li><li><strong>外箱・冊子を添付する</strong> — 付属品の有無は査定に影響します</li><li><strong>複数の業者を比較する</strong> — 開封済みでも数千〜数万円の差が生じる場合があります</li><li><strong>保管状態を写真で記録する</strong> — 適切に保管していたことを示せます</li><li><strong>状態を正確に申告する</strong> — 残量・状態を正確に伝えてください</li></ol>` }} />

          <h2 id="section-7">8. 売れない場合の対処法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>秩父ザファーストの買取を断られた場合の選択肢は、以下のとおりです。</p><ol><li><strong>別の業者で再査定を受ける</strong> — 判断基準は業者により異なります</li><li><strong>個人間取引（メルカリ・ヤフオク）</strong> — 業者の買取より高値となる可能性があります</li><li><strong>オークションへの出品</strong> — 希少銘柄であれば、入札により高値となる場合があります</li><li><strong>コレクターとの直接取引</strong> — ウイスキー愛好家のコミュニティでの取引です</li><li><strong>空き瓶の買取</strong> — ボトル本体・ラベル・箱に価値があれば、数千円で買い取られる場合があります

複数の方法をご検討ください。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">秩父ザファーストの無料一括査定のご案内</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数の業者の査定額を比較できます。査定料・キャンセル料は無料です。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://buysell-kaitori.com/liquor/japanese-whisky/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>秩父ザファーストに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '秩父ザファーストを売る前に何を準備すればよいですか？', a: '(1)外箱・冊子・カートン等の付属品を揃える、(2)ボトルの状態を確認する、(3)複数の業者で見積もりを取る、(4)本人確認書類を準備する、(5)振込を希望する場合は銀行口座を準備する、の5点が基本です。' }, { q: '複数の業者の比較は必要ですか？', a: 'はい、おすすめします。同じ秩父ザファーストでも、業者によって**数万〜数十万円**の査定差が生じる場合があります。一括査定と専門店の個別査定を組み合わせる方法が有効です。' }, { q: '買取後のキャンセルはできますか？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '秩父ザファーストの売却益に税金はかかりますか？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円以下であれば、確定申告は不要です。5年超保有の場合は長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '秩父ザファーストを売る時期はいつがよいですか？', a: "需要が高まる**年末年始・お中元・お歳暮の時期**は高値の傾向があります。海外オークション（Sotheby's等）の落札結果が反映された直後も、価格が上昇しやすい時期です。" }].map((faq) => (
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
            <Link href="/articles/chichibu-the-first-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高価売却のポイント</span><p className="text-sm font-bold mt-1">秩父ザファーストの高価売却のポイント</p></Link>
            <Link href="/articles/chichibu-the-first-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">秩父ザファーストの偽物の見分け方</p></Link>
            <Link href="/articles/chichibu-the-first-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">秩父ザファーストの買取業者ランキング</p></Link>
            <Link href="/articles/chichibu-the-first-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">秩父ザファーストの歴史と特徴</p></Link>
            <Link href="/articles/chichibu-the-first-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">秩父ザファーストの希少性・投資価値</p></Link>
            <Link href="/articles/chichibu-the-first-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">秩父ザファーストのオークション推移</p></Link>
            <Link href="/articles/chichibu-the-first-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしボトルの買取</span><p className="text-sm font-bold mt-1">秩父ザファーストの箱なしボトルの買取</p></Link>
            <Link href="/articles/chichibu-the-first-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れがある場合の査定</span><p className="text-sm font-bold mt-1">秩父ザファーストのラベル汚れがある場合の査定</p></Link>
            <Link href="/articles/chichibu-the-first-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">秩父ザファーストの買取相場ガイド</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-10-26）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者のページでご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
