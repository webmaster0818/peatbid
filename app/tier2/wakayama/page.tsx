import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "\u548c\u6b4c\u5c71\u770c\u3067\u30a6\u30a4\u30b9\u30ad\u30fc\u3092\u58f2\u308b\uff5c50\u9298\u67c4\u306e\u5e02\u5834\u76f8\u5834\u4e00\u89a7";
const DESC = "\u548c\u6b4c\u5c71\u770c\u3067\u30a6\u30a4\u30b9\u30ad\u30fc\u3092\u58f2\u5374\u3059\u308b\u306a\u3089\uff1f50\u9298\u67c4\u306e\u5e02\u5834\u76f8\u5834\uff08Yahoo\u4e2d\u592e\u5024\uff09\u3068\u5730\u5143\u696d\u8005\u3092\u4e00\u89a7\u8868\u793a\u3002\u5c71\u5d0e\u30fb\u97ff\u30fb\u767d\u5dde\u30fb\u30de\u30c3\u30ab\u30e9\u30f3\u7b49\u306e\u6700\u65b0\u67fb\u5b9a\u60c5\u5831\u3002";
const URL = "https://peatbid.com/tier2/wakayama/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1 flex-wrap">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/tier2/" className="hover:text-amber-dark transition-colors">地域別買取</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">和歌山県</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">和歌山県でウイスキーを売る｜50銘柄の市場相場一覧</h1>
      <p className="text-warm-gray text-sm mb-6">最終更新: 2026-05-22 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link></p>

      <section className="prose mb-8">
        <p>
          和歌山県でウイスキーを売却する際の、50銘柄ごとの市場相場（Yahoo Auctions 過去180日落札中央値）を一覧で確認できます。
          各銘柄ページで 和歌山県エリアの主要都市・地元業者・査定のポイントを詳しく解説しています。
        </p>
      </section>

      <h2 className="font-display text-xl md:text-2xl font-semibold mt-8 mb-4">和歌山県対応：50銘柄一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">

          <Link href="/tier2/wakayama/yamazaki-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎NV</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/yamazaki-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎12年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/yamazaki-18-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎18年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/yamazaki-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎25年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/yamazaki-55-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎55年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/hibiki-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">響NV</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/hibiki-17-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">響17年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/hibiki-21-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">響21年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/hibiki-30-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">響30年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/hakushu-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">白州NV</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/hakushu-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">白州12年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/hakushu-18-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">白州18年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/hakushu-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">白州25年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/taketsuru-pure-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">竹鶴ピュアモルト</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/taketsuru-17-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">竹鶴17年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/taketsuru-21-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">竹鶴21年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/taketsuru-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">竹鶴25年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/yoichi-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">余市NV</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/yoichi-10-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">余市10年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/yoichi-15-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">余市15年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/yoichi-20-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">余市20年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/miyagikyo-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">宮城峡NV</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/miyagikyo-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">宮城峡12年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/miyagikyo-15-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">宮城峡15年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/ichirosu-card-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">イチローズモルト カード</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/ichirosu-double-distilleries-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">イチローズモルト ダブルディスティラリーズ</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/ichirosu-mwr-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">イチローズモルト MWR</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/karuizawa-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">軽井沢12年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/karuizawa-30-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">軽井沢30年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/hanyu-card-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">羽生カードシリーズ</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/macallan-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン12年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/macallan-18-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン18年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/macallan-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン25年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/macallan-30-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン30年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/macallan-fine-rare-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン ファイン&レア</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/bowmore-18-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">ボウモア18年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/bowmore-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">ボウモア25年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/bowmore-blackbowmore-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">ブラックボウモア</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/springbank-15-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">スプリングバンク15年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/springbank-21-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">スプリングバンク21年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/laphroaig-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">ラフロイグ25年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/ardbeg-uigeadail-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">アードベッグ ウーガダール</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/ardbeg-corryvreckan-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">アードベッグ コリーヴレッカン</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/glenfiddich-30-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">グレンフィディック30年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/glenfarclas-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">グレンファークラス25年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/talisker-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">タリスカー25年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/balvenie-portwood-21-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">バルヴェニー ポートウッド21年</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/glenmorangie-signet-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">グレンモーレンジ シグネット</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/chichibu-the-first-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">秩父 ザ・ファースト</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
          <Link href="/tier2/wakayama/mars-komagatake-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マルス 駒ヶ岳</p>
            <p className="text-xs text-warm-gray">和歌山県での買取相場</p>
          </Link>
      </div>

      <h2 className="font-display text-xl md:text-2xl font-semibold mt-12 mb-4">他の都道府県を見る</h2>
      <p className="text-warm-gray text-sm mb-4">同じ関西地方の都道府県、または<Link href="/tier2/" className="text-amber-dark underline hover:text-burgundy">地域別買取の一覧</Link>から全47都道府県を確認できます。</p>
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/tier2/mie/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">三重県</Link>
        <Link href="/tier2/shiga/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">滋賀県</Link>
        <Link href="/tier2/kyoto/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">京都府</Link>
        <Link href="/tier2/osaka/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">大阪府</Link>
        <Link href="/tier2/hyogo/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">兵庫県</Link>
        <Link href="/tier2/nara/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">奈良県</Link>
        <Link href="/tier2/" className="inline-block bg-amber/15 border border-amber/40 rounded-full px-3 py-1 text-xs font-semibold text-amber-dark hover:bg-amber/25 transition-all">すべての都道府県 →</Link>
      </div>

      <p className="text-xs text-warm-gray mt-8">※本ページは 和歌山県 地域のウイスキー買取相場・業者情報を集約したガイドページです。市場相場は Yahoo Auctions 過去180日の落札中央値（IQR外れ値除去）に基づきます。実際の業者査定額は変動するため、最新の査定は LINXAS / バイセル / 福ちゃん / JOYLAB 各社ページでご確認ください。PRリンクを含みます。</p>
    </div>
  );
}
