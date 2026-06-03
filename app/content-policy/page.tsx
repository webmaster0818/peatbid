import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "記事制作ポリシー",
  description: "PeatBid（ピートビッド）の記事制作ポリシーです。執筆方針、情報の正確性、中立性、編集フロー、訂正方針について定めています。",
};

export default function ContentPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">記事制作ポリシー</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8">記事制作ポリシー</h1>

      <div className="space-y-8 text-sm leading-relaxed">
        <p>
          PeatBid（ピートビッド、以下「当サイト」）は、ウイスキー売却を検討する読者の意思決定に役立つ情報を、中立的かつ正確に提供することを使命としています。本ポリシーは、当サイトが記事を制作する際の方針・編集フロー・運用ルールを定めるものです。
        </p>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">1. 基本方針</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">ユーザーファースト</h3>
              <p>
                売却を検討する一人ひとりの状況に最適な情報を提供できるよう、読者目線で記事を企画・編集します。広告主の都合や売上目標を、コンテンツの質に優先させることはありません。
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">情報の正確性と最新性</h3>
              <p>
                買取相場・銘柄情報・業者情報については、出典が明確な事実情報のみを掲載します。掲載後も定期的に情報更新を行い、可能な限り最新の状態を維持するよう努めます。
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">中立性の維持</h3>
              <p>
                当サイトはアフィリエイト広告（PR）を含むメディアですが、業者からの紹介料の有無で評価・順位が変わることはありません。すべての業者は、編集部が定める統一基準で評価しています。掲載基準・評価方法はサイト内で明示します。
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">分かりやすさ</h3>
              <p>
                専門用語の使用は最小限にとどめ、初めて買取を検討する読者でも理解できる文章を心がけます。図表・比較表など視覚的な要素も活用し、要点を素早く把握できる構成を採用します。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">2. 記事制作フロー</h2>

          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>企画設計</strong>: 読者が何を知りたいか、どんな情報が意思決定に必要かを徹底的に調査したうえで、記事の構成・取り上げる論点を設計します。
            </li>
            <li>
              <strong>データ収集</strong>: 海外オークション（Sotheby&apos;s、Bonhams、Whisky Auctioneer等）の落札データ、買取業者公式の価格表、業界紙の調査データを収集し、相場の客観性を担保します。憶測・伝聞に基づく数値は使用しません。
            </li>
            <li>
              <strong>ライティング</strong>: 読み手が理解しやすい言葉選びを行い、結論ファースト・要点先出しの構成で執筆します。
            </li>
            <li>
              <strong>ファクトチェック</strong>: 公開前に、価格データ・銘柄スペック・歴史的事実・法規制情報の正確性を独立して検証します。
            </li>
            <li>
              <strong>公開</strong>: ファクトチェックを通過した記事のみを公開します。
            </li>
            <li>
              <strong>定期更新</strong>: 公開後も相場の変動・業者情報の変化を追跡し、定期的に内容を更新します。記事末尾に「最終更新日」を明示します。
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">3. データの出典と算出方法</h2>
          <p className="mb-3">
            買取相場の算出には、当サイト独自のルールを設けています:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Yahoo!オークション過去180日の落札中央値を一次データとして採用</li>
            <li>IQR（四分位範囲）による外れ値除去</li>
            <li>サンプル数 n &lt; 20 のものは「データ不足」として算出対象から除外</li>
            <li>業者買取査定額は、中古市場中央値の概ね 50〜70% 相当が目安とされますが、コンディション・年式・付属品・市場需要で大きく変動する旨を明示</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">4. PR・アフィリエイト広告の開示</h2>
          <p className="mb-3">
            当サイトは、買取業者からの紹介料収入により運営されています。記事内のリンクのうちアフィリエイトリンクには、明示的に「PR」「広告」等の表記を行い、第三者配信プログラムに該当する場合は <code>rel=&quot;sponsored&quot;</code> 属性を付与します。
          </p>
          <p>
            紹介料の有無は、編集部の評価・順位付けに一切影響しません。掲載候補業者のすべてに対し、同じ評価基準を適用しています。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">5. 引用と著作権</h2>
          <p className="mb-3">
            記事中で外部の情報を引用する場合、引用元を明示し、必要な範囲に限定します。画像については、自社撮影・ライセンス取得済素材・出典明示の二次利用のいずれかとし、出所不明の画像は使用しません。
          </p>
          <p>
            当サイトのオリジナルコンテンツの転載・引用は、出所を明記したうえで常識的な範囲においてご利用いただけます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">6. 訂正・更新の方針</h2>
          <p className="mb-3">
            記事公開後に誤りが判明した場合、または相場・業者情報に重要な変更があった場合、速やかに該当箇所を訂正・更新します。重大な誤りについては、訂正の事実・内容を明示する形で表示します。
          </p>
          <p>
            誤情報のご指摘・更新のご依頼は、お問い合わせフォームより常時受け付けています。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">7. 利益相反の管理</h2>
          <p>
            ウイスキー業界・買取業界の関係者が記事の執筆・監修に関わる場合、その関係性を記事内に開示します。記事の客観性を担保するため、関係者が直接利害を有する銘柄・業者についての評価記事は、第三者によるレビューを経て公開します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">8. 専門性の担保</h2>
          <p>
            記事の執筆・監修は、ウイスキー市場・買取市場・関連法規制について十分な知識と経験を有する編集部メンバーが担当します。詳細な体制は<Link href="/editorial/" className="text-amber-dark underline">編集部紹介</Link>をご参照ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">9. 本ポリシーの変更</h2>
          <p>
            本ポリシーは、社会情勢・法令の変更・サービス内容の変更等に応じて見直し、必要な改訂を行います。改訂後の内容は本ページ上で公表した時点から効力を生じます。
          </p>
        </section>

        <p className="text-xs text-warm-gray pt-4 border-t border-warm-border">
          制定日: 2026年5月<br />
          最終更新日: 2026年6月3日
        </p>
      </div>
    </div>
  );
}
