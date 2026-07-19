import type { Metadata } from "next";
import Link from "next/link";
import data from "@/data/souba-ranking.json";

type Brand = {
  slug: string;
  name: string;
  category: string;
  origin: string;
  rarity: string;
  median: number;
  sample_n: number;
};

const brands = (data.brands as Brand[]).filter((b) => typeof b.median === "number" && b.median > 0);
const updated = data.updated as string;
const YEAR = updated.slice(0, 4);

export const metadata: Metadata = {
  title: `全国ウイスキー買取相場白書${YEAR}｜主要${brands.length}銘柄の実勢買取相場一覧【${updated}更新】`,
  description: `山崎・響・イチローズモルト・マッカラン・ボウモアなど主要ウイスキー${brands.length}銘柄の実勢買取相場（中央値）を一覧で公開。Yahoo!オークションの過去180日落札データをもとにした当サイト独自集計の一次データです。出典明記で引用歓迎。`,
  alternates: { canonical: "/souba-hakusho/" },
};

const yen = (n: number) => "¥" + Math.round(n).toLocaleString();

function median(nums: number[]): number {
  if (nums.length === 0) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
}

export default function Page() {
  const byMedian = [...brands].sort((a, b) => b.median - a.median);
  const overallMedian = median(brands.map((b) => b.median));
  const top = byMedian[0];
  const bottom = byMedian[byMedian.length - 1];
  const totalSamples = brands.reduce((a, b) => a + (b.sample_n || 0), 0);

  // カテゴリ別サマリー（カテゴリ文字列を動的にグルーピング）
  const cats = Array.from(new Set(brands.map((b) => b.category)));
  const catRows = cats
    .map((c) => {
      const list = brands.filter((b) => b.category === c);
      const topB = [...list].sort((a, b) => b.median - a.median)[0];
      return { c, n: list.length, med: median(list.map((b) => b.median)), top: topB };
    })
    .sort((a, b) => b.n - a.n);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">買取相場白書</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3 !mt-0">
        全国ウイスキー買取相場白書 {YEAR}
      </h1>
      <p className="text-warm-gray text-sm mb-2">
        最終更新: {updated}（毎週自動更新） ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
      </p>
      <p className="leading-relaxed mb-8">
        主要ウイスキー<strong>{brands.length}銘柄</strong>の実勢買取相場（中央値）を、Yahoo!オークションの過去180日落札データ（IQR法で外れ値除去）から集計した
        <strong>当サイト独自の一次データ</strong>としてまとめた資料です。延べ<strong>{totalSamples.toLocaleString()}件</strong>の落札データにもとづきます。
        メディア・ブログでの<strong>引用は出典明記を条件に歓迎</strong>します（本ページ末尾参照）。
      </p>

      {/* ヘッドライン統計 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        {[
          { label: "対象銘柄数", value: `${brands.length}銘柄` },
          { label: "相場の中央値", value: yen(overallMedian) },
          { label: "最高額の銘柄", value: top.name, sub: yen(top.median) },
          { label: "集計サンプル", value: `${totalSamples.toLocaleString()}件` },
        ].map((s) => (
          <div key={s.label} className="border border-warm-border rounded-2xl p-4 bg-white text-center">
            <p className="text-xs text-warm-gray mb-1">{s.label}</p>
            <p className="font-display text-lg font-bold text-ink leading-tight">{s.value}</p>
            {s.sub && <p className="text-xs text-amber-dark mt-0.5">{s.sub}</p>}
          </div>
        ))}
      </section>

      {/* カテゴリ別サマリー */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-ink mb-3">カテゴリ別の買取相場サマリー</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cream">
                <th className="px-3 py-2.5 text-left font-bold border border-warm-border">カテゴリ</th>
                <th className="px-3 py-2.5 text-right font-bold border border-warm-border">銘柄数</th>
                <th className="px-3 py-2.5 text-right font-bold border border-warm-border">相場の中央値</th>
                <th className="px-3 py-2.5 text-left font-bold border border-warm-border">最高額の銘柄</th>
              </tr>
            </thead>
            <tbody>
              {catRows.map((r) => (
                <tr key={r.c} className="bg-white">
                  <td className="px-3 py-2.5 border border-warm-border font-medium">{r.c}</td>
                  <td className="px-3 py-2.5 border border-warm-border text-right tabular-nums">{r.n}</td>
                  <td className="px-3 py-2.5 border border-warm-border text-right tabular-nums font-bold text-ink">{yen(r.med)}</td>
                  <td className="px-3 py-2.5 border border-warm-border">
                    <Link href={`/articles/${r.top.slug}-kaitori/`} className="text-amber-dark hover:underline">{r.top.name}</Link>
                    <span className="text-warm-gray text-xs">（{yen(r.top.median)}）</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 銘柄別 実勢買取相場一覧（白書の中核） */}
      <section className="mb-10">
        <h2 className="font-display text-xl font-bold text-ink mb-3">主要{brands.length}銘柄の実勢買取相場一覧</h2>
        <p className="text-sm text-warm-gray mb-4">
          中央値が高い順。各銘柄名から、状態・付属品別の買取相場と高く売るコツの詳細ページに移動できます。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cream">
                <th className="px-3 py-2.5 text-right font-bold border border-warm-border">#</th>
                <th className="px-3 py-2.5 text-left font-bold border border-warm-border">銘柄</th>
                <th className="px-3 py-2.5 text-left font-bold border border-warm-border">カテゴリ</th>
                <th className="px-3 py-2.5 text-right font-bold border border-warm-border">実勢中央値</th>
                <th className="px-3 py-2.5 text-right font-bold border border-warm-border">サンプル数</th>
              </tr>
            </thead>
            <tbody>
              {byMedian.map((b, i) => (
                <tr key={b.slug} className={i % 2 ? "bg-cream/40" : "bg-white"}>
                  <td className="px-3 py-2.5 border border-warm-border text-right text-warm-gray tabular-nums">{i + 1}</td>
                  <td className="px-3 py-2.5 border border-warm-border">
                    <Link href={`/articles/${b.slug}-kaitori/`} className="text-amber-dark hover:underline font-medium">{b.name}</Link>
                  </td>
                  <td className="px-3 py-2.5 border border-warm-border text-warm-gray">{b.category}</td>
                  <td className="px-3 py-2.5 border border-warm-border text-right tabular-nums font-bold text-ink">{yen(b.median)}</td>
                  <td className="px-3 py-2.5 border border-warm-border text-right tabular-nums text-warm-gray">{(b.sample_n || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-warm-gray leading-relaxed mt-3">
          ※中央値は中古市場（オークション）の実勢価格の参考値です。実際の買取価格は、業者の手数料・在庫状況・ボトルの状態（箱・付属品の有無、液面、保管状態）により上記を下回ることが一般的で、金額を保証するものではありません。正確な額は各買取業者の無料査定でご確認ください。
        </p>
      </section>

      {/* メソドロジー */}
            {/* priority-cluster-links-202607 */}
      <section className="my-8 rounded-2xl border border-amber/40 bg-cream/50 p-6">
        <h2 className="font-display text-lg font-bold text-ink mb-3 !mt-0">注目の買取相場（強化クラスタ）</h2>
        <p className="text-sm text-ink/70 mb-3">「年代指定なし（ノンエイジ／NV）」で検索されやすいスコッチ・ジャパニーズの主要銘柄の買取相場です。実勢中央値をもとに更新しています。</p>
        <ul className="space-y-2 text-sm">
          <li><Link href="/articles/glenfarclas-25-kaitori/" className="text-amber-dark underline">グレンファークラス（25年ほか）の買取相場</Link></li>
          <li><Link href="/articles/glenfarclas-105-kaitori/" className="text-amber-dark underline">グレンファークラス105（カスクストレングス・年代指定なし）の買取相場</Link></li>
          <li><Link href="/articles/springbank-15-kaitori/" className="text-amber-dark underline">スプリングバンク（15年ほか）の買取相場</Link></li>
          <li><Link href="/articles/bowmore-18-kaitori/" className="text-amber-dark underline">ボウモア（18年ほか）の買取相場</Link></li>
          <li><Link href="/articles/ardbeg-uigeadail-kaitori/" className="text-amber-dark underline">アードベッグ ウーガダール（年代指定なし）の買取相場</Link></li>
          <li><Link href="/articles/glenfiddich-30-kaitori/" className="text-amber-dark underline">グレンフィディック30年の買取相場</Link></li>
          <li><Link href="/articles/yamazaki-nv-kaitori/" className="text-amber-dark underline">山崎ノンエイジ（NV・年代指定なし）の買取相場</Link></li>
          <li><Link href="/articles/hakushu-nv-kaitori/" className="text-amber-dark underline">白州ノンエイジ（NV・年代指定なし）の買取相場</Link></li>
        </ul>
      </section>
      <section className="mb-10 border border-warm-border rounded-2xl p-6 bg-white">
        <h2 className="font-display text-lg font-bold text-ink mb-3 !mt-0">算出方法（メソドロジー）</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm leading-relaxed">
          <li>原データ: Yahoo!オークションの過去180日落札価格から、IQR法で外れ値を除去した各銘柄の中央値（<Link href="/methodology/" className="text-amber-dark underline">詳細</Link>）</li>
          <li>更新頻度: 毎週自動集計（本資料は {updated} 時点のスナップショット）</li>
          <li>集計主体: PeatBid編集部の独自集計（一次データ）</li>
          <li>サンプル数: 各銘柄ごとに表示。サンプルが少ない銘柄は相場の振れ幅が大きくなる点にご留意ください。</li>
        </ul>
      </section>

      {/* 引用について（被リンク資産） */}
      <section className="mb-10 border border-amber/40 rounded-2xl p-6 bg-cream/50">
        <h2 className="font-display text-lg font-bold text-ink mb-2 !mt-0">📊 データの引用について</h2>
        <p className="text-sm leading-relaxed mb-3">
          本白書の数値・表は、<strong>出典の明記</strong>を条件に、メディア・ブログ・SNS等でご自由に引用いただけます。
          ウイスキー買取相場の一次データとしてご活用ください。
        </p>
        <div className="bg-white border border-warm-border rounded-lg p-3 text-xs text-warm-gray">
          出典表記の例：「出典：全国ウイスキー買取相場白書{YEAR}（PeatBid / peatbid.com）」＋本ページへのリンク
        </div>
      </section>

      {/* 関連データ・送客 */}
      <section className="mb-4">
        <h2 className="font-display text-lg font-bold text-ink mb-3">関連する相場データ</h2>
        <ul className="space-y-2 text-sm">
          <li>📰 <Link href="/souba-report/" className="text-amber-dark underline">週次相場レポート（PeatBid買取相場指数）</Link>（指数の前週比と上昇・下落TOP5を毎週更新）</li>
          <li>📈 <Link href="/souba-index/" className="text-amber-dark underline">ウイスキー買取相場指数</Link>（週次の合成インデックスで全体トレンドを見る）</li>
          <li>🔼 <Link href="/souba-ranking/" className="text-amber-dark underline">買取相場ランキング・ダッシュボード</Link>（今週の値上がり・値下がり銘柄）</li>
          <li>📝 <Link href="/articles/whisky-sell-guide/" className="text-amber-dark underline">ウイスキーを売る前に知る基礎ガイド</Link>（相場の決まり方・税金・高く売るコツ）</li>
        </ul>
      </section>
    </div>
  );
}
