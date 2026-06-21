import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ウイスキーの保管方法｜価値を落とさない正しい保存と査定への影響【2026年】",
  description:
    "ウイスキーの正しい保管方法を解説。直射日光・温度・縦置き・コルク管理など価値を落とさない保存の基本と、液面低下・ラベル劣化が買取査定額に与える影響まで。売却を見据えた状態維持のポイント。",
  alternates: { canonical: "/articles/whisky-hokan-houhou/" },
};

const toc = [
  ["kihon", "保管の基本5原則"],
  ["satei", "状態が査定額に与える影響"],
  ["mikaifu", "未開封ボトルの保管"],
  ["kaifu", "開封後の保管"],
  ["fuzokuhin", "箱・付属品の保管"],
  ["faq", "よくある質問"],
];

const faqs = [
  {
    q: "ウイスキーは縦置き・横置きどちらが良いですか？",
    a: "ワインと違い、ウイスキーは『縦置き』が基本です。アルコール度数が高いため、横置きで液体がコルクに長く触れるとコルクが劣化・溶解し、風味や液面に悪影響が出ることがあります。立てて保管してください。",
  },
  {
    q: "冷蔵庫で保管しても良いですか？",
    a: "推奨されません。冷蔵庫内は乾燥や温度・湿度変化、におい移りのリスクがあります。直射日光が当たらない、温度変化の少ない常温の冷暗所（戸棚・クローゼットなど）が適しています。",
  },
  {
    q: "液面が下がってきました。売れますか？",
    a: "未開封でも経年でわずかに液面が下がることはあります。軽度なら売却は可能ですが、極端に下がっている場合は減額要因になります。気になり始めたら早めの査定が無難です。",
  },
  {
    q: "保管状態は査定額にどれくらい影響しますか？",
    a: "銘柄や程度によりますが、未開封・良好な液面・きれいなラベル・付属品ありの状態は評価が高く、状態難があると下がります。具体的な下げ幅は銘柄ごとに異なるため、各銘柄の買取相場ページと相場ランキングで目安を確認してください。",
  },
];

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 md:py-14">
      <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-amber-dark">ホーム</Link></li>
          <li className="breadcrumb-sep" />
          <li><Link href="/articles/" className="hover:text-amber-dark">記事一覧</Link></li>
          <li className="breadcrumb-sep" />
          <li><span className="text-foreground">ウイスキーの保管方法</span></li>
        </ol>
      </nav>

      <article className="prose">
        <h1 className="font-display text-3xl md:text-4xl font-semibold !mt-0 mb-2">
          ウイスキーの保管方法｜価値を落とさない保存と査定への影響
        </h1>
        <p className="text-warm-gray text-sm not-prose mb-6">
          最終更新: 2026-06-19 ／ 監修: <Link href="/editorial/" className="text-amber-dark underline">PeatBid編集部</Link>（<Link href="/methodology/" className="text-amber-dark underline">集計方法</Link>）
        </p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6">
          <p className="font-bold text-ink mb-2">この記事の結論（30秒）</p>
          <ul className="text-sm text-ink/80 space-y-1 list-disc pl-5">
            <li><strong>縦置き・直射日光を避ける・温度変化の少ない冷暗所</strong>が基本。</li>
            <li>ウイスキーは度数が高く<strong>横置きはコルク劣化</strong>のもと（ワインと逆）。</li>
            <li><strong>液面低下・ラベル日焼け・箱の傷</strong>は査定の減額要因。</li>
            <li>状態は査定額に直結。売る予定があるなら良好な状態で保管を。</li>
          </ul>
        </div>

        <nav className="not-prose border border-warm-border rounded-xl p-5 my-8" aria-label="目次">
          <p className="font-bold text-ink mb-3">目次</p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-amber-dark">
            {toc.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:underline">{label}</a></li>
            ))}
          </ol>
        </nav>

        <h2 id="kihon">保管の基本5原則</h2>
        <ol>
          <li><strong>直射日光・強い照明を避ける</strong>：紫外線はラベルの褪色と液色の変化を招きます。</li>
          <li><strong>温度変化の少ない冷暗所</strong>：高温や急な温度変化は劣化・揮発の原因。常温の安定した場所が理想。</li>
          <li><strong>縦置き</strong>：高アルコールがコルクに長時間触れると劣化するため立てて保管。</li>
          <li><strong>湿度・においに注意</strong>：極端な乾燥や強いにおいのある場所を避ける。</li>
          <li><strong>振動の少ない場所</strong>：頻繁な振動は避ける。</li>
        </ol>

        <h2 id="satei">状態が査定額に与える影響</h2>
        <p>買取査定では状態が重視されます。次の点はとくに評価に影響します。</p>
        <ul>
          <li><strong>液面の高さ</strong>：経年で下がる。極端な低下は減額。</li>
          <li><strong>ラベル</strong>：日焼け・破れ・水濡れ跡・剥がれは減額要因。</li>
          <li><strong>キャップ・封</strong>：サビ・破損・開封跡。</li>
          <li><strong>箱・付属品</strong>：化粧箱・冊子・カートンの有無で評価が変わります。</li>
        </ul>
        <p>状態と査定の関係は <Link href="/articles/whisky-souba-kimarikata/">買取相場の決まり方</Link> でも詳しく解説しています。</p>

        <h2 id="mikaifu">未開封ボトルの保管</h2>
        <p>
          未開封は資産価値が高い状態です。<strong>縦置き・冷暗所・直射日光回避</strong>を守り、購入時の<strong>箱・付属品をそろえて</strong>保管してください。<Link href="/articles/whisky-nv-toha/">年代指定なし(NV)</Link>を含め人気銘柄は未開封・箱付きであれば中古需要が安定しています。
        </p>

        <h2 id="kaifu">開封後の保管</h2>
        <p>
          開封後は空気に触れて酸化が進みます。<strong>しっかり栓をして縦置き・冷暗所</strong>で保管し、残量が少ないほど酸化が早まる点に注意。なお売却査定では、開封済みは未開封より評価が下がるのが一般的です。
        </p>

        <h2 id="fuzokuhin">箱・付属品の保管</h2>
        <p>
          化粧箱・冊子・カートンなどの付属品は、売却時の査定額に直結します。ボトルと一緒に、つぶれ・水濡れを避けて保管してください。付属品があるだけで評価が上がるため、購入時の状態をできるだけ維持するのがポイントです。
        </p>

        <div className="not-prose bg-gold-bg border-2 border-amber/30 rounded-xl p-5 my-6 text-center">
          <p className="font-bold text-ink mb-2">状態が良いうちに相場を確認</p>
          <p className="text-sm text-warm-gray mb-4">液面低下や劣化が進む前に。無料一括査定で複数業者の入札を比較できます。</p>
          <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm">無料一括査定で相場を調べる →</a>
        </div>

        <h2 id="faq">よくある質問</h2>
        {faqs.map((f) => (
          <div key={f.q} className="mb-4">
            <p className="font-bold text-ink mb-1">Q. {f.q}</p>
            <p className="text-sm leading-relaxed text-ink/80">A. {f.a}</p>
          </div>
        ))}

        <p className="text-xs text-warm-gray not-prose border-t border-warm-border pt-4 mt-8">
          ※ 本記事は一般的な保存の考え方の情報整理です。最新の相場は <Link href="/souba-ranking/" className="text-amber-dark underline">相場ランキング</Link> でご確認ください。関連: <Link href="/articles/whisky-souba-kimarikata/" className="text-amber-dark underline">買取相場の決まり方</Link>
        </p>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </div>
  );
}
