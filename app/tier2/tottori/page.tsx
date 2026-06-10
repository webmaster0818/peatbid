import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "\u9ce5\u53d6\u770c\u3067\u30a6\u30a4\u30b9\u30ad\u30fc\u3092\u58f2\u308b\uff5c50\u9298\u67c4\u306e\u5e02\u5834\u76f8\u5834\u4e00\u89a7";
const DESC = "\u9ce5\u53d6\u770c\u3067\u30a6\u30a4\u30b9\u30ad\u30fc\u3092\u58f2\u5374\u3059\u308b\u306a\u3089\uff1f50\u9298\u67c4\u306e\u5e02\u5834\u76f8\u5834\uff08Yahoo\u4e2d\u592e\u5024\uff09\u3068\u5730\u5143\u696d\u8005\u3092\u4e00\u89a7\u8868\u793a\u3002\u5c71\u5d0e\u30fb\u97ff\u30fb\u767d\u5dde\u30fb\u30de\u30c3\u30ab\u30e9\u30f3\u7b49\u306e\u6700\u65b0\u67fb\u5b9a\u60c5\u5831\u3002";
const URL = "https://peatbid.com/tier2/tottori/";

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
          <li><span className="text-foreground">鳥取県</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">鳥取県でウイスキーを売る｜50銘柄の市場相場一覧</h1>
      <p className="text-warm-gray text-sm mb-6">最終更新: 2026-05-22 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link></p>

      <section className="prose mb-8">
        <p>
          鳥取県でウイスキーを売却する際の、50銘柄ごとの市場相場（Yahoo Auctions 過去180日落札中央値）を一覧で確認できます。
          各銘柄ページで 鳥取県エリアの主要都市・地元業者・査定のポイントを詳しく解説しています。
        </p>
      </section>

      <h2 className="font-display text-xl md:text-2xl font-semibold mt-8 mb-4">鳥取県対応：50銘柄一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">

          <Link href="/tier2/tottori/yamazaki-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎NV</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/yamazaki-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎12年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/yamazaki-18-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎18年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/yamazaki-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎25年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/yamazaki-55-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">山崎55年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/hibiki-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">響NV</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/hibiki-17-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">響17年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/hibiki-21-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">響21年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/hibiki-30-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">響30年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/hakushu-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">白州NV</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/hakushu-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">白州12年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/hakushu-18-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">白州18年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/hakushu-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">白州25年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/taketsuru-pure-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">竹鶴ピュアモルト</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/taketsuru-17-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">竹鶴17年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/taketsuru-21-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">竹鶴21年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/taketsuru-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">竹鶴25年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/yoichi-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">余市NV</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/yoichi-10-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">余市10年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/yoichi-15-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">余市15年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/yoichi-20-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">余市20年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/miyagikyo-nv-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">宮城峡NV</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/miyagikyo-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">宮城峡12年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/miyagikyo-15-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">宮城峡15年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/ichirosu-card-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">イチローズモルト カード</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/ichirosu-double-distilleries-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">イチローズモルト ダブルディスティラリーズ</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/ichirosu-mwr-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">イチローズモルト MWR</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/karuizawa-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">軽井沢12年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/karuizawa-30-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">軽井沢30年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/hanyu-card-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">羽生カードシリーズ</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/macallan-12-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン12年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/macallan-18-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン18年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/macallan-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン25年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/macallan-30-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン30年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/macallan-fine-rare-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マッカラン ファイン&レア</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/bowmore-18-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">ボウモア18年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/bowmore-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">ボウモア25年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/bowmore-blackbowmore-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">ブラックボウモア</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/springbank-15-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">スプリングバンク15年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/springbank-21-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">スプリングバンク21年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/laphroaig-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">ラフロイグ25年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/ardbeg-uigeadail-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">アードベッグ ウーガダール</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/ardbeg-corryvreckan-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">アードベッグ コリーヴレッカン</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/glenfiddich-30-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">グレンフィディック30年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/glenfarclas-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">グレンファークラス25年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/talisker-25-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">タリスカー25年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/balvenie-portwood-21-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">バルヴェニー ポートウッド21年</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/glenmorangie-signet-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">グレンモーレンジ シグネット</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/chichibu-the-first-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">秩父 ザ・ファースト</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
          <Link href="/tier2/tottori/mars-komagatake-kaitori/" className="block bg-white border border-warm-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <p className="font-bold text-sm text-foreground mb-1">マルス 駒ヶ岳</p>
            <p className="text-xs text-warm-gray">鳥取県での買取相場</p>
          </Link>
      </div>

      <h2 className="font-display text-xl md:text-2xl font-semibold mt-12 mb-4">他の都道府県を見る</h2>
      <p className="text-warm-gray text-sm mb-4">同じ中国地方の都道府県、または<Link href="/tier2/" className="text-amber-dark underline hover:text-burgundy">地域別買取の一覧</Link>から全47都道府県を確認できます。</p>
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/tier2/shimane/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">島根県</Link>
        <Link href="/tier2/okayama/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">岡山県</Link>
        <Link href="/tier2/hiroshima/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">広島県</Link>
        <Link href="/tier2/yamaguchi/" className="inline-block bg-white border border-warm-border rounded-full px-3 py-1 text-xs font-semibold text-foreground hover:border-amber/50 hover:shadow-sm transition-all">山口県</Link>
        <Link href="/tier2/" className="inline-block bg-amber/15 border border-amber/40 rounded-full px-3 py-1 text-xs font-semibold text-amber-dark hover:bg-amber/25 transition-all">すべての都道府県 →</Link>
      </div>

      <p className="text-xs text-warm-gray mt-8">※本ページは 鳥取県 地域のウイスキー買取相場・業者情報を集約したガイドページです。市場相場は Yahoo Auctions 過去180日の落札中央値（IQR外れ値除去）に基づきます。実際の業者査定額は変動するため、最新の査定は LINXAS / バイセル / 福ちゃん / JOYLAB 各社ページでご確認ください。PRリンクを含みます。</p>
    </div>
  );
}
