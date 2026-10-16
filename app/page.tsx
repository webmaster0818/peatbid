import Link from "next/link";
import Image from "next/image";

const services = [
  {
    name: "ヒカカク！",
    method: "一括査定",
    description: "最大20社に無料で一括査定を依頼でき、複数社の査定額を比較できます",
    target: "複数社の査定額を比較したい方",
    url: "https://hikakaku.com",
  },
  {
    name: "バイセル",
    method: "出張/店頭/宅配",
    description: "東証グロース上場の買取大手で、お酒・ウイスキーの買取に対応しています",
    target: "出張買取を利用したい方",
    url: "https://buysell-kaitori.com/liquor/japanese-whisky/",
  },
  {
    name: "リカスタ",
    method: "宅配/出張/店頭",
    description: "宅配・出張・店頭で買取を受け付けています（送料・査定料・キャンセル料は無料）",
    target: "宅配で売却したい方",
    url: "https://www.licasta.com/",
  },
];

const featuredArticles = [
  {
    href: "/articles/yamazaki-kaitori/",
    tag: "銘柄ガイド",
    title: "山崎の買取相場と高く売る方法【2026年最新】",
    description: "NV・12年・18年・25年・55年まで、山崎の各グレードの買取相場と査定のポイントを解説しています。",
    image: "/images/article-yamazaki.png",
    tags: ["山崎", "サントリー", "高価買取"],
  },
  {
    href: "/articles/hibiki-kaitori/",
    tag: "銘柄ガイド",
    title: "響の買取相場ガイド【2026年最新】17年・21年・30年",
    description: "響シリーズの買取価格を、終売銘柄やノンエイジ（ジャパニーズハーモニー）も含めて掲載しています。",
    image: "/images/article-hibiki.png",
    tags: ["響", "終売", "ハーモニー"],
  },
  {
    href: "/articles/hakushu-kaitori/",
    tag: "銘柄ガイド",
    title: "白州の買取相場ガイド — NV・12年・18年・25年",
    description: "白州の各グレードについて、相場の推移と状態別の査定の目安を解説しています。",
    image: "/images/article-hakushu.png",
    tags: ["白州", "森のウイスキー", "プレミア"],
  },
  {
    href: "/articles/macallan-kaitori/",
    tag: "銘柄ガイド",
    title: "マッカランの買取相場 — 12年・18年・25年・30年",
    description: "マッカランの長期熟成ボトルについて、買取相場と売却時のポイントを解説しています。",
    image: "/images/article-macallan.png",
    tags: ["マッカラン", "スコッチ", "シェリーオーク"],
  },
  {
    href: "/articles/whisky-kaitori-souba/",
    tag: "相場情報",
    title: "ウイスキー買取相場一覧【2026年最新】",
    description: "ジャパニーズ・スコッチの主要銘柄の相場を一覧で掲載しています。状態別の目安もあわせて解説しています。",
    image: "/images/article-souba.png",
    tags: ["相場", "一覧", "2026年"],
  },
  {
    href: "/articles/whisky-takaku-uru/",
    tag: "売却ガイド",
    title: "ウイスキーを高く売る5つのコツ",
    description: "相見積もり・付属品・売却時期・業者選び・保管状態の5点について解説しています。",
    image: "/images/article-takaku-uru.png",
    tags: ["高く売る", "コツ", "比較"],
  },
];

const stats = [
  { value: "50", label: "掲載銘柄" },
  { value: "毎週", label: "相場更新" },
  { value: "無料", label: "当サイトの利用" },
  { value: "PR", label: "比較・送客サイト" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-peat text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/hero-main.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-peat via-peat/85 to-peat/40" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <p className="text-amber text-sm md:text-base font-medium tracking-widest uppercase mb-3">
            Whisky Buyback × Highest Bid
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight mb-5">
            ウイスキーの買取相場と
            <br />
            <span className="text-amber-light">買取業者を比較できます</span>
          </h1>
          <p className="text-cream/85 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            当サイトでは、山崎・響・白州・マッカランなど主要銘柄の買取相場を毎週更新しています。
            <br className="hidden md:block" />
            あわせて買取業者の特徴と、売却時に確認すべき点をご説明します。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/articles/whisky-kaitori-souba/"
              className="amber-cta inline-flex items-center justify-center px-7 py-4 rounded-lg text-base shadow-lg"
            >
              最新の買取相場を見る
            </Link>
            <a
              href="https://hikakaku.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="bg-cream/10 hover:bg-cream/15 border border-amber/40 inline-flex items-center justify-center px-7 py-4 rounded-lg text-base text-cream transition-colors"
            >
              無料の一括査定を申し込む →
            </a>
          </div>
          <Link
            href="/souba-ranking/"
            className="inline-flex items-center gap-2 mt-5 text-amber-light text-sm font-medium hover:underline"
          >
            <span className="bg-amber/20 border border-amber/40 text-amber-light text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
              NEW
            </span>
            今週の値上がり・値下がり銘柄ランキングを掲載しています →
          </Link>
          <p className="text-xs text-cream/50 mt-4">
            ※当サイトはアフィリエイト広告（PR）を利用しています
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-peat-light text-cream border-t border-amber/20">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl font-semibold text-amber">
                {s.value}
              </p>
              <p className="text-xs md:text-sm text-cream/70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="bg-parchment">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <p className="text-warm-gray text-sm tracking-widest uppercase mb-3 text-center">
            About PeatBid
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink text-center mb-6">
            相場の情報と買取業者の比較を掲載しています
          </h2>
          <p className="text-ink/80 leading-relaxed text-center mb-6">
            ジャパニーズウイスキーは2018年以降、コレクター需要と国際的な評価の高まりにより価格が上昇しています。
            <br className="hidden md:block" />
            山崎25年は<strong>17年で17倍</strong>、響30年は<strong>1本100万円超</strong>のプレミア価格が付く例もあります。
          </p>
          <p className="text-ink/80 leading-relaxed text-center">
            一方で、査定額は買取業者によって<strong>数万円〜数十万円</strong>異なる場合があります。
            当サイトでは、相場の情報と業者の比較を掲載し、売却先の検討を支援しています。
          </p>
        </div>
      </section>

      {/* Recommended partners */}
      <section className="bg-cream/40">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <p className="text-warm-gray text-sm tracking-widest uppercase mb-3 text-center">
            Recommended Buyback Partners
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink text-center mb-3">
            おすすめ買取業者3選
          </h2>
          <p className="text-warm-gray text-sm text-center mb-10">
            ウイスキーの買取に対応している3社を、PeatBid編集部が選定しました。目的に応じてご利用ください。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block bg-white border border-warm-border hover:border-amber rounded-xl p-6 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <p className="font-display text-2xl font-semibold text-ink">
                    {s.name}
                  </p>
                  <span className="text-xs text-amber-dark font-medium tracking-wider">
                    {s.method}
                  </span>
                </div>
                <p className="text-sm text-ink/80 leading-relaxed mb-3">
                  {s.description}
                </p>
                <p className="text-xs text-warm-gray">おすすめの方: {s.target}</p>
                <p className="text-xs text-burgundy mt-3">PR ・ 公式サイトへ →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured articles */}
      <section className="bg-parchment">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <p className="text-warm-gray text-sm tracking-widest uppercase mb-3 text-center">
            Featured Articles
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink text-center mb-10">
            買取ガイド
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredArticles.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="block bg-white border border-warm-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative w-full h-44 bg-peat">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-peat/40 to-transparent" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-amber-dark font-bold tracking-wider">
                    {a.tag}
                  </span>
                  <p className="text-sm md:text-base font-bold text-ink mt-2 mb-2 leading-snug">
                    {a.title}
                  </p>
                  <p className="text-xs text-warm-gray leading-relaxed mb-3">
                    {a.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] text-amber-dark bg-gold-bg border border-amber/30 px-2 py-0.5 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand directory */}
      <section className="bg-cream/40">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <p className="text-warm-gray text-sm tracking-widest uppercase mb-3 text-center">
            Brand Directory
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink text-center mb-3">
            銘柄から相場を探す
          </h2>
          <p className="text-warm-gray text-sm text-center mb-10">
            主要50銘柄の個別ページで、状態別の買取相場と査定のポイントをご確認いただけます。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-display text-lg font-semibold text-amber-dark mb-3 pb-2 border-b border-amber/40">ジャパニーズウイスキー（32銘柄）</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                {[
                  { name: "山崎 NV", slug: "yamazaki-nv-kaitori" },
                  { name: "山崎12年", slug: "yamazaki-12-kaitori" },
                  { name: "山崎18年", slug: "yamazaki-18-kaitori" },
                  { name: "山崎25年", slug: "yamazaki-25-kaitori" },
                  { name: "山崎55年", slug: "yamazaki-55-kaitori" },
                  { name: "響 NV", slug: "hibiki-nv-kaitori" },
                  { name: "響17年", slug: "hibiki-17-kaitori" },
                  { name: "響21年", slug: "hibiki-21-kaitori" },
                  { name: "響30年", slug: "hibiki-30-kaitori" },
                  { name: "白州 NV", slug: "hakushu-nv-kaitori" },
                  { name: "白州12年", slug: "hakushu-12-kaitori" },
                  { name: "白州18年", slug: "hakushu-18-kaitori" },
                  { name: "白州25年", slug: "hakushu-25-kaitori" },
                  { name: "竹鶴ピュア", slug: "taketsuru-pure-kaitori" },
                  { name: "竹鶴17年", slug: "taketsuru-17-kaitori" },
                  { name: "竹鶴21年", slug: "taketsuru-21-kaitori" },
                  { name: "竹鶴25年", slug: "taketsuru-25-kaitori" },
                  { name: "余市 NV", slug: "yoichi-nv-kaitori" },
                  { name: "余市10年", slug: "yoichi-10-kaitori" },
                  { name: "余市15年", slug: "yoichi-15-kaitori" },
                  { name: "余市20年", slug: "yoichi-20-kaitori" },
                  { name: "宮城峡 NV", slug: "miyagikyo-nv-kaitori" },
                  { name: "宮城峡12年", slug: "miyagikyo-12-kaitori" },
                  { name: "宮城峡15年", slug: "miyagikyo-15-kaitori" },
                  { name: "イチローズMWR", slug: "ichirosu-mwr-kaitori" },
                  { name: "イチローズ DD", slug: "ichirosu-double-distilleries-kaitori" },
                  { name: "イチローズ カード", slug: "ichirosu-card-kaitori" },
                  { name: "軽井沢12年", slug: "karuizawa-12-kaitori" },
                  { name: "軽井沢30年", slug: "karuizawa-30-kaitori" },
                  { name: "羽生カード", slug: "hanyu-card-kaitori" },
                  { name: "秩父ザファースト", slug: "chichibu-the-first-kaitori" },
                  { name: "マルス駒ヶ岳", slug: "mars-komagatake-kaitori" },
                ].map((b) => (
                  <Link key={b.slug} href={`/articles/${b.slug}/`} className="text-ink/80 hover:text-amber-dark hover:underline transition-colors">
                    {b.name} →
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="font-display text-lg font-semibold text-amber-dark mb-3 pb-2 border-b border-amber/40">スコッチウイスキー（18銘柄）</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                {[
                  { name: "マッカラン12年", slug: "macallan-12-kaitori" },
                  { name: "マッカラン18年", slug: "macallan-18-kaitori" },
                  { name: "マッカラン25年", slug: "macallan-25-kaitori" },
                  { name: "マッカラン30年", slug: "macallan-30-kaitori" },
                  { name: "マッカラン F&R", slug: "macallan-fine-rare-kaitori" },
                  { name: "ボウモア18年", slug: "bowmore-18-kaitori" },
                  { name: "ボウモア25年", slug: "bowmore-25-kaitori" },
                  { name: "ブラックボウモア", slug: "bowmore-blackbowmore-kaitori" },
                  { name: "スプリングバンク15年", slug: "springbank-15-kaitori" },
                  { name: "スプリングバンク21年", slug: "springbank-21-kaitori" },
                  { name: "ラフロイグ25年", slug: "laphroaig-25-kaitori" },
                  { name: "アードベッグ ウーガダール", slug: "ardbeg-uigeadail-kaitori" },
                  { name: "アードベッグ コリーヴレッカン", slug: "ardbeg-corryvreckan-kaitori" },
                  { name: "グレンフィディック30年", slug: "glenfiddich-30-kaitori" },
                  { name: "グレンファークラス25年", slug: "glenfarclas-25-kaitori" },
                  { name: "タリスカー25年", slug: "talisker-25-kaitori" },
                  { name: "バルヴェニー ポート21年", slug: "balvenie-portwood-21-kaitori" },
                  { name: "グレンモーレンジ シグネット", slug: "glenmorangie-signet-kaitori" },
                ].map((b) => (
                  <Link key={b.slug} href={`/articles/${b.slug}/`} className="text-ink/80 hover:text-amber-dark hover:underline transition-colors">
                    {b.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center mt-8 flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center items-center">
            <Link href="/articles/" className="text-amber-dark font-semibold underline underline-offset-4 hover:text-burgundy transition-colors">
              全50銘柄の相場一覧を見る →
            </Link>
            <Link href="/tier2/" className="text-amber-dark font-semibold underline underline-offset-4 hover:text-burgundy transition-colors">
              地域別（47都道府県）の買取相場を見る →
            </Link>
          </p>
        </div>
      </section>

      {/* 都道府県別ガイド — 8地方アコーディオン */}
      <section className="bg-cream/40 border-t border-warm-border">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <p className="text-warm-gray text-sm tracking-widest uppercase mb-3 text-center">
            Regional Guide
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink text-center mb-3">
            都道府県別の市場相場ガイド
          </h2>
          <p className="text-warm-gray text-sm text-center mb-10">
            50銘柄の市場相場と地域の買取業者を、47都道府県別にご確認いただけます。
          </p>
          <div className="space-y-3">
            {[
              { id: "hokkaido_tohoku", label: "北海道・東北", prefs: [["hokkaido", "北海道"], ["aomori", "青森県"], ["iwate", "岩手県"], ["miyagi", "宮城県"], ["akita", "秋田県"], ["yamagata", "山形県"], ["fukushima", "福島県"]] },
              { id: "kanto", label: "関東", prefs: [["ibaraki", "茨城県"], ["tochigi", "栃木県"], ["gunma", "群馬県"], ["saitama", "埼玉県"], ["chiba", "千葉県"], ["tokyo", "東京都"], ["kanagawa", "神奈川県"]] },
              { id: "chubu", label: "中部", prefs: [["niigata", "新潟県"], ["toyama", "富山県"], ["ishikawa", "石川県"], ["fukui", "福井県"], ["yamanashi", "山梨県"], ["nagano", "長野県"], ["gifu", "岐阜県"], ["shizuoka", "静岡県"], ["aichi", "愛知県"]] },
              { id: "kinki", label: "近畿", prefs: [["mie", "三重県"], ["shiga", "滋賀県"], ["kyoto", "京都府"], ["osaka", "大阪府"], ["hyogo", "兵庫県"], ["nara", "奈良県"], ["wakayama", "和歌山県"]] },
              { id: "chugoku_shikoku", label: "中国・四国", prefs: [["tottori", "鳥取県"], ["shimane", "島根県"], ["okayama", "岡山県"], ["hiroshima", "広島県"], ["yamaguchi", "山口県"], ["tokushima", "徳島県"], ["kagawa", "香川県"], ["ehime", "愛媛県"], ["kochi", "高知県"]] },
              { id: "kyushu_okinawa", label: "九州・沖縄", prefs: [["fukuoka", "福岡県"], ["saga", "佐賀県"], ["nagasaki", "長崎県"], ["kumamoto", "熊本県"], ["oita", "大分県"], ["miyazaki", "宮崎県"], ["kagoshima", "鹿児島県"], ["okinawa", "沖縄県"]] },
            ].map((region) => (
              <details key={region.id} className="bg-white border border-warm-border rounded-xl overflow-hidden group">
                <summary className="flex justify-between items-center p-5 font-bold cursor-pointer hover:bg-cream">
                  <span className="text-ink">{region.label}<span className="text-warm-gray text-sm font-normal ml-2">（{region.prefs.length}都道府県）</span></span>
                  <svg className="w-5 h-5 text-warm-gray faq-arrow transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 pt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {region.prefs.map(([slug, label]) => (
                    <Link key={slug} href={`/tier2/${slug}/`} className="bg-cream/60 hover:bg-cream rounded-lg px-3 py-2 text-sm text-ink hover:text-amber-dark transition-colors border border-warm-border">
                      {label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-parchment">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <p className="text-warm-gray text-sm tracking-widest uppercase mb-3 text-center">
            How It Works
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink text-center mb-10">
            売却までの3ステップ
          </h2>
          <ol className="space-y-6">
            {[
              {
                step: "01",
                title: "売却するボトルを確認する",
                desc: "銘柄・熟成年数・付属品（箱・冊子）・状態を確認します。当サイトでは銘柄別の査定のポイントを解説しています。",
              },
              {
                step: "02",
                title: "相場を確認し、査定を依頼する",
                desc: "当サイトの相場ページで目安を確認したうえで、一括査定や複数の買取業者に査定を依頼します。",
              },
              {
                step: "03",
                title: "査定額を比較して売却する",
                desc: "手数料を差し引いた受取額で比較し、売却先を決定します。入金の時期は業者により異なります。",
              },
            ].map((s) => (
              <li key={s.step} className="flex gap-5 items-start">
                <span className="flex-shrink-0 font-display text-3xl font-semibold text-amber-dark w-12">
                  {s.step}
                </span>
                <div className="flex-1 border-l-2 border-amber/30 pl-5">
                  <p className="font-bold text-lg text-ink mb-1">{s.title}</p>
                  <p className="text-sm text-ink/80 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="bg-peat text-cream">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-amber">
            無料の一括査定のご案内
          </h2>
          <p className="text-cream/80 text-sm md:text-base mb-8">
            当サイトの相場表で目安を確認したうえで、一括査定をご利用いただけます。
            <br className="hidden md:block" />
            一括査定の申込み・査定は無料です。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://hikakaku.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="amber-cta inline-flex items-center justify-center px-8 py-4 rounded-lg shadow-lg"
            >
              無料で一括査定を依頼する
            </a>
            <Link
              href="/articles/whisky-kaitori-souba/"
              className="bg-cream/10 hover:bg-cream/15 border border-amber/40 inline-flex items-center justify-center px-8 py-4 rounded-lg text-cream transition-colors"
            >
              相場表を見る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
