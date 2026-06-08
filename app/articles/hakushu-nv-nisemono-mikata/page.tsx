import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MarketPriceCard from "@/components/MarketPriceCard";
import priceData from "@/data/price-history/hakushu-nv.json";

export const metadata: Metadata = {
  title: '白州ノンエイジの偽物・贋作の見分け方【2026年完全版】コレクター必須の5チェックポイント',
  description: '白州ノンエイジの偽物・贋作を見分ける具体的なポイントを徹底解説。ラベル・キャップ・液色・ホログラム・購入経路の5要素から本物を確実に判定する方法と、被害時の対処法。',
};

function FaqSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": '白州ノンエイジを売る前に何を準備すべき？', "acceptedAnswer": { "@type": "Answer", "text": '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' } }, { "@type": "Question", "name": '複数業者比較は本当に必要？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、必須です。同じ白州ノンエイジでも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' } }, { "@type": "Question", "name": '買取後のキャンセルは可能？', "acceptedAnswer": { "@type": "Answer", "text": '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' } }, { "@type": "Question", "name": '白州ノンエイジの売却益に税金はかかる？', "acceptedAnswer": { "@type": "Answer", "text": 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' } }, { "@type": "Question", "name": '白州ノンエイジを売るならどのタイミングがベスト？', "acceptedAnswer": { "@type": "Answer", "text": "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" } }] }) }} />;
}

export default function HakushuNvNisemonoMikataPage() {
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
            <li><Link href="/articles/hakushu-nv-kaitori/" className="hover:text-amber-dark transition-colors">白州ノンエイジ</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">偽物・贋作の見分け方</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/hakushu-nv.png" alt='白州ノンエイジの偽物・贋作の見分け方' width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">白州ノンエイジの偽物・贋作の見分け方</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026-06-08 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">編集ポリシー</Link>）</p>

          <MarketPriceCard data={priceData as Parameters<typeof MarketPriceCard>[0]["data"]} />

          {/* Brand mini profile */}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">白州ノンエイジ</p>
            <p className="text-xs text-warm-gray mt-1">ジャパニーズウイスキー / 白州蒸溜所 / ノンエイジ / 希少度 コモン / 市場相場 10,065円</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/hakushu-nv-kaitori/" className="text-amber-dark underline">白州ノンエイジの買取相場 完全ガイドへ</Link></p>
          </div>

          {/* Table of Contents */}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
              <li><a href="#section-0" className="hover:underline">1. 贋作市場の実情</a></li>
              <li><a href="#section-1" className="hover:underline">2. チェック1: ラベルの印刷品質</a></li>
              <li><a href="#section-2" className="hover:underline">3. チェック2: キャップ・封蝋・ホログラム</a></li>
              <li><a href="#section-3" className="hover:underline">4. チェック3: 液色と液面の状態</a></li>
              <li><a href="#section-4" className="hover:underline">5. チェック4: 瓶の形状・刻印</a></li>
              <li><a href="#section-5" className="hover:underline">6. チェック5: 購入経路の信頼性</a></li>
              <li><a href="#section-6" className="hover:underline">7. 不審なボトルを見つけた場合の対処法</a></li>
            </ol>
          </div>

          <p>白州ノンエイジのような高額ウイスキーは、贋作リスクが高まる銘柄です。特に未開封・箱付きで市場相場前後の流通価格を持つ銘柄は、海外を中心に巧妙な贋作が出回ることもあります。本記事では、白州ノンエイジの偽物を見抜く5つのチェックポイントと、不審なボトルへの対処法を解説します。</p>

          <div className="bg-cream/40 border-l-4 border-amber rounded-r-xl p-4 my-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-1">この銘柄の市場データ</p>
            <p className="text-sm text-ink leading-relaxed">直近180日のYahoo!オークションでは白州ノンエイジの落札が約274件確認でき、落札額の中央値は10,065円でした。取引が活発で換金しやすい銘柄で、本記事の査定目安はこの実勢中央値を基準に算出しています。</p>
          </div>

          <h2 id="section-0">1. 贋作市場の実情</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>ジャパニーズウイスキーブーム以降、海外の二次流通市場では<strong>贋作ボトルの流通が確認</strong>されています。特に山崎・響・白州・軽井沢・羽生など希少銘柄では、巧妙に作られた贋作が個人間取引で出回ることがあります。</p><p>中国・東南アジアの一部地域では、本物の空き瓶に偽の液体を詰めて販売する手口も報告されています。高額帯の銘柄は、5チェックを徹底することが必須です。</p>` }} />

          <h2 id="section-1">2. チェック1: ラベルの印刷品質</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>正規品はラベルの文字が<strong>鮮明・均一</strong>。フォント・字間・色合いがメーカー公式と一致します。一方、贋作には以下の特徴が見られます:</p><ol><li>文字のにじみ・かすれ</li><li>フォントの違い（似て非なる字形）</li><li>色ズレ・色ムラ</li><li>ラベルの紙質や光沢の違い</li><li>印刷位置の微妙なずれ

10倍ルーペでラベル全体を確認し、メーカー公式画像と細部まで比較してください。</li></ol>` }} />

          <h2 id="section-2">3. チェック2: キャップ・封蝋・ホログラム</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>サントリー山崎・響、白州、マッカランなどは<strong>ホログラムシール</strong>が貼付されています。本物のホログラムは光の角度で色が変化し、立体感のある印刷が施されています。

贋作は:</p><ol><li>ホログラムの粗さ</li><li>光の反射が均一（本物は不均一）</li><li>印刷が平面的（立体感に欠ける）</li><li>シールの貼り方が雑

キャップの締まり具合・封蝋の状態も確認ポイントです。本物は精密に封蝋されているのに対し、贋作は封蝋に隙間や違和感があることが多いです。</li></ol>` }} />

          <h2 id="section-3">4. チェック3: 液色と液面の状態</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>本物の白州ノンエイジは<strong>均一な琥珀色</strong>で透明感があります。贋作の特徴:</p><ol><li>色ムラ・濁り</li><li>沈殿物の存在</li><li>不自然に濃い/薄い色</li><li>気泡が永久に残る</li><li>振った時の液体の動きが不自然（粘度が異なる）

また、液面の高さも重要なチェックポイント。本物の白州ノンエイジは通常、肩口（首の付け根）の少し下まで液体があります。極端に液面が下がっている場合は、長期保管による「目減り」か、贋作の可能性があります。</li></ol>` }} />

          <h2 id="section-4">5. チェック4: 瓶の形状・刻印</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>公式ボトルは<strong>底面に刻印</strong>（ロット番号、製造所コード等）があります。贋作はこの刻印が:</p><ol><li>存在しない</li><li>印字パターンが異なる</li><li>不自然な深さ</li><li>ロット番号がメーカーの規則に合わない

また、瓶の重量・厚みも正規品と微妙に違うことがあります。同じ銘柄を複数本所有している場合は、重さを比較してみてください。</li></ol>` }} />

          <h2 id="section-5">6. チェック5: 購入経路の信頼性</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p><strong>信頼度の高い購入経路</strong>:</p><ol><li>海外オークション（Sotheby's、Bonhams、Whisky Auctioneer）</li><li>正規流通店・百貨店リカーショップ</li><li>国内大手買取業者の販売部門</li><li>信頼できる個人コレクターの直接取引

<strong>リスクが高い経路</strong>:</li><li>個人間取引（メルカリ、ヤフオク）の無名出品者</li><li>海外（特に中華圏）の無名通販店</li><li>SNS・LINEでの個人取引</li><li>異常に安い「掘り出し物」

相場より20%以上安い白州ノンエイジは要警戒。「他では絶対手に入らない」と煽る業者・個人も典型的な贋作販売パターンです。</li></ol>` }} />

          <h2 id="section-6">7. 不審なボトルを見つけた場合の対処法</h2>
          <div dangerouslySetInnerHTML={{ __html: `<p>自身が保有する白州ノンエイジが不審に見える場合、または購入を検討中のボトルが怪しい場合は、以下の手順で対処してください:</p><ol><li><strong>写真記録</strong> — ボトル全体・ラベル各角度・キャップ・底面の刻印を高解像度で撮影</li><li><strong>専門業者で鑑定査定</strong> — JOYLAB等のお酒買取専門店で無料鑑定を依頼</li><li><strong>メーカーへの問い合わせ</strong> — サントリー・ニッカ等の公式お客様窓口にロット番号を伝えて真贋確認</li><li><strong>購入経路を遡る</strong> — 不正流通の可能性が高い場合は購入元に返品交渉</li><li><strong>警察への相談</strong> — 詐欺の可能性がある場合は最寄りの警察署で相談

贋作と判明した場合、買取業者は買取を拒否します。また、贋作と知りながら売却することは詐欺罪に該当する可能性があるため、誠実に対処することが重要です。</li></ol>` }} />

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">白州ノンエイジの無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>白州ノンエイジに関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {[{ q: '白州ノンエイジを売る前に何を準備すべき？', a: '(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。' }, { q: '複数業者比較は本当に必要？', a: 'はい、必須です。同じ白州ノンエイジでも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。' }, { q: '買取後のキャンセルは可能？', a: '業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。' }, { q: '白州ノンエイジの売却益に税金はかかる？', a: 'はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。' }, { q: '白州ノンエイジを売るならどのタイミングがベスト？', a: "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。" }].map((faq) => (
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
            <Link href="/articles/hakushu-nv-takaku-uru/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">高く売る方法</span><p className="text-sm font-bold mt-1">白州ノンエイジの高く売る方法</p></Link>
            <Link href="/articles/hakushu-nv-ranking/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">買取業者ランキング</span><p className="text-sm font-bold mt-1">白州ノンエイジの買取業者ランキング</p></Link>
            <Link href="/articles/hakushu-nv-rekishi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">歴史と特徴</span><p className="text-sm font-bold mt-1">白州ノンエイジの歴史と特徴</p></Link>
            <Link href="/articles/hakushu-nv-kihaku/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">希少性・投資価値</span><p className="text-sm font-bold mt-1">白州ノンエイジの希少性・投資価値</p></Link>
            <Link href="/articles/hakushu-nv-auction-suii/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">オークション推移</span><p className="text-sm font-bold mt-1">白州ノンエイジのオークション推移</p></Link>
            <Link href="/articles/hakushu-nv-kaifu-zumi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">開封済みでも売れる</span><p className="text-sm font-bold mt-1">白州ノンエイジの開封済みでも売れる</p></Link>
            <Link href="/articles/hakushu-nv-hako-nashi/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">箱なしでも買取</span><p className="text-sm font-bold mt-1">白州ノンエイジの箱なしでも買取</p></Link>
            <Link href="/articles/hakushu-nv-label-yogore/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">ラベル汚れでも査定</span><p className="text-sm font-bold mt-1">白州ノンエイジのラベル汚れでも査定</p></Link>
            <Link href="/articles/hakushu-nv-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">白州ノンエイジの買取相場ガイド（完全版）</p></Link>
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の市場相場は Yahoo Auctions 過去180日落札データの中央値（取得日 2026-06-08）です。業者の買取査定額は各社の在庫状況・キャンペーンにより変動するため、最新の査定額は各業者ページで直接ご確認ください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}
