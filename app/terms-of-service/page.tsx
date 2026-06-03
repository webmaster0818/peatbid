import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約",
  description: "PeatBid（ピートビッド）の利用規約です。サービスの目的、禁止事項、知的財産権、免責事項、損害賠償、合意管轄について定めています。",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">利用規約</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-8">利用規約</h1>

      <div className="space-y-8 text-sm leading-relaxed">
        <p>
          この利用規約（以下「本規約」）は、PeatBid（ピートビッド、以下「当サイト」）の利用条件を定めるものです。当サイトをご利用いただく際は、本規約に同意したものとみなします。
        </p>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第1条（本サービスの目的）</h2>
          <p>
            当サイトは、ウイスキー買取業者の比較・紹介および買取相場情報の提供を目的とする情報メディアサービス（以下「本サービス」）を運営します。利用者が適切な業者を選択し、納得感ある売却を実現できるよう、中立的な情報を発信します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第2条（本規約の適用）</h2>
          <p className="mb-3">
            当サイトは本規約に従い本サービスを提供します。サイト内に掲示する各種ルール・お知らせ・<Link href="/privacy-policy/" className="text-amber-dark underline">プライバシーポリシー</Link>は本規約の一部を構成します。
          </p>
          <p>
            本規約と各種ルール・お知らせとの間に矛盾がある場合は、別途定めがある場合を除き、本規約が優先して適用されます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第3条（利用の拒否）</h2>
          <p className="mb-3">
            以下に該当する場合、当サイトは利用者による本サービスの利用を拒否することがあります:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>本規約に違反する場合</li>
            <li>虚偽の情報・記載漏れのある情報を提供した場合</li>
            <li>営業・広告目的での利用</li>
            <li>過去に利用拒否を受けた経歴がある場合</li>
            <li>その他、当サイトが不適切と判断する場合</li>
          </ul>
          <p className="mt-3">
            当サイトはこれらの措置の理由を開示する義務を負わず、本措置に起因する損害について責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第4条（本規約の変更）</h2>
          <p>
            当サイトは、利用者の事前承諾を得ることなく本規約を変更できるものとし、変更後の本規約はサイト上での掲載をもって通知に代えます。変更後の本サービスの利用は、変更後の本規約に同意したものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第5条（連絡手段）</h2>
          <p>
            当サイトから利用者への連絡は、メールその他当サイトが定める方法で行います。発信時点で連絡の効力が生じるものとします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第6条（取引の当事者）</h2>
          <p>
            ウイスキーの査定・買取契約は、利用者と掲載買取業者との間で直接行われます。当サイトは当事者となるものではなく、査定額・契約条件・取引内容について責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第7条（業務の委託）</h2>
          <p>
            当サイトは、本サービスの運営に必要な業務の一部または全部を第三者に委託することができます。委託先に対しては、本規約と同等の責任をもって管理します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第8条（禁止事項）</h2>
          <p className="mb-3">利用者は、以下の行為を行ってはなりません:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>法令または公序良俗に違反する行為</li>
            <li>虚偽の情報を送信する行為</li>
            <li>他の利用者の本サービス利用を妨害する行為</li>
            <li>掲載買取業者への不正な働きかけ</li>
            <li>本サービスへの不正アクセス・クラッキング</li>
            <li>スパム送信またはこれに類する行為</li>
            <li>本サービスの運営を妨害する行為</li>
            <li>本サービスのソフトウェアの解析・リバースエンジニアリング</li>
            <li>当サイトまたは第三者の知的財産権・プライバシー権を侵害する行為</li>
            <li>当サイト・他利用者・第三者に対する誹謗中傷</li>
            <li>本サービスを営業・広告目的で利用する行為</li>
            <li>政治活動・宗教活動を目的とする行為</li>
            <li>その他、当サイトが不適切と判断する行為</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第9条（知的財産権）</h2>
          <p>
            本サービスに関する一切の知的財産権（記事・画像・データ・デザイン・ロゴ・プログラム等）は、当サイトまたは正当な権利を有する第三者に帰属します。本サービスの利用許諾は、知的財産権の使用許諾を意味するものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第10条（本サービスの停止・中断）</h2>
          <p className="mb-3">以下の場合、当サイトは事前通知なく本サービスを停止または中断できます:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>システム点検・保守の緊急対応が必要な場合</li>
            <li>サーバー・通信回線の事故</li>
            <li>地震・落雷・火災等の不可抗力</li>
            <li>掲載買取業者のトラブル・仕様変更</li>
            <li>その他、必要と判断される場合</li>
          </ul>
          <p className="mt-3">当サイトは停止・中断による損害について責任を負いません。</p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第11条（保証の否認・免責事項）</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>本サービスは「現状有姿」で提供され、特定目的への適合性等を保証しません</li>
            <li>掲載情報（買取相場・業者情報・銘柄情報等）の正確性・最新性について保証しません</li>
            <li>掲載業者との取引トラブルについて責任を負いません</li>
            <li>利用者の入力データの誤りに起因する損害について責任を負いません</li>
            <li>利用者間のトラブル解決の責任を負いません</li>
            <li>本サービスの停止・中断・内容変更による損害について責任を負いません</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第12条（個人情報の取扱い）</h2>
          <p>
            利用者の個人情報は、別途定める<Link href="/privacy-policy/" className="text-amber-dark underline">プライバシーポリシー</Link>に従い適切に取り扱います。利用者は、提携買取業者への個人情報の提供について、本規約への同意をもって同意したものとみなします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第13条（秘密保持）</h2>
          <p>
            当サイトから秘密保持義務を伴って提供された情報について、利用者は秘密保持義務を負います（当サイトが書面により承諾した場合を除く）。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第14条（損害賠償責任）</h2>
          <p>
            利用者が本規約に違反し、または不正・違法な行為により当サイトに損害を与えた場合、当該損害（弁護士費用を含む）は利用者の負担とします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第15条（反社会的勢力の排除）</h2>
          <p>
            反社会的勢力に該当する者は本サービスを利用できません。利用者が反社会的勢力に該当すると当サイトが判断した場合、本サービスの提供を停止し、停止による損害について責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第16条（免責の制限）</h2>
          <p>
            当サイトが利用者に対して責任を負う場合であっても、その賠償範囲は現実に発生した直接かつ通常の損害に限るものとし、特別損害・派生損害・逸失利益等は対象外とします。賠償額は、当該事案に関連する利用者の取引額の総額を上限とします。ただし、当サイトに故意または重過失が認められる場合はこの限りではありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第17条（分離可能性）</h2>
          <p>
            本規約の一部が違法・無効と判断された場合でも、当該部分のみを必要最小限の範囲で読み替えて適用するものとし、その他の規定は引き続き有効に存続します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第18条（不可抗力）</h2>
          <p>
            天災・戦争・テロ・政府の規制等の不可抗力に起因する損害について、当サイトは責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第19条（合意管轄）</h2>
          <p>
            本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 border-b border-warm-border pb-2">第20条（協議）</h2>
          <p>
            本規約の解釈について疑義が生じた場合、当サイトと利用者は誠実に協議し、円満な解決を図るものとします。
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
