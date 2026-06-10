import Link from "next/link";
import Image from "next/image";

const services = [
  {
    name: "ヒカカク！",
    method: "一括査定",
    description: "最大20社へ無料で一括査定。最高入札を効率よく比較できる",
    target: "とにかく最高値で売りたい人",
    url: "https://hikakaku.com",
  },
  {
    name: "バイセル",
    method: "出張/店頭/宅配",
    description: "東証グロース上場の大手。お酒・ウイスキー買取に注力",
    target: "信頼性とスピードを両立したい人",
    url: "https://www.buysell-onlineshop.jp/",
  },
  {
    name: "JOYLAB",
    method: "店頭/宅配/出張",
    description: "お酒買取専門・全国店舗展開。リアルタイム相場表を公開",
    target: "希少銘柄を専門店で売りたい人",
    url: "https://joylab.jp/",
  },
  {
    name: "リカスタ",
    method: "宅配/出張",
    description: "全国対応・無料査定。ジャパニーズウイスキー強化中",
    target: "宅配で完結したい人",
    url: "https://www.licasta.com/",
  },
];

const featuredArticles = [
  {
    href: "/articles/yamazaki-kaitori/",
    tag: "銘柄ガイド",
    title: "山崎の買取相場と高く売る方法【2026年最新】",
    description: "NV・12年・18年・25年・55年まで、山崎全グレードの最新買取相場と査定のポイントを徹底解説。",
    image: "/images/article-yamazaki.png",
    tags: ["山崎", "サントリー", "高価買取"],
  },
  {
    href: "/articles/hibiki-kaitori/",
    tag: "銘柄ガイド",
    title: "響の買取相場ガイド【2026年最新】17年・21年・30年",
    description: "響シリーズの最新買取価格、終売銘柄のプレミア相場、ノンエイジ・ハーモニーまでカバー。",
    image: "/images/article-hibiki.png",
    tags: ["響", "終売", "ハーモニー"],
  },
  {
    href: "/articles/hakushu-kaitori/",
    tag: "銘柄ガイド",
    title: "白州の買取相場ガイド — NV・12年・18年・25年",
    description: "森のウイスキー・白州。終売後の急騰相場と、状態別の査定額を徹底解説。",
    image: "/images/article-hakushu.png",
    tags: ["白州", "森のウイスキー", "プレミア"],
  },
  {
    href: "/articles/macallan-kaitori/",
    tag: "銘柄ガイド",
    title: "マッカランの買取相場 — 12年・18年・25年・30年",
    description: "スコッチの王・マッカラン。シェリーオーク長期熟成の希少ボトルを高値で売る方法。",
    image: "/images/article-macallan.png",
    tags: ["マッカラン", "スコッチ", "シェリーオーク"],
  },
  {
    href: "/articles/whisky-kaitori-souba/",
    tag: "相場情報",
    title: "ウイスキー買取相場一覧【2026年最新】",
    description: "ジャパニーズ・スコッチ・バーボン主要50銘柄の最新相場を一覧で公開。状態別の係数も解説。",
    image: "/images/article-souba.png",
    tags: ["相場", "一覧", "2026年"],
  },
  {
    href: "/articles/whisky-takaku-uru/",
    tag: "売却ガイド",
    title: "ウイスキーを高く売る5つのコツ",
    description: "相見積もり・付属品・売却タイミング・業者選び・状態保持。最高入札を引き出す実践テクニック。",
    image: "/images/article-takaku-uru.png",
    tags: ["高く売る", "コツ", "比較"],
  },
];

const stats = [
  { value: "500+", label: "対応銘柄" },
  { value: "毎日", label: "相場更新" },
  { value: "完全無料", label: "査定相談" },
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
            あなたのウイスキーに、
            <br />
            <span className="text-amber-light">最高入札を。</span>
          </h1>
          <p className="text-cream/85 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
            PeatBidは山崎・響・白州・マッカランなど主要銘柄の買取相場を毎日更新。
            <br className="hidden md:block" />
            信頼できる買取業者を一括比較し、最高値で売却するための実践ガイドをお届けします。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/articles/whisky-kaitori-souba/"
              className="amber-cta inline-flex items-center justify-center px-7 py-4 rounded-lg text-base shadow-lg"
            >
              今日の買取相場を見る
            </Link>
            <a
              href="https://hikakaku.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="bg-cream/10 hover:bg-cream/15 border border-amber/40 inline-flex items-center justify-center px-7 py-4 rounded-lg text-base text-cream transition-colors"
            >
              無料一括査定で最高値を調べる →
            </a>
          </div>
          <Link
            href="/souba-ranking/"
            className="inline-flex items-center gap-2 mt-5 text-amber-light text-sm font-medium hover:underline"
          >
            <span className="bg-amber/20 border border-amber/40 text-amber-light text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
              NEW
            </span>
            今週の値上がり・値下がり銘柄ランキングを公開中 →
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
            複数業者の入札を、シンプルに比べる。
          </h2>
          <p className="text-ink/80 leading-relaxed text-center mb-6">
            ジャパニーズウイスキーは2018年以降、コレクター需要と国際的評価で価格が高騰しています。
            <br className="hidden md:block" />
            山崎25年は<strong>17年で17倍</strong>、響30年は<strong>1本100万円超</strong>のプレミアがつくケースも珍しくありません。
          </p>
          <p className="text-ink/80 leading-relaxed text-center">
            一方で、買取業者によって査定額は<strong>数万円〜数十万円</strong>変わります。
            PeatBidは、相場の透明化と業者比較を通じて、あなたの一本に最も高い入札を引き出すお手伝いをします。
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
            おすすめ買取業者4選
          </h2>
          <p className="text-warm-gray text-sm text-center mb-10">
            ウイスキー買取に強い4社をPeatBid編集部が厳選。目的に合わせて使い分けるのがコツです。
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
                <p className="text-xs text-warm-gray">こんな人に: {s.target}</p>
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
            主要50銘柄の個別ページで、状態別の買取相場と査定ポイントを確認できます。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-display text-lg font-semibold text-amber-dark mb-3 pb-2 border-b border-amber/40">ジャパニーズウイスキー（30銘柄）</p>
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
              <p className="font-display text-lg font-semibold text-amber-dark mb-3 pb-2 border-b border-amber/40">スコッチウイスキー（20銘柄）</p>
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
            お住まいの地域での50銘柄の市場相場と地元業者を、47都道府県別にご確認いただけます。
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
            最高入札までの3ステップ
          </h2>
          <ol className="space-y-6">
            {[
              {
                step: "01",
                title: "売りたいボトルを確認",
                desc: "銘柄・年代・付属品（箱・冊子）・状態を整理。当サイトでは銘柄別の査定ポイントを丁寧に解説しています。",
              },
              {
                step: "02",
                title: "複数業者で見積もり",
                desc: "ヒカカク等の一括査定で最大20社に同時依頼。専門店（JOYLAB等）にも個別に見積もりを取ると差が出ます。",
              },
              {
                step: "03",
                title: "最高入札を選んで売却",
                desc: "提示額の手取り（手数料込み）で比較し、最も高い業者を選択。当日中の入金も可能です。",
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
            まずは無料で査定を比較
          </h2>
          <p className="text-cream/80 text-sm md:text-base mb-8">
            PeatBidの相場表と一括査定で、あなたの一本の最高入札を知ることから始めましょう。
            <br className="hidden md:block" />
            登録・査定はすべて無料です。
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
              相場表を確認する
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
