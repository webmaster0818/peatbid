import type { Metadata } from "next";
import Link from "next/link";
import { pageOpenGraph } from "@/lib/og";

const PUBLISHED = "2026-10-08";
const UPDATED = "2026-11-20";
const UPDATED_JA = "2026年11月20日";
const URL = "https://peatbid.com/articles/hikakaku-sake-kaitori-kuchikomi/";
const TITLE = "ヒカカクの酒買取の口コミ・評判｜ウイスキーを一括査定に出す手順と注意点【2026年11月】";
const DESC =
  "ヒカカク！でお酒・ウイスキーを売る前に確認いただきたい口コミ・評判を、公式クチコミページの評価分布（総合3.4・1,083件）と傾向から整理しています。仕組み（無料・最大20社一括査定）、運営会社、ウイスキーを査定に出す手順、キャンセル・個人情報・電話連絡の注意点、利用に適している方を、出典付きで解説しています。";

const toc = [
  ["kekka", "結論：ヒカカクの酒買取はこんな人向け"],
  ["toha", "ヒカカク！とは（仕組み・運営会社・お酒カテゴリ）"],
  ["nagare", "ウイスキーを一括査定に出す手順"],
  ["chuui", "お酒を査定に出す前の注意点（費用・個人情報・連絡）"],
  ["hyoban", "良い評判・気になる評判（出典付き）"],
  ["sake-kuchikomi", "お酒を売った人のクチコミ26件（当サイト集計）"],
  ["tsukaiwake", "一括査定・1社への直接申込・店頭持ち込みの違い"],
  ["muki", "利用に適している方・適していない方"],
  ["faq", "よくある質問"],
  ["shutten", "出典"],
];

const faqs = [
  {
    q: "ヒカカク！の酒買取は本当に無料ですか？",
    a: "公式のよくあるご質問と使い方ガイドに「完全無料でご利用いただけます」と明記されています。利用規約第6条でも「当社がユーザーに対して請求する費用は原則無料」とされています。査定後に売らなくても費用はかかりません。",
  },
  {
    q: "ヒカカク！自体がウイスキーを買い取るのですか？",
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
    q: "ヒカカク！の運営会社はジラフですか？",
    a: "現在の運営は株式会社じげん（東証プライム）です。以前は株式会社ジラフが運営していましたが、じげんの適時開示（2024年8月26日）によると、ジラフの会社分割で新設された株式会社ヒカカクの全株式をじげんが取得し、2024年10月1日に吸収合併しました。公式の運営者情報もじげんになっています。",
  },
  {
    q: "ヒカカク！の店舗にウイスキーを持ち込めますか？",
    a: "ヒカカク！自体は買取を行わないため、持ち込める店舗はありません。一括査定の申込時に買取方法として「店頭」を選ぶと、店頭買取に対応する業者から査定が届く場合があります。出張や店頭に対応できるかは各業者の対応範囲によります。",
  },
  {
    q: "送料や振込手数料はかかりますか？",
    a: "ヒカカク！の利用自体は無料です。ただし利用規約第6条で、梱包費用・郵送費用などの費用負担や入金方法・入金時期は、利用者と買取事業者の間で決めると定められています。宅配で送る前に、送料・返送料・振込手数料の負担を業者に確認してください。",
  },
  {
    q: "査定後に届くメールは止められますか？",
    a: "公式FAQによると、査定申込後のメールには配信停止の手続きがありません。会員登録の有無にかかわらず、申込に関する一連のメールが送られます。業者からの連絡を断る場合は、各業者へ直接連絡します。",
  },
  {
    q: "悪い口コミが多いというのは本当ですか？",
    a: "公式クチコミページ（2026年11月20日時点）では総合評価3.4で、星1が266件、星5が425件です。公式自身が「悪い・ひどい・買取が安いというクチコミの比率は32.5%」と表示しています。内容は電話の多さや見積もり業者数の少なさに関するものが目立ちます。2024年10月以降の52件に限ると星1〜2は5件（9.6%）です。詳しくは本文の評判の章をご覧ください。",
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
        ウイスキーの無料一括査定を申し込む →
      </a>
    </div>
  );
}

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/articles/hikakaku-sake-kaitori-kuchikomi/" },
  openGraph: pageOpenGraph({ title: TITLE, description: DESC, url: URL, type: "article" }),
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
    datePublished: PUBLISHED,
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
          ヒカカクの酒買取の口コミ・評判｜ウイスキーを一括査定に出す手順と注意点
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: {UPDATED_JA} ／ 執筆: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>
          （公式サイト・公式クチコミページを{UPDATED_JA}に確認。本記事は広告（PR）リンクを含みます）
        </p>

        <div id="kekka" className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
          <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
            <li>ヒカカク！は<strong>買取店を紹介する比較サイト</strong>で、自社では買取を行っていません。利用は<strong>無料</strong>で、最大20社から査定結果がメールで届きます。</li>
            <li>お酒カテゴリは<strong>752社・54,517点</strong>が掲載されています（2026年11月20日時点の公式カテゴリページの表記）。ウイスキーは「日用品・コスメ・食品・お酒」カテゴリから選択します。</li>
            <li>公式クチコミは<strong>総合3.4・1,083件</strong>。良い声は「一度の入力で複数社から返事」「買取不可でも丁寧」、気になる声は「電話が多い」「見積もり業者が少ない・1社だけ」です。投稿は2020〜2023年に集中し、最新は2026年3月19日です（当サイトが一覧1,083件を年別に集計）。運営がじげんに移った2024年10月以降の投稿は52件で、平均の星は4.04です。</li>
            <li>お酒を売った人の投稿は<strong>26件で、うち21件が星5</strong>（平均4.65）です。不満は「参加する業者が少ない」「古酒・焼酎・日本酒は値が付きにくい」に集中しています。</li>
            <li>無料なのはサイトの利用までです。<strong>送料・梱包費・入金方法などの取引条件は、利用者と各業者の間で決める</strong>と利用規約第6条に定められています。</li>
            <li>向いているのは<strong>銘柄・本数が決まっていて、複数社の相見積もりを取りたい方</strong>です。電話連絡を避けたい方や、1本だけをすぐに現金化したい方には適していません。</li>
          </ul>
        </div>

        <Cta title="ウイスキーの買取価格を複数社で比較" lead="銘柄・本数・状態を入力するだけ。査定額に納得できない場合は、売却する必要はありません。" />

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
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">運営の変遷</th><td className="px-3 py-2">以前は株式会社ジラフが運営していました。2024年8月にジラフの会社分割で株式会社ヒカカクが新設され、じげんが全株式を取得、2024年10月1日に吸収合併されました（じげんの適時開示 2024年8月26日）。「運営はジラフ」と書かれた記事は旧情報です</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">許可</th><td className="px-3 py-2">古物営業法に基づき都道府県公安委員会の許可を取得していると表記しています。アフィリエイトプログラムを利用したサービス紹介を行う旨も明記</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">料金</th><td className="px-3 py-2">完全無料（利用規約第6条「当社がユーザーに対して請求する費用は原則無料」）</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">査定社数</th><td className="px-3 py-2">最大20社から査定結果（買取不可の場合は返信がないこともあります）</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">買取方法</th><td className="px-3 py-2">宅配・出張・店頭から最大3つを希望として選択</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">対応エリア</th><td className="px-3 py-2">申込フォームで47都道府県から「お住まいの地域」を選択します（必須）。出張・店頭に対応できるかは、査定を返した各業者の対応範囲によります。ヒカカク！自体には持ち込める店舗はありません</td></tr>
              <tr className="border-b border-warm-border"><th className="text-left bg-cream px-3 py-2">お酒カテゴリ</th><td className="px-3 py-2">掲載 54,517点・752社。直近1年の買取実績は「最低1円〜最高4,400,000円」と表示されています。サブカテゴリにウイスキー・日本酒・焼酎・ワイン・シャンパン・ブランデー等</td></tr>
              <tr><th className="text-left bg-cream px-3 py-2">利用規模</th><td className="px-3 py-2">「月間300万人以上が利用する買取比較サイト」（使い方ガイドの記載）</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-warm-gray">※ 数値はいずれも2026年11月20日に公式サイトの各ページを確認したものです（10月8日は52,971点・744社、10月9日は53,001点・744社）。掲載点数・社数は日々変動します。</p>
        <p>
          まず確認いただきたいのは、<strong>ヒカカク！自身は買取をしない</strong>という点です。公式FAQに「買取業者のご紹介のみ行っており、査定や買取に関しましては直接買取業者よりご連絡」とあり、利用規約第5条でも「一切の買取業務は行わず、金銭の授受には関与しない」「取引の成立・内容について保証しない」と定められています。
          つまり、査定額の妥当性や対応の良し悪しは<strong>紹介先の買取店ごとに違う</strong>ため、届いた査定を比べて選ぶ作業が利用者側に残ります。
        </p>

        <h2 id="nagare">ウイスキーを一括査定に出す手順</h2>
        <p>公式の「査定申込の流れ」をもとに、ウイスキーを出す場合の実務に置き換えると次の5ステップです。</p>
        <ol>
          <li>
            <strong>査定フォームを起動</strong>：トップの「一括査定・見積もり」から申し込みます。写真によるAI査定（品名・型番が分からない場合も利用できます）と、自分で入力する方式の2つが用意されています。
          </li>
          <li>
            <strong>商品情報を入力</strong>：商品カテゴリは「日用品・コスメ・食品・お酒」を選び、商品名に銘柄・年数・容量（例：山崎 12年 700ml 箱あり）を入れます。商品状態は「新品・未開封」「中古美品」などから選択します。
            公式ガイドは「詳細などの任意項目を詳しく入力いただくとより正確な査定結果」としているので、<strong>未開封か・液面の高さ・箱や冊子の有無・ラベルの状態</strong>を備考に書いておくと、後の減額を避けやすくなります（<Link href="/articles/whisky-sell-guide/">売る前の基礎ガイド</Link>のチェックリスト参照）。
          </li>
          <li>
            <strong>お客様情報を入力</strong>：氏名・メール・電話番号・地域が必須で、買取方法（宅配・出張・店頭）を最大3つ選びます。公式フォームには「『宅配』にチェックを入れると、たくさん業者が見つかる可能性が高まります」と注記があります。本数が多いなら出張も入れておくと、まとめ売りに対応する業者が拾えます。
          </li>
          <li>
            <strong>SMS認証→申込完了</strong>：携帯のSMSで届く6桁のコードを入力して完了します。登録アドレスに確認メールが届きます。
          </li>
          <li>
            <strong>査定結果を比較して業者を選ぶ</strong>：公式ガイドでは「最短1日」でメールが届くとされています。ここで<Link href="/souba-ranking/">相場ランキング</Link>や各銘柄の<Link href="/articles/whisky-kaitori-souba/">買取相場ページ</Link>と照らし、極端に低い提示を除外します。納得した業者にだけ買取を申し込みます。
          </li>
        </ol>

        <h2 id="chuui">お酒を査定に出す前の注意点</h2>
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
          ただし、2026年11月20日に公式の申込フォームを確認したところ、入力項目は氏名・メールアドレス・電話番号・お住まいの地域・買取方法で、<strong>連絡手段を選ぶ欄はありません</strong>。備考の希望に各業者が従うとは限らない点にご注意ください。
        </p>
        <p>
          また公式FAQによると、<strong>査定申込後に届くメールには配信停止の手続きがありません</strong>。ヒカカク！への問い合わせは電話では受け付けておらず、お問い合わせフォームか公式LINEからの連絡になります。会員登録をしておくと、業者とのやり取りをチャットでも行えます。
        </p>
        <h3>4. 査定額は「実物を見て変わる」ことがある</h3>
        <p>
          使い方ガイドのQ&amp;Aには「商品状態を詳しく鑑定する中で当初想定していた状態と違っていた際に買取価格が変更となる場合があります」とあります。ウイスキーは<strong>液面低下・ラベル汚れ・箱なし</strong>で差が付くので、<Link href="/articles/whisky-hokan-houhou/">保管状態</Link>を正確に記入することで、査定が円滑に進みます。
          一方で、あまりに不当な値下げをされた場合は「買取業者へ注意喚起を行うので、お問い合わせフォームからご連絡ください」とも案内されています。
        </p>
        <h3>5. 高額銘柄・偽物リスクは個別に確認</h3>
        <p>
          山崎18年や響30年、マッカランの長期熟成品などは、一括査定の概算だけで決めず、銘柄ページの実勢相場を見てから出してください。真贋が不安なボトルは<Link href="/articles/whisky-nisemono-miwakekata/">偽物の見分け方</Link>を確認し、専門性のある業者を選ぶのが安全です。相続で本数が多い場合は<Link href="/articles/whisky-souzoku-baikyaku/">相続・遺品のウイスキーを売る</Link>も参考にしてください。
        </p>
        <h3>6. 無料なのはサイトの利用まで（送料・梱包費・入金方法は業者ごと）</h3>
        <p>
          利用規約第6条は、ヒカカク！が利用者に請求する費用を「原則無料」としたうえで、<strong>取引価格・費用負担（梱包費用、郵送費用等）・入金方法・入金時期・買取形式などの取引条件は、利用者と買取事業者の間で決める</strong>と定めています。第5条では、利用者と業者の取引で生じたトラブルにヒカカク！は関与しないとされています。
        </p>
        <p>
          ウイスキーを宅配で送る場合は、査定額だけでなく<strong>送料・梱包資材・振込手数料・買取不成立時の返送料をどちらが負担するか</strong>を、発送前に業者へ確認してください。発送時の伝票番号を控えておくと、到着や査定の連絡が来ないときに状況を確認できます。
        </p>
        <h3>7. 入力した情報は「ヒカカク！が選んだ提携業者」に渡る</h3>
        <p>
          プライバシーポリシー第4条（最終改定2024年12月16日）では、一括査定を依頼した場合、氏名・住所・連絡先など見積依頼フォームに入力した内容を、「当社が適切と判断した提携業者」に見積依頼のため提供すると定めています。<strong>申込時に送り先の業者を自分で選ぶ仕組みではなく</strong>、どの業者に送られたかは申込後の確認メールで確認する流れです（公式の使い方ガイド）。
        </p>
        <p>
          FAQでは送信後の情報の変更・削除はできないとされていますが、プライバシーポリシー第5条には、開示・訂正・利用停止の請求先として「株式会社じげん 個人情報相談窓口」（書面・電子メールで請求）が定められています。なお、商品を扱える業者を紹介できなかった場合は、別のおすすめ業者を案内する運用であるとFAQに記載されています。
        </p>

        <h2 id="hyoban">良い評判・気になる評判（出典付き）</h2>
        <p>
          口コミは、ヒカカク！が自社サイトで公開している「ヒカカク！のクチコミ・評判」ページ（2026年10月8日に初回確認、2026年11月20日に全13ページを再確認）を出典にしています。本文の転載はせず、評価分布と内容の傾向だけを整理しました。このページは運営会社が自社サイトに掲載しているもので、掲載・非掲載の基準は公開されていません。利用者全体の評価ではなく、公開されている投稿の範囲での傾向としてお読みください。
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-warm-border">
            <thead className="bg-cream"><tr><th className="text-left px-3 py-2">項目</th><th className="text-left px-3 py-2">公式クチコミページの表示（2026年11月20日時点・10月8日から変化なし）</th></tr></thead>
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
          <li><strong>見積もり業者が少ない・1社しか来ない</strong>：「事前見積もりの業者数が少ない」「一社しか価格提示がなく桁違いに安かった」という星1の投稿があります。公式FAQも、商品によっては1社も返信がない場合があることを認めています。</li>
          <li><strong>電話がひっきりなしに来る</strong>：申込直後から電話が続いた、価格を明示せず「実物を見せてほしい」と言われたという星1の投稿があります。</li>
          <li><strong>店舗で相場より低い提示</strong>：持ち込み後に相場変動を理由に低い額を出されたという声があります。実物査定で変わりうることは公式も明記しています。</li>
          <li><strong>操作が分かりにくい</strong>：返信方法が分からなかったという星3の投稿があり、会員登録・マイページの使い方は事前に確認した方が安心です。</li>
        </ul>
        <h3>お酒カテゴリのクチコミ欄で見える傾向</h3>
        <p>
          公式のお酒カテゴリページには、紹介先の買取店（買取大吉・おたからや・リカージョイなど）に対する利用者のクチコミが掲載されています。2026年10月上旬の投稿では、「事前にヒカカクで査定してから店舗に行くとスムーズだった」というウイスキー3本の売却例がある一方で、電話対応や連絡時間への不満も投稿されています。<strong>評価はヒカカク！そのものより、紹介先の業者ごとに分かれる</strong>というのがカテゴリ欄から読み取れる傾向です。
        </p>
        <p className="text-xs text-warm-gray">※ この章の口コミの件数・評価は公式サイトの表示を転記したものです。投稿本文の引用はしていません。</p>

        <h3>投稿の時期と評価の推移（当サイトが年別に集計）</h3>
        <p>
          公式クチコミの一覧（全13ページ）に載っている投稿を、2026年11月20日に1件ずつ投稿日と星の数で数えました。一覧の件数は<strong>1,083件</strong>で、ページ上部の内訳（星5：425件〜星1：266件）と一致します。10月9日の集計では2020年分の5件を数え漏らしていたため、2020年の行を修正しました。
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-warm-border">
            <thead className="bg-cream"><tr><th className="text-left px-3 py-2">投稿年</th><th className="text-left px-3 py-2">件数</th><th className="text-left px-3 py-2">平均の星</th><th className="text-left px-3 py-2">星1〜2の割合</th></tr></thead>
            <tbody>
              <tr className="border-t border-warm-border"><td className="px-3 py-2">2020年（6月〜）</td><td className="px-3 py-2">200件</td><td className="px-3 py-2">3.57</td><td className="px-3 py-2">26.5%</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2021年</td><td className="px-3 py-2">268件</td><td className="px-3 py-2">3.62</td><td className="px-3 py-2">27.2%</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2022年</td><td className="px-3 py-2">261件</td><td className="px-3 py-2">3.28</td><td className="px-3 py-2">36.0%</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2023年</td><td className="px-3 py-2">214件</td><td className="px-3 py-2">3.04</td><td className="px-3 py-2">42.5%</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2024年</td><td className="px-3 py-2">104件</td><td className="px-3 py-2">3.33</td><td className="px-3 py-2">34.6%</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2025年</td><td className="px-3 py-2">33件</td><td className="px-3 py-2">4.06</td><td className="px-3 py-2">12.1%</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2026年（〜3月19日）</td><td className="px-3 py-2">3件</td><td className="px-3 py-2">3.33</td><td className="px-3 py-2">（件数が少なく参考外）</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>投稿の8割以上（943件）は2020〜2023年のもの</strong>で、2025年以降は36件しかありません。公式ページの見出しは「2026年11月最新」ですが、最新の投稿は2026年3月19日で、11月20日時点でもそれ以降の投稿はありません。星1〜2の割合は2023年に42.5%まで上がり、2025年は12.1%に下がっていますが、件数が少ない年の数字は振れやすく、「最近は良くなった」と言い切れるほどの材料ではありません。
        </p>

        <h3>運営がじげんに移った2024年10月の前後で比べると</h3>
        <p>
          同じ1,083件を、運営会社が株式会社じげんに移った2024年10月1日を境に分けて集計しました。
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-warm-border">
            <thead className="bg-cream"><tr><th className="text-left px-3 py-2">投稿時期</th><th className="text-left px-3 py-2">件数</th><th className="text-left px-3 py-2">平均の星</th><th className="text-left px-3 py-2">星1〜2の割合</th></tr></thead>
            <tbody>
              <tr className="border-t border-warm-border"><td className="px-3 py-2">2024年9月30日以前（ジラフ運営期）</td><td className="px-3 py-2">1,031件</td><td className="px-3 py-2">3.37</td><td className="px-3 py-2">33.7%</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2024年10月1日以降（じげん運営後）</td><td className="px-3 py-2">52件</td><td className="px-3 py-2">4.04</td><td className="px-3 py-2">9.6%</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          2024年10月以降の52件は平均4.04、星1〜2は5件（9.6%）で、それ以前より評価は高めです。ただし件数が少なく、前述のとおり掲載基準も公開されていないため、運営会社の変更が評価の改善につながったと判断できる材料ではありません。
        </p>
        <p>2024年10月以降の52件を当サイトが本文から読み取り、内容ごとに分類した結果は次のとおりです（1件が複数の内容に該当する場合があります。短い感想のみで内容を判定できない2件は除いています）。</p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-warm-border">
            <thead className="bg-cream"><tr><th className="text-left px-3 py-2">内容</th><th className="text-left px-3 py-2">件数</th><th className="text-left px-3 py-2">うち星1〜2</th><th className="text-left px-3 py-2">傾向</th></tr></thead>
            <tbody>
              <tr className="border-t border-warm-border"><td className="px-3 py-2">業者の対応が丁寧・早かった</td><td className="px-3 py-2">27件</td><td className="px-3 py-2">0件</td><td className="px-3 py-2">買取不可の場合でも理由の説明や別の方法の提案があったという内容が多くを占めます</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">複数社を比べられた・想定より高く売れた</td><td className="px-3 py-2">12件</td><td className="px-3 py-2">0件</td><td className="px-3 py-2">業者ごとに得意分野があり仮査定額が違った、という比較の効果に触れた投稿です</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">返信した業者が少ない・買取不可だった</td><td className="px-3 py-2">10件</td><td className="px-3 py-2">2件</td><td className="px-3 py-2">「1社しか提示がなかった」など。10件のうち8件は星3〜5で、買取不可でも対応は評価されている例が目立ちます</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">仮査定と現物確認後の金額の差</td><td className="px-3 py-2">5件</td><td className="px-3 py-2">3件</td><td className="px-3 py-2">仮査定が高く、郵送・持ち込み後に大きく下がったという内容です</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">電話・メールの量や連絡の時間帯</td><td className="px-3 py-2">4件</td><td className="px-3 py-2">2件</td><td className="px-3 py-2">申込直後からの電話、業者ごとに連絡の時刻がばらばらといった内容です</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">申込の取り下げ・通知・操作の分かりにくさ</td><td className="px-3 py-2">3件</td><td className="px-3 py-2">0件</td><td className="px-3 py-2">出品の取り下げや通知の個別停止ができない点への要望です（いずれも星3）</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">他の品物との抱き合わせ査定を求められた</td><td className="px-3 py-2">2件</td><td className="px-3 py-2">1件</td><td className="px-3 py-2">貴金属や時計があれば査定する、と言われたという内容です</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          良い評価は業者の対応と比較の効果に集まり、不満は<strong>返信の少なさ・仮査定との差・連絡の多さ</strong>に集まっています。いずれも、ヒカカク！自体ではなく紹介先の業者の対応や、一括査定という仕組みに由来する内容です。この52件のうちお酒の投稿は2件（ボルドーのワインを迅速に売却できた星5、1941年のブランデーに値が付かなかった星3）でした。
        </p>

        <h2 id="sake-kuchikomi">お酒を売った人のクチコミ26件（当サイト集計）</h2>
        <p>
          1,083件のうち、本文から<strong>お酒（ウイスキー・ブランデー・ワイン・シャンパン・日本酒など）を査定に出したと読める投稿は26件</strong>でした（酒・銘柄名を含む投稿を全件読んで判定。別の品の査定で「お酒はないか」と聞かれた話は除外）。星の内訳は<strong>星5が21件・星4が2件・星3が2件・星2が1件、平均4.65</strong>で、全体の3.4より高めです。最新は2025年3月で、2023年12月以降は3件だけです。
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-warm-border">
            <thead className="bg-cream"><tr><th className="text-left px-3 py-2">投稿日</th><th className="text-left px-3 py-2">星</th><th className="text-left px-3 py-2">内容の要約</th></tr></thead>
            <tbody>
              <tr className="border-t border-warm-border"><td className="px-3 py-2">2021年8月</td><td className="px-3 py-2">5</td><td className="px-3 py-2">日本酒2本。最初の店は2本で51,000円、数店で競合して最終70,000円</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2022年1月</td><td className="px-3 py-2">5</td><td className="px-3 py-2">マッカラン18年はどこの見積もりも大差なし。コルクの状態が分かりにくいスコッチは提示にかなりばらつき</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2022年6月</td><td className="px-3 py-2">5</td><td className="px-3 py-2">入手困難なジャパニーズ2本をセットで55万円。査定のばらつきが大きく、平均より5〜10万円高く売れた</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2022年4月</td><td className="px-3 py-2">5</td><td className="px-3 py-2">山崎12年・シーバスリーガル12年は想像以上の高値。焼酎・日本酒は提示が低く売るのをやめた</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2025年2月</td><td className="px-3 py-2">3</td><td className="px-3 py-2">1941年のブランデー（200ml・箱付き）に買取価格が付かなかった</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2022年2月</td><td className="px-3 py-2">2</td><td className="px-3 py-2">酒の買取店で比較したが参加する店が少なく、自分で探した</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2020年9月</td><td className="px-3 py-2">3</td><td className="px-3 py-2">ヘネシーXO。最大20件とあるが査定は数件だった（対応は親切）</td></tr><tr className="border-t border-warm-border"><td className="px-3 py-2">2023年9月</td><td className="px-3 py-2">4</td><td className="px-3 py-2">山崎10年。数社から提示があり、宅配キットで送った</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          ウイスキーを売る人が読み取れるのは3点です。1つ目は、<strong>流通量の多い定番銘柄は業者間の差が小さく、状態が見えにくいボトルや希少品ほど差が開く</strong>こと。マッカラン18年で大差がなく、コルクの状態が伝わりにくいスコッチや入手困難なジャパニーズでばらついたのはこの典型です。希少品ほど一括査定の意味があり、写真や備考で状態を伝えるほど差が縮まります。2つ目は、<strong>返ってくる業者は3〜5社程度</strong>という例が多いこと（社数が書かれた投稿ではシャンパン3点で4社、シャンパン・ウイスキーで4店舗、お酒8本で3店舗、お酒で5店舗）。最大20社から返信が届くとは限りません。3つ目は、<strong>古酒・焼酎・日本酒など値の付きにくい酒は、提示がないか低い</strong>ことで、こうした酒は相続のまとめ売りに混ぜる方が扱ってもらいやすくなります。
        </p>
        <p>
          手持ちの銘柄に一括査定を使うだけの価値があるかは、<Link href="/souba-ranking/">相場ランキング</Link>や各銘柄の買取ページにある実勢価格（取得日・件数付き）で先に見当を付けてください。
        </p>
        <p className="text-xs text-warm-gray">※ 総合評価・星別の件数は公式サイトの表示を転記したものです。年別の件数・平均・割合と、お酒に関する投稿の抽出・要約は、公式の一覧（2026年11月20日時点・1,083件）を当サイトが数えたものです。投稿本文の引用はしていません。表は26件のうち内容に具体性がある8件を抜き出したものです。</p>

        <h2 id="tsukaiwake">一括査定・1社への直接申込・店頭持ち込みの違い</h2>
        <p>
          ヒカカク！は買取店と並ぶ選択肢ではなく、複数の買取店に査定を依頼するための仕組みです。比べるべき相手は「酒買取店1社に直接申し込む」「近くの店舗に持ち込む」という売り方になります。公式の利用規約・FAQ・プライバシーポリシーと、上記の口コミ集計をもとに整理すると次のとおりです。
        </p>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full text-sm border border-warm-border">
            <thead className="bg-cream"><tr><th className="text-left px-3 py-2">項目</th><th className="text-left px-3 py-2">ヒカカク！で一括査定</th><th className="text-left px-3 py-2">酒買取店1社に直接申込</th><th className="text-left px-3 py-2">店頭に持ち込む</th></tr></thead>
            <tbody>
              <tr className="border-t border-warm-border"><th className="text-left bg-cream px-3 py-2 align-top">査定を出す相手</th><td className="px-3 py-2 align-top">ヒカカク！が適切と判断した提携業者（最大20社）。申込時に自分では選ばない</td><td className="px-3 py-2 align-top">自分で選んだ1社</td><td className="px-3 py-2 align-top">持ち込んだ店舗</td></tr><tr className="border-t border-warm-border"><th className="text-left bg-cream px-3 py-2 align-top">比較できる金額</th><td className="px-3 py-2 align-top">返信した業者の数だけ（お酒の投稿では3〜5社の例が多い）</td><td className="px-3 py-2 align-top">1社分。比べるには自分で複数社に申し込む</td><td className="px-3 py-2 align-top">その店舗の金額のみ</td></tr><tr className="border-t border-warm-border"><th className="text-left bg-cream px-3 py-2 align-top">連絡</th><td className="px-3 py-2 align-top">複数社から電話・メールが届く。申込後のメールは配信停止の手続きなし</td><td className="px-3 py-2 align-top">申し込んだ1社のみ</td><td className="px-3 py-2 align-top">原則その場で完結</td></tr><tr className="border-t border-warm-border"><th className="text-left bg-cream px-3 py-2 align-top">送料・手数料などの条件</th><td className="px-3 py-2 align-top">業者ごとに異なる（利用規約第6条）。業者ごとに確認が必要</td><td className="px-3 py-2 align-top">申し込む前に1社の条件を確認できる</td><td className="px-3 py-2 align-top">送料はかからない</td></tr><tr className="border-t border-warm-border"><th className="text-left bg-cream px-3 py-2 align-top">適しているケース</th><td className="px-3 py-2 align-top">希少銘柄・状態が伝わりにくいボトルなど、業者によって金額差が出やすいもの</td><td className="px-3 py-2 align-top">売り先が決まっている、連絡を1社に絞りたい</td><td className="px-3 py-2 align-top">近くに店舗があり、1〜数本をすぐに売りたい</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          複数社の比較で得られる金額差と、連絡が増える手間は、同じ仕組みの両面です。お住まいの地域で店頭・出張に対応する店舗を先に確認したい場合は<Link href="/tier2/">47都道府県別の買取相場・店舗情報</Link>を、売却額が大きくなる場合の申告の目安は<Link href="/articles/whisky-kaitori-zeikin/">ウイスキー買取の税金</Link>をご覧ください。
        </p>

        <h2 id="muki">利用に適している方・適していない方</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="border border-amber/40 bg-gold-bg rounded-xl p-4">
            <p className="font-bold text-ink mb-2">適している方</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>銘柄・年数・本数がはっきりしていて、<strong>複数社の相見積もり</strong>を取りたい</li>
              <li>山崎・響・白州・マッカランなど<strong>相場差が出やすい銘柄</strong>を売る</li>
              <li>相続・遺品整理などで<strong>まとめ売り</strong>したい（出張・宅配対応の業者を探したい）</li>
              <li>電話・メールのやり取りが苦にならない</li>
            </ul>
          </div>
          <div className="border border-warm-border rounded-xl p-4">
            <p className="font-bold text-ink mb-2">適していない方</p>
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
          <li><a href="https://hikakaku.com/%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC/" target="_blank" rel="noopener noreferrer nofollow">ヒカカク！ プライバシーポリシー（第4条 第三者への提供・第5条 開示等の請求先・最終改定2024年12月16日）</a></li>
          <li><a href="https://hikakaku.com/pages/company/" target="_blank" rel="noopener noreferrer nofollow">運営者情報</a>／<a href="https://hikakaku.com/pages/kobutsu_hyoki/" target="_blank" rel="noopener noreferrer nofollow">古物営業法に基づく表記</a></li>
          <li><a href="https://www2.jpx.co.jp/disc/36790/140120240826576688.pdf" target="_blank" rel="noopener noreferrer nofollow">株式会社じげん「株式会社ヒカカクの株式取得（連結子会社化）及び吸収合併（簡易合併）に関するお知らせ」（2024年8月26日・適時開示）</a></li>
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
