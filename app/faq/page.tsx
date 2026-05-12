import type { Metadata } from "next";
import Link from "next/link";

const faqCategories = [
  {
    title: "ウイスキー買取の相場について",
    faqs: [
      { q: "ウイスキーの買取価格は毎日変わりますか？", a: "はい、ジャパニーズウイスキーの主要銘柄（山崎・響・白州・竹鶴など）は需給バランスとオークション相場の影響を受けて日々変動します。海外の二次流通市場（Sotheby's、Bonhams、Whisky Auctioneer等）の落札データが国内買取価格の指標になります。" },
      { q: "山崎25年の現在の買取相場はいくらですか？", a: "2026年5月現在、山崎25年（未開封・箱付き）の買取相場は1本あたり約88〜95万円前後です。2008年の発売当初は5〜7万円でしたが、ジャパニーズウイスキーブームで17倍以上に高騰しています。状態（箱・冊子・ラベル・液面）で査定額が変動します。" },
      { q: "響30年は今いくらで売れますか？", a: "2026年5月現在、響30年（未開封・箱付き）の買取相場は1本あたり約100〜120万円前後です。終売後に希少価値が一気に上昇しました。古いボトル（パーフェクトSUNTORYラベル等）はさらに高値になる場合があります。" },
      { q: "なぜジャパニーズウイスキーはこんなに高いのですか？", a: "(1)世界的な品評会（World Whiskies Awards等）で連続受賞し国際的評価が確立、(2)アジア・欧米富裕層からのコレクター需要急増、(3)2018年前後に山崎・白州12年などが終売・休売、(4)二次流通市場での投資対象化、の4要因が重なっています。" },
      { q: "ウイスキーは今後も値上がりしますか？", a: "短期的には需給次第ですが、希少銘柄（山崎25年・響30年・カードシリーズ等）は中長期で見て高値を維持する見方が多いです。一方で大量生産銘柄は供給増で価格が落ち着く可能性もあります。「自分にとっての納得価格かどうか」が判断軸として実践的です。" },
      { q: "2026年はウイスキーの売り時ですか？", a: "歴史的な高値水準にあるため売却には好条件です。ただし相場のピークは予測困難なので、「保有を続ける目的が薄い」「現金化したい事情がある」場合は今売る判断が合理的です。詳細は『ウイスキーを高く売る5つのコツ』の記事をご覧ください。" },
    ],
  },
  {
    title: "状態・付属品について",
    faqs: [
      { q: "未開封かどうかで価格はどれくらい変わりますか？", a: "未開封は買取相場の100%、開封済みは状態により20〜40%程度まで下がるのが一般的です。希少銘柄ほど未開封プレミアが大きく、山崎25年では開封済みだと数十万円の差が生じることもあります。" },
      { q: "箱や冊子がなくても買い取ってもらえますか？", a: "はい、買取は可能ですが査定額は下がります。一般的に箱なしで-10〜20%、冊子なしで-5〜10%が目安です。希少銘柄ほど付属品の有無が査定に影響するため、可能な限りすべて揃えて売却することをおすすめします。" },
      { q: "ラベルが汚れていますが売れますか？", a: "ラベルの状態は査定に影響します。軽度の汚れなら-5%程度ですが、破れ・剥がれ・水濡れ跡があると-10〜20%下がることがあります。コレクター品は外観の美しさが価格に直結するため、保管時はラベル保護を意識してください。" },
      { q: "液面が下がっていますが買取できますか？", a: "未開封でも長期保管により液面が下がる「目減り」現象は珍しくありません。肩口より少し下までなら通常査定の範囲、それ以上下がると査定額が大幅減になるか買取不可になることもあります。" },
      { q: "1本だけでも査定してもらえますか？", a: "はい、1本からでも査定可能です。出張買取は数本以上をまとめて依頼すると効率的ですが、宅配買取・店頭買取は1本でも対応してくれます。" },
      { q: "古い未開封ボトルが家にあります。価値はありますか？", a: "終売銘柄・閉鎖蒸溜所のボトル（軽井沢・羽生・川崎など）は非常に高値が付くことがあります。例えば軽井沢30年は数百万円〜数千万円のケースも。古いボトルは捨てる前にまず査定に出すことをおすすめします。" },
    ],
  },
  {
    title: "買取方法・手続きについて",
    faqs: [
      { q: "ウイスキーの買取にはどんな方法がありますか？", a: "主に4つの方法があります。(1)店頭買取：店舗に持ち込み、即日現金化。(2)出張買取：自宅に査定員が訪問。(3)宅配買取：宅配便で送付。(4)一括査定：複数業者に同時見積もり。希少銘柄や大量売却は出張買取、少量や宅配対応の業者は宅配買取が便利です。" },
      { q: "買取に必要な持ち物は？", a: "本人確認書類（運転免許証・マイナンバーカード・パスポート等）が必須です。古物営業法により身分証の提示が義務付けられています。また、20歳以上であることの確認も行われます。付属品（箱・冊子・ホログラム・カートン）があれば査定額アップに繋がります。" },
      { q: "査定だけで売らなくても大丈夫ですか？", a: "はい、PeatBidで紹介している買取業者はいずれも査定無料・キャンセル料無料です。「まず価値を知りたい」という目的で気軽に査定依頼できます。" },
      { q: "即日で現金を受け取れますか？", a: "店頭買取であれば、査定完了後その場で現金を受け取れます。出張買取もその場で現金払いの業者が多いです。宅配買取の場合は、商品到着後1〜3営業日で銀行振込となります。" },
      { q: "宅配買取で送るときの注意点は？", a: "ボトル破損を防ぐため、(1)プチプチで二重に包装、(2)箱と外箱の間に緩衝材を入れる、(3)「ワレモノ」「天地無用」シール、を徹底してください。信頼できる業者は保険付きの配送伝票を同封してくれます。" },
      { q: "20歳未満ですが家族のウイスキーを売れますか？", a: "酒類は20歳未満の方には販売・買取できません。20歳以上のご家族（保護者など）に依頼してください。" },
    ],
  },
  {
    title: "売れる銘柄・売れない銘柄",
    faqs: [
      { q: "どんなウイスキーが高く売れますか？", a: "(1)ジャパニーズウイスキーの長期熟成（山崎18年以上・響21年以上・白州18年以上）、(2)終売銘柄（白州12年・響17年など）、(3)閉鎖蒸溜所（軽井沢・羽生・川崎）、(4)マッカランの長期熟成シェリーオーク、(5)ボウモア黒・スプリングバンク長期熟成等が高値の代表例です。" },
      { q: "コンビニで買えるウイスキーも売れますか？", a: "サントリー角・トリス・ジムビーム等の大衆銘柄は買取対象外または数百円程度の場合が多いです。買取に出して見合うのはおおむね定価5,000円以上のボトルからです。" },
      { q: "海外のお土産で買ったウイスキーは売れますか？", a: "免税店で買った銘柄でも、人気銘柄（マッカラン、グレンファークラス、ボウモア等のシングルモルト）であれば買取可能です。日本の正規流通とは別ラベル・ボトルの場合は専門業者に確認するのが確実です。" },
      { q: "賞味期限が切れたウイスキーは売れますか？", a: "ウイスキーは蒸留酒のため賞味期限がありません。未開封なら何十年経っても買取対象です。ただし、開封後は香りが揮発するため早めの売却を推奨します。" },
      { q: "金箔入りやリキュール系も買い取ってもらえますか？", a: "金箔入りウイスキー（ゴールドリーフ系）、コニャック、カルバドス、ブランデー、ラム、テキーラ等の蒸留酒も買取対象です。ワインや日本酒は対応業者が分かれるため事前確認が必要です。" },
    ],
  },
  {
    title: "業者選び・トラブル回避",
    faqs: [
      { q: "ウイスキー買取業者を選ぶポイントは？", a: "3つの基準で選びましょう。(1)お酒買取の専門知識があるか（一般リサイクル業者では希少ボトルが安く査定されがち）、(2)査定料・手数料が無料か、(3)複数業者を比較して最高値を提示する業者を選ぶこと。1社だけで決めるのは避けるべきです。" },
      { q: "押し買い（訪問買取）のトラブルに遭わないためには？", a: "突然自宅を訪問してくる業者には注意してください。信頼できる業者は必ず事前予約制です。万一契約してしまった場合でも、特定商取引法によりクーリングオフ（8日間）が適用されます。" },
      { q: "買取価格に手数料は含まれますか？", a: "PeatBid掲載の業者は査定料・買取手数料・出張費・キャンセル料がすべて無料が原則です。「保管手数料」「梱包費」などの名目で差し引く業者は要注意です。" },
      { q: "クーリングオフは使えますか？", a: "出張買取の場合、特定商取引法により8日間のクーリングオフが適用されます。ただし、店頭に自ら持ち込んだ場合は適用外です。高額品を売却する際は慎重に判断しましょう。" },
      { q: "盗品ではないかと疑われませんか？", a: "適正な業者は古物営業法に則り本人確認書類の提示を求めます。これは盗品取引防止のための法的義務であり、誠実な利用者にとって不利益はありません。" },
    ],
  },
  {
    title: "税金・確定申告について",
    faqs: [
      { q: "ウイスキーを売ったら税金はかかりますか？", a: "ウイスキーの売却益は原則「譲渡所得」として課税対象になります。ただし、年間50万円の特別控除があり、売却益が50万円以内であれば実質非課税です。また、1点30万円以下のものは生活用動産として非課税となるケースもあります。" },
      { q: "確定申告は必要ですか？", a: "売却益が年間50万円の特別控除を超え、かつ給与所得者の場合は他の所得と合わせて20万円を超える場合に確定申告が必要です。申告期限は売却の翌年2月16日〜3月15日です。" },
      { q: "5年以上持っていると税金が安くなるのは本当ですか？", a: "本当です。保有期間5年超のものは「長期譲渡所得」となり、特別控除後の課税対象額が1/2に軽減されます。コレクション歴の長い方は購入時期の記録を残しておくと有利です。" },
      { q: "相続したウイスキーを売った場合の税金は？", a: "相続したウイスキーの売却も譲渡所得の対象です。取得費は被相続人（故人）の購入価格を引き継ぎます。購入記録がない場合は売却価格の5%が概算取得費となり税負担が大きくなるため、遺品整理時に購入記録を探しましょう。" },
      { q: "売却益を申告しなかったらバレますか？", a: "高額取引は買取業者から税務署に情報が伝わる場合があります。未申告はバレる可能性があり、ペナルティ（無申告加算税等）の対象となります。適正に申告しましょう。" },
    ],
  },
];

function FaqSchema() {
  const allFaqs = faqCategories.flatMap((cat) => cat.faqs);
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />;
}

export const metadata: Metadata = {
  title: "【2026年最新】ウイスキー買取よくある質問（FAQ）— 相場・状態・方法・税金の疑問を解決",
  description:
    "PeatBidのウイスキー買取FAQ。山崎・響・白州・マッカランの最新相場、付属品の影響、買取方法、業者選び、税金・確定申告まで、ウイスキー売却に関するすべての疑問に回答。",
};

export default function FaqPage() {
  const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.faqs.length, 0);

  return (
    <>
      <FaqSchema />
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">よくある質問（FAQ）</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">ウイスキー買取 よくある質問（FAQ）</h1>
        <p className="text-warm-gray text-sm mb-4">最終更新: 2026年5月11日</p>
        <p className="text-warm-gray text-sm mb-8">全{totalQuestions}問の質問に回答しています。</p>

        <p>ウイスキーの買取に関してよく寄せられる質問を<strong>カテゴリ別に{totalQuestions}問以上</strong>まとめました。相場・状態・方法・税金まで、売却前に知っておきたい情報を網羅しています。</p>

        <div className="bg-cream rounded-xl p-5 my-6 not-prose">
          <p className="font-bold text-sm mb-3">カテゴリから探す</p>
          <ul className="space-y-2">
            {faqCategories.map((cat, idx) => (
              <li key={cat.title}>
                <a href={`#category-${idx}`} className="text-sm text-amber-dark hover:underline">
                  {cat.title}（{cat.faqs.length}問）
                </a>
              </li>
            ))}
          </ul>
        </div>

        {faqCategories.map((cat, catIdx) => (
          <div key={cat.title} className="mb-10">
            <h2 id={`category-${catIdx}`}>{cat.title}</h2>
            <div className="space-y-3 not-prose">
              {cat.faqs.map((faq) => (
                <details key={faq.q} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between p-5 font-medium text-sm">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8">
          <h3 className="font-bold text-base mb-3 text-center">まずは無料査定でウイスキーの価値を確認</h3>
          <p className="text-sm text-warm-gray text-center mb-4">疑問が解消したら、次のステップは無料査定です。複数業者を比較して最高値を狙いましょう。</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">一括査定で最高値を調べる（ヒカカク！）</a>
            <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">大手で確実に売る（バイセル）</a>
            <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">専門店で査定（JOYLAB）</a>
            <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">宅配で完結（リカスタ）</a>
          </div>
        </div>

        <h2>関連記事</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          <Link href="/articles/whisky-kaitori-souba/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <span className="text-xs text-amber-dark font-bold">相場情報</span>
            <p className="text-sm font-bold mt-1">ウイスキー買取相場一覧</p>
          </Link>
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
        </div>
      </article>
    </div>
    </>
  );
}
