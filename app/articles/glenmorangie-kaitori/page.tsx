import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import medians from "@/data/yahoo-medians.json";

// N3②（2026-08-29）グレンモーレンジの受け皿。
// GSC実測: 「グレンモーレンジ 年代指定なし 買取」pos8.0 / 「グレンモーレンジ シングルモルト〜年代指定なし 買取」pos10.9 /
// 「グレンモーレンジ 買取」pos14.4〜19.7 が、いずれも /articles/glenmorangie-signet-kaitori/（シグネット単体のページ）に
// 着地して0クリックだった。年代指定なしやブランド総称で探している人に、1商品のページを見せていたのが原因。
// ⚠️ 価格は yahoo-medians.json の実測値のみ。データが無い銘柄は数値を出さない（架空値で埋めない）。

type MedianRec = { median?: number; filtered_n?: number; fetched_at?: string; insufficient?: boolean };
const m = medians as unknown as Record<string, MedianRec | undefined>;

const rec = (key: string): MedianRec | null => {
  const r = m[key];
  return r && r.insufficient !== true && typeof r.median === "number" ? r : null;
};
const yen = (key: string): string | null => {
  const r = rec(key);
  return r ? `${Math.round(r.median!).toLocaleString("ja-JP")}円` : null;
};
const nOf = (key: string): string => {
  const r = rec(key);
  return r && typeof r.filtered_n === "number" ? `n=${r.filtered_n}件` : "—";
};

const g10 = rec("glenmorangie-10");
const g18 = rec("glenmorangie-18");
const signet = rec("glenmorangie-signet");
const fetchedAt = g10?.fetched_at ?? g18?.fetched_at ?? "毎週月曜";

export const metadata: Metadata = {
  title: "グレンモーレンジ買取価格【2026年8月】10年・ラサンタ・キンタルバン・18年・シグネットの相場",
  description:
    `グレンモーレンジの買取相場をラインナップ別に実データで掲載。オリジナル10年${yen("glenmorangie-10") ?? "収集中"}・ラサンタ${yen("glenmorangie-lasanta") ?? "収集中"}・キンタルバン${yen("glenmorangie-quinta-ruban") ?? "収集中"}・18年${yen("glenmorangie-18") ?? "収集中"}・シグネット${yen("glenmorangie-signet") ?? "収集中"}（ヤフオク実落札の中央値・毎週更新）。年数表記のないボトルの扱い、箱なし・開封済みの目安、高く売るコツまで解説します。`,
  alternates: { canonical: "/articles/glenmorangie-kaitori/" },
};

const faqs = [
  {
    q: "グレンモーレンジの買取相場はいくらですか？",
    a: g10
      ? `ラインナップによって大きく異なります。当サイト集計（ヤフオク過去180日の実落札・IQR外れ値除去後の中央値・取得日 ${fetchedAt}）では、オリジナル10年${yen("glenmorangie-10")}、ラサンタ${yen("glenmorangie-lasanta")}、キンタルバン${yen("glenmorangie-quinta-ruban")}、ネクタードール${yen("glenmorangie-nectar-dor")}、18年${yen("glenmorangie-18")}、シグネット${yen("glenmorangie-signet")}です。これは落札された市場価格であり、業者の買取額はここから手数料等を引いた水準になります。`
      : "実勢データを収集中です（毎週更新のため近日掲載予定）。",
  },
  {
    q: "手元のグレンモーレンジがどの銘柄か分かりません。どこを見ればいいですか？",
    a: "ボトル正面ラベルの銘柄名を見てください。「ORIGINAL」に「10 YEARS OLD」、「LASANTA」「QUINTA RUBAN」「NECTAR D'OR」はそれぞれ樽違いのフィニッシュ違いで、ラベルに銘柄名が入っています。「SIGNET」は年数表記がありません。判別できない場合は、正面・裏ラベル・キャップ・液面の写真を用意して買取業者に見てもらうのが確実です。",
  },
  {
    q: "グレンモーレンジに年数表記のないボトルはありますか？",
    a: "あります。代表的なのは「シグネット」で、熟成年数を表記していません（チョコレートモルトを使った高級ライン）。当サイトではシグネットの実落札データを十分な件数集められているため、中央値を掲載しています。それ以外の限定リリースは流通量が少なく、n≥20を満たせないものは数値を出していません。",
  },
  {
    q: "ラサンタ・キンタルバン・ネクタードールの違いは？",
    a: "ベースは同じで、追加熟成（フィニッシュ）に使う樽が異なります。ラサンタはシェリー樽、キンタルバンはポート樽、ネクタードールはソーテルヌ（貴腐ワイン）樽です。当サイトの実勢データでは、この3本のうちネクタードールの中央値が最も高く出ています。",
  },
  {
    q: "箱なし・開封済みでも買取してもらえますか？",
    a: "はい、可能です。業界一般の目安として、未開封・箱なし（ラベル良好）で市場相場の80〜90%程度、開封済みで残量9割以上なら30〜40%程度が目安です（業者により評価基準は異なります）。化粧箱や冊子が残っていれば一緒に査定に出してください。",
  },
  {
    q: "グレンモーレンジを高く売るコツは？",
    a: "(1)化粧箱・付属品を揃える、(2)未開封のまま売る、(3)銘柄を正確に伝える（ラサンタとキンタルバンの取り違えは査定額に影響します）、(4)複数業者で相見積もりを取る、(5)直射日光を避け縦置きで保管する、の5つが基本です。オリジナル10年は流通量が多く業者間の差が出にくい一方、シグネットや18年は在庫状況で査定額が動きやすくなります。",
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
  { id: "current-price", label: "1. ラインナップ別の実勢価格（ヤフオク落札中央値・毎週更新）" },
  { id: "miwakekata", label: "2. 手元のボトルがどの銘柄かの見分け方" },
  { id: "nv", label: "3. 年数表記のないボトル（シグネット）について" },
  { id: "jotai", label: "4. 箱なし・開封済みの扱い" },
  { id: "takaku-uru", label: "5. 高く売る5つのコツ" },
  { id: "faq", label: "6. よくある質問" },
];

const rows: { name: string; key: string; note: string; href?: string }[] = [
  { name: "グレンモーレンジ オリジナル10年", key: "glenmorangie-10", note: "最も流通量の多い定番。年数表記あり" },
  { name: "グレンモーレンジ ラサンタ", key: "glenmorangie-lasanta", note: "シェリー樽フィニッシュ" },
  { name: "グレンモーレンジ キンタルバン", key: "glenmorangie-quinta-ruban", note: "ポート樽フィニッシュ" },
  { name: "グレンモーレンジ ネクタードール", key: "glenmorangie-nectar-dor", note: "ソーテルヌ樽フィニッシュ" },
  { name: "グレンモーレンジ 18年", key: "glenmorangie-18", note: "長期熟成の定番" },
  { name: "グレンモーレンジ シグネット", key: "glenmorangie-signet", note: "年数表記なし。チョコレートモルト使用", href: "/articles/glenmorangie-signet-kaitori/" },
];

export default function GlenmorangieKaitoriPage() {
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
            <li><span className="text-foreground">グレンモーレンジ 買取</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="/images/heroes/glenmorangie-signet.png" alt="グレンモーレンジの買取相場（ラインナップ別）" width={1200} height={440} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">グレンモーレンジの買取相場｜10年・ラサンタ・キンタルバン・18年・シグネットの実勢価格</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: {fetchedAt} / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link></p>

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-bold text-ink mb-2">結論（30秒）</p>
            <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
              <li>グレンモーレンジは<strong>銘柄によって相場が5倍以上ちがいます</strong>。まず手元のボトルがどれかを確定させてください。</li>
              {g10 && <li>当サイト集計の実勢中央値: オリジナル10年 <strong>{yen("glenmorangie-10")}</strong> ／ 18年 <strong>{yen("glenmorangie-18")}</strong> ／ シグネット <strong>{yen("glenmorangie-signet")}</strong></li>}
              <li><strong>年数表記が無いボトル</strong>はシグネットの可能性が高いです（詳細は<a href="#nv" className="text-amber-dark underline">3章</a>）。</li>
              <li>掲載額は<strong>ヤフオクの実落札中央値＝市場価格</strong>です。業者の買取額はここから手数料等を引いた水準になります。</li>
            </ul>
          </div>

          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 my-6 not-prose">
            <p className="font-semibold text-ink mb-2">目次</p>
            <ul className="text-sm space-y-1 list-disc list-inside text-warm-gray">
              {tocItems.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="text-amber-dark hover:text-burgundy underline">{t.label}</a></li>
              ))}
            </ul>
          </div>

          <h2 id="current-price">1. ラインナップ別の実勢価格</h2>
          <p>
            ヤフオク過去180日の実落札価格から、IQRで外れ値を除いた中央値です（取得日 {fetchedAt}・毎週更新）。
            <strong>n（件数）が20件未満の銘柄は数値を出していません。</strong>サンプルが少ない中央値は相場として扱えないためです。
          </p>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>銘柄</th><th>実勢中央値</th><th>サンプル数</th><th>特徴</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.key}>
                    <td>{r.href ? <Link href={r.href} className="text-amber-dark underline hover:text-burgundy">{r.name}</Link> : <strong>{r.name}</strong>}</td>
                    <td>{yen(r.key) ?? "データ収集中"}</td>
                    <td>{nOf(r.key)}</td>
                    <td>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-warm-gray">
            ※これは<strong>落札された市場価格</strong>であって、買取業者の提示額ではありません。買取額は業者の手数料・在庫状況によりこれを下回るのが一般的です。
          </p>

          <h2 id="miwakekata">2. 手元のボトルがどの銘柄かの見分け方</h2>
          <p>
            グレンモーレンジは年数ではなく<strong>銘柄名で分かれている</strong>のが特徴です。正面ラベルの表記を確認してください。
          </p>
          <ul>
            <li><strong>ORIGINAL / 10 YEARS OLD</strong> … オリジナル10年。最も流通量が多い定番</li>
            <li><strong>LASANTA</strong> … シェリー樽で追加熟成したもの</li>
            <li><strong>QUINTA RUBAN</strong> … ポート樽で追加熟成したもの</li>
            <li><strong>NECTAR D&apos;OR</strong> … ソーテルヌ（貴腐ワイン）樽で追加熟成したもの</li>
            <li><strong>18 YEARS OLD</strong> … 18年</li>
            <li><strong>SIGNET</strong> … 年数表記なし。チョコレートモルトを使った上位ライン</li>
          </ul>
          <p>
            <strong>ラサンタとキンタルバンの取り違えは査定額に影響します。</strong>ラベルの銘柄名を必ず伝えてください。判別できない場合は、正面・裏ラベル・キャップ・液面の写真を用意して業者に見てもらうのが確実です。
          </p>

          <h2 id="nv">3. 年数表記のないボトル（シグネット）について</h2>
          <p>
            「熟成年数がどこにも書かれていない」場合、グレンモーレンジでは<strong>シグネットである可能性が高い</strong>です。
            {signet && <>当サイトの実勢中央値は <strong>{yen("glenmorangie-signet")}</strong>（{nOf("glenmorangie-signet")}）で、ラインナップの中で最も高い水準です。</>}
            詳細は<Link href="/articles/glenmorangie-signet-kaitori/" className="text-amber-dark underline hover:text-burgundy">シグネットの買取相場ページ</Link>にまとめています。
          </p>
          <p>
            シグネット以外にも年数表記のない限定リリースはありますが、<strong>流通量が少なくn≥20を満たせないため、当サイトでは数値を出していません。</strong>データが集まり次第このページに掲載します。
          </p>

          <h2 id="jotai">4. 箱なし・開封済みの扱い</h2>
          <p>
            業界一般の目安として、<strong>未開封・箱なし（ラベル良好）で市場相場の80〜90%程度</strong>、<strong>開封済みで残量9割以上なら30〜40%程度</strong>が目安です（業者により評価基準は異なります）。化粧箱や冊子が部分的にでも残っていれば、一緒に査定へ出してください。
          </p>

          <h2 id="takaku-uru">5. 高く売る5つのコツ</h2>
          <ol>
            <li><strong>化粧箱・付属品を揃える</strong></li>
            <li><strong>未開封のまま売る</strong>（開けた時点で相場の3〜4割まで落ちます）</li>
            <li><strong>銘柄を正確に伝える</strong>（ラサンタ／キンタルバン／ネクタードールの取り違えに注意）</li>
            <li><strong>複数業者で相見積もりを取る</strong></li>
            <li><strong>直射日光を避け、縦置きで保管する</strong></li>
          </ol>
          <p>
            オリジナル10年は流通量が多く業者間の差が出にくい一方、<strong>シグネットや18年は在庫状況で査定額が動きやすい</strong>ため、相見積もりの効果が出やすい銘柄です。
          </p>

          <h2 id="faq">6. よくある質問</h2>
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

          <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10 not-prose">
            <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
            <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
              <li><Link href="/articles/glenmorangie-signet-kaitori/" className="text-amber-dark hover:text-burgundy underline">グレンモーレンジ シグネットの買取相場</Link></li>
              <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー買取相場ガイド</Link></li>
              <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
              <li><Link href="/articles/glenfiddich-kaitori/" className="text-amber-dark hover:text-burgundy underline">グレンフィディックの買取相場（年代別）</Link></li>
            </ul>
          </div>
        </article>
      </div>
    </>
  );
}
