import Link from "next/link";
import MarketPriceChart from "./MarketPriceChart";

type LatestSnapshot = {
  date: string;
  median_jpy: number | null;
  sample_n: number | null;
  raw_n: number | null;
  insufficient?: boolean;
};

type PriceHistoryPoint = {
  date: string;
  median_jpy: number | null;
  sample_n: number | null;
  raw_n?: number | null;
};

type MarketPriceData = {
  slug: string;
  label: string;
  source: string;
  methodology: string;
  query_used: string;
  history: PriceHistoryPoint[];
  latest: LatestSnapshot;
  note?: string;
};

type Props = {
  data: MarketPriceData;
};

const DEALER_LINKS: { name: string; href: string }[] = [
  { name: "LINXAS", href: "https://linxas.shop/whiskey/" },
  { name: "バイセル", href: "https://www.buysell-japan.jp/sake/" },
  { name: "福ちゃん", href: "https://fukuchan.co.jp/oshina/sake/" },
  { name: "JOYLAB", href: "https://www.joylab.jp/sake/" },
];

function formatJPY(value: number | null): string {
  if (value == null) return "—";
  return `¥${value.toLocaleString("ja-JP")}`;
}

export default function MarketPriceCard({ data }: Props) {
  const { latest, query_used, history, label } = data;
  const insufficient = latest.insufficient || latest.median_jpy == null;
  const points = history.length;

  return (
    <section className="not-prose my-8 bg-white border-2 border-amber/30 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-5 py-4" style={{ background: "linear-gradient(to right, #1B1410, #2A2018)", color: "#F5EDD9" }}>
        <p className="text-xs mb-0.5" style={{ color: "#E0AA52" }}>市場相場（Yahoo Auctions 過去180日中央値）</p>
        <p className="font-display text-xl font-semibold" style={{ color: "#F5EDD9" }}>{label}</p>
      </div>

      <div className="p-5 bg-cream/30 border-b border-warm-border">
        {insufficient ? (
          <div className="text-center py-3">
            <p className="text-sm text-warm-gray mb-2">過去180日の落札データが不足しています（n &lt; 20）</p>
            <p className="text-xs text-warm-gray">最新の業者買取相場は下記の参考リンクからご確認ください。</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xs text-warm-gray mb-1">市場相場</p>
            <p className="font-display text-3xl md:text-4xl font-semibold text-amber-dark mb-2">
              {formatJPY(latest.median_jpy)}
            </p>
            <p className="text-[11px] text-warm-gray leading-relaxed">
              Yahoo Auctions 落札データ中央値・過去180日
              <br />
              n={latest.sample_n}件（IQR外れ値除去後）・取得日 {latest.date}
            </p>
          </div>
        )}
      </div>

      {!insufficient && (
        <div className="px-3 pt-4 pb-3 border-b border-warm-border bg-white">
          <p className="text-xs text-warm-gray mb-2 pl-2">📈 価格履歴（Yahoo中央値の週次推移）</p>
          <MarketPriceChart history={history} />
        </div>
      )}

      <div className="px-5 py-4 bg-gold-bg/40 border-b border-warm-border">
        <p className="text-xs font-bold text-ink mb-2">参考買取相場（各業者公式ページ）</p>
        <p className="text-[11px] text-warm-gray mb-3 leading-relaxed">
          ※業者買取額は各社の在庫状況・キャンペーン・状態評価により変動します。最新の査定額は各業者ページで直接ご確認ください。
        </p>
        <ul className="flex flex-wrap gap-2 text-sm">
          {DEALER_LINKS.map((d) => (
            <li key={d.name}>
              <a
                href={d.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-amber/40 rounded-full text-amber-dark hover:bg-amber/10 transition-colors text-xs font-semibold"
              >
                {d.name} →
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-5 py-3 bg-parchment border-t border-warm-border text-[11px] text-warm-gray leading-relaxed">
        <p className="mb-1.5">
          検索クエリ: <code className="bg-cream/60 px-1 rounded">{query_used}</code>
        </p>
        <p>
          価格履歴は週次自動更新で蓄積中（現在 {points} ポイント）。詳細は{" "}
          <Link href="/methodology/" className="text-amber-dark underline hover:text-burgundy">
            編集ポリシー
          </Link>
          を参照。
        </p>
      </div>
    </section>
  );
}
