import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "運営者情報",
  description: "PeatBid（ピートビッド）の運営者情報・サイト概要・編集方針をご案内します。",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">運営者情報</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8">運営者情報</h1>

      <section className="space-y-8 text-sm leading-relaxed">
        <div>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">サイト概要</h2>
          <table className="w-full">
            <tbody className="divide-y divide-warm-border">
              <tr>
                <th className="py-3 pr-4 text-left font-medium w-32 align-top">サイト名</th>
                <td className="py-3">PeatBid（ピートビッド）</td>
              </tr>
              <tr>
                <th className="py-3 pr-4 text-left font-medium align-top">URL</th>
                <td className="py-3">https://peatbid.com</td>
              </tr>
              <tr>
                <th className="py-3 pr-4 text-left font-medium align-top">運営</th>
                <td className="py-3">PeatBid編集部</td>
              </tr>
              <tr>
                <th className="py-3 pr-4 text-left font-medium align-top">設立</th>
                <td className="py-3">2026年5月</td>
              </tr>
              <tr>
                <th className="py-3 pr-4 text-left font-medium align-top">お問い合わせ</th>
                <td className="py-3">サイト内のお問い合わせフォームよりご連絡ください。</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">サイトの目的</h2>
          <p className="mb-3">
            「PeatBid」は、ウイスキーの売却を検討している方に向けて、公正で分かりやすい買取相場情報と業者比較を提供するWebメディアです。
          </p>
          <p className="mb-3">
            ジャパニーズウイスキー・スコッチ・バーボン・アイリッシュ等の市場に精通した編集部メンバーが、最新の相場データ、買取業者の特徴、希少ボトルの査定基準、高く売るためのノウハウを多角的な視点から発信しています。
          </p>
          <p>
            読者一人ひとりの状況に合った最適な売却方法が見つかるよう、中立的な立場で記事を作成しています。
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">広告・アフィリエイトについて</h2>
          <p className="mb-3">
            当サイトは、アフィリエイトプログラム（PR）に参加しています。記事内のリンクを通じてサービスにお申し込みいただいた場合、当サイトに紹介報酬が発生することがあります。
          </p>
          <p>
            ただし、広告報酬の有無がランキングや評価に影響することはありません。すべての記事は編集部の独自基準に基づいて作成しています。
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">編集方針</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>事実に基づいた正確な情報を提供します</li>
            <li>メリットだけでなくデメリットも公平に記載します</li>
            <li>定期的にオークション相場データを更新し、最新の相場を反映します</li>
            <li>読者の利益を最優先に記事を作成します</li>
            <li>古物営業法・景品表示法・酒類販売業免許関連法を遵守します</li>
            <li>未成年（20歳未満）の方に対しては酒類関連の取引を案内しません</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">免責事項</h2>
          <p className="mb-3">
            PeatBidはウイスキー買取業者の比較・紹介を行うメディアであり、当社自身が買取業者として査定や買取契約の当事者になることはありません。
          </p>
          <p>
            実際の買取査定および買取契約は、お客様と各買取業者との間で直接行われます。査定額の決定・買取の成否について、当社は責任を負いません。
          </p>
        </div>
      </section>
    </div>
  );
}
