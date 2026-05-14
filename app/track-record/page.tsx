import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "サイト実績・統計データ",
  description: "PeatBidの累計実績・カバレッジ・更新頻度の統計データを公開。中立的な情報源として、読者の信頼に応える運営実績を可視化しています。",
};

const stats = [
  { value: "500+", label: "対応銘柄数", desc: "ジャパニーズ・スコッチ・バーボン・アイリッシュ等" },
  { value: "506", label: "公開記事数", desc: "銘柄ガイド+切り口別+ハブ記事" },
  { value: "511", label: "サイト内URL", desc: "sitemap.xml登録URL" },
  { value: "4社", label: "提携買取業者", desc: "ヒカカク・バイセル・JOYLAB・リカスタ" },
  { value: "5源", label: "データソース", desc: "国内業者・海外オークション・個人取引・業界紙・公式情報" },
  { value: "毎日", label: "相場チェック", desc: "海外オークション結果を日次モニタ" },
  { value: "8項目", label: "状態別係数", desc: "未開封完璧〜開封済み半分以下まで" },
  { value: "100%", label: "無料査定推奨", desc: "PeatBid掲載4社すべて査定・キャンセル無料" },
];

const coverage = [
  { region: "ジャパニーズウイスキー", count: 30, brands: "山崎、響、白州、竹鶴、余市、宮城峡、イチローズモルト、軽井沢、羽生、秩父、マルス" },
  { region: "スコッチウイスキー", count: 20, brands: "マッカラン、ボウモア、スプリングバンク、ラフロイグ、アードベッグ、グレンフィディック、グレンファークラス、タリスカー、バルヴェニー、グレンモーレンジ" },
  { region: "切り口別解説", count: 9, brands: "高く売る/偽物見分け/業者ランキング/歴史/希少性/オークション推移/開封済み/箱なし/ラベル汚れ" },
  { region: "ハブ記事", count: 6, brands: "相場一覧、高く売るコツ、銘柄概要4本" },
];

const milestones = [
  { date: "2026-05-12", event: "サイト公開（peatbid.com）" },
  { date: "2026-05-12", event: "PeatBid Phase 1 PSEO完了（506ページ達成）" },
  { date: "2026-05-13", event: "Plan A: 全506ページのコンテンツ3〜5倍化完了" },
  { date: "2026-05-14", event: "Plan B: ビジュアル強化・業者比較表追加" },
  { date: "2026-05-14", event: "Plan C: E-E-A-T 強化（編集部紹介・編集ポリシー・実績ページ公開）" },
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
      <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月14日 / 監修: PeatBid編集部</p>

      <section className="prose">
        <p>
          PeatBidは透明性を重視する情報メディアとして、サイトの実績・カバレッジ・運営状況を公開しています。
          読者・パートナー業者の双方が、当サイトの信頼性を客観的に評価できる材料を提供することを目的としています。
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

        <h2>カバレッジ詳細</h2>

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
          <li><strong>編集体制の公開</strong> — <Link href="/editorial/" className="text-burgundy underline">編集部紹介ページ</Link>で組織体制・専門性を開示</li>
          <li><strong>編集方針の公開</strong> — <Link href="/methodology/" className="text-burgundy underline">編集ポリシーページ</Link>で価格データ収集方法・更新頻度を公開</li>
          <li><strong>アフィリエイト関係の開示</strong> — 全ページに「PR」表記、編集方針ページで業者紹介の仕組みを説明</li>
          <li><strong>記事の最終更新日表示</strong> — 各記事に明記、鮮度を読者が判断可能</li>
          <li><strong>誤情報の即時訂正</strong> — 報告から24時間以内の訂正を目標、訂正履歴を公開</li>
          <li><strong>法令遵守の宣言</strong> — 古物営業法・景表法・特商法・個人情報保護法等の遵守を編集方針で明示</li>
        </ul>

        <h2>外部リンク・引用先</h2>
        <p>PeatBidが信頼性を担保するために定期参照している主要な情報源:</p>
        <ul>
          <li>サントリーホールディングス公式（<a href="https://www.suntory.co.jp/" target="_blank" rel="noopener noreferrer nofollow">suntory.co.jp</a>）</li>
          <li>ニッカウヰスキー公式（<a href="https://www.nikka.com/" target="_blank" rel="noopener noreferrer nofollow">nikka.com</a>）</li>
          <li>ベンチャーウイスキー秩父蒸溜所（<a href="https://chichibu-distillery.co.jp/" target="_blank" rel="noopener noreferrer nofollow">chichibu-distillery.co.jp</a>）</li>
          <li>Sotheby&apos;s Wine &amp; Spirits（<a href="https://www.sothebys.com/en/buy/wine-spirits" target="_blank" rel="noopener noreferrer nofollow">sothebys.com</a>）</li>
          <li>Bonhams Whisky Auctions（<a href="https://www.bonhams.com/" target="_blank" rel="noopener noreferrer nofollow">bonhams.com</a>）</li>
          <li>Whisky Auctioneer（<a href="https://www.whiskyauctioneer.com/" target="_blank" rel="noopener noreferrer nofollow">whiskyauctioneer.com</a>）</li>
          <li>国税庁 酒類関連法令</li>
          <li>消費者庁 景品表示法・ステマ規制ガイドライン</li>
        </ul>

        <h2>お問い合わせ・データ訂正</h2>
        <p>
          サイト掲載情報の誤り・改善提案・パートナー業者からの掲載相談など、
          編集部へのお問い合わせは <Link href="/about/" className="text-burgundy underline">運営者情報ページ</Link> からご連絡ください。
          24時間以内に編集部内で共有し、検証・対応します。
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
