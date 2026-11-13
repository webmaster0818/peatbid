import type { Metadata } from "next";
import Link from "next/link";
import data from "./data.json";

// 2026-11-13 新規「メーカーズ マーク 買取」受け皿（kw-expansion・手書き＝週次再生成の対象外）。
// ⚠️ 価格はこのディレクトリの data.json（ヤフオク落札の実測値）のみ。出品タイトルを目視で確認した出品だけで集計。
//    fetch-yahoo-medians.py と同じ closedsearch・extract_items・JUNK_RE・ML_RE・iqr_filter・n>=20 の規則（スクリプト本体は未変更）。
//    タイトルに容量の記載がない出品は除外（data.json の regex.ml_required）。区分ごとの require/exclude は data.json に記録。
//    ゴールドトップは 50.5% 表記のリミテッドエディションと、45% 表記（VIP・SIV 等）の旧ボトルで価格帯が異なるため別集計。後者は n=19 で中央値なし。
//    「メーカーズマーク 101」は該当ボトルと確認できる出品が1件のみのため集計しない。
// 製品・蒸溜所・製法の情報は Maker's Mark 公式サイト（makersmark.com）の記載のみ（2026-11-13 確認）。
// ブラックトップ・ゴールドトップは公式サイトの現行ラインナップに掲載がないため、出品タイトルの表記のみで記載。国内の希望小売価格は掲載しない（公式で未確認）。

type Agg = {
  label: string;
  query: string;
  fetched_at: string;
  end_date_from: string | null;
  end_date_to: string | null;
  raw_n: number;
  title_filtered_n: number;
  filtered_n: number;
  median: number | null;
  q1: number | null;
  q3: number | null;
  min: number | null;
  max: number | null;
  insufficient: boolean;
};

const Y = data.yahoo as unknown as Record<string, Agg>;
const off = data.official;
const yenFmt = (v: number) => `${v.toLocaleString("ja-JP")}円`;
const fmtDate = (d: string | null) => (d ? d.replace(/-/g, "/") : "—");
const ok = (a: Agg | undefined): a is Agg => !!a && !a.insufficient && typeof a.median === "number" && a.filtered_n >= 20;
const med = (k: string) => (ok(Y[k]) ? yenFmt(Y[k].median as number) : null);
const yRed = Y["red"];
const y46 = Y["46"];
const yCask = Y["cask"];
const yBlack = Y["black"];
const yGold = Y["gold"];
const yVip = Y["gold-vip"];
const fetchedAt = yRed?.fetched_at ?? "2026-11-13";

const linkCls = "text-amber-dark underline hover:text-burgundy";

export const metadata: Metadata = {
  title: `メーカーズマークの買取相場【2026年11月】レッドトップ ${med("red") ?? "集計中"}・ブラックトップ ${med("black") ?? "集計中"}｜ヤフオク落札中央値`,
  description: `メーカーズマークの買取相場を、ヤフオクの落札データで掲載しています。レッドトップ（700ml）の落札中央値は${med("red") ?? "集計中"}、46は${med("46") ?? "集計中"}、カスクストレングスは${med("cask") ?? "集計中"}、ブラックトップは${med("black") ?? "集計中"}、ゴールドトップ（リミテッドエディション）は${med("gold") ?? "集計中"}。公式の製品情報と売る前の確認事項も掲載。`,
  alternates: { canonical: "/articles/makers-mark-kaitori/" },
};

const faqs = [
  {
    q: "メーカーズマークの買取相場はいくらですか？",
    a: ok(yRed)
      ? `当サイトの集計では、現行のレッドトップ（700ml・45%）のヤフオク落札価格の中央値は${med("red")}です（n=${yRed.filtered_n}件・取得日 ${fetchedAt}）。46は${med("46") ?? "データ不足"}、カスクストレングスは${med("cask") ?? "データ不足"}でした。いずれも落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "落札データの件数が20件に満たないため、現在は中央値を掲載していません。",
  },
  {
    q: "メーカーズマークのブラックトップはいくらで売れますか？",
    a: ok(yBlack)
      ? `ブラックトップ（出品タイトルの表記は750ml・47.5%）の1本出品の落札中央値は${med("black")}です（n=${yBlack.filtered_n}件・中央の半数は${yenFmt(yBlack.q1 as number)}〜${yenFmt(yBlack.q3 as number)}）。レッドトップの中央値の約${Math.round((yBlack.median as number) / (yRed?.median as number))}倍の水準でした。ブラックトップはメーカーズマーク公式サイトの現行ラインナップには掲載されていません。`
      : "落札データの件数が20件に満たないため、中央値は掲載していません。",
  },
  {
    q: "ゴールドトップは高く売れますか？",
    a: `「リミテッドエディション」と表記された50.5%のゴールドトップ（750ml）は、落札中央値が${med("gold") ?? "データ不足"}でした（n=${yGold?.filtered_n ?? 0}件）。一方、45%表記のゴールドトップ（VIP・SIVなど）は${yVip?.filtered_n ?? 0}件で、落札額は${yVip?.min ? yenFmt(yVip.min) : "—"}〜${yVip?.max ? yenFmt(yVip.max) : "—"}でした。件数が20件に満たないため中央値は出していません。同じ「ゴールドトップ」でも度数の表記で価格帯が異なるため、ラベルと度数を確認してから査定を依頼してください。`,
  },
  {
    q: "封蝋（赤いロウ）が割れていても売れますか？",
    a: "ヤフオクでは「蝋キャップ割れ」「ロウに亀裂あり」と記載された出品も落札されていました。状態は査定額に影響する可能性があるため、割れや欠けがある場合は写真を添えて申告し、複数の業者で比べてください。",
  },
];

function FaqSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      }}
    />
  );
}

const tocItems = [
  { id: "current-price", label: "1. 落札価格の中央値" },
  { id: "top-color", label: "2. ブラックトップ・ゴールドトップの落札額" },
  { id: "about", label: "3. 主なボトルと公式の説明" },
  { id: "uru-mae", label: "4. 売る前の確認事項" },
  { id: "faq", label: "5. よくある質問" },
  { id: "sources", label: "6. 出典・集計方法" },
];

const rows: { key: string; name: string; spec: string }[] = [
  { key: "red", name: "レッドトップ（スタンダード）", spec: "700ml・45%" },
  { key: "46", name: "46（フレンチオーク）", spec: "700ml/750ml・47%" },
  { key: "cask", name: "カスクストレングス", spec: "700ml/750ml・バッチにより54.8〜55.75%表記" },
  { key: "black", name: "ブラックトップ", spec: "750ml・47.5%表記" },
  { key: "gold", name: "ゴールドトップ リミテッドエディション", spec: "750ml・50.5%表記" },
  { key: "gold-vip", name: "ゴールドトップ（VIP・SIV等）", spec: "750ml・45%表記" },
];

export default function MakersMarkKaitoriPage() {
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
            <li><span className="text-foreground">メーカーズマーク 買取</span></li>
          </ol>
        </nav>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">メーカーズマークの買取相場｜レッドトップ・46・ブラックトップのヤフオク落札価格</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 編集: <Link href="/editorial/" className={linkCls}>PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">落札価格の概要</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              {ok(yRed) && <li><strong>レッドトップ（700ml）</strong>のヤフオク落札中央値は<strong>{med("red")}</strong>です（n={yRed.filtered_n}件・中央の半数は{yenFmt(yRed.q1 as number)}〜{yenFmt(yRed.q3 as number)}）。</li>}
              {ok(y46) && ok(yCask) && <li><strong>46</strong>は<strong>{med("46")}</strong>（n={y46.filtered_n}件）、<strong>カスクストレングス</strong>は<strong>{med("cask")}</strong>（n={yCask.filtered_n}件）です。</li>}
              {ok(yBlack) && ok(yGold) && <li><strong>ブラックトップ</strong>は<strong>{med("black")}</strong>（n={yBlack.filtered_n}件）、<strong>ゴールドトップ リミテッドエディション（50.5%）</strong>は<strong>{med("gold")}</strong>（n={yGold.filtered_n}件）で、現行のレッドトップとは価格帯が大きく異なります。</li>}
              <li>掲載額は<strong>落札された市場価格</strong>です。業者の買取額はここから手数料等を引いた水準になります。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-semibold text-ink mb-2">目次</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-warm-gray">
              {tocItems.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className={linkCls}>{t.label}</a></li>
              ))}
            </ul>
          </div>

          <h2 id="current-price">1. 落札価格の中央値</h2>
          <p>
            ヤフオクの落札済みオークションをボトルごとに検索し、出品タイトルを1件ずつ確認して、対象ボトルの1本出品だけを残しました。
            セット・ミニボトル・ジャンク品・他銘柄との同時出品、容量の記載がない出品を除き、IQR（四分位範囲の1.5倍）で外れ値を除いた中央値です。
            レッドトップは旧ラベル・古酒・750ml表記の出品を除き、現行の700ml表記に限っています。<strong>件数（n）が20件未満の区分は中央値を掲載していません。</strong>
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>落札中央値</th><th>件数</th><th>中央の半数</th><th>終了日の範囲</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const a = Y[r.key];
                  if (!a) return null;
                  return (
                    <tr key={r.key}>
                      <td><strong>{r.name}</strong>（{r.spec}）</td>
                      <td>{med(r.key) ?? `データ不足（n<20）。落札額 ${a.min ? yenFmt(a.min) : "—"}〜${a.max ? yenFmt(a.max) : "—"}`}</td>
                      <td>n={a.filtered_n}件</td>
                      <td>{ok(a) ? `${yenFmt(a.q1 as number)}〜${yenFmt(a.q3 as number)}` : "—"}</td>
                      <td>{fmtDate(a.end_date_from)}〜{fmtDate(a.end_date_to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※取得日 {fetchedAt}。レッドトップは出品数が多く、検索結果の上限（150件）で約3か月分、そのほかは約6か月分の落札です。
            46・カスクストレングスは700mlと750mlの出品を合わせて集計しています。
            これは<strong>落札された市場価格</strong>であり、買取業者の提示額ではありません。
          </p>

          <h2 id="top-color">2. ブラックトップ・ゴールドトップの落札額</h2>
          <p>
            メーカーズマークは封蝋（ボトルの口を覆うロウ）の色でボトルを呼び分けることが多く、ヤフオクでも「レッドトップ」「ブラックトップ」「ゴールドトップ」と表記した出品が並びます。
            このうちブラックトップとゴールドトップは、2026年11月13日時点のメーカーズマーク公式サイトの製品一覧に掲載がありません。以下は出品タイトルの表記にもとづく集計です。
          </p>
          <ul>
            {ok(yBlack) && <li><strong>ブラックトップ</strong>: 750ml・47.5%（95プルーフ）表記の1本出品{yBlack.filtered_n}件の中央値は{med("black")}、範囲は{yenFmt(yBlack.min as number)}〜{yenFmt(yBlack.max as number)}でした。50mlのミニボトルも出品されていますが、集計から除いています。</li>}
            {ok(yGold) && <li><strong>ゴールドトップ リミテッドエディション</strong>: 750ml・50.5%表記の{yGold.filtered_n}件の中央値は{med("gold")}でした。</li>}
            {yVip && <li><strong>45%表記のゴールドトップ</strong>: 「VIP」「SIV」などと書かれた出品が{yVip.filtered_n}件あり、落札額は{yVip.min ? yenFmt(yVip.min) : "—"}〜{yVip.max ? yenFmt(yVip.max) : "—"}でした。リミテッドエディションより低い価格帯で、件数が20件未満のため中央値は出していません。</li>}
          </ul>
          <p>
            同じ「ゴールドトップ」でも、度数の表記によって落札額に1万円以上の差がありました。手元のボトルの封蝋の色に加えて、ラベルの表記（LIMITED EDITION の有無）と度数を確認してください。
          </p>

          <h2 id="about">3. 主なボトルと公式の説明</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>ボトル</th><th>公式サイトの説明（要約）</th><th>度数</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>メーカーズマーク（クラシック）</strong></td><td>ケンタッキー・ストレート・バーボン。ライ麦ではなく冬小麦を使い、刺激の少ない柔らかく甘い味わいをめざしたと説明しています。</td><td>90プルーフ（45%）</td></tr>
                <tr><td><strong>46</strong></td><td>創業者の息子ビル・サミュエルズ・ジュニア氏のレシピで、1958年のクラシック発売以来初めての主要な新商品。熟成を終えた原酒の樽に焼き付けたフレンチオークの板材10枚を入れ、石灰岩の貯蔵庫で仕上げます。名前は樽材メーカーの「Stave Profile No. 46」に由来します。</td><td>94プルーフ（47%）</td></tr>
                <tr><td><strong>カスクストレングス</strong></td><td>樽出しの度数のまま瓶詰め。最低7年熟成し、小さなバッチごとに瓶詰めするため、リリースごとに異なると説明しています。</td><td>107〜114プルーフ（53.5〜57%）</td></tr>
                <tr><td><strong>101</strong></td><td>クラシックと同じレシピを高い度数で瓶詰めした限定リリース。創業者が親しい友人に特別な機会に振る舞った101プルーフのボトルに由来すると説明しています。</td><td>101プルーフ（50.5%）</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li><strong>蒸溜所</strong>: ケンタッキー州ロレットのスター・ヒル・ファームにあります。公式サイトは、サミュエルズ家3代の拠点で、国の歴史的建造物（National Historic Landmark）に指定されていると記載しています。</li>
            <li><strong>原料と熟成</strong>: マッシュビル（穀物の配合）はトウモロコシ70%・冬小麦16%・大麦麦芽14%。熟成は最低7年で、樽は上の階で3回の夏を過ごしたあと、手作業で涼しい下の階へ移すと説明しています。</li>
            <li><strong>赤い封蝋</strong>: 1958年の最初のボトルから、すべてのボトルを手作業で赤いロウに浸して封をしており、2025年には2,500万本以上を手作業で封蝋したと記載しています。ロウの垂れ方は1本ごとに異なります。</li>
          </ul>
          <p className="text-xs text-warm-gray">※Maker&apos;s Mark 公式サイト（英語）の各ページより（{off.checked_at}確認）。プルーフ表記の度数は、米国の表記（プルーフ÷2＝アルコール度数%）で換算しています。日本国内の希望小売価格は、公式の掲載を確認できなかったため記載していません。</p>

          <h2 id="uru-mae">4. 売る前の確認事項</h2>
          <ul>
            <li><strong>封蝋の色とラベルを確認する</strong>: 赤（レッドトップ）と黒・金では落札額の桁が異なります。ゴールドトップは度数の表記（50.5%か45%か）も確認してください。</li>
            <li><strong>容量を確認する</strong>: 現行のレッドトップは700mlのほか、1000ml・1750ml・375mlなどの出品もあり、今回の集計は700mlだけです。</li>
            <li><strong>カスクストレングスはバッチ番号を控える</strong>: ラベルにバッチ番号（例「24-03」）と度数が記載されています。査定の問い合わせ時に伝えると確認が早くなります。</li>
            <li><strong>レッドトップはまとめて出す</strong>: 現行品は1本あたり2,000円前後の水準のため、ほかのお酒と一緒に査定に出すと手間が減ります。</li>
            <li><strong>相見積もり</strong>: 業者ごとに販売先と在庫が異なるため、複数の業者で比べてください。手順は<Link href="/articles/whisky-takaku-uru/" className={linkCls}>ウイスキーを高く売るコツ</Link>にまとめています。</li>
          </ul>

          <h2 id="faq">5. よくある質問</h2>
          <div className="space-y-3 not-prose">
            {faqs.map((f) => (
              <details key={f.q} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{f.q}</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>

          <h2 id="sources">6. 出典・集計方法</h2>
          <ul className="text-sm">
            <li>Maker&apos;s Mark 公式「<a href={off.classic} className={linkCls} rel="noopener" target="_blank">Maker&apos;s Mark Kentucky Straight Bourbon</a>」「<a href={off.m46} className={linkCls} rel="noopener" target="_blank">Maker&apos;s Mark 46</a>」「<a href={off.cask} className={linkCls} rel="noopener" target="_blank">Cask Strength</a>」「<a href={off.m101} className={linkCls} rel="noopener" target="_blank">Maker&apos;s Mark 101</a>」「<a href={off.distillery} className={linkCls} rel="noopener" target="_blank">Distillery</a>」「<a href={off.how} className={linkCls} rel="noopener" target="_blank">How It&apos;s Made</a>」（{off.checked_at}確認）</li>
            <li>ヤフオク 落札済みオークション検索（取得日 {fetchedAt}）。検索語「{yRed?.query}」「{y46?.query}」「{yCask?.query}」「{yBlack?.query}」「{yGold?.query}」。タイトルを目視で確認し、IQR外れ値除去後の中央値を算出。n&lt;20の区分は中央値を出しません。「メーカーズマーク 101」は該当ボトルと確認できる出品が1件のみのため集計していません。詳しくは<Link href="/methodology/" className={linkCls}>集計方法</Link>をご覧ください。</li>
          </ul>

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/wild-turkey-kaitori/" className={linkCls}>ワイルドターキーの買取相場</Link></li>
              <li><Link href="/articles/bookers-kaitori/" className={linkCls}>ブッカーズの買取相場</Link></li>
              <li><Link href="/articles/blantons-kaitori/" className={linkCls}>ブラントンの買取相場</Link></li>
              <li><Link href="/articles/four-roses-kaitori/" className={linkCls}>フォアローゼスの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className={linkCls}>ウイスキー買取相場ガイド</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
