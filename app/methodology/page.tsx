import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "編集ポリシー・価格データ収集方法",
  description: "PeatBidの編集ポリシーと、買取相場データの収集方法・更新頻度・信頼性ガイドラインを公開しています。透明性のある運営方針で、読者の信頼に応えます。",
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/editorial/" className="hover:text-amber-dark transition-colors">編集部紹介</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">編集ポリシー</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">PeatBid 編集ポリシー</h1>
      <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月14日 / 監修: PeatBid編集部</p>

      <section className="prose">
        <p>
          本ページでは、PeatBidが買取相場を算出する方法・データソース・更新頻度・信頼性確保のための取り組みを公開します。
          読者が情報の正確性を自身で評価できるよう、透明性を最大限重視しています。
        </p>

        <h2>1. 価格データの収集方法</h2>

        <p>PeatBidの相場データは、以下の4つの情報源から多層的に収集・集約しています。</p>

        <h3>① 国内主要買取業者の公開買取価格</h3>
        <p>
          大黒屋、JOYLAB、ウイスキー王国、リカスタ、キャビンリカーなどの主要買取業者が公式サイトで公開している銘柄別買取価格を、定期的に収集します。
          これらの価格は実勢価格に近く、相場のベースラインとなります。
        </p>

        <h3>② 海外オークションの落札データ</h3>
        <p>
          Sotheby&apos;s、Bonhams、Whisky Auctioneer、Just Whisky Auctions、Whisky Hammerの公式公開アーカイブから、過去6〜12ヶ月の落札データを集計。
          これらは国際的な市場価格の指標として最も信頼性が高く、希少銘柄の価格基準となります。
        </p>

        <h3>③ 個人間二次流通の取引データ</h3>
        <p>
          ヤフオク、メルカリ等の個人間取引における落札価格を、サンプル抽出して参考データとします。
          ただし真贋確認の難しさ・出品者品質のばらつきから、業者買取価格よりも幅広いレンジで参照します。
        </p>

        <h3>④ 業界紙・専門メディアの調査</h3>
        <p>
          Rare Whisky 101、Knight Frank Luxury Investment Index、Whisky Magazine等の業界専門メディアの市場分析を、補完情報として参照します。
        </p>

        <h2>2. 価格算出の手順</h2>
        <ol>
          <li>4つのデータソースから、対象銘柄の直近の取引データを抽出</li>
          <li>異常値（極端な高値・安値）を除外（中央値±2σ範囲外）</li>
          <li>状態別（未開封・箱付き、箱なし、開封済み等）の係数を適用</li>
          <li>業者マージン・為替変動を考慮した買取価格のレンジを算出</li>
          <li>編集部内で複数人がクロスチェックして最終値を確定</li>
        </ol>

        <h2>3. 更新頻度</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>データの種類</th><th>更新頻度</th></tr>
            </thead>
            <tbody>
              <tr><td>主要50銘柄の相場</td><td>月次以上（市場変動が大きい時期は週次）</td></tr>
              <tr><td>状態別係数</td><td>四半期ごとに見直し</td></tr>
              <tr><td>業者比較表</td><td>四半期ごとに見直し</td></tr>
              <tr><td>終売・限定リリース情報</td><td>発生次第即座に反映</td></tr>
              <tr><td>記事本文・FAQ</td><td>年1〜2回の見直し</td></tr>
            </tbody>
          </table>
        </div>

        <p>各記事の最終更新日は、ページ上部に明記しています。</p>

        <h2>4. 業者評価の基準</h2>
        <p>PeatBidが買取業者を評価する際の5項目基準:</p>
        <ol>
          <li><strong>専門知識</strong> — お酒・ウイスキー専門の鑑定力があるか</li>
          <li><strong>査定スピード</strong> — 見積もり〜入金までの所要日数</li>
          <li><strong>査定額の透明性</strong> — 価格根拠・状態評価の説明があるか</li>
          <li><strong>手数料・キャンセル料</strong> — 完全無料か</li>
          <li><strong>信頼性</strong> — 上場・古物商許可・口コミ評判</li>
        </ol>

        <p>これら5項目を10点満点で評価し、合計点でランキングを作成しています。
        紹介料の有無は評価に一切影響しません。</p>

        <h2>5. アフィリエイト広告について</h2>
        <p>
          PeatBidは複数の買取業者と業務提携を結び、紹介により紹介料を受け取っています（アフィリエイト広告、いわゆる&quot;PR&quot;）。
          掲載業者は編集部独自の評価基準で選定していますが、紹介料の発生有無により記事内のリンク優先度・露出機会に影響する場合があります。
        </p>
        <p>
          ただし、業者ランキング・評価点は紹介料と完全に独立しており、編集部の判断で決定しています。
          掲載業者以外のお酒買取サービスも、客観的な評価対象として記事内で言及することがあります。
        </p>

        <h2>6. 誤情報の訂正方針</h2>
        <p>
          記事内に誤りや古い情報が含まれていることが判明した場合、24時間以内に訂正することを目標としています。
          訂正履歴は、対象記事のフッターに「訂正履歴」として記載します。
        </p>
        <p>
          読者から誤り報告を受けた場合の対応フロー:
        </p>
        <ol>
          <li><strong>受領</strong> — お問い合わせフォームより受領、編集部内に共有</li>
          <li><strong>検証</strong> — 1営業日以内に事実関係を独立検証</li>
          <li><strong>訂正</strong> — 検証結果が誤りを認定した場合、24時間以内に記事を訂正</li>
          <li><strong>記録</strong> — 訂正履歴を記事フッターに追記</li>
          <li><strong>返答</strong> — 報告者に対応結果を返信</li>
        </ol>

        <h2>7. 著作権・引用ポリシー</h2>
        <p>
          PeatBidの記事・画像は、当社の著作物または正当な権利を有する第三者の著作物です。
          無断転載・複製・改変は禁止されています。
        </p>
        <p>
          引用は著作権法第32条の範囲内（出典明記、主従関係明確化等）で行ってください。
          コンテンツの大規模な転載・商用利用をご希望の場合は、お問い合わせください。
        </p>

        <h2>8. 法令遵守</h2>
        <p>PeatBidは以下の法令・ガイドラインを遵守しています:</p>
        <ul>
          <li>古物営業法（買取業者の選定基準に反映）</li>
          <li>景品表示法・ステマ規制（2023年10月施行）</li>
          <li>特定商取引法</li>
          <li>個人情報保護法（2022年改正版）</li>
          <li>未成年者飲酒禁止法（20歳未満への買取案内禁止）</li>
          <li>酒類販売業免許関連法</li>
          <li>著作権法</li>
        </ul>

        <h2>関連情報</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
          <Link href="/editorial/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <span className="text-xs text-amber-dark font-bold">編集部</span>
            <p className="text-sm font-bold mt-1">PeatBid 編集部紹介</p>
          </Link>
          <Link href="/track-record/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow">
            <span className="text-xs text-amber-dark font-bold">サイト実績</span>
            <p className="text-sm font-bold mt-1">累計実績・統計データ</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
