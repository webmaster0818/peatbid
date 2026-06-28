import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/hibiki-nv.json";

export const metadata: Metadata = {
  title: '響ジャパニーズハーモニーの希少性と買取・投資価値【2026年6月最新】保有か売却かの判断軸',
  description: '響ジャパニーズハーモニーの希少性ランクと投資対象としての評価を徹底分析。価格推移、需給動向、長期保有 vs 売却の判断基準、税制優遇まで、コレクター向けに解説。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '響ジャパニーズハーモニーを売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' } }, { "@type": "Question", "name": '複数業者比較は本当に必要？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、必須です。同じ響ジャパニーズハーモニーでも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' } }, { "@type": "Question", "name": '買取後のキャンセルは可能？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '響ジャパニーズハーモニーの売却益に税金はかかる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '響ジャパニーズハーモニーを売るならどのタイミングがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" } }] }) }} />;
}

export default function HibikiNvKihakuPage() {
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
            <li><Link href="/articles/hibiki-nv-kaitori/" className="hover:text-amber-dark transition-colors">響ジャパニーズハーモニー</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">希少性・投資価値</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/hibiki-nv.png" alt='響ジャパニーズハーモニーの希少性と投資価値' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">響ジャパニーズハーモニーの希少性と投資価値</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-29 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">響ジャパニーズハーモニー</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / サントリー / ノンエイジ / 希少度 コモン / 市場相場 10,500円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/hibiki-nv-kaitori/" className="text-amber-dark underline">響ジャパニーズハーモニーの買取相場 完全ガイドへ</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 響ジャパニーズハーモニーの市場ポジションとデータ分析</a></li>
              <li><a href="#section-1" className="hover:underline">2. 希少性のランク評価</a></li>
              <li><a href="#section-2" className="hover:underline">3. 価格推移の歴史</a></li>
              <li><a href="#section-3" className="hover:underline">4. 投資資産としての位置付け</a></li>
              <li><a href="#section-4" className="hover:underline">5. 長期保有のメリット</a></li>
              <li><a href="#section-5" className="hover:underline">6. 長期保有のデメリット</a></li>
              <li><a href="#section-6" className="hover:underline">7. 売却を判断する5つの基準</a></li>
              <li><a href="#section-7" className="hover:underline">8. 税制優遇の活用</a></li>
            </ol>
          </div>

          <p>響ジャパニーズハーモニーは希少度現行品クラスのボトル。直近の実勢中央値は約10,500円で、投資対象として保有すべきか、それとも売却すべきか——コレクターが直面する判断を、データと市場動向から考察します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションでは響ジャパニーズハーモニーの落札が約228件確認でき、落札額の中央値は10,500円でした。取引が活発で換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>

          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/collector-vault.png" alt="コレクター向けプライベートヴォルト" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>

          <h2 id="section-0">1. 響ジャパニーズハーモニーの市場ポジションとデータ分析</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>響ジャパニーズハーモニー</strong>はジャパニーズウイスキー（サントリー）のノンエイジ（NV）、度数43%、希少度は標準的な流通量に分類される銘柄です。</p><p>直近180日の実勢中央値は<strong>10,500円</strong>（流通サンプル228件、当サイト独自集計）。価格帯としては<strong>実用帯</strong>にあたり、回転が速く、状態が良ければスムーズに売却しやすい価格帯です。</p><p>流通量は<strong>潤沢</strong>の水準です。流通量が多く相場が安定しているぶん、付属品・状態の差が査定額に直結します。</p><p>ジャパニーズウイスキーは世界的評価の高まりで需要が強く、特に終売・長期熟成銘柄は中長期で価格が伸びやすい傾向です。一方で短期は為替やオークション結果で振れるため、売り時の見極めが重要になります。</p><p>※ 数値は当サイトがYahoo!オークションの過去180日落札データ（IQRで外れ値除去）から集計した参考値で、買取額を保証するものではありません。</p>` }} />

          <h2 id="section-1">2. 希少性のランク評価</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>響ジャパニーズハーモニーは希少度カテゴリで「<strong>現行品</strong>」に分類されます。希少度は以下の4要素で決まります:</p><ol><li>生産終了・休売の有無</li><li>市場流通量</li><li>コレクター需要</li><li>国際的評価

希少度が高いほど、二次流通市場での価格上昇期待が大きくなります。現行品クラスは、長期保有でプレミアが乗りやすい傾向があります。</li></ol>` }} />

          <h2 id="section-2">3. 価格推移の歴史</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>響ジャパニーズハーモニーは過去5〜10年にわたって、二次流通市場で価格が上昇基調にあります。特に2018年以降の世界的ジャパニーズウイスキーブーム以降は、長期熟成・終売銘柄を中心に<strong>3〜10倍</strong>の値上がりを記録した銘柄も少なくありません。</p><p>2020年: コロナ禍で一時的に需要減少も、すぐに回復<br/>2021〜2022年: アジア富裕層の参入加速、価格急騰<br/>2023〜2024年: 上昇ペースは緩和、安定推移<br/>2025〜2026年: 円安効果と海外需要継続で高値維持</p><p>この推移を踏まえ、響ジャパニーズハーモニーの中長期見通しは引き続き堅調と予想されます。</p>` }} />

          <h2 id="section-3">4. 投資資産としての位置付け</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ウイスキーは<strong>「液体資産（Liquid Asset）」</strong>として国際的に認識されつつあります。</p><p><strong>Knight Frank Luxury Investment Index</strong>（高級資産投資指数）でも、ウイスキーは過去10年で最も値上がりした投資対象の1つ。クラシックカー・ワイン・アートと並ぶ、実物資産としての地位を確立しています。</p><p>市場相場クラスのボトルは、保管環境さえ整えれば<strong>現金化容易な実物資産</strong>として機能します。資産分散の選択肢として検討する価値があります。</p>` }} />

          <h2 id="section-4">5. 長期保有のメリット</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>メリット</strong>:</p><ol><li>希少性上昇による価格上昇期待</li><li>税制優遇（5年超の長期譲渡所得は1/2軽減）</li><li>趣味と投資の両立</li><li>インフレヘッジ機能</li><li>物理資産としての安心感</li><li>相続・贈与対象としての価値</li><li>国際市場での換金性</li></ol>` }} />

          <h2 id="section-5">6. 長期保有のデメリット</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>デメリット</strong>:</p><ol><li>保管コスト（湿度・温度管理）</li><li>盗難・破損リスク</li><li>市場の流動性低下リスク</li><li>トレンド変化リスク（次世代のウイスキー嗜好が変わる可能性）</li><li>保険加入コスト</li><li>維持の手間</li><li>機会費用（他の投資先と比較した収益率）

これらのデメリットを認識した上で、投資元本割れの可能性も考慮することが重要です。</li></ol>` }} />

          <h2 id="section-6">7. 売却を判断する5つの基準</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>売却タイミング判断のチェックリスト</strong>:</p><ol><li>自分にとっての納得価格に達した</li><li>次の投資先・現金化のニーズがある</li><li>当該銘柄の需給バランスが転換点を迎えた</li><li>保管コストが値上がり期待を上回ると判断</li><li>ライフイベント（相続・住宅購入・教育費等）への対応

これらが揃った時が、合理的な売却タイミングです。1点だけ満たすのではなく、複数の要因が重なった時に動くことが推奨されます。</li></ol>` }} />

          <h2 id="section-7">8. 税制優遇の活用</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ウイスキー売却益は<strong>譲渡所得</strong>として課税対象になります。重要なポイント:</p><ol><li><strong>年間50万円の特別控除</strong> — この範囲内なら実質非課税</li><li><strong>5年超保有で長期譲渡所得</strong> — 特別控除後の課税対象額が1/2に軽減</li><li><strong>生活用動産の非課税</strong> — 1点30万円以下は非課税

例えば取得費が売却額の30%程度のボトルなら譲渡所得は売却額の約70%。さらに年間50万円の特別控除を差し引き、5年超保有なら長期譲渡で課税対象額が1/2に軽減されるため、単発売却なら課税が発生しないケースも多くあります。

コレクション歴の長い方は購入時期・取得価格の記録を残しておくと有利です。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">響ジャパニーズハーモニーの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>響ジャパニーズハーモニーに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '響ジャパニーズハーモニーを売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' }, { q: '複数業者比較は本当に必要？', a: 'はい、必須です。同じ響ジャパニーズハーモニーでも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' }, { q: '買取後のキャンセルは可能？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '響ジャパニーズハーモニーの売却益に税金はかかる？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '響ジャパニーズハーモニーを売るならどのタイミングがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" }].map((faq) => (
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
            <Link href="/articles/hibiki-nv-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高く売る方法</span><p className="text-sm font-bold mt-1">響ジャパニーズハーモニーの高く売る方法</p></Link>
            <Link href="/articles/hibiki-nv-nisemono-mikata/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">偽物の見分け方</span><p className="text-sm font-bold mt-1">響ジャパニーズハーモニーの偽物の見分け方</p></Link>
            <Link href="/articles/hibiki-nv-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">響ジャパニーズハーモニーの買取業者ランキング</p></Link>
            <Link href="/articles/hibiki-nv-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">響ジャパニーズハーモニーの歴史と特徴</p></Link>
            <Link href="/articles/hibiki-nv-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">響ジャパニーズハーモニーのオークション推移</p></Link>
            <Link href="/articles/hibiki-nv-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みでも売れる</span><p className="text-sm font-bold mt-1">響ジャパニーズハーモニーの開封済みでも売れる</p></Link>
            <Link href="/articles/hibiki-nv-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしでも買取</span><p className="text-sm font-bold mt-1">響ジャパニーズハーモニーの箱なしでも買取</p></Link>
            <Link href="/articles/hibiki-nv-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れでも査定</span><p className="text-sm font-bold mt-1">響ジャパニーズハーモニーのラベル汚れでも査定</p></Link>
            <Link href="/articles/hibiki-nv-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">響ジャパニーズハーモニーの買取相場ガイド（完全版）</p></Link>
            <Link href="/articles/hibiki-nisemono-mikata/" className="block bg-white border border-burgundy/30 rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-burgundy font-bold">真贋ハブ</span><p className="text-sm font-bold mt-1">響（全種）の偽物の見分け方</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-06-29）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
