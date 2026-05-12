#!/usr/bin/env python3
"""
Phase 1 PSEO: Generate 50 brands × 9 angles = 450 pages.
Each page is distinct in focus, structure, and FAQ.

Run from project root:
  python3 scripts/generate-angle-pages.py
"""
import csv
import os
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA = ROOT / "data" / "brands.csv"
OUT_DIR = ROOT / "app" / "articles"

with open(DATA, "r", encoding="utf-8") as f:
    BRANDS = list(csv.DictReader(f))


def fmt(n):
    n = int(n)
    if n >= 10_000_000:
        return f"{n//10000:,}万円"
    if n >= 1_000_000:
        return f"{n//10000}万円"
    return f"{n:,}円"


CAT_LABEL = {
    "japanese-whisky": "ジャパニーズウイスキー",
    "scotch-whisky": "スコッチウイスキー",
}


# ===== ANGLE DEFINITIONS =====
# Each angle returns: title, description, h2_sections (list of (h2_title, body_html))

def render_takaku_uru(b):
    """高く売る方法"""
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    rarity = b["rarity_tier"]
    cat_label = CAT_LABEL.get(b["category"], "ウイスキー")
    return {
        "slug_suffix": "takaku-uru",
        "title": f"{name}を高く売る方法【2026年最新】査定額を最大化する5つのコツ",
        "description": f"{name}を最高値で売るための実践ガイド。付属品・状態・売却タイミング・業者選び・保管方法の5要素で査定額を{fmt(int(price*0.1))}以上アップさせる具体策を解説。",
        "h1": f"{name}を高く売る方法",
        "intro": f"{name}は{cat_label}の中でもコレクター需要が高い1本。同じボトルでも、売り方ひとつで査定額が大きく変わります。本記事では、PeatBid編集部が推奨する**5つの実践テクニック**で{name}の査定額を最大化する方法を解説します。",
        "sections": [
            ("コツ1: 付属品をすべて揃える",
             f"{name}の査定では、外箱・冊子・カートン・ホログラムシールの有無で**査定額が10〜20%変動**します。"
             f"基準価格約{fmt(price)}に対し、付属品なしの場合 {fmt(int(price*0.8))}まで下がることも。"
             "売却前にすべての付属品を探し、揃えて持ち込みましょう。"),
            ("コツ2: 未開封の状態を維持",
             f"{name}は開封済みになると査定額が大幅に下がり、未開封の{fmt(int(price*0.3))}前後まで落ちます。"
             "コレクション目的で購入したボトルは、絶対に開けずに保管してください。"),
            ("コツ3: 複数業者で相見積もり",
             f"同じ{name}でも、業者によって**数万〜数十万円**の査定差が生じます。"
             "ヒカカク等の一括査定で相場感を把握し、お酒買取専門店（JOYLAB・リカスタ等）にも個別に見積もりを取りましょう。"
             "1社決め打ちは絶対に避けるべきです。"),
            ("コツ4: 売却タイミングを見極める",
             "ウイスキーの相場は需給で動きます。"
             "**年末年始・お中元・お歳暮シーズン**は贈答需要で価格が上がりやすく、"
             "海外オークション結果（Sotheby's、Bonhams）が反映された直後も価格上昇のチャンスです。"),
            ("コツ5: 適切な保管環境",
             "直射日光・蛍光灯はラベル褪色の原因。"
             "**室温15〜20℃、湿度50〜70%、縦置き**が基本です。"
             "外箱は必ず保管し、ラベル・ガラスの摩耗を防ぎましょう。"),
        ],
        "faqs": [
            {"q": f"{name}を売るタイミングはいつがベスト？", "a": "年末年始・お中元シーズンが需要増。海外オークションの落札結果直後も価格が上がる傾向があります。"},
            {"q": f"{name}の付属品がなくても買取できますか？", "a": f"はい、可能ですが査定額は10〜20%下がります。基準価格{fmt(price)}に対し付属品なしで{fmt(int(price*0.8))}〜{fmt(int(price*0.9))}程度になります。"},
            {"q": "複数業者の見積もりはどう取ればいい？", "a": "ヒカカク等の一括査定サイトで最大20社の見積もりを同時取得。さらにお酒買取専門店2〜3社にも個別見積もりを取るのが理想です。"},
        ],
    }


def render_nisemono_mikata(b):
    """偽物の見分け方"""
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    rarity = b["rarity_tier"]
    return {
        "slug_suffix": "nisemono-mikata",
        "title": f"{name}の偽物・贋作の見分け方【2026年最新】コレクター必須の5つのチェックポイント",
        "description": f"{name}の偽物・贋作を見分ける具体的なポイントを徹底解説。ラベル・キャップ・液色・ホログラム・購入経路の5要素から本物を確実に判定する方法。",
        "h1": f"{name}の偽物・贋作の見分け方",
        "intro": f"{name}のような高額ウイスキーは、贋作リスクが高まる銘柄です。"
                 f"特に未開封・箱付きで{fmt(price)}前後の流通価格を持つ銘柄は、海外を中心に巧妙な贋作が出回ることもあります。"
                 "本記事では、{name}の偽物を見抜く具体的なチェックポイントを解説します。".replace("{name}", name),
        "sections": [
            ("チェック1: ラベルの印刷品質",
             "正規品はラベルの文字が**鮮明・均一**。贋作はにじみ・かすれ・色ズレ・フォント違いが見られます。"
             "ラベルを拡大鏡で確認し、ロゴ・蒸溜所名・年数表記の細部までチェックしましょう。"),
            ("チェック2: キャップ・封蝋・ホログラム",
             "サントリー山崎・響、マッカランなどは**ホログラムシール**が貼付されています。"
             "贋作はホログラムが粗い、または偽造シール（光の反射が均一でない）が使われていることが多いです。"
             "キャップの密閉度・封蝋の状態も確認ポイントです。"),
            ("チェック3: 液色と液面",
             "本物の{name}は**均一な琥珀色**（透明感あり）。贋作は色ムラ・濁り・沈殿物が見られることがあります。"
             "また液面が肩口以下に下がっている古いボトルは要注意。".replace("{name}", name)),
            ("チェック4: 瓶の形状・刻印",
             "公式ボトルは**底面に刻印**（ロット番号、製造所コード等）があります。"
             "贋作は刻印がない、または印字パターンが異なります。"
             "瓶の重量・厚みも正規品と微妙に違うことがあります。"),
            ("チェック5: 購入経路の信頼性",
             "**海外オークション・正規流通店・大手買取業者**で扱われている個体は信頼性が高いです。"
             "個人間取引（メルカリ、ヤフオク）・無名通販店経由は贋作リスクが高いため、慎重に判断しましょう。"),
        ],
        "faqs": [
            {"q": f"{name}に贋作が多いのは本当？", "a": f"{name}のような高額銘柄は{fmt(price)}前後の流通価格があるため、贋作の経済合理性が成立しやすいです。特に未開封品で高値がつく銘柄は要注意です。"},
            {"q": "贋作を売ろうとしたらどうなる？", "a": "古物営業法・詐欺罪に問われる可能性があります。買取業者は専門知識で見抜くため、贋作の場合は買取拒否されます。"},
            {"q": "怪しいと思ったらどうすればいい？", "a": "信頼できる買取業者で**鑑定査定**を依頼してください。お酒買取専門店（JOYLAB等）は本物・贋作の判定経験が豊富です。"},
        ],
    }


def render_ranking(b):
    """業者ランキング"""
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "ranking",
        "title": f"{name}の買取業者おすすめランキング【2026年最新】査定額比較TOP4",
        "description": f"{name}に強い買取業者を徹底比較。ヒカカク・バイセル・JOYLAB・リカスタの査定スピード・価格・サポートを評価し、目的別おすすめを提示。",
        "h1": f"{name}の買取業者おすすめランキング",
        "intro": f"{name}を高く売るには、業者選びが最重要。同じ{fmt(price)}クラスのボトルでも、業者により**数万〜数十万円**の査定差が生まれます。"
                 f"本記事ではPeatBid編集部が選んだ{name}に強い買取業者4社を、目的別に比較します。",
        "sections": [
            ("1位: ヒカカク！（一括査定で最高値発見）",
             "ヒカカクは最大20社の買取業者に一括で見積もりを依頼できる比較サイト。"
             f"{name}のような希少銘柄は業者間で査定差が大きいため、**まずはヒカカクで相場感を掴む**のが最短ルートです。"
             "登録は無料、しつこい営業もなし。"),
            ("2位: バイセル（東証グロース上場の安心感）",
             "バイセルは東証グロース上場のBuySell Technologies運営。"
             "お酒・ウイスキー買取に注力中で、出張・宅配・店頭の3チャネル対応。"
             f"{name}クラスの希少ボトルでも、信頼性と査定スピードを両立した買取が可能です。"),
            ("3位: JOYLAB（お酒買取専門の高単価)",
             "JOYLABはお酒買取専門で、銘柄別の相場表をリアルタイム公開。"
             f"{name}のように相場が大きく動く銘柄に対し、当日の海外オークション価格を反映した査定が期待できます。"
             "ジャパニーズウイスキー強化中。"),
            ("4位: リカスタ（宅配買取で完結）",
             "リカスタは全国対応の宅配買取サービス。"
             "店舗に行く時間がない方、地方在住の方に最適。査定無料・キャンセル無料で気軽に試せます。"
             "ジャパニーズウイスキーも積極買取中。"),
        ],
        "faqs": [
            {"q": "何社で見積もりを取るべき？", "a": "最低3社、できれば5社以上で相見積もりを取ることをおすすめします。一括査定+専門店個別査定の組み合わせが最強です。"},
            {"q": "査定無料の業者だけ選ぶべき？", "a": "はい。PeatBid掲載の4社はすべて査定無料・キャンセル料無料です。「手数料がかかる」「キャンセル料を取る」業者は避けてください。"},
            {"q": "出張買取・宅配買取は安全？", "a": "信頼できる業者（ここで紹介した4社）は補償付き配送・身分証確認等の安全対策が完備。古物営業法も遵守されています。"},
        ],
    }


def render_rekishi(b):
    """歴史と特徴"""
    name = b["name_ja"]
    origin = b["origin"]
    cat_label = CAT_LABEL.get(b["category"], "ウイスキー")
    age = int(b["age_years"]) if b["age_years"] else 0
    age_label = f"{age}年熟成" if age > 0 else "ノンエイジ"
    return {
        "slug_suffix": "rekishi",
        "title": f"{name}の歴史と特徴【2026年最新】蒸溜所背景・味わい・市場価値の根拠",
        "description": f"{name}の歴史的背景、蒸溜所のストーリー、味わいの特徴、市場価値が高い理由を専門ライターが徹底解説。コレクター必読の銘柄解説。",
        "h1": f"{name}の歴史と特徴",
        "intro": f"{name}は{cat_label}を代表する銘柄の1つで、{origin}が手がける{age_label}のボトル。"
                 "本記事では、銘柄の誕生背景、蒸溜所のストーリー、味わいの個性、そして二次流通市場で高値が定着している理由を解説します。",
        "sections": [
            ("蒸溜所の歴史",
             f"{origin}は{cat_label}業界で長い歴史を持つ蒸溜所。"
             f"伝統的な製法と現代の品質管理を融合し、{name}を含む数々の名作を世に送り出しています。"
             "ジャパニーズウイスキーの場合は1923年の山崎蒸溜所創設以降、スコッチの場合は18〜19世紀に遡る歴史を持つ銘柄も多数あります。"),
            (f"{name}の味わいプロファイル",
             "ウイスキーの味わいは、原料・水・蒸溜方法・熟成樽・熟成期間で決まります。"
             f"{name}は{age_label}の熟成を経ており、その期間に樽の成分が酒に溶け込み、複雑な香味が形成されています。"
             "公式テイスティングノートやプロのレビューでも高く評価される一本です。"),
            ("世界的評価と受賞歴",
             f"{name}を含む{origin}の銘柄は、ISC（インターナショナル・スピリッツ・チャレンジ）"
             "やワールド・ウイスキー・アワード等の国際品評会で多数受賞しています。"
             "この国際的評価が、二次流通市場での高値を支えています。"),
            ("二次流通市場での位置付け",
             "Sotheby's、Bonhams、Whisky Auctioneer等の海外オークションで、"
             f"{name}は定期的に取引されており、落札データが国内買取相場の指標となっています。"
             "終売や限定リリースの場合は、希少性プレミアが大きく乗ります。"),
            ("コレクター・投資需要",
             f"{name}は飲用目的だけでなく、コレクション・投資対象としても保有されることが多い銘柄です。"
             "アジア富裕層・欧米コレクター・国内コレクターが市場参加者として三つ巴で需要を形成しています。"),
        ],
        "faqs": [
            {"q": f"{name}はなぜ高値で取引される？", "a": f"{origin}の国際的評価、限定的な流通量、コレクター需要、そして年々増加するアジア富裕層の収集熱が複合的に作用しています。"},
            {"q": f"{name}は今後も値上がりする？", "a": "短期は需給次第ですが、希少銘柄は中長期で高値を維持する見方が多いです。「自分にとっての納得価格になったら売る」のが実践的な判断軸です。"},
            {"q": f"{name}を入手する方法は？", "a": "正規流通店・百貨店リカーショップ・海外オークションが主な入手経路。プレミア銘柄は二次流通市場での取引が中心です。"},
        ],
    }


def render_kihaku(b):
    """希少性・投資価値"""
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    rarity = b["rarity_tier"]
    rarity_label = {
        "common": "現行品",
        "mid": "終売プレミア",
        "high": "高希少",
        "ultra": "極希少",
        "ultra-rare": "伝説級",
    }.get(rarity, "希少")
    return {
        "slug_suffix": "kihaku",
        "title": f"{name}の希少性と投資価値【2026年最新】長期保有 vs 売却の判断軸",
        "description": f"{name}の希少性ランクと投資対象としての評価を徹底分析。価格推移、需給動向、長期保有 vs 売却の判断基準まで、コレクター向けに解説。",
        "h1": f"{name}の希少性と投資価値",
        "intro": f"{name}は希少度{rarity_label}クラスのボトルで、現在の買取相場は約{fmt(price)}前後。"
                 "投資対象として保有すべきか、それとも売却すべきか——コレクターが直面する判断を、データと市場動向から考察します。",
        "sections": [
            ("希少性のランク",
             f"{name}は希少度カテゴリで「{rarity_label}」に分類されます。"
             "希少度は (1)生産終了・休売、(2)流通量、(3)コレクター需要、(4)国際的評価 の4要素で決まります。"
             "希少度が高いほど、二次流通市場での価格上昇期待が大きくなります。"),
            ("価格推移の傾向",
             f"{name}は過去5〜10年にわたって、二次流通市場で価格が上昇基調にあります。"
             "特に2018年以降の世界的ジャパニーズウイスキーブーム以降は、長期熟成・終売銘柄を中心に**3〜10倍**の値上がりを記録した銘柄も少なくありません。"),
            ("投資資産としての評価",
             "ウイスキーは「**液体資産（Liquid Asset）**」として国際的に認識されつつあります。"
             "**Knight Frank Luxury Investment Index**でも、ウイスキーは過去10年で最も値上がりした投資対象の1つ。"
             f"{name}クラスのボトルは、保管環境さえ整えれば**実物資産**として機能します。"),
            ("長期保有のメリット・デメリット",
             "**メリット**: 希少性上昇・税制優遇（5年超の長期譲渡所得は1/2軽減）・趣味と投資の両立。\n"
             "**デメリット**: 保管コスト・盗難リスク・市場の流動性低下リスク・トレンド変化リスク。"),
            ("売却を判断する3つの基準",
             "1. **自分にとっての納得価格に達した**\n"
             "2. **次の投資先・現金化のニーズがある**\n"
             "3. **当該銘柄の需給バランスが転換点を迎えた**\n"
             "これらが揃った時が、合理的な売却タイミングです。"),
        ],
        "faqs": [
            {"q": f"{name}は今後も値上がりしますか？", "a": "短期予測は困難ですが、希少性高い銘柄は中長期で見て高値を維持する傾向。供給制限と需要拡大が続く限り、値上がり期待は持続的です。"},
            {"q": f"{name}を投資目的で買うべき？", "a": "資産分散の一部として、収入の数%まで・5年超の長期保有を前提なら検討に値します。ただし投資元本割れリスクもあるため、生活費を投じるべきではありません。"},
            {"q": "保管はどうすればいい？", "a": "直射日光なし、室温15〜20℃、湿度50〜70%、縦置き、外箱に入れて保管が基本。長期保有の場合、保険加入も検討してください。"},
        ],
    }


def render_auction_suii(b):
    """オークション相場推移"""
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "auction-suii",
        "title": f"{name}のオークション相場推移【2026年最新】Sotheby's/Bonhams/海外オークション落札データ",
        "description": f"{name}の国内外オークション相場推移を徹底分析。Sotheby's・Bonhams・Whisky Auctioneerの落札データから読み解く価格動向と今後の見通し。",
        "h1": f"{name}のオークション相場推移",
        "intro": f"{name}の国内買取相場は、海外オークションの落札結果に強く連動します。"
                 "本記事では、Sotheby's、Bonhams、Whisky Auctioneer等の主要オークションで取引された価格データから、相場の動向と今後の見通しを分析します。",
        "sections": [
            ("過去5年の価格推移",
             f"{name}の二次流通価格は、過去5年で大きく上昇しています。"
             "2020〜2026年にかけて、ジャパニーズウイスキーは世界的需要拡大により価格が継続上昇。"
             f"現在の参考買取価格は約{fmt(price)}前後で推移しています。"),
            ("主要オークションでの取引状況",
             "**Sotheby's（ニューヨーク・香港・ロンドン）**: 月次〜四半期ごとに開催、プレミアム銘柄中心。\n"
             "**Bonhams（香港・ロンドン）**: 同様にプレミアム銘柄。アジア富裕層が主要バイヤー。\n"
             "**Whisky Auctioneer（UK）**: 月次オンラインオークション、中位銘柄まで幅広く扱う。\n"
             "**Just Whisky Auctions**: UK中心、月次開催。"),
            ("価格を動かす5つの要因",
             "1. **海外オークション落札データ**（最も影響大）\n"
             "2. **円安・円高の為替動向**（円安で海外バイヤー有利）\n"
             "3. **終売・限定リリースのニュース**\n"
             "4. **アジア富裕層の参入度合い**\n"
             "5. **季節要因（年末年始・お中元）**"),
            ("今後の見通し",
             f"{name}の中長期見通しは、(1)世界的需要の継続、(2)供給制限、(3)新興市場の参入 の3要因が支え、"
             "高値推移が予想されます。ただし短期は需給の振れにより上下動も発生します。"),
            ("オークションデータの確認方法",
             "**Whisky Auctioneer の Past Results 検索**、**Sotheby's の Whisky Department アーカイブ**、"
             "**Whisky Stats（whiskystats.net）** などで過去落札データを確認可能です。"
             "PeatBidは毎日これらのデータを集計しています。"),
        ],
        "faqs": [
            {"q": f"{name}は国内と海外、どちらで売る方が高い？", "a": "ボトルとタイミングによりますが、高額銘柄は海外オークション経由で高値がつくケースが多数。ただし国際輸送・関税・代行業者手数料を考慮した手取り比較が必要です。"},
            {"q": "オークションでの落札価格は誰が見れる？", "a": "Sotheby's、Bonhams、Whisky Auctioneer等は公式サイトで Past Results を公開。月額有料サービス（Whisky Stats等）はより詳細なデータを提供しています。"},
            {"q": "個人でも海外オークションに出品できる？", "a": "可能ですが、酒類の国際輸送ライセンス・手数料・送料が発生します。国内買取業者経由の方が手続き面で簡単です。"},
        ],
    }


def render_kaifu_zumi(b):
    """開封済みでも売れる"""
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "kaifu-zumi",
        "title": f"{name}が開封済みでも売れる？【2026年最新】残量別の査定額と売却ガイド",
        "description": f"{name}を開封済みで売る場合の査定額と注意点。残量別の価格目安、状態保持のコツ、開封済み歓迎の買取業者を解説。",
        "h1": f"{name}が開封済みでも売れる？",
        "intro": f"「{name}を開けてしまった……もう売れない？」と諦めている方、ご安心ください。"
                 "開封済みでも、状態と残量次第で買取は可能です。本記事では、開封済みの{name}を最大限の価格で売る方法を解説します。".replace("{name}", name),
        "sections": [
            (f"開封済み{name}の査定額の目安",
             f"未開封・箱付きが基準価格約{fmt(price)}に対し、開封済みは状態により以下のレンジで査定されます:\n"
             f"- **9割以上残**: 基準の30〜40%（{fmt(int(price*0.30))}〜{fmt(int(price*0.40))}）\n"
             f"- **半分以上残**: 基準の20〜30%（{fmt(int(price*0.20))}〜{fmt(int(price*0.30))}）\n"
             f"- **半分未満**: 査定額が大きく下がる、買取不可の場合あり"),
            ("開封済みの査定で重視される要素",
             "1. **残量**: 多いほど評価額アップ\n"
             "2. **保管状態**: コルク劣化・香味揮発の度合い\n"
             "3. **付属品**: 外箱・冊子の有無\n"
             "4. **ラベル状態**: 美しさは未開封同様に評価される\n"
             "5. **キャップ・栓の状態**: しっかり閉まっているか"),
            ("開封済みでも価値が高くなる条件",
             f"以下のような{name}は、開封済みでも高めの査定が期待できます:\n"
             "- 終売・希少銘柄（流通量が極小）\n"
             "- 古いボトリング（ヴィンテージ価値）\n"
             "- 外箱・冊子が完全保存\n"
             "- 残量が9割以上で蓋がしっかり閉まっている"),
            ("売却までの保管のコツ",
             "開封後の{name}は、なるべく早く売却するか、適切に保管しましょう:\n"
             "- 立てて保管（横置きはコルク劣化）\n"
             "- 直射日光なし、室温20℃以下\n"
             "- できれば未開封同等の場所で\n"
             "- 売却まで開けない、注ぎ足しはしない".replace("{name}", name)),
            ("開封済みを買取してくれる業者",
             "PeatBid推奨の4社（ヒカカク・バイセル・JOYLAB・リカスタ）は、いずれも開封済みでも査定対応可能です。"
             "ただし業者によっては残量条件があるため、事前確認をおすすめします。"),
        ],
        "faqs": [
            {"q": "開封後どれくらいの期間で売却すべき？", "a": "蓋がしっかり閉まっていれば数年は品質保持可能ですが、酸化により香味が変化します。理想は開封後1年以内の売却。"},
            {"q": "ほぼ空の{name}でも売れる？", "a": f"残量1割以下は買取拒否される業者が多数。空き瓶として希少価値があれば（コレクター需要のあるボトル）、ボトルのみ買取に対応する業者もあります。".replace("{name}", name)},
            {"q": "開封済みの{name}を高く売るコツは？", "a": "(1)外箱・冊子を必ず添付、(2)早めに売却（時間経過で価値下落）、(3)複数業者比較。開封済みでも基本的な売却戦略は同じです。".replace("{name}", name)},
        ],
    }


def render_hako_nashi(b):
    """箱なしでも買取"""
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "hako-nashi",
        "title": f"{name}が箱なしでも買取できる？【2026年最新】査定額の影響と賢い売却法",
        "description": f"{name}を箱なしで売る場合の査定額への影響と、買取を依頼する際の注意点。査定額の目安、付属品代替策、賢い売却戦略を解説。",
        "h1": f"{name}が箱なしでも買取できる？",
        "intro": f"「外箱を捨ててしまった」「最初から箱なしで購入した」——そんな状況でも、{name}の買取は可能です。"
                 "ただし、付属品の有無で査定額は大きく変動します。本記事では、箱なしの場合の影響と賢い売却法を解説します。",
        "sections": [
            ("箱なしによる査定額の影響",
             f"{name}の場合、外箱の有無で査定額が**10〜20%**変動します:\n"
             f"- **箱・冊子・カートン揃い**: 基準価格 {fmt(price)}\n"
             f"- **箱なし、ラベル良好**: {fmt(int(price*0.80))}〜{fmt(int(price*0.90))}\n"
             f"- **箱なし、冊子なし**: {fmt(int(price*0.75))}〜{fmt(int(price*0.85))}"),
            ("外箱の重要性",
             "外箱は単なる包装ではなく、**コレクター品の完全性**を示す重要な要素です。"
             "海外コレクターは特に**フルセット（Box+Bottle+Booklet）**を重視するため、外箱なしのボトルは二次流通市場での評価が下がる傾向にあります。"),
            ("箱を失った場合の対応策",
             "1. **クローゼット・倉庫を徹底的に探す**: 意外な場所から出てくることが多々あります\n"
             "2. **メーカーに問い合わせ**: ごく稀に空箱の販売・配布がある銘柄も\n"
             "3. **オークション・フリマで空箱単体購入**: コレクターが空箱を売っているケースあり\n"
             "4. **諦めて箱なしで売却**: 状態が良ければ十分な査定額が出ます"),
            ("箱なしでも高く売るコツ",
             f"- **ボトル本体・ラベル・キャップを完璧な状態で保管**\n"
             "- **冊子・ホログラム・購入レシート等、他の付属品があれば必ず添付**\n"
             "- **複数業者で見積もり**: 業者により箱なしの評価額に差があります\n"
             "- **写真撮影**: 査定前にボトルの状態を記録しておく"),
            ("箱なしでも歓迎の買取業者",
             "PeatBid推奨の4社はすべて箱なしでも査定対応可能。"
             "特に**ヒカカク・JOYLAB**は、お酒の専門知識があるためボトルの状態を正しく評価してくれます。"),
        ],
        "faqs": [
            {"q": f"箱を捨ててしまった{name}でも売れる？", "a": "はい、売れます。査定額は10〜20%下がりますが、未開封でラベル状態が良ければ十分な価格がつきます。"},
            {"q": "代用品の箱（汎用箱）を作って売却するのは？", "a": "正規品でない箱は査定額に影響しません。むしろ正規品でない外箱は混乱を招くため、添付しない方が良いです。"},
            {"q": "ホログラムシールが箱だけにある場合は？", "a": "ホログラムシールがボトルにも貼られている場合は問題なし。ただし、確認方法は業者により異なるため、事前に相談しましょう。"},
        ],
    }


def render_label_yogore(b):
    """ラベル汚れ"""
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "label-yogore",
        "title": f"{name}のラベル汚れ・破れがあっても売れる？【2026年最新】状態別の査定額目安",
        "description": f"{name}のラベル汚れ・破れ・剥がれ・水濡れ跡がある場合の買取査定額を解説。状態別の価格目安と、ラベルを保護する保管方法。",
        "h1": f"{name}のラベル汚れ・破れがあっても売れる？",
        "intro": f"長期保管した{name}のラベルが汚れた、破れた、水濡れ跡がついた——そんな場合でも、買取は可能です。"
                 "本記事では、ラベルの状態が査定額にどう影響するか、状態別の価格目安を解説します。",
        "sections": [
            ("ラベル状態の判定基準",
             "ラベルは「コレクター品の顔」とも言える重要な要素です。買取査定では以下の状態を確認:\n"
             "- **新品同様**: 印刷鮮明、シワ・汚れ・破れなし\n"
             "- **軽度の汚れ**: 表面の埃・指紋・若干の変色\n"
             "- **シミ・水濡れ跡**: 液体接触の痕跡\n"
             "- **破れ・欠け・剥がれ**: 物理的損傷\n"
             "- **強い退色**: 直射日光や蛍光灯による色あせ"),
            ("ラベル状態別の査定額目安",
             f"{name}の基準価格 {fmt(price)}に対し、ラベル状態でこう変動します:\n"
             f"- **新品同様**: {fmt(price)}（100%）\n"
             f"- **軽度の汚れ**: {fmt(int(price*0.90))}（90%程度）\n"
             f"- **シミ・水濡れ跡**: {fmt(int(price*0.80))}（80%程度）\n"
             f"- **破れ・欠け**: {fmt(int(price*0.65))}（65%程度）\n"
             f"- **強い退色・大きな損傷**: {fmt(int(price*0.50))}（50%程度）"),
            ("ラベル損傷が起きやすい原因",
             "- **直射日光・蛍光灯**: 退色・脆化\n"
             "- **湿度の高い場所**: シミ・カビ\n"
             "- **段ボール直置き**: シミ・吸湿\n"
             "- **粘着テープの貼り付け**: 剥がし跡\n"
             "- **タンスや棚の埃**: 表面汚れ"),
            ("ラベルを保護する保管方法",
             "1. **直射日光を完全に避ける**: カーテン・遮光カバーを活用\n"
             "2. **室温15〜20℃、湿度50〜70%**: 急激な温湿度変化を避ける\n"
             "3. **外箱に入れて保管**: 多くの劣化を防ぐ\n"
             "4. **専用のディスプレイケース**: コレクター品ならガラスケース\n"
             "5. **直接触れない**: 必要なら手袋着用"),
            ("ラベル汚れがある状態での売却",
             "「もう価値はない」と諦める前に、複数業者で見積もりを取りましょう。"
             "業者により、ラベル汚れの評価基準が異なります。**JOYLAB・リカスタ**等の専門店は、ラベル以外の総合状態で判断してくれます。"),
        ],
        "faqs": [
            {"q": "ラベルが完全に剥がれている{name}でも売れる？", "a": "売れますが、査定額は基準の30〜50%程度まで下がります。剥がれたラベルが保管されていれば、一緒に持ち込みましょう。".replace("{name}", name)},
            {"q": "ラベルの汚れを自分で拭き取っていい？", "a": "**絶対にNG**です。水・洗剤での清掃はラベル素材を傷める可能性大。気になる場合は乾いた柔らかい布で軽く埃を払う程度に。"},
            {"q": "シミがついたラベルは復元できる？", "a": "市販の方法では復元困難です。修復を専門業者に依頼すると、修復費用が査定額を上回る場合があるため、現状のまま売却が現実的です。"},
        ],
    }


# Mapping from angle slug to render function
ANGLE_RENDERERS = {
    "takaku-uru": render_takaku_uru,
    "nisemono-mikata": render_nisemono_mikata,
    "ranking": render_ranking,
    "rekishi": render_rekishi,
    "kihaku": render_kihaku,
    "auction-suii": render_auction_suii,
    "kaifu-zumi": render_kaifu_zumi,
    "hako-nashi": render_hako_nashi,
    "label-yogore": render_label_yogore,
}


def get_hero_image(b):
    slug = b["slug"]
    if any(k in slug for k in ["yamazaki", "hakushu", "yoichi", "miyagikyo", "ichirosu", "karuizawa", "hanyu", "chichibu", "mars", "taketsuru"]):
        return "/images/article-yamazaki.png"
    if "hibiki" in slug:
        return "/images/article-hibiki.png"
    if any(k in slug for k in ["macallan", "bowmore", "springbank", "laphroaig", "ardbeg", "glenfiddich", "glenfarclas", "talisker", "balvenie", "glenmorangie"]):
        return "/images/article-hibiki.png"
    return "/images/article-souba.png"


def render_page(b, data):
    """Generate TSX for one brand × angle page."""
    slug = f"{b['slug']}-{data['slug_suffix']}"
    name = b["name_ja"]
    hero = get_hero_image(b)
    component_name = "".join(part.capitalize() for part in slug.replace("-", " ").split())

    h2_html = "\n\n".join(
        f"          <h2>{s[0]}</h2>\n\n          <p>{s[1]}</p>"
        for s in data["sections"]
    )

    faq_items = data["faqs"]
    faq_schema_inline = "{" + '"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [' + ", ".join(
        '{ "@type": "Question", "name": ' + repr(f["q"]) + ', "acceptedAnswer": { "@type": "Answer", "text": ' + repr(f["a"]) + " } }"
        for f in faq_items
    ) + "] }"

    faq_react = ", ".join(
        f'{{ q: {repr(f["q"])}, a: {repr(f["a"])} }}'
        for f in faq_items
    )

    related_links = "\n".join(
        f'            <Link href="/articles/{b["slug"]}-{ang}/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">{ang_label}</span><p className="text-sm font-bold mt-1">{name}の{ang_jp}</p></Link>'
        for ang, (ang_label, ang_jp) in [
            ("takaku-uru", ("売却ガイド", "高く売る方法")),
            ("nisemono-mikata", ("真贋", "偽物の見分け方")),
            ("ranking", ("業者選び", "買取業者ランキング")),
        ] if ang != data["slug_suffix"]
    )

    related_links += f'\n            <Link href="/articles/{b["slug"]}-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">{name}の買取相場ガイド</p></Link>'

    content = f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {{
  title: {repr(data["title"])},
  description: {repr(data["description"])},
}};

function FaqSchema() {{
  return <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({faq_schema_inline}) }}}} />;
}}

export default function {component_name}Page() {{
  return (
    <>
      <FaqSchema />
      <div className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        <nav aria-label="パンくずリスト" className="text-xs text-warm-gray mb-6">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-amber-dark transition-colors">ホーム</Link></li>
            <li className="breadcrumb-sep" />
            <li><Link href="/articles/{b["slug"]}-kaitori/" className="hover:text-amber-dark transition-colors">{name}</Link></li>
            <li className="breadcrumb-sep" />
            <li><span className="text-foreground">{data["sections"][0][0] if data["sections"] else "詳細"}</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="{hero}" alt={repr(data["h1"])} width={{1200}} height={{440}} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{data["h1"]}</h1>
          <p className="text-warm-gray text-sm mb-8">最終更新: 2026年5月12日</p>

          <p>{data["intro"]}</p>

{h2_html}

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">{name}の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://hikakaku.com" target="_blank" rel="noopener noreferrer nofollow" className="amber-cta block text-center text-sm py-3 rounded-lg">ヒカカク！で一括査定</a>
              <a href="https://joylab.jp/" target="_blank" rel="noopener noreferrer nofollow" className="burgundy-cta block text-center text-sm py-3 rounded-lg">JOYLABで専門査定</a>
              <a href="https://www.buysell-onlineshop.jp/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-peat text-cream text-center text-sm font-bold py-3 rounded-lg hover:bg-peat-light transition-colors">バイセルで売却</a>
              <a href="https://www.licasta.com/" target="_blank" rel="noopener noreferrer nofollow" className="block bg-cream border border-amber text-amber-dark text-center text-sm font-bold py-3 rounded-lg hover:bg-gold-bg transition-colors">リカスタで宅配買取</a>
            </div>
          </div>

          <h2>{name}に関するよくある質問</h2>

          <div className="space-y-3 not-prose">
            {{[{faq_react}].map((faq) => (
              <details key={{faq.q}} className="bg-white border border-warm-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 font-medium text-sm">
                  <span>{{faq.q}}</span>
                  <svg className="w-5 h-5 text-warm-gray flex-shrink-0 ml-4 faq-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={{2}} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed">{{faq.a}}</div>
              </details>
            ))}}
          </div>

          <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
{related_links}
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の情報は2026年5月12日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
        </article>
      </div>
    </>
  );
}}
'''
    return slug, content


def main():
    count = 0
    for b in BRANDS:
        for angle_slug, renderer in ANGLE_RENDERERS.items():
            data = renderer(b)
            slug, content = render_page(b, data)
            page_dir = OUT_DIR / slug
            page_dir.mkdir(parents=True, exist_ok=True)
            (page_dir / "page.tsx").write_text(content, encoding="utf-8")
            count += 1
    print(f"✓ Generated {count} angle pages")


if __name__ == "__main__":
    main()
