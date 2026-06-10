import type { Metadata } from "next";
import Link from "next/link";

const URL = "https://peatbid.com/tier2/";

export const metadata: Metadata = {
  title: "地域別ウイスキー買取相場｜47都道府県から探す",
  description: "お住まいの都道府県からウイスキーの買取相場と地元対応業者を探せます。山崎・響・白州・マッカランなど50銘柄 × 47都道府県の市場相場（Yahoo中央値）と、出張・店頭・宅配対応の業者情報を掲載。",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1 flex-wrap">
          <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">地域別の買取相場</span></li>
        </ol>
      </nav>

      <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">地域別ウイスキー買取相場｜47都道府県から探す</h1>
      <p className="text-warm-gray text-sm mb-6">最終更新: 2026-05-22 / 監修: <Link href="/editorial/" className="text-amber-dark underline hover:text-burgundy">PeatBid編集部</Link></p>

      <section className="prose mb-8">
        <p>
          お住まいの都道府県を選ぶと、その地域での <strong>ウイスキー50銘柄の市場相場（Yahoo Auctions 過去180日落札中央値）</strong> と、
          出張・店頭・宅配に対応する地元業者を確認できます。市場相場は全国共通ですが、業者の買取査定額は地域・業者により差が出るため、
          複数業者の相見積もりが高値売却の近道です。
        </p>
        <p className="text-sm">
          銘柄から探したい方は <Link href="/articles/" className="text-amber-dark underline hover:text-burgundy">銘柄一覧（全50銘柄）</Link>、
          今週の値動きは <Link href="/souba-ranking/" className="text-amber-dark underline hover:text-burgundy">相場ランキング</Link> をご覧ください。
        </p>
      </section>

        <section className="mb-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4 border-b border-amber/30 pb-2">北海道地方</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/tier2/hokkaido/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">北海道</p>
            <p className="text-xs text-warm-gray mt-0.5">札幌ほか・50銘柄</p>
          </Link>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4 border-b border-amber/30 pb-2">東北地方</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/tier2/aomori/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">青森県</p>
            <p className="text-xs text-warm-gray mt-0.5">青森ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/iwate/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">岩手県</p>
            <p className="text-xs text-warm-gray mt-0.5">盛岡ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/miyagi/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">宮城県</p>
            <p className="text-xs text-warm-gray mt-0.5">仙台ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/akita/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">秋田県</p>
            <p className="text-xs text-warm-gray mt-0.5">秋田ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/yamagata/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">山形県</p>
            <p className="text-xs text-warm-gray mt-0.5">山形ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/fukushima/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">福島県</p>
            <p className="text-xs text-warm-gray mt-0.5">福島ほか・50銘柄</p>
          </Link>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4 border-b border-amber/30 pb-2">関東地方</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/tier2/ibaraki/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">茨城県</p>
            <p className="text-xs text-warm-gray mt-0.5">水戸ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/tochigi/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">栃木県</p>
            <p className="text-xs text-warm-gray mt-0.5">宇都宮ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/gunma/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">群馬県</p>
            <p className="text-xs text-warm-gray mt-0.5">前橋ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/saitama/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">埼玉県</p>
            <p className="text-xs text-warm-gray mt-0.5">さいたまほか・50銘柄</p>
          </Link>
          <Link href="/tier2/chiba/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">千葉県</p>
            <p className="text-xs text-warm-gray mt-0.5">千葉ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/tokyo/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">東京都</p>
            <p className="text-xs text-warm-gray mt-0.5">新宿ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/kanagawa/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">神奈川県</p>
            <p className="text-xs text-warm-gray mt-0.5">横浜ほか・50銘柄</p>
          </Link>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4 border-b border-amber/30 pb-2">中部地方</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/tier2/niigata/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">新潟県</p>
            <p className="text-xs text-warm-gray mt-0.5">新潟ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/toyama/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">富山県</p>
            <p className="text-xs text-warm-gray mt-0.5">富山ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/ishikawa/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">石川県</p>
            <p className="text-xs text-warm-gray mt-0.5">金沢ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/fukui/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">福井県</p>
            <p className="text-xs text-warm-gray mt-0.5">福井ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/yamanashi/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">山梨県</p>
            <p className="text-xs text-warm-gray mt-0.5">甲府ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/nagano/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">長野県</p>
            <p className="text-xs text-warm-gray mt-0.5">長野ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/gifu/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">岐阜県</p>
            <p className="text-xs text-warm-gray mt-0.5">岐阜ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/shizuoka/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">静岡県</p>
            <p className="text-xs text-warm-gray mt-0.5">静岡ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/aichi/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">愛知県</p>
            <p className="text-xs text-warm-gray mt-0.5">名古屋ほか・50銘柄</p>
          </Link>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4 border-b border-amber/30 pb-2">関西地方</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/tier2/mie/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">三重県</p>
            <p className="text-xs text-warm-gray mt-0.5">津ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/shiga/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">滋賀県</p>
            <p className="text-xs text-warm-gray mt-0.5">大津ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/kyoto/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">京都府</p>
            <p className="text-xs text-warm-gray mt-0.5">四条ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/osaka/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">大阪府</p>
            <p className="text-xs text-warm-gray mt-0.5">梅田ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/hyogo/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">兵庫県</p>
            <p className="text-xs text-warm-gray mt-0.5">神戸ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/nara/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">奈良県</p>
            <p className="text-xs text-warm-gray mt-0.5">奈良ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/wakayama/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">和歌山県</p>
            <p className="text-xs text-warm-gray mt-0.5">和歌山ほか・50銘柄</p>
          </Link>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4 border-b border-amber/30 pb-2">中国地方</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/tier2/tottori/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">鳥取県</p>
            <p className="text-xs text-warm-gray mt-0.5">鳥取ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/shimane/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">島根県</p>
            <p className="text-xs text-warm-gray mt-0.5">松江ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/okayama/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">岡山県</p>
            <p className="text-xs text-warm-gray mt-0.5">岡山ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/hiroshima/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">広島県</p>
            <p className="text-xs text-warm-gray mt-0.5">広島ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/yamaguchi/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">山口県</p>
            <p className="text-xs text-warm-gray mt-0.5">山口ほか・50銘柄</p>
          </Link>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4 border-b border-amber/30 pb-2">四国地方</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/tier2/tokushima/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">徳島県</p>
            <p className="text-xs text-warm-gray mt-0.5">徳島ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/kagawa/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">香川県</p>
            <p className="text-xs text-warm-gray mt-0.5">高松ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/ehime/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">愛媛県</p>
            <p className="text-xs text-warm-gray mt-0.5">松山ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/kochi/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">高知県</p>
            <p className="text-xs text-warm-gray mt-0.5">高知ほか・50銘柄</p>
          </Link>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4 border-b border-amber/30 pb-2">九州地方</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Link href="/tier2/fukuoka/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">福岡県</p>
            <p className="text-xs text-warm-gray mt-0.5">博多ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/saga/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">佐賀県</p>
            <p className="text-xs text-warm-gray mt-0.5">佐賀ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/nagasaki/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">長崎県</p>
            <p className="text-xs text-warm-gray mt-0.5">長崎ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/kumamoto/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">熊本県</p>
            <p className="text-xs text-warm-gray mt-0.5">熊本ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/oita/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">大分県</p>
            <p className="text-xs text-warm-gray mt-0.5">大分ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/miyazaki/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">宮崎県</p>
            <p className="text-xs text-warm-gray mt-0.5">宮崎ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/kagoshima/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">鹿児島県</p>
            <p className="text-xs text-warm-gray mt-0.5">鹿児島ほか・50銘柄</p>
          </Link>
          <Link href="/tier2/okinawa/" className="block bg-white border border-warm-border rounded-lg px-4 py-3 hover:shadow-md hover:border-amber/50 transition-all">
            <p className="font-bold text-sm text-foreground">沖縄県</p>
            <p className="text-xs text-warm-gray mt-0.5">那覇ほか・50銘柄</p>
          </Link>
          </div>
        </section>

      <div className="bg-cream/40 border border-amber/30 rounded-2xl p-6 my-10">
        <h2 className="font-display text-xl font-semibold mb-4 text-ink !border-none !pb-0 !mt-0">関連ページ</h2>
        <ul className="list-disc list-inside text-sm space-y-1 text-warm-gray">
          <li><Link href="/articles/" className="text-amber-dark hover:text-burgundy underline">銘柄一覧（全50銘柄の買取相場）</Link></li>
          <li><Link href="/articles/whisky-kaitori-souba/" className="text-amber-dark hover:text-burgundy underline">ウイスキー市場相場一覧</Link></li>
          <li><Link href="/articles/whisky-takaku-uru/" className="text-amber-dark hover:text-burgundy underline">ウイスキーを高く売るコツ</Link></li>
          <li><Link href="/souba-ranking/" className="text-amber-dark hover:text-burgundy underline">相場ランキング（今週の値上がり・値下がり）</Link></li>
        </ul>
      </div>
    </div>
  );
}
