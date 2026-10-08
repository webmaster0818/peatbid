import type { Metadata } from "next";
import Link from "next/link";

const UPDATED = "2026-10-08";
const UPDATED_JA = "2026年10月8日";
const URL = "https://peatbid.com/articles/hikakaku-sake-kaitori-kuchikomi/";
const TITLE = "ヒカカクの酒買取 口コミ・評判は？ウイスキーを一括査定に出す流れと注意点【2026年10月】";
const DESC =
  "ヒカカク！でお酒・ウイスキーを売る前に知りたい口コミ・評判を、公式クチコミページの評価分布（総合3.4・1,083件）と傾向から整理。仕組み（無料・最大20社一括査定）、運営会社、ウイスキーを出すときの流れ、キャンセル・個人情報・電話連絡の注意点、向いている人まで出典付きで解説。";

const toc = [
  ["kekka", "結論：ヒカカクの酒買取はこんな人向け"],
  ["toha", "ヒカカク！とは（仕組み・運営会社・お酒カテゴリ）"],
  ["nagare", "ウイスキーを一括査定に出す流れ"],
  ["chuui", "お酒を出す前に知っておきたい注意点"],
  ["hyoban", "良い評判・気になる評判（出典付き）"],
  ["muki", "向いている人・向かない人"],
  ["faq", "よくある質問"],
  ["shutten", "出典"],
];

const faqs = [
  {
    q: "ヒカカク！の酒買取は本当に無料ですか？",
    a: "公式のよくあるご質問と使い方ガイドに「完全無料でご利用いただけます」と明記されています。利用規約第6条でも「当社がユーザーに対して請求する費用は原則無料」とされています。査定後に売らなくても費用はかかりません。",
  },
  {
    q: "ヒカカク！自体がウイスキーを買い取ってくれるのですか？",
    a: "いいえ。公式FAQに「ヒカカク！では買取業者のご紹介のみ行っており、査定や買取に関しましては直接買取業者よりご連絡」とあります。実際の査定額の提示や買取は、提携している各買取店が行います。",
  },
  {
    q: "査定後にキャンセルしたい場合はどうすればいいですか？",
    a: "公式FAQでは「査定のお申込み後は、買取業者とお客様で直接お取引」のため、キャンセルは業者へ直接連絡するよう案内されています。ヒカカク！側でまとめて取り消す仕組みはないので、断る相手は各業者です。",
  },
  {
    q: "ウイスキーは何本からでも査定できますか？",
    a: "1本から申し込めます。本数が多い相続・遺品整理の場合は、買取方法で「出張」や「宅配」を選ぶと、まとめて見てもらえる業者が見つかりやすくなります。高額銘柄が混じっている場合は、銘柄ごとに相場を確認してから出すと安心です。",
  },
  {
    q: "査定結果はどのくらいで届きますか？",
    a: "公式の使い方ガイドには「査定結果については、最短1日で登録したアドレスにメールが届きます」とあります。ただし商品によっては買取不可となり、1社からも返信が来ないケースがあることもFAQに明記されています。",
  },
  {
    q: "悪い口コミが多いというのは本当ですか？",
    a: "公式クチコミページ（2026年10月8日時点）では総合評価3.4で、星1が266件、星5が425件です。公式自身が「悪い・ひどい・買取が安いというクチコミの比率は32.5%」と表示しています。内容は電話の多さや見積もり業者数の少なさに関するものが目立ちます。詳しくは本文の評判の章をご覧ください。",
  },
];

function Cta({ title, lead }: { title: string; lead: string }) {
  return (
    <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
      <p className="font-bold text-ink mb-2">{title}</p>
      <p className="text-sm text-warm-gray mb-4">{lead}</p>
      <p className="text-xs text-warm-gray mb-3">
        <span className="inline-block align-middle border border-warm-gray/50 rounded px-1.5 py-0.5 mr-2 text-[11px] font-bold tracking-wide">PR</span>
        ヒカカク！（買取価格比較サイト・最大20社に一括査定・完全無料）
      </p>
      <a
        href="https://hikakaku.com"
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
        className="amber-cta inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm"
      >
        無料一括査定でウイスキーの最高値を調べる →
      </a>
    </div>
  );
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/articles/hikakaku-sake-kaitori-kuchikomi/" },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "article", images: ["/og-image.png"] },
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESC,
    datePublished: UPDATED,
    dateModified: UPDATED,
    mainEntityOfPage: URL,
    author: { "@type": "Organization", name: "PeatBid編集部", url: "https://peatbid.com/editorial/" },
    publisher: { "@type": "Organization", name: "PeatBid" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://peatbid.com/" },
      { "@type": "ListItem", position: 2, name: "記事一覧", item: "https://peatbid.com/articles/" },
      { "@type": "ListItem", position: 3, name: "ヒカカクの酒買取 口コミ・評判", item: URL },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/articles/" className="hover:text-amber-dark">記事一覧</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">ヒカカクの酒買取 口コミ・評判</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          ヒカカクの酒買取 口コミ・評判は？ウイスキーを一括査定に出す流れと注意点
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: {UPDATED_JA} ／ 執筆: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>
          （公式サイト・公式クチコミページを{UPDATED_JA}に確認。本記事は広告（PR）リンクを含みます）
        </p>

        <div id="kekka" className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
          <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
            <li>ヒカカク！は<strong>買取店を紹介する比較サイト</strong>で、自社では買い取らない。利用は<strong>完全無料</strong>、最大20社から査定結果がメールで届く。</li>
            <li>お酒カテゴリは<strong>744社・52,971点</strong>の掲載（2026年10月8日時点の公式カテゴリページ表記）。ウイスキーは「日用品・コスメ・食品・お酒」カテゴリから選ぶ。</li>
            <li>公式クチコミは<strong>総合3.4・1,083件</strong>。良い声は「一度の入力で複数社から返事」「買取不可でも丁寧」、気になる声は「電話が多い」「見積もり業者が少ない・1社だけ」。</li>
            <li>向いているのは<strong>銘柄・本数が決まっていて、複数社の相見積もりを取りたい人</strong>。電話連絡を避けたい人や、1本だけ今すぐ現金化したい人には向かない。</li>
          </ul>
        </div>

        <Cta title="ウイスキーの買取価格を複数社で比較" lead="銘柄・本数・状態を入力するだけ。査定額に納得できなければ売らなくてOKです。" />

        <nav className="not-prose border border-warm-border rounded-xl p-5 my-8" aria-label="目次">
          <p className="font-bold text-ink mb-3">目次</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-amber-dark">
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:underline">{label}</a></li>
            ))}
          </ol>
        </nav>

        <h2 id="toha">ヒカカク！とは（仕組み・運営会社・お酒カテゴリ）</h2>
        <p>
          ヒカカク！（hikakaku.com）は「買取価格比較サイト」です。公式の使い方ガイドでは、できることを「一括査定の申し込み」「買取業者を見つける」「買取相場を知る」の3つに整理しています。
          本記事で扱うのは一括査定で、<strong>商品情報を送ると最大20社から査定結果がメールで届き、価格を比較して納得した業者にだけ買取を申し込む</strong>という仕組みです。
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-warm-border">
            <tbody>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2 w-36">サービス名</th><td className="px-3 py-2">ヒカカク！（買取価格比較サイト）</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">運営会社</th><td className="px-3 py-2">株式会社じげん（ZIGExN Co., Ltd.）東京都港区虎ノ門3-4-8／代表責任者 平尾 丈</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">許可</th><td className="px-3 py-2">古物営業法に基づき都道府県公安委員会の許可を取得と表記。アフィリエイトプログラムを利用したサービス紹介を行う旨も明記</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">料金</th><td className="px-3 py-2">完全無料（利用規約第6条「当社がユーザーに対して請求する費用は原則無料」）</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">査定社数</th><td className="px-3 py-2">最大20社から査定結果（買取不可の場合は返信が無いこともある）</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">買取方法</th><td className="px-3 py-2">宅配・出張・店頭から最大3つを希望として選択</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">お酒カテゴリ</th><td className="px-3 py-2">掲載 52,971点・744社。直近1年の買取実績は「最低1円〜最高4,400,000円」と表示。サブカテゴリにウイスキー・日本酒・焼酎・ワイン・シャンパン・ブランデー等</td></tr>
              <tr><th className="text-left bg-cream px-3 py-2">利用規模</th><td className="px-3 py-2">「月間300万人以上が利用する買取比較サイト」（使い方ガイドの記載）</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-warm-gray">※ 数値はいずれも2026年10月8日に公式サイトの各ページを確認したもの。掲載点数・社数は日々変動します。</p>
        <p>
          押さえておきたいのは、<strong>ヒカカク！自身は買取をしない</strong>という点です。公式FAQに「買取業者のご紹介のみ行っており、査定や買取に関しましては直接買取業者よりご連絡」とあり、利用規約第5条でも「一切の買取業務は行わず、金銭の授受には関与しない」「取引の成立・内容について保証しない」と定められています。
          つまり、査定額の妥当性や対応の良し悪しは<strong>紹介先の買取店ごとに違う</strong>ため、届いた査定を比べて選ぶ作業が利用者側に残ります。
        </p>

        <h2 id="nagare">ウイスキーを一括査定に出す流れ</h2>
        <p>公式の「査定申込の流れ」をもとに、ウイスキーを出す場合の実務に置き換えると次の5ステップです。</p>
        <ol>
          <li>
            <strong>査定フォームを起動</strong>：トップの「一括査定・見積もり」から。写真でAI査定（品名・型番が分からなくてもOK）と、自分で入力する方式の2つが用意されています。
          </li>
          <li>
            <strong>商品情報を入力</strong>：商品カテゴリは「日用品・コスメ・食品・お酒」を選び、商品名に銘柄・年数・容量（例：山崎 12年 700ml 箱あり）を入れます。商品状態は「新品・未開封」「中古美品」などから選択。
            公式ガイドは「詳細などの任意項目を詳しく入力いただくとより正確な査定結果」としているので、<strong>未開封か・液面の高さ・箱や冊子の有無・ラベルの状態</strong>を備考に書いておくと、後の減額を避けやすくなります（<Link href="/articles/whisky-sell-guide/">売る前の基礎ガイド</Link>のチェックリスト参照）。
          </li>
          <li>
            <strong>お客様情報を入力</strong>：氏名・メール・電話番号・地域が必須で、買取方法（宅配・出張・店頭）を最大3つ選びます。公式フォームには「『宅配』にチェックを入れると、たくさん業者が見つかる可能性が高まります」と注記があります。本数が多いなら出張も入れておくと、まとめ売りに対応する業者が拾えます。
          </li>
          <li>
            <strong>SMS認証→申込完了</strong>：携帯のSMSで届く6桁コードを入力して完了。登録アドレスに確認メールが届きます。
          </li>
          <li>
            <strong>査定結果を比較して業者を選ぶ</strong>：公式ガイドでは「最短1日」でメールが届くとされています。ここで<Link href="/souba-ranking/">相場ランキング</Link>や各銘柄の<Link href="/articles/whisky-kaitori-souba/">買取相場ページ</Link>と照らし、極端に低い提示を除外します。納得した業者にだけ買取を申し込みます。
          </li>
        </ol>

        <h2 id="chuui">お酒を出す前に知っておきたい注意点</h2>
        <p>公式FAQ・利用規約・プライバシーポリシーの記載から、ウイスキーを出す人が事前に知っておくべき点を抜き出します。</p>
        <h3>1. キャンセルは「各業者へ直接」</h3>
        <p>
          FAQでは「査定のお申込み後は、買取業者とお客様で直接お取引していただいております。キャンセルをご希望の場合、業者へ直接ご連絡」と案内されています。ヒカカク！側で一括して取り消す機能はありません。<strong>査定価格に納得しなければ買取依頼をやめてよい</strong>ことは使い方ガイドに明記されていますが、断る連絡自体は自分で行います。
        </p>
        <h3>2. 申込後は商品情報・個人情報を変更できない／削除もできない</h3>
        <p>
          FAQに「お申込み完了後は、ご記入いただいた商品情報や個人情報の変更はできかねます」「お客様からいただいた情報は削除することができません」とあります。銘柄や本数を書き間違えると修正が効かないので、送信前に確認してください。
        </p>
        <h3>3. 電話連絡が来る前提で申し込む</h3>
        <p>
          電話番号は必須項目で、査定・買取の連絡は各業者から直接来ます。利用規約第4条でも、サイト上・電話・メールで各種連絡をすることがあると定められています。後述の口コミでも電話の多さは指摘が多い点なので、<strong>連絡が取りやすい時間帯に申し込む</strong>か、備考にメール希望と書いておくのが現実的な対処です。
        </p>
        <h3>4. 査定額は「実物を見て変わる」ことがある</h3>
        <p>
          使い方ガイドのQ&amp;Aには「商品状態を詳しく鑑定する中で当初想定していた状態と違っていた際に買取価格が変更となる場合があります」とあります。ウイスキーは<strong>液面低下・ラベル汚れ・箱なし</strong>で差が付くので、<Link href="/articles/whisky-hokan-houhou/">保管状態</Link>を正直に書くのが結果的に早道です。
          一方で、あまりに不当な値下げをされた場合は「買取業者へ注意喚起を行うので、お問い合わせフォームからご連絡ください」とも案内されています。
        </p>
        <h3>5. 高額銘柄・偽物リスクは個別に確認</h3>
        <p>
          山崎18年や響30年、マッカランの長期熟成品などは、一括査定の概算だけで決めず、銘柄ページの実勢相場を見てから出してください。真贋が不安なボトルは<Link href="/articles/whisky-nisemono-miwakekata/">偽物の見分け方</Link>を確認し、専門性のある業者を選ぶのが安全です。相続で本数が多い場合は<Link href="/articles/whisky-souzoku-baikyaku/">相続・遺品のウイスキーを売る</Link>も参考にしてください。
        </p>

        <h2 id="hyoban">良い評判・気になる評判（出典付き）</h2>
        <p>
          口コミは、ヒカカク！が自社サイトで公開している「ヒカカク！のクチコミ・評判」ページ（2026年10月8日確認）を出典にしています。本文の転載はせず、評価分布と内容の傾向だけを整理しました。
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-warm-border">
            <thead className="bg-cream"><tr><th className="text-left px-3 py-2">項目</th><th className="text-left px-3 py-2">公式クチコミページの表示（2026年10月8日時点）</th></tr></thead>
            <tbody>
              <tr className="border-t border-warm-border"><td className="px-3 py-2">総合評価</td><td className="px-3 py-2">3.4（5点満点）</td></tr>
              <tr className="border-t border-warm-border"><td className="px-3 py-2">件数の内訳</td><td className="px-3 py-2">星5：425件／星4：200件／星3：106件／星2：86件／星1：266件（合計1,083件）</td></tr>
              <tr className="border-t border-warm-border"><td className="px-3 py-2">公式の注記</td><td className="px-3 py-2">「悪い・ひどい・買取が安いというクチコミの比率は32.5%」と自サイトに表示</td></tr>
            </tbody>
          </table>
        </div>
        <h3>良い評判に多い内容</h3>
        <ul>
          <li><strong>一度の入力で複数社から査定が返る</strong>：ピックアップ掲載の高評価では、1回の依頼で3〜4社から結果が届き、個人情報の入力も一度で済む点が便利とされています。</li>
          <li><strong>買取不可でも連絡や代替案がある</strong>：2026年の投稿でも「買取不可であっても迅速丁寧に対応」「他の方法も提案」といった評価が複数見られます。</li>
          <li><strong>業者ごとの対応が丁寧</strong>：農機具やタブレットなど他カテゴリの事例ですが、複数社から速やかに金額提示があり比較できたという声があります。</li>
        </ul>
        <h3>気になる評判に多い内容</h3>
        <ul>
          <li><strong>見積もり業者が少ない・1社しか来ない</strong>：「事前見積もりの業者数が少ない」「一社しか価格提示がなく桁違いに安かった」という星1の投稿があります。公式FAQも、商品によっては1社も返信が無いことがあると認めています。</li>
          <li><strong>電話がひっきりなしに来る</strong>：申込直後から電話が続いた、価格を明示せず「実物を見せてほしい」と言われたという星1の投稿があります。</li>
          <li><strong>店舗で相場より低い提示</strong>：持ち込み後に相場変動を理由に低い額を出されたという声。実物査定で変わりうることは公式も明記しています。</li>
          <li><strong>操作が分かりにくい</strong>：返信方法が分からなかったという星3の投稿があり、会員登録・マイページの使い方は事前に確認した方が安心です。</li>
        </ul>
        <h3>お酒カテゴリのクチコミ欄で見える傾向</h3>
        <p>
          公式のお酒カテゴリページには、紹介先の買取店（買取大吉・おたからや・リカージョイなど）に対する利用者のクチコミが掲載されています。2026年10月上旬の投稿では、「事前にヒカカクで査定してから店舗に行くとスムーズだった」というウイスキー3本の売却例がある一方で、電話対応や連絡時間への不満も投稿されています。<strong>評価はヒカカク！そのものより、紹介先の業者ごとに分かれる</strong>というのがカテゴリ欄から読み取れる傾向です。
        </p>
        <p className="text-xs text-warm-gray">※ 口コミの件数・評価は公式サイトの表示を転記したもので、当サイトが集計したものではありません。投稿本文の引用はしていません。</p>

        <h2 id="muki">向いている人・向かない人</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="border border-amber/40 bg-gold-bg rounded-xl p-4">
            <p className="font-bold text-ink mb-2">向いている人</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>銘柄・年数・本数がはっきりしていて、<strong>複数社の相見積もり</strong>を取りたい</li>
              <li>山崎・響・白州・マッカランなど<strong>相場差が出やすい銘柄</strong>を売る</li>
              <li>相続・遺品整理などで<strong>まとめ売り</strong>したい（出張・宅配対応の業者を探したい）</li>
              <li>電話・メールのやり取りが苦にならない</li>
            </ul>
          </div>
          <div className="border border-warm-border rounded-xl p-4">
            <p className="font-bold text-ink mb-2">向かない人</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>複数の業者からの<strong>電話連絡を避けたい</strong></li>
              <li>今日中に1本だけ現金化したい（店頭買取に直接持ち込む方が早い）</li>
              <li>開封済み・液面が大きく下がった低額ボトルだけを売りたい（返信が来ない可能性がある）</li>
              <li>申込後に情報を修正・削除したい</li>
            </ul>
          </div>
        </div>
        <p>
          迷う場合は、まず<Link href="/souba-ranking/">相場ランキング</Link>で手持ち銘柄の実勢を把握し、相場差が大きい銘柄だけ一括査定に出す、という使い分けが無駄がありません。高く売る手順そのものは<Link href="/articles/whisky-takaku-uru/">ウイスキーを高く売る5つのコツ</Link>にまとめています。
        </p>

        <Cta title="銘柄を入力して複数社の査定額を比較" lead="未開封・箱あり・液面の状態を書き添えると、実物査定での減額を避けやすくなります。" />

        <h2 id="faq">よくある質問</h2>
        {faqs.map((f) => (
          <div key={f.q} className="mb-4">
            <p className="font-bold text-ink mb-1">Q. {f.q}</p>
            <p className="text-sm leading-relaxed text-ink/80">A. {f.a}</p>
          </div>
        ))}

        <h2 id="shutten">出典</h2>
        <ul className="text-sm">
          <li><a href="https://hikakaku.com/lp/" target="_blank" rel="noopener noreferrer nofollow">ヒカカク！ サイトの使い方（一括査定の流れ・無料・最大20社・よくある質問）</a></li>
          <li><a href="https://hikakaku.com/hikakaku_reviews/" target="_blank" rel="noopener noreferrer nofollow">ヒカカク！のクチコミ・評判（総合評価・件数内訳）</a></li>
          <li><a href="https://hikakaku.com/category/all-category/riquor/" target="_blank" rel="noopener noreferrer nofollow">お酒の買取価格を比較（掲載点数・社数・買取実績・カテゴリ内クチコミ）</a></li>
          <li><a href="https://hikakaku.com/%e3%82%88%e3%81%8f%e3%81%82%e3%82%8b%e3%81%94%e8%b3%aa%e5%95%8f/" target="_blank" rel="noopener noreferrer nofollow">ヒカカク！ よくあるご質問（紹介のみ・キャンセル・情報変更・削除・配信停止）</a></li>
          <li><a href="https://hikakaku.com/%E5%88%A9%E7%94%A8%E8%A6%8F%E7%B4%84/" target="_blank" rel="noopener noreferrer nofollow">ヒカカク！ サイト利用規約（第4〜6条・最終改定2024年10月1日）</a></li>
          <li><a href="https://hikakaku.com/pages/company/" target="_blank" rel="noopener noreferrer nofollow">運営者情報</a>／<a href="https://hikakaku.com/pages/kobutsu_hyoki/" target="_blank" rel="noopener noreferrer nofollow">古物営業法に基づく表記</a></li>
        </ul>
        <p className="text-xs text-warm-gray not-prose border-t border-warm-border pt-4 mt-8">
          ※ いずれも{UPDATED_JA}に公式サイトの生ページを確認して記載しています。サービス内容・件数は変更されることがあるため、最新情報は公式サイトでご確認ください。本記事はPRリンクを含みます。
        </p>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  );
}
