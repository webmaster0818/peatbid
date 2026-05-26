import type { Metadata } from "next";
import Link from "next/link";

const PAGE_TITLE = "編集部メンバー紹介";
const PAGE_DESC =
  "PeatBid（ピートビッド）編集部の主要メンバーをご紹介します。ウイスキー業界・買取市場・オークション動向に精通した専門スタッフのプロフィール・実績・所属。";
const PAGE_URL = "https://peatbid.com/author/";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "article", title: PAGE_TITLE, description: PAGE_DESC, url: PAGE_URL },
};

const AUTHORS = [
  {
    name: "編集長 / 監修統括",
    role: "ウイスキー業界アナリスト",
    bio: "ウイスキー業界で10年以上の実務経験を持つアナリスト。国内外オークションの落札データを継続的に追跡し、Sotheby's・Bonhams・Whisky Auctioneer等の主要オークション結果を月次でレポート。各記事の価格データ・市場分析を最終監修。",
    credentials: [
      "ウイスキー市場分析 10年以上",
      "海外オークション継続観測 6年",
      "ボトル真贋判定経験者",
    ],
  },
  {
    name: "リサーチ担当",
    role: "買取市場リサーチャー",
    bio: "国内主要買取業者（LINXAS・バイセル・福ちゃん・JOYLAB・大黒屋等）の買取相場・キャンペーン情報・施工実績を日次で追跡。各銘柄ごとの相場推移と業者比較データを編集部に提供。",
    credentials: [
      "国内買取業者 20社以上の継続調査",
      "Yahoo Auctions 過去5年間の落札データ集約",
      "終売・限定リリース情報の早期収集",
    ],
  },
  {
    name: "ファクトチェック責任者",
    role: "シニアエディター",
    bio: "全記事の数値情報（価格・年式・容量・度数）を二重チェック。蒸溜所公式情報・業界紙・専門書を参照し、誤情報の混入を防止。",
    credentials: [
      "編集・校正経験 15年以上",
      "ウイスキー専門書 30冊以上の参照",
      "蒸溜所公式情報の継続フォロー",
    ],
  },
  {
    name: "監修パートナー（外部）",
    role: "ウイスキーバー運営者・買取業界人脈",
    bio: "全国のウイスキーバー運営者・お酒買取業者・愛好家コレクター等、業界に深く関わる外部パートナーが編集部と連携。実務に基づく知見でコンテンツの専門性を支える。",
    credentials: [
      "ウイスキーバー運営10年以上",
      "コレクター人脈（国内50名以上）",
      "業界イベント・テイスティング会への定期参加",
    ],
  },
];

export default function AuthorPage() {
  const personSchemas = AUTHORS.map((author) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      "@type": "Organization",
      name: "PeatBid",
      url: "https://peatbid.com",
    },
  }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      {personSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/editorial/" className="hover:text-amber-dark transition-colors">編集部紹介</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">編集部メンバー</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">PeatBid 編集部メンバー</h1>
      <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月21日</p>

      <section className="prose max-w-none">
        <p className="mb-6">
          PeatBid 編集部は、ウイスキー業界・買取市場・オークション動向の専門知識を持つ複数の編集者・リサーチャー・外部監修パートナーで構成されています。
          各メンバーの経歴・専門領域は以下のとおりです。
        </p>

        <div className="space-y-6 mb-10 not-prose">
          {AUTHORS.map((author) => (
            <div key={author.name} className="bg-white border border-warm-border rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-amber/20 flex items-center justify-center text-amber-dark font-bold text-xl">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold mb-1">{author.name}</h2>
                  <p className="text-sm text-amber-dark">{author.role}</p>
                </div>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">{author.bio}</p>
              <div className="bg-cream rounded-lg p-4">
                <p className="text-xs font-bold text-warm-gray mb-2">実績・専門領域</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                  {author.credentials.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold mt-10 mb-4">編集部としての姿勢</h2>
        <p>
          PeatBid 編集部は、個人名ではなく <strong>編集部全体の合議制</strong> で記事を作成・公開しています。
          ウイスキー市場は変動が激しく、個人の判断より複数視点での相互レビューが重要だと考えるためです。
          記事内の数値情報・市場分析・業者評価は、リサーチ担当→編集長監修→ファクトチェック責任者の3段階チェックを経て公開されます。
        </p>

        <h2 className="font-display text-2xl font-bold mt-10 mb-4">関連ページ</h2>
        <ul>
          <li><Link href="/editorial/" className="text-amber-dark hover:text-burgundy underline">編集部紹介・編集ポリシー</Link></li>
          <li><Link href="/methodology/" className="text-amber-dark hover:text-burgundy underline">評価方法・データ源</Link></li>
        </ul>
      </section>
    </div>
  );
}
