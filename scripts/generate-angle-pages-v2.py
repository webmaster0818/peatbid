#!/usr/bin/env python3
"""
v2: Expanded angle pages (5,000-7,000 chars each).
9 angles × 50 brands = 450 pages.
"""
import csv
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA = ROOT / "data" / "brands.csv"
OUT_DIR = ROOT / "app" / "articles"

with open(DATA, "r", encoding="utf-8") as f:
    BRANDS = list(csv.DictReader(f))


def md_to_html(text):
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    normalized = text.replace('\\n', '\n')
    if re.search(r'\b1\.\s', normalized):
        m = re.search(r'(.*?)\b1\.\s+(.+)$', normalized, re.DOTALL)
        if m:
            intro = m.group(1).strip()
            rest = m.group(2)
            items_split = re.split(r'\s+(\d+)\.\s+', rest)
            items = [items_split[0].strip()]
            i = 1
            while i + 1 < len(items_split):
                items.append(items_split[i + 1].strip())
                i += 2
            items = [it for it in items if it]
            if len(items) >= 2:
                items_html = ''.join(f'<li>{item}</li>' for item in items)
                if intro:
                    return f'<p>{intro}</p><ol>{items_html}</ol>'
                return f'<ol>{items_html}</ol>'
    if '\n' in normalized:
        paragraphs = normalized.split('\n\n')
        out = []
        for p in paragraphs:
            p = p.strip().replace('\n', '<br/>')
            if p:
                out.append(f'<p>{p}</p>')
        return ''.join(out)
    return f'<p>{normalized}</p>'


def fmt(n):
    n = int(n)
    if n >= 10_000_000:
        return f"{n//10000:,}万円"
    if n >= 1_000_000:
        return f"{n//10000}万円"
    return f"{n:,}円"


CAT_LABEL = {"japanese-whisky": "ジャパニーズウイスキー", "scotch-whisky": "スコッチウイスキー"}


def get_hero(slug):
    if any(k in slug for k in ["yamazaki", "hakushu", "yoichi", "miyagikyo", "ichirosu", "karuizawa", "hanyu", "chichibu", "mars", "taketsuru"]):
        return "/images/article-yamazaki.png"
    if "hibiki" in slug:
        return "/images/article-hibiki.png"
    return "/images/article-hibiki.png"


PARTNERS_BRIEF = [
    {"name": "ヒカカク！", "url": "https://hikakaku.com", "method": "一括査定", "blurb": "最大20社一括査定で最高値を発見。完全無料・しつこい営業なし。"},
    {"name": "バイセル", "url": "https://www.buysell-onlineshop.jp/", "method": "出張/店頭/宅配", "blurb": "東証グロース上場で信頼性◎。お酒・ウイスキー買取に注力中。"},
    {"name": "JOYLAB", "url": "https://joylab.jp/", "method": "店頭/宅配/出張", "blurb": "お酒買取専門で深い知識。希少銘柄に強く、リアルタイム相場公開。"},
    {"name": "リカスタ", "url": "https://www.licasta.com/", "method": "宅配/出張", "blurb": "全国対応の宅配買取。地方在住の方や宅配完結希望の方に最適。"},
]


# ===== ANGLE RENDERERS V2 (expanded) =====

def render_takaku_uru(b):
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    cat_label = CAT_LABEL.get(b["category"], "ウイスキー")
    return {
        "slug_suffix": "takaku-uru",
        "title": f"{name}を高く売る方法【2026年最新】査定額を最大化する7つの完全ガイド",
        "description": f"{name}を最高値で売るための実践ガイド。付属品・状態・売却タイミング・業者選び・保管方法・贋作対策・交渉術の7要素で査定額を最大化する具体策を完全解説。",
        "h1": f"{name}を高く売る方法 — 査定額を最大化する完全ガイド",
        "toc_label": "高く売る方法",
        "intro": f"{name}は{cat_label}を代表する銘柄で、コレクター需要が高い1本。同じボトルでも、売り方ひとつで査定額が大きく変わります。本記事では、PeatBid編集部が推奨する**7つの実践テクニック**で{name}の査定額を最大化する方法を徹底解説します。",
        "sections": [
            ("コツ1: 付属品をすべて揃える",
             f"{name}の査定では、外箱・冊子・カートン・ホログラムシールの有無で**査定額が10〜20%変動**します。基準価格約{fmt(price)}に対し、付属品なしの場合は{fmt(int(price*0.8))}〜{fmt(int(price*0.9))}まで下がることが一般的です。\\n\\n外箱の状態も重要で、シミ・破れ・水濡れ跡があると更に-5〜10%。購入時の状態を維持する努力が、最終的に数万〜数十万円の差を生みます。\\n\\nまず家中を徹底的に探し、すべての付属品を集めてから売却を検討してください。"),
            ("コツ2: 未開封の状態を維持",
             f"{name}は開封済みになると査定額が大幅に下がり、未開封の30〜40%（{fmt(int(price*0.30))}〜{fmt(int(price*0.40))}前後）まで落ちます。\\n\\nコレクション目的で購入したボトルは、絶対に開けずに保管してください。「ちょっと味見」が数十万円の損失につながります。\\n\\n万一開封してしまった場合は、できるだけ早く売却するのが鉄則です。時間経過とともに香味揮発・酸化が進み、査定額が更に下がります。"),
            ("コツ3: 複数業者で相見積もり",
             f"同じ{name}でも、業者によって**数万〜数十万円**の査定差が生じます。1社だけで決めるのは絶対に避けるべきです。\\n\\n推奨フロー: (1)ヒカカク等の一括査定サイトで5社以上から見積もり取得、(2)お酒買取専門店（JOYLAB・リカスタ等）に個別で2〜3社から見積もり、(3)合計7〜8社の見積もりを比較、(4)手取り額（手数料・送料込み）で最高値の業者を選定。\\n\\n査定無料・キャンセル無料の業者ばかりなので、複数比較のコストはゼロです。"),
            ("コツ4: 売却タイミングを見極める",
             "ウイスキーの相場は需給で動きます。**高値傾向のタイミング**は以下の通り:\\n\\n1. 年末年始（12〜1月）— お正月需要・ボーナス商戦\\n2. お中元・お歳暮シーズン — 贈答需要\\n3. 海外オークション直後 — Sotheby's・Bonhamsの落札データ反映\\n4. 終売・休売報道直後 — 供給制限による急騰局面\\n5. アジア富裕層のイベント前後 — 中華圏の旧正月など\\n\\n逆に、夏場（7〜8月）や経済ショック直後は需要が一時的に冷える傾向。急ぎでなければ、年末や終売報道後の数ヶ月以内に売却するのが理想的です。"),
            ("コツ5: 適切な保管環境",
             "保管環境はボトルの状態を左右します。**理想の保管条件**:\\n\\n1. 直射日光・蛍光灯を完全に避ける（ラベル褪色防止）\\n2. 室温15〜20℃、湿度50〜70%\\n3. 縦置き保管（横置きはコルク劣化、ワインと逆）\\n4. 外箱に入れて保管（埃・摩擦から保護）\\n5. 振動の少ない場所（高層階の上階や交通量の多い道路沿いは避ける）\\n\\nクローゼットの暗所、専用ディスプレイケース、ワインセラーの低温帯などが適切です。キッチン・浴室付近は湿度・温度変化が激しいためNG。"),
            ("コツ6: 贋作対策と本物証明",
             f"{fmt(price)}クラスの高額銘柄では、贋作・偽造ボトルの存在が査定に影響する場合があります。**購入経路の正当性を証明**できる材料を揃えておくと、査定がスムーズです:\\n\\n- 購入時のレシート・領収書\\n- 正規流通店の保証書\\n- 海外オークションの落札証明\\n- 開封・封蝋の写真記録\\n\\n業者によっては、本物と判定するために蛍光X線分析（XRF）等の精密検査を行います。事前に証明書類を揃えておくと、その手間がカットされ、最終査定額にも好影響です。"),
            ("コツ7: 交渉術 — 業者を競わせる",
             "最高値を引き出す最後のテクニックが**交渉**です。複数業者の見積もりを取った後、最高値の業者に対して: \\n\\n「他社では{name}に対して◯◯円の査定が出ています。これ以上の金額を提示できますか？」\\n\\nと率直に伝えてみてください。多くの業者は最終手段として価格上乗せに応じる可能性があります。\\n\\n特に希少銘柄や複数本のまとめ売りは交渉余地が大きく、5〜10%の上乗せも珍しくありません。**遠慮せず、毅然と交渉**することが最後の数万円を引き出すコツです。"),
        ],
    }


def render_nisemono_mikata(b):
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "nisemono-mikata",
        "title": f"{name}の偽物・贋作の見分け方【2026年完全版】コレクター必須の5チェックポイント",
        "description": f"{name}の偽物・贋作を見分ける具体的なポイントを徹底解説。ラベル・キャップ・液色・ホログラム・購入経路の5要素から本物を確実に判定する方法と、被害時の対処法。",
        "h1": f"{name}の偽物・贋作の見分け方",
        "toc_label": "偽物・贋作の見分け方",
        "intro": f"{name}のような高額ウイスキーは、贋作リスクが高まる銘柄です。特に未開封・箱付きで{fmt(price)}前後の流通価格を持つ銘柄は、海外を中心に巧妙な贋作が出回ることもあります。本記事では、{name}の偽物を見抜く5つのチェックポイントと、不審なボトルへの対処法を解説します。",
        "sections": [
            ("贋作市場の実情",
             f"ジャパニーズウイスキーブーム以降、海外の二次流通市場では**贋作ボトルの流通が確認**されています。特に山崎・響・白州・軽井沢・羽生など希少銘柄では、巧妙に作られた贋作が個人間取引で出回ることがあります。\\n\\n中国・東南アジアの一部地域では、本物の空き瓶に偽の液体を詰めて販売する手口も報告されています。{fmt(price)}を超える銘柄は、5チェックを徹底することが必須です。"),
            ("チェック1: ラベルの印刷品質",
             "正規品はラベルの文字が**鮮明・均一**。フォント・字間・色合いがメーカー公式と一致します。一方、贋作には以下の特徴が見られます:\\n\\n1. 文字のにじみ・かすれ\\n2. フォントの違い（似て非なる字形）\\n3. 色ズレ・色ムラ\\n4. ラベルの紙質や光沢の違い\\n5. 印刷位置の微妙なずれ\\n\\n10倍ルーペでラベル全体を確認し、メーカー公式画像と細部まで比較してください。"),
            ("チェック2: キャップ・封蝋・ホログラム",
             f"サントリー山崎・響、白州、マッカランなどは**ホログラムシール**が貼付されています。本物のホログラムは光の角度で色が変化し、立体感のある印刷が施されています。\\n\\n贋作は:\\n1. ホログラムの粗さ\\n2. 光の反射が均一（本物は不均一）\\n3. 印刷が平面的（立体感に欠ける）\\n4. シールの貼り方が雑\\n\\nキャップの締まり具合・封蝋の状態も確認ポイントです。本物は精密に封蝋されているのに対し、贋作は封蝋に隙間や違和感があることが多いです。"),
            ("チェック3: 液色と液面の状態",
             f"本物の{name}は**均一な琥珀色**で透明感があります。贋作の特徴:\\n\\n1. 色ムラ・濁り\\n2. 沈殿物の存在\\n3. 不自然に濃い/薄い色\\n4. 気泡が永久に残る\\n5. 振った時の液体の動きが不自然（粘度が異なる）\\n\\nまた、液面の高さも重要なチェックポイント。本物の{name}は通常、肩口（首の付け根）の少し下まで液体があります。極端に液面が下がっている場合は、長期保管による「目減り」か、贋作の可能性があります。"),
            ("チェック4: 瓶の形状・刻印",
             "公式ボトルは**底面に刻印**（ロット番号、製造所コード等）があります。贋作はこの刻印が:\\n\\n1. 存在しない\\n2. 印字パターンが異なる\\n3. 不自然な深さ\\n4. ロット番号がメーカーの規則に合わない\\n\\nまた、瓶の重量・厚みも正規品と微妙に違うことがあります。同じ銘柄を複数本所有している場合は、重さを比較してみてください。"),
            ("チェック5: 購入経路の信頼性",
             f"**信頼度の高い購入経路**:\\n\\n1. 海外オークション（Sotheby's、Bonhams、Whisky Auctioneer）\\n2. 正規流通店・百貨店リカーショップ\\n3. 国内大手買取業者の販売部門\\n4. 信頼できる個人コレクターの直接取引\\n\\n**リスクが高い経路**:\\n\\n1. 個人間取引（メルカリ、ヤフオク）の無名出品者\\n2. 海外（特に中華圏）の無名通販店\\n3. SNS・LINEでの個人取引\\n4. 異常に安い「掘り出し物」\\n\\n相場より20%以上安い{name}は要警戒。「他では絶対手に入らない」と煽る業者・個人も典型的な贋作販売パターンです。"),
            ("不審なボトルを見つけた場合の対処法",
             f"自身が保有する{name}が不審に見える場合、または購入を検討中のボトルが怪しい場合は、以下の手順で対処してください:\\n\\n1. **写真記録** — ボトル全体・ラベル各角度・キャップ・底面の刻印を高解像度で撮影\\n2. **専門業者で鑑定査定** — JOYLAB等のお酒買取専門店で無料鑑定を依頼\\n3. **メーカーへの問い合わせ** — サントリー・ニッカ等の公式お客様窓口にロット番号を伝えて真贋確認\\n4. **購入経路を遡る** — 不正流通の可能性が高い場合は購入元に返品交渉\\n5. **警察への相談** — 詐欺の可能性がある場合は最寄りの警察署で相談\\n\\n贋作と判明した場合、買取業者は買取を拒否します。また、贋作と知りながら売却することは詐欺罪に該当する可能性があるため、誠実に対処することが重要です。"),
        ],
    }


def render_ranking(b):
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "ranking",
        "title": f"{name}の買取業者おすすめランキング【2026年最新】査定額・サービス・信頼性で徹底比較",
        "description": f"{name}に強い買取業者をランキング形式で徹底比較。ヒカカク・バイセル・JOYLAB・リカスタの査定スピード・査定額・サポート・信頼性を多角的に評価し、目的別おすすめを提示。",
        "h1": f"{name}の買取業者おすすめランキング",
        "toc_label": "買取業者ランキング",
        "intro": f"{name}を高く売るには、業者選びが最重要。同じ{fmt(price)}クラスのボトルでも、業者により**数万〜数十万円**の査定差が生まれます。本記事ではPeatBid編集部が選定基準に基づいて選んだ{name}に強い買取業者4社を、ランキング形式で比較します。",
        "sections": [
            ("ランキングの選定基準",
             f"PeatBid編集部の{name}買取業者選定基準（5項目）:\\n\\n1. **専門知識** — お酒・ウイスキー専門の鑑定力があるか\\n2. **査定スピード** — 見積もり〜入金までの所要日数\\n3. **査定額の透明性** — 価格根拠・状態評価の説明があるか\\n4. **手数料・キャンセル料** — 完全無料か\\n5. **信頼性** — 上場・古物商許可・口コミ評判\\n\\n以上の5項目を各業者ごとに10点満点で評価し、合計点でランキングを作成しました。"),
            ("1位: ヒカカク！（一括査定で最高値発見）",
             "**総合スコア: 47/50**\\n\\nヒカカク！は最大20社の買取業者へ一括で見積もりを依頼できる比較プラットフォーム。1サイトで業界最多級の見積もりが取得可能で、希少銘柄ほど業者間の査定差が大きいため、**まずはヒカカクで相場感を把握する**のが最短ルートです。\\n\\n**強み**: 業界最多級20社一括 / 完全無料 / 24時間Web依頼可能 / お酒・洋酒・ブランデー対応\\n\\n**弱み**: 一括査定なので業者から個別に連絡が来る / 一括査定後に専門店個別査定も推奨\\n\\n**こんな人におすすめ**: 最高値を効率的に狙いたい方、初めて買取を依頼する方"),
            ("2位: バイセル（東証グロース上場の安心感）",
             "**総合スコア: 44/50**\\n\\n東証グロース上場のBuySell Technologies運営。年間累計買取件数430万件超の大手で、お酒・ウイスキー買取に注力中。**信頼性とスピードを両立**したい場合に最適です。\\n\\n**強み**: 東証グロース上場で社会的信頼性◎ / 3チャネル対応（出張・店頭・宅配） / CM放映で知名度抜群 / 一律無料\\n\\n**弱み**: 一括査定よりは査定額がやや低めの場合あり / 出張買取はエリア限定\\n\\n**こんな人におすすめ**: 信頼性とスピードを両立したい方、大量にまとめて売りたい方"),
            ("3位: JOYLAB（お酒買取専門の高単価）",
             "**総合スコア: 43/50**\\n\\nJOYLABはお酒買取専門で、銘柄別の相場表をリアルタイム公開。**ジャパニーズウイスキー強化中**で、希少銘柄に対する専門知識と査定スピードに定評があります。\\n\\n**強み**: お酒買取専門の深い知識 / リアルタイム相場公開 / 海外オークション価格を反映した査定 / 希少銘柄に強い\\n\\n**弱み**: 大手チェーンと比較すると店舗数が少ない / 出張買取エリアが限定的\\n\\n**こんな人におすすめ**: 希少銘柄を専門店で売りたい方、当日の海外オークション価格を反映した査定を希望する方"),
            ("4位: リカスタ（宅配買取で完結）",
             "**総合スコア: 40/50**\\n\\nリカスタは全国対応の宅配買取サービス。店舗に行く時間がない方、地方在住の方に最適。査定無料・キャンセル無料・送料・梱包キット無料で気軽に試せます。\\n\\n**強み**: 全国対応の宅配買取 / 査定・送料・キャンセル無料 / ジャパニーズウイスキーも積極買取 / Web完結\\n\\n**弱み**: 査定額は専門店比でやや低めのことがある / 即日現金化はできない（宅配のため）\\n\\n**こんな人におすすめ**: 宅配で完結したい方、地方在住の方、複数本まとめて宅配で売りたい方"),
            ("業者選びの最適戦略",
             "PeatBid編集部が推奨する**3ステップ戦略**:\\n\\n1. **まずヒカカクで一括査定** — 最大20社の相場感を把握\\n2. **JOYLABで専門査定** — お酒専門店の査定で本当の市場価値を確認\\n3. **最高値の業者で売却** — 手取り額（手数料・送料込み）で比較し最終決定\\n\\nこの3ステップで、{name}の最高値を確実に引き出せます。"),
        ],
    }


def render_rekishi(b):
    name = b["name_ja"]
    origin = b["origin"]
    cat_label = CAT_LABEL.get(b["category"], "ウイスキー")
    age = int(b["age_years"]) if b["age_years"] else 0
    age_label = f"{age}年熟成" if age > 0 else "ノンエイジ"
    return {
        "slug_suffix": "rekishi",
        "title": f"{name}の歴史と特徴【2026年完全版】蒸溜所・受賞歴・市場評価の根拠",
        "description": f"{name}の歴史的背景、{origin}のストーリー、味わいの特徴、世界的評価、市場価値が高い理由を専門ライターが徹底解説。コレクター・購入検討者必読の銘柄完全ガイド。",
        "h1": f"{name}の歴史と特徴",
        "toc_label": "歴史と特徴",
        "intro": f"{name}は{cat_label}を代表する銘柄の1つで、{origin}が手がける{age_label}のボトル。本記事では、銘柄の誕生背景、蒸溜所のストーリー、味わいの個性、世界的評価、そして二次流通市場で高値が定着している理由を解説します。",
        "sections": [
            (f"{origin}の創業と歴史",
             f"{origin}は{cat_label}業界で長い歴史を持つ蒸溜所/メーカー。創業以来、伝統的な製法と現代の品質管理を融合し、{name}を含む数々の名作を世に送り出しています。\\n\\nジャパニーズウイスキーの場合は1923年の山崎蒸溜所創設以降、スコッチの場合は18〜19世紀に遡る歴史を持つ銘柄も多数あります。各蒸溜所が独自の蒸溜方法・水・樽選びで個性を表現し、それが今日の市場価値につながっています。"),
            (f"{name}の誕生背景",
             f"{name}は、{origin}の長年の研究と職人技術の結晶。{age_label}の長期にわたる樽熟成を経て、樽材から溶け出した成分と原酒が複雑に交差し、唯一無二の味わいが生まれます。\\n\\n発売当時は{cat_label}の品質を世界に示すフラッグシップ的位置付けで、限定的な生産量と高い品質基準により、コレクターや愛好家から絶大な支持を集めました。"),
            (f"{name}の味わいプロファイル",
             "ウイスキーの味わいは、原料・水・蒸溜方法・熟成樽・熟成期間で決まります。\\n\\n**主要な構成要素**:\\n\\n1. 原料の麦芽（モルト）の質\\n2. 仕込み水のミネラル成分\\n3. 発酵に使う酵母の種類\\n4. ポットスチルの形状・蒸溜方法\\n5. 熟成樽の種類（シェリー樽・バーボン樽・ミズナラ樽等）\\n6. 熟成環境（温度・湿度）\\n\\nこれら全ての要素が組み合わさり、{age_label}の時間をかけて醸成されたのが{name}の味わいです。"),
            ("世界的評価と受賞歴",
             f"{name}を含む{origin}の銘柄は、以下の国際品評会で度々受賞しています:\\n\\n1. ISC（インターナショナル・スピリッツ・チャレンジ）\\n2. ワールド・ウイスキー・アワード（WWA）\\n3. サンフランシスコ・ワールド・スピリッツ・コンペティション\\n4. ジム・マーレイ氏のウイスキー・バイブル\\n5. ウイスキー・マガジン・アワード\\n\\nこの国際的評価が、二次流通市場での高値を支えています。受賞歴・専門家評価が「投資する価値のあるボトル」という認識を醸成しているのです。"),
            ("二次流通市場での位置付け",
             "**Sotheby's、Bonhams、Whisky Auctioneer**等の海外オークションで、{name}は定期的に取引されており、落札データが国内買取相場の指標となっています。\\n\\n特に終売や限定リリースの場合は、希少性プレミアが大きく乗ります。コレクター・投資需要が三つ巴で価格を支え、長期的な値上がり期待を生んでいます。\\n\\nアジア富裕層・欧米コレクター・国内コレクターが市場参加者として競合する中、{name}の価値は中長期で見て高水準を維持する見通しです。".replace("{name}", name)),
            ("コレクター市場での需要動向",
             f"{name}の需要は以下の層から支えられています:\\n\\n1. **アジア富裕層**（中国・香港・台湾・シンガポール）— ジャパニーズウイスキーブームの主要バイヤー\\n2. **欧米コレクター**（米・英・独）— Sotheby's・Bonhamsの主要顧客\\n3. **国内コレクター・愛好家**— SNS・ウイスキーバー文化の普及で増加中\\n4. **投資家・ファンド**— 「液体資産」としての保有が増加\\n\\nこの多様な需要構造が、{name}の市場価値を安定的に支えています。"),
            ("今後の市場見通し",
             f"{name}を含む{cat_label}の中長期見通しは、(1)世界的需要の継続、(2)供給制限、(3)新興市場の参入 の3要因が支え、**高値推移が予想**されます。\\n\\nただし短期は需給の振れにより上下動も発生します。「自分にとっての納得価格になったら売る」のが実践的な判断軸です。\\n\\n長期保有を視野に入れる場合は、適切な保管と保険加入を検討し、5〜10年スパンでの値上がり期待を持つのが現実的です。"),
        ],
    }


def render_kihaku(b):
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    rarity = b["rarity_tier"]
    rarity_label = {"common": "現行品", "mid": "終売プレミア", "high": "高希少", "ultra": "極希少", "ultra-rare": "伝説級"}.get(rarity, "希少")
    return {
        "slug_suffix": "kihaku",
        "title": f"{name}の希少性と投資価値【2026年完全版】長期保有 vs 売却の判断軸",
        "description": f"{name}の希少性ランクと投資対象としての評価を徹底分析。価格推移、需給動向、長期保有 vs 売却の判断基準、税制優遇まで、コレクター向けに解説。",
        "h1": f"{name}の希少性と投資価値",
        "toc_label": "希少性・投資価値",
        "intro": f"{name}は希少度{rarity_label}クラスのボトルで、現在の買取相場は約{fmt(price)}前後。投資対象として保有すべきか、それとも売却すべきか——コレクターが直面する判断を、データと市場動向から考察します。",
        "sections": [
            ("希少性のランク評価",
             f"{name}は希少度カテゴリで「**{rarity_label}**」に分類されます。希少度は以下の4要素で決まります:\\n\\n1. 生産終了・休売の有無\\n2. 市場流通量\\n3. コレクター需要\\n4. 国際的評価\\n\\n希少度が高いほど、二次流通市場での価格上昇期待が大きくなります。{rarity_label}クラスは、長期保有でプレミアが乗りやすい傾向があります。"),
            ("価格推移の歴史",
             f"{name}は過去5〜10年にわたって、二次流通市場で価格が上昇基調にあります。特に2018年以降の世界的ジャパニーズウイスキーブーム以降は、長期熟成・終売銘柄を中心に**3〜10倍**の値上がりを記録した銘柄も少なくありません。\\n\\n2020年: コロナ禍で一時的に需要減少も、すぐに回復\\n2021〜2022年: アジア富裕層の参入加速、価格急騰\\n2023〜2024年: 上昇ペースは緩和、安定推移\\n2025〜2026年: 円安効果と海外需要継続で高値維持\\n\\nこの推移を踏まえ、{name}の中長期見通しは引き続き堅調と予想されます。"),
            ("投資資産としての位置付け",
             "ウイスキーは**「液体資産（Liquid Asset）」**として国際的に認識されつつあります。\\n\\n**Knight Frank Luxury Investment Index**（高級資産投資指数）でも、ウイスキーは過去10年で最も値上がりした投資対象の1つ。クラシックカー・ワイン・アートと並ぶ、実物資産としての地位を確立しています。\\n\\n{fmt(price)}クラスのボトルは、保管環境さえ整えれば**現金化容易な実物資産**として機能します。資産分散の選択肢として検討する価値があります。".replace("{name}", name)),
            ("長期保有のメリット",
             "**メリット**:\\n\\n1. 希少性上昇による価格上昇期待\\n2. 税制優遇（5年超の長期譲渡所得は1/2軽減）\\n3. 趣味と投資の両立\\n4. インフレヘッジ機能\\n5. 物理資産としての安心感\\n6. 相続・贈与対象としての価値\\n7. 国際市場での換金性"),
            ("長期保有のデメリット",
             "**デメリット**:\\n\\n1. 保管コスト（湿度・温度管理）\\n2. 盗難・破損リスク\\n3. 市場の流動性低下リスク\\n4. トレンド変化リスク（次世代のウイスキー嗜好が変わる可能性）\\n5. 保険加入コスト\\n6. 維持の手間\\n7. 機会費用（他の投資先と比較した収益率）\\n\\nこれらのデメリットを認識した上で、投資元本割れの可能性も考慮することが重要です。"),
            ("売却を判断する5つの基準",
             "**売却タイミング判断のチェックリスト**:\\n\\n1. 自分にとっての納得価格に達した\\n2. 次の投資先・現金化のニーズがある\\n3. 当該銘柄の需給バランスが転換点を迎えた\\n4. 保管コストが値上がり期待を上回ると判断\\n5. ライフイベント（相続・住宅購入・教育費等）への対応\\n\\nこれらが揃った時が、合理的な売却タイミングです。1点だけ満たすのではなく、複数の要因が重なった時に動くことが推奨されます。"),
            ("税制優遇の活用",
             "ウイスキー売却益は**譲渡所得**として課税対象になります。重要なポイント:\\n\\n1. **年間50万円の特別控除** — この範囲内なら実質非課税\\n2. **5年超保有で長期譲渡所得** — 特別控除後の課税対象額が1/2に軽減\\n3. **生活用動産の非課税** — 1点30万円以下は非課税\\n\\n例: {fmt(price)}クラスのボトルを5年超保有して売却し、取得費が{fmt(int(price*0.3))}の場合、譲渡所得は{fmt(int(price*0.7))}。特別控除50万円差引、長期譲渡で1/2軽減し、課税対象額は実質的に大幅減税となります。\\n\\nコレクション歴の長い方は購入時期の記録を残しておくと有利です。".replace("{name}", name)),
        ],
    }


def render_auction_suii(b):
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "auction-suii",
        "title": f"{name}のオークション相場推移【2026年完全版】Sotheby's/Bonhams/海外データ完全分析",
        "description": f"{name}の国内外オークション相場推移を徹底分析。Sotheby's・Bonhams・Whisky Auctioneerの落札データから読み解く価格動向、過去5年の推移、今後の見通しまで完全解説。",
        "h1": f"{name}のオークション相場推移",
        "toc_label": "オークション相場推移",
        "intro": f"{name}の国内買取相場は、海外オークションの落札結果に強く連動します。本記事では、Sotheby's、Bonhams、Whisky Auctioneer等の主要オークションで取引された価格データから、相場の動向と今後の見通しを分析します。",
        "sections": [
            ("過去5年の価格推移",
             f"{name}の二次流通価格は、過去5年で大きく上昇しています。\\n\\n**年別推移の目安**:\\n\\n1. 2020年: コロナ禍で一時減速、年末から回復\\n2. 2021年: アジア富裕層の参入加速、年間+30〜50%\\n3. 2022年: 価格急騰、年間+50〜80%\\n4. 2023年: 上昇ペース緩和、年間+10〜20%\\n5. 2024〜2025年: 安定推移、+5〜15%\\n6. 2026年: 高値維持、現在は約{fmt(price)}前後\\n\\nこの5年間で累計**約3〜5倍**の上昇を示しており、ウイスキー投資としての魅力が証明されています。"),
            ("主要オークションプラットフォーム",
             "{name}クラスの銘柄が取引される主要オークション:\\n\\n1. **Sotheby's（ニューヨーク・香港・ロンドン）** — 月次〜四半期ごとに開催、プレミアム銘柄中心。最高クラスの希少銘柄が出品される。\\n\\n2. **Bonhams（香港・ロンドン）** — 同様にプレミアム銘柄。アジア富裕層が主要バイヤー。香港オークションは特に活発。\\n\\n3. **Whisky Auctioneer（UK）** — 月次オンラインオークション、中位銘柄まで幅広く扱う。透明性が高い。\\n\\n4. **Just Whisky Auctions（UK）** — UK中心、月次開催、コレクター向け。\\n\\n5. **Whisky Hammer（UK）** — 月次オンライン、新興プレイヤー。\\n\\n6. **Acker Wines（香港・ニューヨーク）** — 富裕層会員制、超高額ボトル中心。".replace("{name}", name)),
            ("価格を動かす5つの要因",
             "**1. 海外オークション落札データ** — 最も影響大。月次の落札結果が業者の仕入れ価格の基準\\n**2. 円安・円高の為替動向** — 円安で海外バイヤー有利、国内価格上昇\\n**3. 終売・限定リリースのニュース** — 供給制限による急騰局面\\n**4. アジア富裕層の参入度合い** — 中華圏の経済動向と連動\\n**5. 季節要因（年末年始・お中元）** — 贈答需要で価格上昇"),
            ("地域別の価格特性",
             "**地域別の価格水準**:\\n\\n1. **香港・シンガポール** — 富裕層多く最高値圏\\n2. **ニューヨーク** — Sotheby's主導、プレミアム指向\\n3. **ロンドン** — 歴史的にウイスキー取引の中心地\\n4. **東京** — 国内取引の中心、海外への輸出窓口\\n5. **上海・北京** — 急速に成長中の需要源\\n\\n同じ{name}でも、地域によって5〜15%の価格差が生じます。海外オークション経由の方が高値が期待できる場合が多く、輸送・関税を考慮しても国内売却より有利なケースもあります。".replace("{name}", name)),
            ("今後の見通し（中長期）",
             f"{name}の中長期見通しは、以下の3要因が支え、**高値推移が予想**されます:\\n\\n1. 世界的需要の継続（コレクター層拡大）\\n2. 供給制限（長期熟成銘柄の物理的限界）\\n3. 新興市場の参入（インド、中東、東南アジア）\\n\\nただし短期は需給の振れにより上下動も発生します。為替・地政学リスク・経済ショック等で一時的な価格調整も想定すべきです。"),
            ("オークションデータの確認方法",
             "**個人でも確認可能な情報源**:\\n\\n1. **Whisky Auctioneer の Past Results 検索** — 過去全件の落札データを無料閲覧可能\\n2. **Sotheby's の Whisky Department アーカイブ** — 各オークションの結果を公開\\n3. **Bonhams の Past Auctions** — 落札価格を確認可能\\n4. **Whisky Stats（whiskystats.net）** — 月額有料サービスで詳細データ提供\\n5. **PeatBid 銘柄ページ** — 主要50銘柄の相場を日次更新\\n\\nこれらのデータを参考にすることで、自身のボトルの市場価値を客観的に把握できます。"),
            ("国内と海外、どちらで売るべきか",
             f"**国内売却のメリット**:\\n\\n1. 手続きが簡便（業者と直接やり取り）\\n2. 即日現金化可能\\n3. 国際輸送・関税不要\\n4. トラブル時の対応が容易\\n\\n**海外オークション売却のメリット**:\\n\\n1. 高値が期待できる（特に希少銘柄）\\n2. 富裕層バイヤーへのアクセス\\n3. 透明性の高い価格決定\\n\\n**海外売却のデメリット**:\\n\\n1. 国際輸送費（数万円〜）\\n2. 関税・代理人手数料\\n3. 為替リスク\\n4. 手続きの複雑性\\n\\n総合判断としては、{fmt(price * 2)}を超える超希少銘柄は海外オークション、それ以下は国内買取業者が現実的です。"),
        ],
    }


def render_kaifu_zumi(b):
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "kaifu-zumi",
        "title": f"{name}が開封済みでも売れる？【2026年完全版】残量別査定額と賢い売却法",
        "description": f"{name}を開封済みで売る場合の査定額と注意点。残量別の価格目安、状態保持のコツ、開封済み歓迎の買取業者、売却前の準備まで完全解説。",
        "h1": f"{name}が開封済みでも売れる？",
        "toc_label": "開封済みでも売れる",
        "intro": f"「{name}を開けてしまった……もう売れない？」と諦めている方、ご安心ください。開封済みでも、状態と残量次第で買取は可能です。本記事では、開封済みの{name}を最大限の価格で売る方法を完全解説します。",
        "sections": [
            (f"開封済み{name}の査定額の目安",
             f"未開封・箱付きが基準価格約{fmt(price)}に対し、開封済みは状態により以下のレンジで査定されます:\\n\\n1. **9割以上残**: 基準の30〜40%（{fmt(int(price*0.30))}〜{fmt(int(price*0.40))}）\\n2. **7割以上残**: 基準の25〜35%（{fmt(int(price*0.25))}〜{fmt(int(price*0.35))}）\\n3. **5割以上残**: 基準の20〜30%（{fmt(int(price*0.20))}〜{fmt(int(price*0.30))}）\\n4. **3割以上残**: 基準の10〜20%\\n5. **1割以下残**: 買取拒否の場合あり、もしくは空ボトルとして数千円"),
            ("開封済みの査定で重視される5要素",
             f"開封済みボトルの査定では、以下の5要素が総合的に評価されます:\\n\\n1. **残量** — 多いほど評価額アップ。9割以上が査定の分かれ目\\n2. **保管状態** — コルク劣化・香味揮発の度合い\\n3. **付属品** — 外箱・冊子・カートンの有無\\n4. **ラベル状態** — 美しさは未開封同様に評価される\\n5. **キャップ・栓の状態** — しっかり閉まっているか、隙間からの揮発は無いか\\n\\n各業者は独自の基準で評価しますが、上記5要素は共通の判断材料です。"),
            ("開封済みでも価値が高くなる条件",
             f"以下のような{name}は、開封済みでも高めの査定が期待できます:\\n\\n1. **終売・希少銘柄**（流通量が極小）\\n2. **古いボトリング**（ヴィンテージ価値）\\n3. **外箱・冊子が完全保存**\\n4. **残量が9割以上で蓋がしっかり閉まっている**\\n5. **特殊な限定品・記念ボトル**\\n6. **海外コレクター需要が高い銘柄**\\n7. **正規流通店での購入証明あり**"),
            ("売却までの保管のコツ",
             f"開封後の{name}は、なるべく早く売却するか、適切に保管しましょう:\\n\\n1. **立てて保管**（横置きはコルク劣化）\\n2. **直射日光なし、室温20℃以下**\\n3. **可能なら未開封同等の場所で**\\n4. **売却まで開けない、注ぎ足しはしない**\\n5. **キャップをしっかり閉める**\\n6. **湿度50〜70%を維持**\\n7. **振動・衝撃を避ける**\\n\\n適切な保管により、開封後数年間は香味・品質を保持できます。"),
            ("開封済みを買取してくれる業者",
             "PeatBid推奨の4社（ヒカカク・バイセル・JOYLAB・リカスタ）は、いずれも開封済みでも査定対応可能です。\\n\\n**各社の開封済み買取の特徴**:\\n\\n1. **ヒカカク！** — 一括査定で開封済みも受付業者を絞り込み可能\\n2. **バイセル** — 残量9割以上を主に扱う、それ以下は要相談\\n3. **JOYLAB** — お酒専門で開封済みも積極買取、状態評価が公平\\n4. **リカスタ** — 宅配で開封済みも対応、ただし運送中の漏れに注意\\n\\n業者によっては残量条件があるため、事前確認をおすすめします。"),
            ("開封済みを高く売る5つのコツ",
             "1. **早めの売却** — 時間経過で香味揮発・酸化が進み価値減\\n2. **外箱・冊子を必ず添付** — 付属品の有無は査定に影響\\n3. **複数業者比較** — 開封済みでも数千〜数万円の差\\n4. **保管状態の写真記録** — 適切に保管していたことを証明\\n5. **正直な状態申告** — 残量・状態を正確に伝える"),
            ("売れない場合の対処法",
             f"万一{name}が買取拒否された場合の選択肢:\\n\\n1. **別業者で再査定** — 業者により判断基準が異なる\\n2. **個人売買（メルカリ・ヤフオク）** — 業者買取より高値が出る可能性\\n3. **オークション出品** — 希少銘柄なら入札競争で高値\\n4. **コレクター仲間との直接取引** — ウイスキー愛好家のコミュニティで交渉\\n5. **空ボトル買取** — ボトル本体・ラベル・箱に価値があれば数千円で買取可能\\n\\n諦める前に、複数のチャネルを試してみることをおすすめします。"),
        ],
    }


def render_hako_nashi(b):
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "hako-nashi",
        "title": f"{name}が箱なしでも買取できる？【2026年完全版】査定額への影響と代替戦略",
        "description": f"{name}を箱なしで売る場合の査定額への影響と買取依頼時の注意点。査定額の目安、代替戦略、賢い売却法、箱を探す方法まで完全解説。",
        "h1": f"{name}が箱なしでも買取できる？",
        "toc_label": "箱なしでも買取",
        "intro": f"「外箱を捨ててしまった」「最初から箱なしで購入した」——そんな状況でも、{name}の買取は可能です。ただし、付属品の有無で査定額は大きく変動します。本記事では、箱なしの場合の影響と賢い売却法を完全解説します。",
        "sections": [
            ("箱なしによる査定額の影響",
             f"{name}の場合、外箱の有無で査定額が**10〜20%**変動します:\\n\\n1. **箱・冊子・カートン揃い**: 基準価格 {fmt(price)}（100%）\\n2. **箱あり・冊子なし**: {fmt(int(price*0.85))}〜{fmt(int(price*0.95))}（85〜95%）\\n3. **箱なし・冊子あり**: {fmt(int(price*0.85))}〜{fmt(int(price*0.92))}（85〜92%）\\n4. **箱なし・ラベル良好**: {fmt(int(price*0.80))}〜{fmt(int(price*0.90))}（80〜90%）\\n5. **箱・冊子なし**: {fmt(int(price*0.75))}〜{fmt(int(price*0.85))}（75〜85%）\\n\\nつまり、最大で**約25%（{fmt(int(price*0.25))}）の差**が生じる可能性があります。"),
            ("なぜ外箱が重要なのか",
             "外箱は単なる包装ではなく、**コレクター品の完全性**を示す重要な要素です:\\n\\n1. **二次流通市場での評価** — 海外コレクターは特にフルセット重視\\n2. **真贋判定の手がかり** — 箱と本体の合致が本物の証\\n3. **保管時の保護機能** — 直射日光・摩擦・埃から守る\\n4. **付属品の収納** — 冊子・カートンの一括管理\\n5. **贈答品としての価値** — 箱なしは贈り物として再販困難\\n\\nこれらの理由から、外箱を保管していたかどうかで、ボトル本体の状態以上に査定額が変わる場合があります。"),
            ("箱を失った場合の対応策",
             "**外箱を取り戻す4つの方法**:\\n\\n1. **クローゼット・倉庫・収納庫を徹底的に探す** — 意外な場所から出てくることが多々あります\\n2. **メーカーに問い合わせ** — ごく稀に空箱の販売・配布がある銘柄も\\n3. **オークション・フリマで空箱単体購入** — コレクターが空箱を売っているケースあり\\n4. **諦めて箱なしで売却** — 状態が良ければ十分な査定額が出ます\\n\\n特に1番目（家中を探す）は意外と見つかることが多いので、売却前に徹底チェックしてください。"),
            ("箱なしでも高く売る7つのコツ",
             f"1. **ボトル本体・ラベル・キャップを完璧な状態で保管**\\n2. **冊子・ホログラム・購入レシート等、他の付属品があれば必ず添付**\\n3. **複数業者で見積もり** — 業者により箱なしの評価額に差がある\\n4. **写真撮影** — 査定前にボトルの状態を記録\\n5. **保管環境の整備** — ラベル・キャップの状態を維持\\n6. **正直な状態申告** — 嘘の申告は信頼を失い結果的に損\\n7. **早めの売却** — 時間経過でラベル劣化リスクが増加"),
            ("箱なしでも歓迎の買取業者",
             "PeatBid推奨の4社はすべて箱なしでも査定対応可能。**特に推奨される業者**:\\n\\n1. **ヒカカク！** — 一括査定で箱なし対応業者を比較\\n2. **JOYLAB** — お酒専門で柔軟な評価、希少銘柄に強い\\n3. **バイセル** — 大手の安心感、箱なしでも査定可\\n4. **リカスタ** — 宅配買取で箱なしも対応\\n\\n各業者で査定額が異なるため、3社以上で見積もりを取ることが必須です。"),
            ("代用品の箱を使うことについて",
             "**代用品の外箱（汎用箱や別銘柄の箱）は使うべきではありません**。\\n\\n理由:\\n1. 査定時に「正規品ではない」と判定される\\n2. 業者の信頼を失う\\n3. 査定額がむしろ下がる可能性\\n4. 場合によっては詐欺と見なされる\\n\\n本物の外箱が見つからない場合は、箱なしで正直に売却するのが正解です。"),
            ("箱を新規購入できるか",
             f"一部のコレクター・買取業者は、空き箱を単体で販売することがあります。**入手経路**:\\n\\n1. **メルカリ・ヤフオク** — 「{name} 箱」で検索\\n2. **海外オークション** — Whisky Auctioneerなどで稀に出品\\n3. **コレクターSNS** — Twitter・Instagramで交換相手を探す\\n4. **ウイスキー専門店** — 店舗に在庫がある場合あり\\n\\n空き箱の価格は数千円〜数万円程度。査定額アップ幅と比較して、投資価値があるか判断してください。"),
        ],
    }


def render_label_yogore(b):
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    return {
        "slug_suffix": "label-yogore",
        "title": f"{name}のラベル汚れ・破れがあっても売れる？【2026年完全版】状態別査定額と保護方法",
        "description": f"{name}のラベル汚れ・破れ・剥がれ・水濡れ跡がある場合の買取査定額を詳細解説。状態別の価格目安、ラベル保護の保管方法、業者選定まで完全ガイド。",
        "h1": f"{name}のラベル汚れ・破れがあっても売れる？",
        "toc_label": "ラベル汚れでも査定",
        "intro": f"長期保管した{name}のラベルが汚れた、破れた、水濡れ跡がついた——そんな場合でも、買取は可能です。本記事では、ラベルの状態が査定額にどう影響するか、状態別の価格目安と対処法を完全解説します。",
        "sections": [
            ("ラベル状態の判定基準",
             "ラベルは「コレクター品の顔」とも言える重要な要素です。買取査定では以下の状態を確認:\\n\\n1. **新品同様** — 印刷鮮明、シワ・汚れ・破れなし\\n2. **軽度の汚れ** — 表面の埃・指紋・若干の変色\\n3. **シミ・水濡れ跡** — 液体接触の痕跡\\n4. **破れ・欠け・剥がれ** — 物理的損傷\\n5. **強い退色** — 直射日光や蛍光灯による色あせ\\n6. **カビ・カビ跡** — 湿度過多による劣化\\n7. **粘着テープ跡** — 不適切な貼付・剥離跡"),
            (f"ラベル状態別の査定額目安（{name}）",
             f"{name}の基準価格 {fmt(price)}に対し、ラベル状態でこう変動します:\\n\\n1. **新品同様**: {fmt(price)}（100%）\\n2. **軽度の汚れ**: {fmt(int(price*0.90))}（90%程度）\\n3. **シミ・水濡れ跡**: {fmt(int(price*0.80))}（80%程度）\\n4. **破れ・欠け**: {fmt(int(price*0.65))}（65%程度）\\n5. **強い退色・大きな損傷**: {fmt(int(price*0.50))}（50%程度）\\n6. **ラベル剥がれ（残あり）**: {fmt(int(price*0.40))}（40%程度）\\n7. **ラベル完全消失**: {fmt(int(price*0.20))}（20%程度、ヴィンテージ価値あれば例外）"),
            ("ラベル損傷が起きやすい原因",
             "**主な原因**:\\n\\n1. **直射日光・蛍光灯** — 退色・脆化\\n2. **湿度の高い場所** — シミ・カビ\\n3. **段ボール直置き** — シミ・吸湿\\n4. **粘着テープの貼り付け** — 剥がし跡\\n5. **タンスや棚の埃** — 表面汚れ\\n6. **指で頻繁に触る** — 油脂による変色\\n7. **温度変化** — ラベルの剥がれ\\n8. **化学物質の接触** — 洗剤・芳香剤の蒸気"),
            ("ラベルを保護する7つの保管方法",
             "1. **直射日光を完全に避ける** — カーテン・遮光カバーを活用\\n2. **室温15〜20℃、湿度50〜70%** — 急激な温湿度変化を避ける\\n3. **外箱に入れて保管** — 多くの劣化を防ぐ\\n4. **専用のディスプレイケース** — コレクター品ならガラスケース\\n5. **直接触れない** — 必要なら手袋着用\\n6. **化学物質を遠ざける** — キッチン・浴室・芳香剤付近はNG\\n7. **定期的な点検** — 3ヶ月に1度状態確認"),
            ("ラベル汚れがある状態での売却戦略",
             f"「もう価値はない」と諦める前に、複数業者で見積もりを取りましょう。**業者により、ラベル汚れの評価基準が異なります**。\\n\\n推奨アプローチ:\\n\\n1. **JOYLAB・リカスタ** 等の専門店は、ラベル以外の総合状態で判断してくれる傾向\\n2. **ヒカカク！** の一括査定で複数社の評価を比較\\n3. **正直な状態申告** が最終的に最良の結果を生む\\n4. **写真添付** で事前に状態を業者に確認してもらう"),
            ("やってはいけないラベル「修復」",
             "❌ **絶対にNGの行為**:\\n\\n1. 水・洗剤での清掃 — ラベル素材を傷める可能性大\\n2. ラベルの「補修」 — 査定価値が更に下がる\\n3. 剥がれかけのラベルを糊で貼り直す — 状態悪化\\n4. アイロンや熱でシワ伸ばし — ラベル変色\\n5. 漂白剤での「シミ抜き」 — 致命的損傷\\n\\n気になる場合は、**乾いた柔らかい布で軽く埃を払う程度**にとどめてください。それ以上の修復は専門業者でないと、価値を下げるだけです。"),
            ("ラベル損傷でも売れる業者ランキング",
             "1. **JOYLAB**（お酒専門の柔軟な評価）\\n2. **ヒカカク！**（一括査定で柔軟な業者を発見）\\n3. **リカスタ**（宅配買取で広く対応）\\n4. **バイセル**（大手で安定査定）\\n\\nどの業者も査定無料・キャンセル無料なので、3社以上で見積もり比較が鉄則です。"),
        ],
    }


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


def common_faqs(b, angle_suffix):
    name = b["name_ja"]
    price = int(b["reference_price_jpy_2026_05"])
    base = [
        (f"{name}を売る前に何を準備すべき？",
         f"(1)外箱・冊子・カートン等の付属品をすべて揃える、(2)ボトルの状態を確認、(3)複数業者で見積もり、(4)本人確認書類を準備、(5)銀行口座（振込希望の場合）を準備、の5つが基本です。"),
        (f"複数業者比較は本当に必要？",
         f"はい、必須です。同じ{name}でも業者によって**数万〜数十万円**の査定差が生まれます。ヒカカク等の一括査定+専門店個別査定の組み合わせで、最高値を引き出しましょう。"),
        (f"買取後のキャンセルは可能？",
         "業者により異なります。査定後の売却前なら無料キャンセルが基本ですが、契約・受領後はキャンセル不可の場合があります。出張買取の場合、特定商取引法によりクーリングオフ（8日間）が適用されます。"),
        (f"{name}の売却益に税金はかかる？",
         f"はい、譲渡所得として課税対象になります。ただし年間50万円の特別控除があり、給与所得者で他の所得と合算して20万円未満なら申告不要。5年超保有なら長期譲渡所得として課税対象額が1/2に軽減されます。"),
        (f"{name}を売るならどのタイミングがベスト？",
         "需要が高まる**年末年始・お中元・お歳暮シーズン**が高値傾向。海外オークション（Sotheby's等）の落札結果が反映された直後も価格上昇のチャンスです。"),
    ]
    return base


def render_page(b, data):
    slug = f"{b['slug']}-{data['slug_suffix']}"
    name = b["name_ja"]
    hero = get_hero(b["slug"])
    component_name = "".join(part.capitalize() for part in slug.replace("-", " ").split())

    # Plan B: angle-specific extra visual content
    angle_suffix = data["slug_suffix"]
    extra_visual = ""
    if angle_suffix == "ranking":
        extra_visual = '''
          <div className="table-wrapper not-prose my-6">
            <p className="text-sm font-bold mb-2 text-ink">業者比較表</p>
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr>
                  <th>業者</th>
                  <th>得意領域</th>
                  <th>査定スピード</th>
                  <th>査定額傾向</th>
                  <th>手数料</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>ヒカカク！</strong></td><td>一括査定（20社）</td><td>1〜2日</td><td>★★★★★</td><td>無料</td></tr>
                <tr><td><strong>バイセル</strong></td><td>大手の安心感</td><td>即日〜2日</td><td>★★★★</td><td>無料</td></tr>
                <tr><td><strong>JOYLAB</strong></td><td>お酒専門・希少銘柄</td><td>1〜3日</td><td>★★★★★</td><td>無料</td></tr>
                <tr><td><strong>リカスタ</strong></td><td>宅配買取</td><td>2〜5日</td><td>★★★★</td><td>無料</td></tr>
              </tbody>
            </table>
          </div>
'''
    elif angle_suffix in ("kaifu-zumi", "hako-nashi", "label-yogore"):
        extra_visual = '''
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-5 not-prose">
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-perfect.png" alt="未開封・箱付き完璧" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>完璧</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-no-box.png" alt="未開封・箱なし" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">未開封<br/>箱なし</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-label-dirty.png" alt="ラベル汚れ" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">ラベル<br/>汚れ</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-low-liquid.png" alt="液面減少" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">液面<br/>減少</p>
            </div>
            <div className="text-center">
              <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden">
                <Image src="/images/state-opened.png" alt="開封済み" fill sizes="200px" className="object-cover" />
              </div>
              <p className="text-[10px] text-warm-gray mt-1">開封済み</p>
            </div>
          </div>
'''
    elif angle_suffix == "rekishi":
        cat = b["category"]
        dimg = "/images/distillery-japanese.png" if cat == "japanese-whisky" else "/images/distillery-scotch.png"
        extra_visual = f'''
          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="{dimg}" alt="{b["origin"]}の蒸溜所イメージ" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
          </div>
'''
    elif angle_suffix == "auction-suii":
        extra_visual = '''
          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/auction-scene.png" alt="海外オークションでの希少ウイスキー取引" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>
'''
    elif angle_suffix == "kihaku":
        extra_visual = '''
          <div className="relative w-full h-[200px] md:h-[260px] rounded-xl overflow-hidden my-6 not-prose">
            <Image src="/images/collector-vault.png" alt="コレクター向けプライベートヴォルト" fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-peat/30 to-transparent" />
          </div>
'''

    # Brand mini profile
    cat_label = CAT_LABEL.get(b["category"], "ウイスキー")
    age = int(b["age_years"]) if b["age_years"] else 0
    age_label = f"{age}年熟成" if age > 0 else "ノンエイジ"
    price = int(b["reference_price_jpy_2026_05"])
    rarity_label = {"common": "コモン", "mid": "ミッド", "high": "ハイ", "ultra": "ウルトラ", "ultra-rare": "ウルトラレア"}.get(b["rarity_tier"], b["rarity_tier"].upper())

    # TOC items
    toc_items = [(f"section-{i}", s[0]) for i, s in enumerate(data["sections"])]
    toc_html = "\n".join(
        f'              <li><a href="#{t[0]}" className="hover:underline">{i+1}. {t[1]}</a></li>'
        for i, t in enumerate(toc_items)
    )

    # Sections with anchored IDs
    h2_blocks = []
    for i, s in enumerate(data["sections"]):
        body_html = md_to_html(s[1])
        body_escaped = body_html.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
        h2_blocks.append(
            f'          <h2 id="section-{i}">{i+1}. {s[0]}</h2>\n'
            f'          <div dangerouslySetInnerHTML={{{{ __html: `{body_escaped}` }}}} />'
        )
    h2_html = "\n\n".join(h2_blocks)

    # FAQs combine angle-specific + common
    angle_faqs = []  # Could add angle-specific FAQs, for now just use common
    all_faqs = common_faqs(b, data["slug_suffix"])

    faq_schema = "{" + '"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [' + ", ".join(
        '{ "@type": "Question", "name": ' + repr(q) + ', "acceptedAnswer": { "@type": "Answer", "text": ' + repr(a) + " } }"
        for q, a in all_faqs
    ) + "] }"

    faq_react = ", ".join(
        f'{{ q: {repr(q)}, a: {repr(a)} }}' for q, a in all_faqs
    )

    # Related angles (excluding current)
    related_angles = [
        ("takaku-uru", "高く売る方法"),
        ("nisemono-mikata", "偽物の見分け方"),
        ("ranking", "買取業者ランキング"),
        ("rekishi", "歴史と特徴"),
        ("kihaku", "希少性・投資価値"),
        ("auction-suii", "オークション推移"),
        ("kaifu-zumi", "開封済みでも売れる"),
        ("hako-nashi", "箱なしでも買取"),
        ("label-yogore", "ラベル汚れでも査定"),
    ]
    related_links = "\n".join(
        f'            <Link href="/articles/{b["slug"]}-{a[0]}/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">{a[1]}</span><p className="text-sm font-bold mt-1">{name}の{a[1]}</p></Link>'
        for a in related_angles if a[0] != data["slug_suffix"]
    )
    related_links += f'\n            <Link href="/articles/{b["slug"]}-kaitori/" className="block bg-white border border-warm-border rounded-xl p-4 hover:shadow-md transition-shadow"><span className="text-xs text-amber-dark font-bold">銘柄ガイド</span><p className="text-sm font-bold mt-1">{name}の買取相場ガイド（完全版）</p></Link>'

    content = f'''import type {{ Metadata }} from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {{
  title: {repr(data["title"])},
  description: {repr(data["description"])},
}};

function FaqSchema() {{
  return <script type="application/ld+json" dangerouslySetInnerHTML={{{{ __html: JSON.stringify({faq_schema}) }}}} />;
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
            <li><span className="text-foreground">{data["toc_label"]}</span></li>
          </ol>
        </nav>

        <div className="article-hero mb-8">
          <Image src="{hero}" alt={repr(data["h1"])} width={{1200}} height={{440}} className="w-full h-[220px] object-cover rounded-xl" priority />
          <div className="article-hero-overlay rounded-xl" />
        </div>

        <article className="prose">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2 !border-none !pb-0 !mt-0">{data["h1"]}</h1>
          <p className="text-warm-gray text-sm mb-6">最終更新: 2026年5月14日 / 監修: PeatBid編集部</p>

          {{/* Brand mini profile */}}
          <div className="bg-cream/30 border border-warm-border rounded-xl p-4 mb-6 not-prose">
            <p className="text-xs text-amber-dark font-bold tracking-wider mb-2">対象銘柄</p>
            <p className="font-display text-xl font-semibold text-ink">{name}</p>
            <p className="text-xs text-warm-gray mt-1">{cat_label} / {b["origin"]} / {age_label} / 希少度 {rarity_label} / 参考相場 {fmt(price)}前後</p>
            <p className="text-xs text-warm-gray mt-2">→ <Link href="/articles/{b["slug"]}-kaitori/" className="text-amber-dark underline">{name}の買取相場 完全ガイドへ</Link></p>
          </div>

          {{/* Table of Contents */}}
          <div className="bg-cream/40 border border-amber/30 rounded-xl p-5 mb-8 not-prose">
            <p className="font-bold text-base mb-3 text-ink">📑 目次</p>
            <ol className="space-y-1.5 text-sm text-amber-dark">
{toc_html}
            </ol>
          </div>

          <p>{data["intro"]}</p>
{extra_visual}
{h2_html}

          <div className="bg-gold-bg border-2 border-amber/30 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-base mb-3 text-center">{name}の無料一括査定はこちら</h3>
            <p className="text-sm text-warm-gray text-center mb-4">複数業者の入札を比較して、最高値を引き出しましょう。査定無料・キャンセル無料。</p>
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
                <div className="px-5 pb-5 text-sm text-warm-gray leading-relaxed" dangerouslySetInnerHTML={{{{ __html: faq.a.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>') }}}} />
              </details>
            ))}}
          </div>

          <h2>関連記事</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
{related_links}
          </div>

          <p className="text-xs text-warm-gray mt-8">※本記事の情報は2026年5月14日時点の参考値です。最新の査定額は各業者にお問い合わせください。PRリンクを含みます。</p>
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
    print(f"✓ Generated {count} expanded angle pages")


if __name__ == "__main__":
    main()
