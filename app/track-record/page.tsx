import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "サイト実績・統計データ",
  description: "PeatBidの累計実績・掲載範囲・更新頻度の統計データを掲載しています。",
};

const stats = [
  { value: "51", label: "掲載銘柄数", desc: "ジャパニーズ32銘柄・スコッチ19銘柄" },
  { value: "564", label: "公開記事数", desc: "銘柄ガイド+切り口別+解説記事（都道府県別ページを除く）" },
  { value: "3,025", label: "サイト内URL", desc: "sitemap.xml登録URL（都道府県別ページ2,445を含む）" },
  { value: "2種", label: "価格データの情報源", desc: "ヤフオクの落札結果・買取店の掲示価格" },
  { value: "毎週", label: "相場更新", desc: "ヤフオク落札データの中央値を毎週月曜に更新" },
  { value: "100%", label: "無料査定推奨", desc: "掲載している3社は、いずれも査定・キャンセルが無料です" },
];

const coverage = [
  { region: "ジャパニーズウイスキー", count: 32, brands: "山崎、響、白州、竹鶴、余市、宮城峡、イチローズモルト、軽井沢、羽生、秩父、マルス" },
  { region: "スコッチウイスキー", count: 19, brands: "マッカラン、ボウモア、スプリングバンク、ラフロイグ、アードベッグ、グレンフィディック、グレンファークラス、タリスカー、バルヴェニー、グレンモーレンジ" },
  { region: "切り口別解説", count: 9, brands: "高く売る/偽物見分け/業者ランキング/歴史/希少性/オークション推移/開封済み/箱なし/ラベル汚れ" },
  { region: "解説記事・銘柄別の総合ページ", count: 54, brands: "相場一覧、高く売るコツ、税金、保管方法、銘柄別の総合ページなど" },
];

const milestones = [
  { date: "2026-05-12", event: "サイト公開（peatbid.com）" },
  { date: "2026-05-12", event: "銘柄別・切り口別の記事を公開（公開記事506本）" },
  { date: "2026-05-13", event: "銘柄別・切り口別の記事の本文を拡充" },
  { date: "2026-05-14", event: "記事に画像と業者比較表を追加" },
  { date: "2026-05-14", event: "編集部紹介・編集ポリシー・サイト実績の各ページを公開" },
];

export default function TrackRecordPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/editorial/" className="hover:text-amber-dark transition-colors">編集部紹介</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">サイト実績</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">PeatBid サイト実績・統計データ</h1>
      <p className="text-warm-gray text-sm mb-8">最終更新: 2026年11月13日 / 編集: PeatBid編集部</p>

      <section className="prose">
        <p>
          当サイトでは、サイトの実績・掲載範囲・運営状況を公開しています。
          読者の皆さまが当サイトの信頼性をご判断いただくための材料として掲載しています。
        </p>

        <h2>サイト統計</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 not-prose">
          {stats.map((s) => (
            <div key={s.label} className="bg-cream/30 border border-amber/30 rounded-xl p-4 text-center">
              <p className="font-display text-2xl md:text-3xl font-semibold text-amber-dark">{s.value}</p>
              <p className="text-xs font-bold text-ink mt-1">{s.label}</p>
              <p className="text-[10px] text-warm-gray mt-1 leading-tight">{s.desc}</p>
            </div>
          ))}
        </div>

        <h2>掲載範囲の詳細</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>カテゴリ</th><th>件数</th><th>主な銘柄・切り口</th></tr>
            </thead>
            <tbody>
              {coverage.map((c) => (
                <tr key={c.region}>
                  <td><strong>{c.region}</strong></td>
                  <td>{c.count}</td>
                  <td className="text-xs">{c.brands}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>サイトの歩み</h2>

        <div className="space-y-3 my-6 not-prose">
          {milestones.map((m) => (
            <div key={m.event} className="flex gap-4 items-start">
              <p className="font-display text-sm font-semibold text-amber-dark flex-shrink-0 w-24">{m.date}</p>
              <p className="text-sm text-ink/80 flex-1">{m.event}</p>
            </div>
          ))}
        </div>

        <h2>運営の透明性</h2>
        <p>
          PeatBid は以下の取り組みで運営の透明性を確保しています:
        </p>
        <ul>
          <li><strong>編集体制の公開</strong> — <Link href="/editorial/" className="text-burgundy underline">編集部紹介ページ</Link>で運営体制・編集部の作業内容を開示</li>
          <li><strong>編集方針の公開</strong> — <Link href="/methodology/" className="text-burgundy underline">編集ポリシーページ</Link>で価格データ収集方法・更新頻度を公開</li>
          <li><strong>アフィリエイト関係の開示</strong> — 全ページのフッターに「本サイトはプロモーション(PR)を含みます」と表示し、編集方針ページで業者紹介の仕組みを説明しています</li>
          <li><strong>記事の最終更新日表示</strong> — 各記事に明記し、情報の鮮度をご確認いただけるようにしています</li>
          <li><strong>誤情報の訂正</strong> — ご連絡いただいた内容を公式の情報などで確認し、誤りであれば訂正します</li>
          <li><strong>法令遵守の宣言</strong> — 古物営業法・景表法・特商法・個人情報保護法等の遵守を編集方針で明示</li>
        </ul>

        <h2>外部リンク・引用先</h2>
        <p>PeatBidが参照している主な情報源は、以下のとおりです。</p>
        <ul>
          <li>ヤフオクの落札結果（相場の中央値の集計に使用しています）</li>
          <li>買取店の公式サイト（参考買取価格を、確認日とともに掲載しています）</li>
          <li>各社公式の店舗一覧・店舗ページ・会社概要（業者情報の照合に使用しています）</li>
          <li>サントリーホールディングス公式（<a href="https://www.suntory.co.jp/" target="_blank" rel="noopener noreferrer nofollow">suntory.co.jp</a>）</li>
          <li>ニッカウヰスキー公式（<a href="https://www.nikka.com/" target="_blank" rel="noopener noreferrer nofollow">nikka.com</a>）</li>
          <li>ベンチャーウイスキー秩父蒸溜所（<a href="https://chichibu-distillery.co.jp/" target="_blank" rel="noopener noreferrer nofollow">chichibu-distillery.co.jp</a>）</li>
          <li>国税庁 酒類関連法令</li>
        </ul>

        <p>
          海外オークションの落札結果は、相場の集計には使用していません。
          一部の記事で、落札額と出典を確認できた個別の結果のみ、出典URLとともに掲載しています。
        </p>

        <h2>お問い合わせ・データ訂正</h2>
        <p>
          サイト掲載情報の誤り・改善提案・買取業者様からの掲載のご相談など、
          編集部へのお問い合わせは <Link href="/contact/" className="text-burgundy underline">お問い合わせフォーム</Link> からご連絡ください。
          内容を確認のうえ対応します。
        </p>

        <h2>関連情報</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          <Link href="/editorial/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <span className="text-xs text-amber-dark font-bold">編集部</span>
            <p className="text-sm font-bold mt-1">PeatBid 編集部紹介</p>
          </Link>
          <Link href="/methodology/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <span className="text-xs text-amber-dark font-bold">編集ポリシー</span>
            <p className="text-sm font-bold mt-1">価格データ収集方法・信頼性ガイドライン</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
