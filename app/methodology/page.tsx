import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "編集ポリシー・価格データ収集方法",
  description: "PeatBidの編集ポリシーと、買取相場データの収集方法・更新頻度・信頼性ガイドラインを公開しています。あわせて運営方針をご説明します。",
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
      <p className="text-warm-gray text-sm mb-8">最終更新: 2026年11月4日 / 編集: PeatBid編集部</p>

      <section className="prose">
        <p>
          本ページでは、PeatBidが買取相場を算出する方法・データソース・更新頻度・信頼性確保のための取り組みを公開します。
          読者が情報の正確性をご自身で評価できるよう、透明性の確保に努めています。
        </p>

        <h2>1. 価格データの収集方法</h2>

        <p>PeatBidの価格データは、以下の2つの情報源から収集しています。</p>

        <h3>① ヤフオクの落札データ</h3>
        <p>
          銘柄ごとに定めた検索語で、ヤフオクの過去180日の落札結果を毎週月曜に取得し、中央値と件数を集計しています。
          これは個人間取引の落札価格であり、買取店の査定額とは異なります。
        </p>

        <h3>② 買取店が公開している掲示価格</h3>
        <p>
          LINXAS、大黒屋、ストックラボ、リカスタ、ファイブニーズ等の買取店が自社サイトに公開している参考買取価格を、各店のページで確認して掲載しています。
          金額はページの表示のまま転記し、確認日と店舗側の更新日を併記します。掲載している銘柄は一部です。
        </p>

        <h3>海外オークション・業界紙について</h3>
        <p>
          海外オークションの落札結果や業界紙・専門メディアの調査は、相場の集計には使用していません。
          一部の記事で、落札額と出典を確認できた個別の結果のみ、出典URLとともに掲載しています。
        </p>

        <h2>2. 相場の集計手順</h2>
        <ol>
          <li>銘柄ごとに定めた検索語で、700mlボトルの落札結果を取得します</li>
          <li>別の商品が混入しやすい一部の銘柄は、出品タイトルで対象の商品に絞り込みます</li>
          <li>第1・第3四分位から四分位範囲の1.5倍を超えて離れた値を、外れ値として除外します</li>
          <li>残った落札価格の中央値と件数を算出します</li>
          <li>件数が20件未満の銘柄は、データ不足として中央値を掲載しません</li>
        </ol>
        <p>
          各ページの相場欄には、取得日とサンプル数（n）を記載しています。
          箱なし・開封済み等の状態別の金額は、中央値に業界一般の目安の割合を掛けた概算であり、状態ごとの落札データから算出したものではありません。
          実際の査定額は業者により異なります。
        </p>

        <h2>3. 更新頻度</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>データの種類</th><th>更新頻度</th></tr>
            </thead>
            <tbody>
              <tr><td>ヤフオク落札データの中央値</td><td>毎週月曜</td></tr>
              <tr><td>買取店の掲示価格</td><td>月替わりを目安に再確認（確認日をページに記載）</td></tr>
              <tr><td>都道府県別ページの業者表</td><td>各社公式の店舗一覧と順次照合</td></tr>
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
          <li><strong>手数料・キャンセル料</strong> — 無料か</li>
          <li><strong>信頼性</strong> — 上場・古物商許可・口コミ評判</li>
        </ol>

        <p>これら5項目を10点満点で評価し、合計点でランキングを作成しています。
        紹介料の有無は評価に影響しません。</p>

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
