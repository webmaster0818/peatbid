# peatbid.com — ウイスキー買取アフィリエイト

Discord ch: `1481155786087469068` / deploy: `peatbid-deploy`（方式B、CF Pages）
ビルド: `NODE_OPTIONS="--max-old-space-size=8192" npm run build`（OOM対策必須）

## 作業ログ

### 2026-06-11 MediaXAI依頼: 最短・最大収益化の課題設定と戦略
GSC実数（本日取得）で診断:
- 28日: クリック12・表示605・平均17.8位。週次1〜6クリックで横ばい
- 90日で表示が付いたのは63ページのみ（全2,919中）。tier2は2,397pで表示1回＝実質未インデックス
- 勝ち筋: yamazaki-nv-kaitori「山崎 ノンエイジ 買取相場」9.9位
- /articles/・/tier2/・/souba-ranking/ ハブはまだ未インデックス（6/10再構築の効果待ち）

**最重要発見: 収益配線が未接続。** 全2,858ページの送客リンクが生URL（joylab.jp / buysell / licasta / hikakaku 直リンク）。ASPトラッキング（a8/アクトレ等）のリンクがサイト全体で0本 → クリックが発生しても成果計上されない。直契約で別計測があるかMediaXAIに要確認。

課題設定（ボトルネック順）: ①収益配線 ②インデックス ③順位（マネーページ1ページ目）④CVR。
戦略3フェーズをDiscordに報告済（Phase0=ASP配線+勝ち筋強化、Phase1=tier2検証2週→ダメなら縮小、Phase2=被リンク/一次データ資産化）。

**MediaXAI回答: ASPはA8/フェルマ/レントラックス/afb/TSCを別サイトで契約済み・peatbid分は申請中→配線は承認待ち。それ以外を先行**。

#### 同日実行（Phase 0のASP以外）
1. **タイトル/H1のクエリ整合＋鮮度動的化**: generate-brand-pages-v3.py の meta_title/H1 を「市場相場」→「**買取相場**」に変更（検索クエリは全て「買取相場」で来ていた）。【2026年最新】→生成時の年月`MONTH_TAG`【YYYY年M月最新】に動的化（週次cron再生成で自動鮮度維持）。50 kaitoriページ反映。
2. ビルド→deploy同期→両repo push→**本番curl確認済**（yamazaki-nv-kaitoriで新タイトル確認）。
3. **Indexing API 58URL送信成功**（/articles/ /tier2/ /souba-ranking/ + whisky-toushi-hajimekata + 全54 kaitori）。tokenは gsc-token.json（indexingスコープあり）、スクリプト雛形=/tmp/peatbid_indexing.py 相当。
4. ⚠️ **Next 16.2でRSC payloadが`__next*.txt`→`index.txt`に改名**。weekly-yahoo-update.sh の削除パターンを`*.txt`全削除に修正済（CF 20k上限対策の維持）。

#### 同日: 内部リンク再構築(6/10分)の全数監査（MediaXAI依頼）
監査方法=out/全2,919頁のhref抽出で壊れリンク検査＋ホームからのBFS到達性＋robots/sitemap整合（スクリプト雛形 /tmp/audit_links.py, /tmp/audit_reach.py 相当）。
- **健全**: 壊れ内部リンク0、全実ページがホームから深さ2以内、robots=index 2,917/noindexは404系2頁のみ、sitemap⇄ビルド不整合0。tier2リーフのパンくず・47ハブの兄弟チップ(東京→関東6県)も本番反映確認済。リーフURLは `/tier2/{pref}/{brand}-kaitori/`（-kaitori付き。素の/{brand}/ではない）
- **発見した問題(修正済)**: 孤立ページ3件 ①whisky-toushi-hajimekata(被リンク0)→/articles/ハブにチップ追加(+souba-rankingチップも) ②/author/ ③/content-policy/(両方とも被リンク0かつsitemap未掲載)→footer「サイト情報」列に追加＋sitemap STATIC_PAGESへ(2917 URL)
- 今回はtier2込みでフルrsync（footer変更をtier2にも反映、deploy=3,134ファイル）
- ⚠️計測注意: minified HTMLはgrep -cだと常に1になる（grep -o|wc -l を使う）

### 2026-06-13 戦略残タスク実行（MediaXAI「残タスク進めたい」）
1. **勝ち筋ページ集中改修（generator v3に恒久実装＝週次再生成でも維持）**: ①全50 kaitoriページに「箱なし・付属品なしで売る場合の買取相場」H3（中央値×80-90%の円レンジ自動計算＋hako-nashi角度ページへ誘導）＋箱なしFAQ（クエリ「山崎 ノンエイジ 買取相場 箱無し」8.1位対応） ②NV5銘柄（yamazaki/hibiki/hakushu/yoichi/miyagikyo）に**「年代指定なし」「NV」表記ゆれ対応**（リード注記＋FAQ。「グレンファークラス 年代指定なし 買取」等のクエリ群が来ている）
2. **Phase 2前倒し: /souba-index/（ウイスキー買取相場指数）公開**: `scripts/generate-souba-index.py`＝price-history週次中央値→基準週100の等ウェイト合成指数（総合/JP/SC 3系列・現在3週分44銘柄・SVGチャート・メソドロジー・**出典明記で引用歓迎**=被リンク資産）。週次cronに組込済＝自動成熟。layout hubLinks＋sitemap(2919URL)登録
3. **tier2中間検証(6/13)**: URL検査=主要ハブ・リーフとも依然「Discovered-not indexed」最終クロール無し、sitemap indexed=0。6/10内部リンク改修から3日では未反映。**正式判定は6/24のまま**。唯一indexedはyamazaki-nv(6/6クロール)。→権威(被リンク)が本丸という診断を補強
4. Indexing API 12URL送信（souba-index＋NV5＋勝ち筋6）。robots.txtのSitemap行は設定済みを確認
- ⚠️ビルドのNODE_OPTIONSは**同一コマンド内で指定**（Bash呼び出し間でexportは持続しない→2回目ビルドがOOMした）
- 残: ASP配線（承認待ち）/ 「{ブランド} 買取」系の汎用クエリ受け皿（ブランドファミリーハブ）は次回候補

#### 同日: 問い合わせ窓口構築（MediaXAI依頼。広告出稿・被リンクバーター交渉の受け皿）
- **構成**: `/contact/`（app/contact/page.tsx＋components/ContactForm.tsx, honeypot付き）→ POST `/api/contact` → **CF Pages Function**（peatbid-deploy repo の `functions/api/contact.js`）→ Discord Webhook で peatbidチャンネル(1481155786087469068)に通知（MediaXAI＋tomomiメンション）
- **シークレット**: deploy repoは**公開**のためWebhook URLはコード直書き禁止。CF Pages環境変数 `DISCORD_WEBHOOK_URL` が必要（**peatbidのCFアカウントは webmaster0818**（MediaXAI訂正 2026-06-11。mediax.saburo.ai0818ではない）。APIトークンは手元に無く**手動設定が必要**）。値は週次plist `com.peatbid.weekly-yahoo-update` の `DISCORD_PRICE_WEBHOOK` と同じでよい（このWebhookは生きていて宛先がpeatbid ch。GETで確認する際はUser-Agent必須=curl/8等、無いと403）
- **rsync注意**: deploy側 `functions/` は rsync --delete で消えるため weekly-yahoo-update.sh と手動rsyncに `--exclude="functions"` 必須（weekly側は追加済）
- 運用フロー: 通知→tomomiがドラフト返信をchに投稿→MediaXAI承認→メール送信（当面手動 or Gmail連携認証後にtomomiから）。Webhook経由bot投稿ではtomomiが自動起動しない可能性→MediaXAIメンションで起動
- footer「お問い合わせ（広告出稿・提携）」/sitemap 2,918 URL
- **✅稼働開始(2026-06-11 14:00頃)**: MediaXAIが新規Webhook作成→CF env var `DISCORD_WEBHOOK_URL`(Secret)設定→再デプロイ→tomomiのテストPOSTが200・Discord通知着弾を確認。全経路正常。CF保存ボタンが押せない時はフォーカス外し/空行削除/タイプをテキストにで回避
- **✅返信メール基盤(同日15:00頃)**: webmaster@mediax.biz からGmail APIで送信可能に。OAuth=`~/.openclaw/workspace/gsc-api/gmail_oauth_setup.py`(リモート承認: URL生成→MediaXAIが承認→redirect URLを貼ってもらいcode交換。**PKCE code_verifierをstateファイルに永続化必須**)。token=`secrets/gmail-webmaster-token.json`(gmail.sendのみ)。送信=`gsc-api/send_reply.py --to --subject --body[-file]`(差出人「PeatBid編集部 <webmaster@mediax.biz>」)。Gmail API有効化はMediaXAIがproject 487571920418で実施済。テスト送信をMediaXAIがスマホで受信確認済
- **運用フロー確定**: 着信通知→tomomiがドラフト＋対応方針をch投稿→MediaXAI承認→send_reply.pyで送信→送信報告をchへ。送信は必ず承認後

### 2026-06-18 拡張戦略 P0+P1実行（MediaXAI「進めてください」）
GSC再診断(28日): クリック14・表示541・CTR2.6%・17.4位。**全2,919頁中 表示があるのは62頁(2.1%)のみ＝記事55/tier2は2,350中わずか4頁**。勝ち筋20頁がpos4-22で待機。核心課題=面でなく①低権威で2,350 tier2がクロール予算/評価を希釈②CTR取りこぼし(pos5-11で0クリック多数)。
- **P1完了(最大レバー)**: `generate-angle-pages-v3.py`に`MONTH_TAG`(動的【YYYY年M月最新】)追加＋**9系統タイトルを全面改稿**（買取意図を前出し＋動的鮮度＋疑問形フック）。例「{name}は箱なしでも買取できる?【2026年6月最新】査定額への影響と対策」。450頁再生成。**従来は静的「2026年完全版/最新」で買取意図弱→pos5-11なのに0クリックの主因**。kaitori(brand)生成器は既に動的月＋買取相場タイトル済(6/11)。
- **P0**: 勝ち筋kaitoriは一次データ(Yahoo中央値円レンジ)+FAQ schema+動的鮮度 実装済、内部リンクも健全(各kaitori→同銘柄9系統+関連へ15本)。追加=Indexing API 22頁送信。
- ビルド`NODE_OPTIONS=--max-old-space-size=12288`→rsync(--exclude functions)→peatbid-deploy push(3137ファイル)→本番curl反映確認。
- **保留(要MediaJudgment)**: P2=tier2 2,350頁のnoindex/統合(クロール予算集中)、P3=Know記事、P4=買取相場白書(被リンク資産)。効果測定=3-4日後GSCでCTR再計測。

### 2026-06-19 P3 Know記事クラスタ（MediaXAI「フュージョンで判断→進めて」）
フルフュージョン(claude+codex+gemini)で次フェーズ判断→**P3優先**(記事だけが機能/tier2は0.17%、P2のクロール予算論はこの規模で弱い)に決定。GSC実Knowクエリ抽出(税金pos12/年代指定なし/価格推移)を起点にfusion(claude+codex)でハブ&スポーク設計→着手。
- **第1バッチ4本**: whisky-kaitori-zeikin(税金・国税庁ベース/譲渡所得50万円控除/30万円超/20万円ルール・税理士誘導)・whisky-nv-toha(年代指定なしNV)・whisky-souzoku-baikyaku(相続/チェックリスト)・whisky-souba-kimarikata(査定6要素)。
- **第2バッチ4本**: whisky-hokan-houhou(保管)・whisky-nisemono-miwakekata(偽物/断定せず専門査定誘導)・whisky-naze-takai(高騰理由)・**whisky-sell-guide(ピラー=全スポーク束ねる導管)**。
- 全記事=手書きpage.tsx(whisky-toushi-hajimekataテンプレ準拠)＝結論ファースト+目次+FAQ schema+最終更新+勝ち筋kaitori/souba-rankingへ内部リンク。事実ベース・架空ゼロ・数値は実勢中央値の"目安/保証しない"・YMYL(税金/相続/偽物)は専門家誘導。/articles/ハブにチップ追加。デッドリンク回避=未作成slugは一旦プレーン化→作成後リンク復活。
- sitemap 2,927URL(記事515)・Indexing API 各バッチ4/4・本番curl確認。方式Bデプロイ(--exclude functions・.txt削除)。
- 残: 終売一覧(公式ステータス裏取り後)・価格推移2本(price-history時系列が3週→蓄積後・更新頻度決め)。効果=2-4週GSCで測定し勝ち筋ドリブンでスポーク追加。

### 2026-06-21 P4 買取相場白書（MediaXAI「①を進めよう」＝残タスク棚卸し後にP4承認）
**事前確認で重要判断**: P4「被リンク資産」の中核(週次相場指数+引用歓迎+methodology)は既存`/souba-index/`が既に担っていた→重複を避け、**absolute中央値の銘柄別スナップショット白書**として差別化(指数=トレンド/ランキング=値動き/白書=絶対値の網羅リファレンス。人は"山崎12年は¥◯"を引用する=より被リンクされやすい)。
- `app/souba-hakusho/page.tsx`=`/souba-hakusho/`「全国ウイスキー買取相場白書2026」。`data/souba-ranking.json`(44銘柄 median/category/sample_n)から: ①ヘッドライン統計(銘柄数/中央値/最高額銘柄/延べサンプル) ②カテゴリ別サマリー(動的グルーピング・中央値of中央値・最高額銘柄) ③**主要44銘柄の実勢買取相場一覧表**(中央値降順・各銘柄→kaitoriへ内部リンク)=白書の中核 ④メソドロジー ⑤引用歓迎(出典表記例) ⑥souba-index/ranking/sell-guideへ相互リンク。免責=中央値は中古実勢の参考・買取は手数料等で下回る・保証しない。
- 内部リンク: layout hubLinks(PC/モバイル)に「買取相場白書」追加=全ページから到達(index/rankingからも相互)。sitemap STATIC_PAGES+1(generate-sitemap.mjs)→2928URL。
- ビルドEXIT0(heap12288)・**sitemap再生成は後工程→out/に手動cp必須**(忘れるとout/sitemapが古い)・方式Bデプロイ(.txt削除・--exclude functions)・本番curl(title/44銘柄表/nav)確認・Indexing API 1/1。
- ⚠️確認: peatbid-deploy working treeに`functions/`は無く git未追跡だが、**live /api/contact=405(=存在)**＝CF側に保持されており問題なし。tokenは未定義で死んでた`amber`等の話はgold側(peatbidはamber定義済)。
- 残(P2/P3leftover): P2=tier2 2,350のnoindex可逆(要GO・最弱層から)/終売一覧/価格推移2本(データ蓄積待ち)。効果1-4週GSC。

### 2026-06-25 次戦略フルフュージョン→P0実行（MediaXAI「フルフュージョンで策定」→「p0進めよう」）
`fusion --full`(claude+codex+gemini-2.5-pro)でpeatbid次戦略を策定（codexタイムアウト・claude+gemini統合）。結論=**量産凍結・選択と集中**。GSC28日=18clk/716imp/CTR2.51%/pos16.3(前28日13/405/18.8→imp+77%)。
- **P0-1 インデックス被覆監査**: GSCページレポートで種別別「表示≥1ページ数/clk」分解→買取kaitori 11頁/8clk・偽物 6頁/4clk・**tier2は2350中34頁/2clk(死に在庫)**・全2913中表示94頁(3.2%)。フュージョン診断(量産有害/偽物→買取が本命)を実データで確定。
- **P0-3 偽物→買取の換金導線(最重要・即収益)**: `scripts/generate-angle-pages-v3.py`に`bridge_module`恒久実装(angle_suffix=="nisemono-mikata"のみ)。`{h2_html}`と無料一括査定CTAの間に注入。心理導線=本物確認→「いま売るといくら?(実勢中央値market_label明示)」→STEP1相場ガイド/STEP2高く売る/STEP3業者比較。51偽物ページに自動付与・週次再生成維持。
- **P0-2 偽物タイトル刈り取り**: render_nisemono_mikataのtitleを「本物との違い5点（ラベル・キャップ・液面）と売却前チェック」に(具体語＋売却意図前出し・写真誇張なし)。
- ビルドheap12288・方式B(.txt削除/--exclude functions・3193ファイル)・source+deploy両push・本番curl(換金導線/新title)確認・Indexing API 15偽物頁。
- 次=P0-2を買取＋striking distance(白州NV pos12.8/響30/グレンファークラスpos13-19)へ展開→P1(偽物テンプレ横展開＋内部リンク)。効果1-2週GSC(CTR・買取アフィリclk)。⚠️ASP配線は依然承認待ち(生URL送客のまま)。

### 2026-06-28 P1① 基幹4銘柄の総合・真贋ハブ新設（MediaXAI「①いこう」）
P1選択肢①（基幹銘柄の真贋ハブ）を実行。`scripts/gen-nisemono-brand-hubs.py`で4ハブ生成：`/articles/{yamazaki|hibiki|hakushu|macallan}-nisemono-mikata/`。汎用「○○ 偽物 見分け方」高ボリュームクエリの受け皿。
- 中身=ブランド一般の真贋5チェック(ラベル/キャップ・封緘・ホログラム/液色・液面/底面刻印/購入経路・事実ベース・断定鑑定せず専門店鑑定/メーカー確認へ誘導=YMYL配慮)＋**ボトル別ハブ**(各variation 12/18/25/55/NV等の偽物＋買取ページへ内部リンク集約・山崎10本)＋**換金導線**(本物確認→相場→高く売る→一括査定)＋FAQPage/Article schema。
- base銘柄(yamazaki等)はbrands.csv/price-history無し→render_page非再利用、手書きテンプレ。hero=各先頭variantのheroを流用。変数リンク先(各variantの偽物/買取)は全て実在検証済=壊れリンク0。
- ビルドheap12288・EXIT0・sitemap 2932(+4)・方式B(.txt削除/--exclude functions)・両push・本番200確認・Indexing API 4/4。⚠️sitemaps().submitは403(scope)だがrobots.txt掲載済＋Indexing APIで代替。
- 次=②striking distance(白州NV pos12.8/響30/グレンファークラス)への偽物→買取展開＋ハブ⇄variation相互内部リンク。効果1-2週GSC。

### 2026-06-28 P1② striking distance押し上げ＋ハブ⇄バリエーション相互内部リンク（MediaXAI「②進めよう」）
GSC28日(6/1-6/28)striking distance(pos6-20)特定: yamazaki-nv-kaitori(imp121/11.6)・**glenfarclas-25-kaitori(imp109/13.5)**・ichirosu-double-distilleries(55)・hakushu-nv(53)・springbank-15(49)・bowmore-blackbowmore(42)等、0clk表示積み上げが本命。クエリ=「ノンエイジ/年代指定なし 買取」高intent反復。
- **真贋ハブ7化**: ①の4ハブにstriking distance×複数variationの ichirosu(3)/bowmore(3)/springbank(2) 追加。`gen-nisemono-brand-hubs.py`のBRANDSに3家族追加＋maker参照を中立化(サントリー/ニッカ→メーカー・正規輸入元=スコッチ銘柄でも正確に)。
- **ハブ⇄バリエーション相互内部リンク完成**: 両生成器(generate-brand-pages-v3/generate-angle-pages-v3)に`HUB_FAMILIES`定義＋「各variation→family真贋ハブ」上リンクを恒久実装(週次維持)。単一variation(glenfarclas等)は対象外で0本。50買取+450角度再生成。
- ビルドheap12288 EXIT0・sitemap 2935(+3)・方式B・両push・新3ハブ本番200・uplink反映確認・Indexing API 10/10(新3ハブ+striking7頁)。
- **次候補(最大の単一機会)**: 「グレンファークラス 年代指定なし 買取」(imp109/pos9-18)がglenfarclas-25(25年)に着地=年代ミスマッチ。glenfarclasは単一variation→ハブ非対象。「年代指定なし/105」受け皿1本で刈り取り可能。MediaJudgment待ち。効果1-2週GSC。

### 2026-06-29 ②続: グレンファークラス「年代指定なし/105」受け皿（MediaXAI「続きを進めよう」@project-peatbid）
②で発見した最大の単一striking distance機会＝「グレンファークラス 年代指定なし 買取」(imp109/pos9-18)が**glenfarclas-25(25年)に誤着地**(年代×クエリのミスマッチ)を解消。年代指定なし＝**Glenfarclas 105(カスクストレングス/NAS/60%)**の受け皿を新設。
- **実データ厳守**: `fetch-yahoo-medians.py`の`median_for_query("グレンファークラス 105")`で実落札取得→**中央値¥8,225/n52**(IQR済・insufficient:false)。`glenfarclas-105`をbrands.csv追加(age空=NAS/abv60/common)＋`write_history`でprice-history生成。
- **表記ゆれ**: `generate-brand-pages-v3.py`の`is_nv`を`endswith("-nv") or endswith("-105")`に拡張＋`nv_base_name`から"105"除去→note/FAQが「**グレンファークラス 年代指定なし**」「グレンファークラス NV」を生成(クエリ一致)。
- **クラスタ**: glenfarclasをHUB_FAMILIES＋hub gen BRANDSに追加(25+105の真贋ハブ`glenfarclas-nisemono-mikata`)。
- 再生成=8ハブ/51買取/459角度。ビルドheap12288 EXIT0・sitemap2946(+11)・方式B両push・本番200・年代指定なし×11/中央値¥8,225確認・Indexing API 6/6。効果1-2週GSC。
- ⚠️**新ブランド追加の正攻法**=median_for_query実取得→n≥20確認→brands.csv＋write_history→generator再実行（架空median厳禁）。

### 2026-07-01 P次①②③実行（MediaXAI「①②③進めて」@project-peatbid）
next-action-fusion-2026-06-30.md の①②③を実行。
- **①グレンファークラス105クラスタ押し上げ＋②コア買取クラスタ集中**: 3ハブ(souba-index/souba-ranking/souba-hakusho)に「注目の買取相場（強化クラスタ）」内部リンクブロックを新設し、**glenfarclas-105-kaitori／yamazaki-nv-kaitori／hakushu-nv-kaitori** へ下向き集中リンク（これまで3ハブは勝ち筋に0リンクだった）。gf105は自クラスタ10角度ページ＋真贋ハブと既に相互リンク済を確認。⚠️souba-index/rankingの**generatorはdata JSONのみ生成しpage.tsxは手書き**＝直接編集で週次上書きされない。
- **③GA4アウトバウンド計測**: layout headに gtag＋**外部/sponsoredリンククリックのoutbound_clickイベント送信**を実装。`process.env.NEXT_PUBLIC_GA_ID`ゲート＝**ID未設定時は何も描画しない(本番で確認済gtag=0)**。有効化には**MediaXAIがGA4測定ID発行＋CF環境変数 NEXT_PUBLIC_GA_ID 設定＋再デプロイ**が必要（ASP承認前でも送客クリックを可視化できる）。
- ビルドheap12288 EXIT0・方式B(.txt削除/--exclude functions・3208ファイル)・両push・本番200＋強化クラスタ節描画確認・Indexing API 6/6。
- 残=④tier2 2350のトリアージnoindex(要目視GO)・⑤偽物クラスタ拡張。効果1-2週GSC。GA4は測定ID待ち。

### 2026-07-03 ②機会バンド10ページCTR改善（MediaXAI「②進めて」@project-peatbid）✅本番反映済み
- **新規共通モジュール`scripts/opportunity_band.py`**（BAND_BRAND_SLUGS8+BAND_ANGLE_SLUGS2/band_latest/band_title/sparkline_block）→両生成器がimport＝週次cron再生成で恒久維持
- ①title=「【毎週更新】{名}の買取相場｜ヤフオク落札中央値{実数}円基準【2026年7月】」(insufficient銘柄は既存維持・TITLE_ALIAS/MONTH_TAGと共存) ②12週スパークライン=静的インラインSVG(履歴6点・点titleに日付/中央値/n・出典/IQR明記・**3点未満は「蓄積中」正直表示**。rechartsのMarketPriceCardはクローラー不可視だったのを解消) ③FAQ先頭に中央値実数Q&A(JSON-LD反映)
- 検証=【毎週更新】titleがout/全2948中ちょうど10ページ(バンド外無変更)・build EXIT0・.txt削除・方式B両push・本番確認・Indexing 10/10
- ⚠️**6/29報告の「glenfarclas-25意図分離導線」は実在せず**（105 title側のみ対応済だった）→25年→105導線は③とあわせて実装する
- 次=③真贋第2弾(偽造実在×機会バンド8本・真贋→買取遷移計測) ④相場指数レポートハブ ⑤税金/NVとは収益化＋誤着地クエリ自動抽出の木曜定例組込

### 2026-07-04 ③真贋第2弾（MediaXAI「③進めよう」）✅本番反映済み
- **CVブロック=真贋系59ページ全数**(偽物51+ハブ8): 「本物なら実勢中央値¥X→相場→コツ→一括査定」3STEP。実数はband_latest一元化・insufficientは金額非表示。class shingan-to-kaitori/kaitori-to-shingan=GA4配線フック(測定ID待ち)。ハブにボトル別中央値リスト＋**weekly-yahoo-update.shに[4.2/7]ハブ再生成を追加**(従来週次対象外で陳腐化するところだった)
- **買取前チェック=新規0・既存強化7**({yamazaki-12,yamazaki-nv,hakushu-nv,bowmore-blackbowmore,springbank-15,ichirosu-dd,glenfarclas-25}-nisemono-mikata)。**yoichi-20/taketsuruは偽造根拠なしで除外**(架空煽り禁止)。title「{銘柄}を売る前に｜本物チェックと今の買取相場」+売る前3分チェック+中央値ブロック+FAQ実数
- glenfarclas 25⇄105双方向の意図分離導線(INTENT_SPLIT)。**6/29報告の導線は実在しなかった**→今回初実装
- 🚨**blackbowmore品質ゲート3層**: 中央値¥4,000=「ブラックボウモア 700ml」クエリにミニチュア/空瓶混入(実物数百万円級)が**7/3から本番title露出**→①fetch-yahoo-mediansにforce insufficient ②opportunity_band.DATA_QUALITY_EXCLUDE(band/sparkline) ③brands.csv中央値クリア。kaitori titleは「状態別の目安」insufficientモードへ。**教訓: fetchクエリの中央値は実物価格帯との桁チェックが必要**(週次デイリーで自動検知する仕組みは今後の課題)
- sitemap 2946不変(新規URL0)・build EXIT0・方式B両push・本番確認(precheck7/4000円ゼロ/glenfarclas双方向)・Indexing 10/10。次=④相場指数ハブ/⑤税金・NVとは収益化+誤着地自動抽出の木曜定例

### 2026-07-05 誤着地対策(detect-mislanding検出→受け皿実装)（MediaXAI「うん進めて」）
戦略expansion-fusion打ち手①の横展開。`detect-mislanding.py`(新規GSC検出ツール)で総称クエリ×年代特化ページの誤着地を自動抽出→即実装:
- **springbank-kaitori 新設**: スプリングバンクは年代指定なし受け皿が無く「スプリングバンク 年代指定なし 買取」がspringbank-15年ページに誤着地(pos6.9/CTR0)していた→年代別相場表(15年¥35k/21年¥97k・souba-ranking由来毎週更新)+ラベル年数の見分け方+15/21年ページへ分岐+FAQPage schemaの受け皿ハブを作成
- **springbank-15/21ページ冒頭に意図分離コールアウト**(「年代指定なしはこちら」→受け皿)
- **glenfarclas-25 description**: 25年=単一年代を明示し105(年代指定なし)との曖昧性解消(GF「年代指定なし」5クエリ106impが依然25年に誤着地・CTR0の緩和)
- build EXIT0・方式B両push・受け皿本番200/実データ相場表確認・Indexing 4/4。効果1-2週GSC。**detect-mislandingを木曜GSC定例に組込めば受け皿候補が自動で積み上がる**(次の運用課題)。残=③真贋第2弾

### 2026-07-19 N1① スコッチNVクラスタの内部リンク集中（MediaXAI「n1進めよう」）✅本番反映済み
フルフュージョンN1＝スコッチNVクラスタ(グレンファークラス/スプリングバンク/ボウモア/アードベッグ/グレンフィディック)の1ページ目押し上げ。GSC実測で対象を確定：「{銘柄} 買取」「{銘柄} 年代指定なし 買取」が**pos9〜16・全て0click**、着地ページ=glenfarclas-25(154imp/10.6)・springbank-15(120/11.6・4click)・bowmore-18(67)・ardbeg-uigeadail(69/14.4)・glenfiddich-30(68/12.8)。
- **実装＝「強化クラスタ」内部リンクブロックを3→8リンクに拡張**（`app/souba-ranking/page.tsx`＋`app/souba-hakusho/page.tsx`。**手書きpage.tsx＝週次cron上書き対象外**）。既存3(gf105/山崎NV/白州NV)＋**新規5スコッチ(glenfarclas-25/springbank-15/bowmore-18/ardbeg-uigeadail/glenfiddich-30)**。この2ハブはlayout hubLinksで全ページから到達＝サイト全体から5スコッチへ内部リンク集中。intro文もスコッチ言及に更新。
- 条件受け皿は既存で充足（全5に-hako-nashi角度ページ有・gf/springbank/bowmoreはNV受け皿有）。titleも既に【毎週更新】…実数円基準で最適化済。
- build EXIT0(heap12288)・方式B(.txt削除/--exclude functions,tier2・3171ファイル)・両push・本番souba-ranking 5/5リンク確認・Indexing API 7/7。効果1-2週GSC(5銘柄のpos・click)。
- **残N1②**: ①勝ちページ(yamazaki-nv/hakushu-nv)→スコッチへの直接クロスリンク（generate-brand-pages-v3.pyは関連銘柄がcategoryロック=JP↔JP→cross-categoryモジュール追加が必要） ②ardbeg/glenfiddichはNV受け皿・真贋ハブ無し(低volだが構造ギャップ)。効果測定後に判断。

### 2026-07-19 N1② クロスカテゴリ相互リンク＋アードベッグ真贋ハブ（MediaXAI「①②共に進めよう」）✅本番反映済み
N1①(強化クラスタ)の続き。①勝ちページ→スコッチ直接リンク②ardbeg/glenfiddich受け皿整備。
- **①クロスカテゴリ`CLUSTER`モジュール（恒久・generate-brand-pages-v3.py）**: 関連銘柄がcategoryロック(JP↔JP)で勝ちページ(山崎/白州NV)→スコッチが張れなかった問題を解消。`CLUSTER`=JP NV2＋スコッチ6(gf105/gf25/springbank15/bowmore18/ardbeg-uigeadail/glenfiddich30)を定義し、全51 kaitoriページに「年代指定なし・注目銘柄の買取相場」モジュールを注入(自ページ除外)＝**山崎NV/白州NV⇄5スコッチを双方向で内部リンク集中**（週次cron維持）。本番yamazaki-nv 5/5リンク確認。
- **②ardbeg真贋ハブ新設**: ardbegは2バリエーション(uigeadail+corryvreckan)＝ハブ正当。HUB_FAMILIES(brand+angle両gen)＋gen-nisemono-brand-hubs BRANDSにardbeg追加→`/articles/ardbeg-nisemono-mikata/`生成・variation上リンク配線。本番200。
- **glenfiddichは新規ページ作らず**（median_for_queryでグレンフィディック12/18年のYahooデータ取得不可＝実データ無し→架空median厳禁・作らない勇気。glenfiddich-30が唯一データ有）。generic「グレンフィディック 買取」はCLUSTERリンクで補強。
- 3ジェネレータ再実行(51 brand/459 angle/9 hub)・sitemap2954(+ardbeg hub)・build EXIT0(heap12288)・方式B(.txt削除/functions保全・3219ファイル)・両push・本番確認(edge伝播ラグ＝?cb再確認で5/5+hub200)・Indexing 9/9。効果1-2週GSC。
- 残: glenfiddich共通ボトル受け皿は週次Yahooでデータ取得できたら追加検討。


### 2026-08-03 P1実行=「銘柄 買取」をNVページへ寄せ替え（MediaXAI「P1すすめて」）✅本番反映済み
対策計画=`~/.openclaw/workspace/peatbid-plan-2026-08-03.md`。GSC90日=c133/i11,178・**週次はc5-6→c19-22/i1,300で表示7倍**の成長基調。
- **勝ちパターンの特定**: `/articles/yamazaki-nv-kaitori/` がc31/i850/9.6位/**CTR3.65%=サイト全体の23%のクリック**を1ページで稼ぐ。型=「ノンエイジ(年代表記なし)の検索意図 × 実データ(ヤフオク中央値・落札データ・状態別目安)」。titleは「【毎週更新】山崎ノンエイジの買取相場｜ヤフオク落札中央値10,175円基準」
- **🚨最大の発見**: 「銘柄 買取」(年代表記なし)が**年代版ページに着地するミスマッチ**。ボウモア買取→blackbowmore(19.3位)/グレンフィディック買取→30年(12.5位)/竹鶴買取→25年(29.4位)/宮城峡買取→15年(**33.6位**)/スプリングバンク買取→15年(18.5位)。**NVページは10銘柄分あるのにGoogleが年代版を選んでいた**。山崎だけが正しくNVに着地して勝っている
- **実施**: ①NVページtitle 7本を勝ち型へ統一。**実相場データ(data/yahoo-medians.json)がある銘柄のみ中央値を明記し、データ無し/n=2の銘柄(bowmore/glenfarclas/laphroaig/springbank/talisker/miyagikyo/yoichi)は数値を書かず「銘柄名+買取価格+ノンエイジ」前方型に**(捏造回避) ②年代版6本の本文冒頭に「年数表記がない場合は→NVページ」の誘導ブロック(`nv-redirect-202608`マーカー冪等)
- ⚠️NV版が存在しない3銘柄(グレンフィディック/竹鶴/アードベッグ・計152imp)はリンクを作らず。年代版titleは既に年代明記済みで意図分離できているため変更不要と判断
- build EXIT0・**CF 20k対策(29,144→3,173ファイル・robots.txt保全)**・両push・Indexing 13/13。効果1-2週GSC(該当約540impが正しい受け皿に載るか)

### 2026-08-24 N1実行：年代指定なし(NV)ページへの内部リンク集中（MediaXAI「n1進めて！」）✅本番反映済み
- **問題**: GSC実測で「◯◯ 年代指定なし 買取」系クエリ 2,398imp のうち **1,457imp が同ブランドの年数ページに着地して0クリック**（例: グレンファークラス25年ページが「グレンファークラス 年代指定なし 買取」pos5.4／ラフロイグ25年が pos3.4）。**NVページ自体は実在していた**のに表示が1impしかなかった＝自社内カニバリ。
- **真因はコード内の `CLUSTER`**（全ページから相互リンクする銘柄リスト）に **yamazaki-nv と hakushu-nv の2つしか入っていなかった**こと。被リンク実測 = 山崎NV 64 / 白州NV 63 に対し、他のNVページは **3〜16本**。Googleがリンクの多い年数ページを代わりに出していた。
- **対応（`scripts/generate-brand-pages-v3.py`）**:
  ① **`NV_PAGES`（実在する11のNVページ）を新設**し、全ブランドページに「熟成年数の表記がないボトルをお持ちの方へ」節を追加して相互リンク → 被リンクを **52〜64本に均一化**。
  ② 年数ページ→自ブランドNVページの導線を、手書き辞書 `INTENT_SPLIT` 依存から**自動生成**に変更（`{family}-nv` が実在すれば自動で出る）。登録漏れだった yamazaki-55 / hakushu-25 / yoichi-15 / miyagikyo-15 / bowmore-blackbowmore に新規で導線が付いた。
  ③ 生成器を直したので**毎週月曜のcron再生成でも消えない**（page.tsx直接注入は消えるため必ず生成器側に入れる）。
- ⚠️ **スコッチ系のNVページ6本（ardbeg/bowmore/glenfarclas/laphroaig/springbank/talisker）は手書き＝brands.csvに無く週次再生成の対象外**。`NV_PAGES` のリストとページの実在は手動で対応させること（増減したら両方直す）。
- 検証: 本番でNVリンク13〜14本／NVページ11本すべて200／**記事内リンク切れ0件（550ページ全走査）**／手書きNVページの上書きなし／sitemap 3,003URL維持／Indexing 19/19。
- **効果測定（2〜3週）**: 順位ではなく**着地URLの入れ替え**を見る。GSCのページ×クエリで、該当クエリの着地が年数ページ→NVページに変わるか。1,457imp/0click が動けば成功。
- 残N2: NVページが無い5ブランド（グレンフィディック pos9.8/60imp/0click・竹鶴 pos27.5/89imp/0click・マッカラン・軽井沢・バルヴェニー）。⚠️**竹鶴は「専用NVページを作らず竹鶴ピュアモルトへ寄せる」と過去に判断済み**（GSC実測で中身が年代指定クエリ中心だったため）。N2着手時はこの判断の見直しから相談する。

### 2026-08-27 GSC再測定→N2実行（MediaXAI「最新のGSCデータ見た上で、ネクストアクション実行して」）✅本番反映済み
- **サイトは順調**: 6月 click29/imp1,123/pos16.6 → 7月 88/5,584/15.4 → **8月(1-26) 127/7,964/pos14.9**。4サイト中いちばん健全。
- ✅ **8/24のN1（NVページの受け皿入れ替え）は効いた**。今やサイトの2大クリック源:
  ```
  /articles/yamazaki-nv-kaitori/  713imp  24click  pos 9.5  CTR 3.37%
  /articles/hakushu-nv-kaitori/   419imp  17click  pos12.3  CTR 4.06%
  ```
  「山崎 ノンエイジ 買取相場」pos7.9・「白州 ノンエイジ 買取価格」pos9.9 で実際にクリックが出ている。
- 🚨 **同じ構造の取りこぼしが竹鶴とグレンフィディックに残っていた（＝N2の中身）**:
  ```
  「竹鶴 買取」(年数なし)      90imp pos28.2 → /articles/taketsuru-25-kaitori/ に着地
     内部リンク: taketsuru-pure(受け皿) 65本 < taketsuru-25(25年) 92本
  「グレンフィディック 買取」   55imp pos10.2 → /articles/glenfiddich-30-kaitori/ に着地
     内部リンク: glenfiddich-kaitori(ハブ) わずか1本 < glenfiddich-30 113本
  ```
  **N1で山崎/白州について直したのと完全に同じ原因**（受け皿より年数ページのほうが被リンクが多く、Googleが年数ページを代わりに出す）。
- **保留していた「竹鶴の扱い」への回答**: 竹鶴に `-nv` ページを新設する必要はなかった。**`taketsuru-pure`（竹鶴ピュアモルト）が年代指定なしの実体としてすでに存在**し、実データ（brands.csv・LINXAS検証値8,000円/Yahoo中央値）も揃っている。**新規作成ではなく、既存ページを受け皿として全ページから張るのが正解**。
- **実装**: `scripts/generate-brand-pages-v3.py` の `NV_PAGES` に `("taketsuru-pure","竹鶴")`、`CLUSTER` に `("glenfiddich","グレンフィディック（年代別の一覧）")` を追加。
  ⚠️ **`NV_FAMILIES` の導出を修正**: 従来 `slug.rsplit("-nv",1)[0]` だったため、接尾辞が `-pure` の竹鶴ではファミリー名が `taketsuru-pure` になり同ブランド年数ページからの自動導線が効かなかった → `slug.split("-")[0]` に変更。**スラッグの接尾辞は "-nv" とは限らない。**
- **結果（内部リンク実測）**:
  ```
  taketsuru-pure     65本 → 113本（taketsuru-25の92本を上回った）
  glenfiddich-kaitori  1本 →  51本
  ```
- ⚠️ **アンカーURL問題は継続・これは不具合ではない**: `#summary` `#current-price` 等が**全表示の30.8%（2,595imp）を占め、クリックは0**。GSC上は別ページ扱いなので**表示CTR 1.59%は過小評価**。実体は 127click ÷ (8,420-2,595) = **約2.18%**。KPIを見るときはアンカー分を除いて数える。
- ⚠️ **宮城峡はデータ不足で強化できない**: 「宮城峡 買取」102impが miyagikyo-nv(pos29.8) と miyagikyo-15(pos29.8) に割れているが、**miyagikyo-nv は price-history n=0・brands.csv の sample_n=2**（週次cronでも「データ不足」に分類）。相場を出せないので、受け皿の強化は実データが貯まってから。**数字が無いのに書かない。**
- 検証: 51ページ再生成・build EXIT0・**.txt 26,411件を削除して3,222ファイル**（CF Pagesの20,000ファイル上限対策・robots.txtは保全）・方式B両push・本番6URL 200・導線の描画確認・Indexing 9/9・sitemap再送信OK。
- **次に見るもの（2〜3週後）**: ①「竹鶴 買取」90impの着地が25年→竹鶴ピュアモルトに移り pos28.2 が浮上するか ②「グレンフィディック 買取」55imp pos10.2 がハブに移るか ③宮城峡NVの実データが貯まったか。

### 2026-08-29 N3①②実行（MediaXAI「まず①②進めて」）✅本番反映済み
- **①「年代指定なし」受け皿の入れ替え**。GSC実測（28日）: 「年代指定なし/ノンエイジ」クエリ **1,655imp / 25click**、うち**受け皿(NV)着地 976imp が25クリック全部を生み、年数ページ着地 679imp は0クリック**。pos3.4〜9.7と順位は良いのに、見せているページが違うだけだった。
- 🔍 **原因の特定を2段階で間違えかけた。リンク元の内訳まで見て初めて分かった**:
  ```
  第1段階の見立て: CLUSTER（全ページ相互リンク枠）に年数ページが入っていた → 差し替え
     → glenfarclas-25 は 115→66 に落ちたが、NV受け皿は52のまま動かず
  第2段階（実測）: リンク元を種別で数えた
     talisker-25 = tier2 47本 + articles 18本 = 68     talisker-nv = articles 54 / tier2 0
     laphroaig-25 = tier2 47 + articles 30 = 80        laphroaig-nv = articles 54
  ＝ **記事レイヤーではNV受け皿が既に勝っていた（54 vs 18〜31）。負けていたのは tier2 の47本ぶんだけ。**
  ```
  tier2 は `brands.csv` のslug×47県で生成され、**NVページはbrands.csvに無いのでtier2からのリンクが1本も無かった**。
- **対応**: tier2 の「関連ページ」に同ブランドNV受け皿への1行を追加（**1,363ページ**）。
  ⚠️ **tier2の全再生成はやってはいけない**: `generate-tier2-full.py` を回すと `PriceHistoryCard` が新規に入るが、**`data/price-history/*.json` 57件すべてが `PriceHistoryData` の必須フィールド（category / latest_price_boxed 等）を持っておらず型チェックで落ちる**（生成器がデータ形式の変更に追随できていない）。今回は再生成を revert し、**既存ページへの文字列挿入**で対応した。
  ⚠️ 生成器のテンプレは「買取相場（全国版）」だが、**配置済みページの文言は「市場相場（全国版）」**。生成器と現物がずれているので、パッチの正規表現は現物に合わせること。
- **結果（内部リンク実測）**:
  ```
  glenfarclas-nv  52 → 146（25年 66）    springbank-nv 53 → 147（15年 64）
  talisker-nv     54 → 101（25年 68）    ardbeg-nv     51 → 145（ウーガダール 63）
  laphroaig-nv    54 → 101（25年 80）    bowmore-nv    54 → 195（25年 81）
  ＝ 6ブランドすべてで受け皿が年数ページを上回った（山崎 303>61・竹鶴 254>92 と同じ配置）
  ```
- **②グレンモーレンジの受け皿を新設** `/articles/glenmorangie-kaitori/`。「グレンモーレンジ 年代指定なし 買取」pos8.0 等が**シグネット単体のページ**に着地して0クリックだった。
  - **先に実データを取得**（`median_for_query` を直接呼ぶ）。**5銘柄すべて n≥20 を満たした**ので公開できた:
    ```
    オリジナル10年 3,388円(n=142) / ラサンタ 5,000円(n=54) / キンタルバン 5,379円(n=32)
    ネクタードール 8,662円(n=56) / 18年 12,000円(n=226) / シグネット 20,350円(n=94)
    ```
  - `EXTRA_SLUGS` に5件登録（週次でJSONが上書きされても受け皿の実数が消えないように）。CLUSTER＋INTENT_SPLIT（signet→受け皿）にも登録。被リンク **受け皿98 > シグネット62**。
  - ⚠️ 数値は実測のみ。n<20 の限定リリースは「データが集まり次第掲載」と明記して**数字を出さない**。
- 検証: build EXIT0・本番200・実勢値6件の描画確認・tier2導線を3県で確認・sitemap 3,004URL・Indexing 8/8。
- **③（tier2の扱い）は未着手**。今回の調査で**tier2が年数ページに47本ずつリンクを集中させ、NV受け皿の足を引っぱっていた**ことが分かったので、③の判断材料が1つ増えた（1,141imp/0click に加えて「内部リンクを誤誘導していた」）。
- **次に見るもの（2〜3週後）**: ①「年代指定なし」679impの着地がNV受け皿に移るか（実績CTR2.56%なら+15〜17click/28日）②グレンモーレンジ系クエリが受け皿に移るか。

### 2026-10-05 公開前チェック（site-precheck.py）不合格4項目の修正
- **① canonical 無し 537→0**: `app/layout.tsx` の metadata に `alternates: { canonical: "./" }`（metadataBase＋各ページのパスで自URLに解決される）。生成器が作る記事ページは metadata に alternates を持たないので layout から継承＝**週次再生成でも消えない**。tier2 など個別指定のページはそちらが優先。
- **② og:image 無し 3,004→0**: `public/og-image.png`（1200×630・`scripts/make-og.py` で生成・**数字を入れない**）を layout の openGraph/twitter に指定。⚠️ページ側で `openGraph` を自前定義すると layout の images は継承されない → 県ハブ47（`gen-tier2-area.py` のテンプレも修正）と `/author/` には images を明記した。今後 openGraph を持つページを足すときも images を入れること。
- **③ favicon 無し→あり**: `public/favicon.ico`・`icon.png`・`apple-icon.png`（同じく make-og.py）。layout の `icons` で指定。
- **④ 被リンク1本以下 tier2 1,598＋記事1 → 0**: 原因は 6/10 に入れた近隣リンクが **8/4 の tier2 全再生成（JOYLAB撤去）で消えたまま**だったこと（282リーフは被リンク0）。`scripts/patch-tier2-related-links.py` を新設（冪等）＝各リーフに「近隣エリアで{銘柄}を売る」（隣接県・最大5）＋「{県}で売れる関連銘柄」（同じ蒸溜所/産地/カテゴリ・最大6）。**`generate-tier2-v4-plan-a.py` の末尾から自動で呼ぶようにした**（再生成で消えない）。`/articles/whisky-toushi-hajimekata/` は whisky-naze-takai と whisky-souba-kimarikata の本文から1本ずつリンク。
- 検証: build EXIT0（heap12288）→ precheck **全項目OK**（3,004ページ）→ 方式B（.txt削除・robots.txt保全・--exclude functions・tier2込みフルrsync）。
- ⚠️未対応（報告のみ）: `weekly-yahoo-update.sh` の `find out -name "*.txt" -delete` が **robots.txt も消している**（deployリポに 8/31 以降 robots.txt が無く、本番は Cloudflare の content-signal コメントだけで Sitemap 行なし）。`! -name robots.txt` を足す必要あり。

### 2026-10-07 サンプル不足6銘柄の tier2 リーフが「取得日 2026-08-03」のまま残っていた問題 ＋ title 年月の古いページ9本
- **原因**: `weekly-yahoo-update.sh` には **tier2 を更新する工程が一つも無い**（brand-kaitori / angle / 真贋ハブ / ランキングだけ再生成、rsync も `--exclude tier2`）。tier2 リーフは 8/4 の全再生成時の取得日 2026-08-03 がハードコードされたまま。articles 側（`/articles/{slug}-*`）は週次で再生成されており 10-05 になっていた＝ズレていたのは tier2 だけ。
  - 「サンプル不足だから」ではなく **tier2 全体が週次の対象外**。十分な銘柄（yamazaki-12 等）の tier2 本文も「¥20,680・取得日 2026-08-03」のまま（PriceHistoryCard だけ最新）。県ハブ47も「2026-08-03時点」のまま。→ **未対応（下記）**
- **対応**: `scripts/patch-tier2-yahoo-freshness.py` 新設（冪等）。`yahoo-medians.json` で insufficient=true の銘柄の tier2 リーフを文字列差し替え（取得日・n・最終更新・JSON-LD dateModified）。前回 n≥20 で中央値表示だった銘柄が n<20 に落ちた場合は、生成器の sufficient=False 分岐と同じ文言に変換（title/description/FAQ JSON-LD/本文2箇所/査定根拠1箇所。旧中央値が残ったら書かずに WARN）。
  - 週次に組込: `[4.3/7]` で実行 → 変更 slug を `/tmp/peatbid-tier2-patched.txt` に記録 → `[7/7]` でその銘柄の tier2 ディレクトリだけ部分 rsync（tier2 全体の `--exclude` は維持）。
  - ⚠️ tier2 全再生成は引き続き禁止（2026-10-04 の記録どおり price-history JSON の型不一致でビルドが落ちる）。
- **結果**: 週次が再生成する tier2 ページ数 **0 → 282**（6銘柄×47県）。うち macallan-fine-rare 47 は「¥8,480 n=20（8/3）」→「現在集計中 n=16（10/5）」に変換。build EXIT0 → precheck 全項目OK（3,004ページ）→ 方式B フル rsync（functions/robots.txt 保全）→ 本番 curl で yamazaki-55「取得日 2026-10-05、サンプル数 n=8」/ `/api/contact` 400 / robots に Sitemap 行を確認。
- **title 年月**: `out/` の `<title>` grep で【2026年8月】8本＋【2026年7月】1本（手書き記事: glenmorangie / glenfiddich / springbank / 6本の *-nv-kaitori）→【2026年10月】に。H1 にも同じタグがあった6本は H1 も揃えた。本文の価格・取得日は不変。これらは生成器を通らない手書きページなので、**月が変わるたびに手で直すか MONTH_TAG 化が必要**。
- **bowmore-blackbowmore が raw_n=106 なのに insufficient=true の理由**: `fetch-yahoo-medians.py` の品質強制フラグ（`if slug in {"bowmore-blackbowmore"}: r["insufficient"] = True`）。「ブラックボウモア 700ml」の検索結果にミニチュア/空瓶が混入し中央値 ¥3,740（実物は数百万円級）になるため、クエリ精査まで実数を出さない設計。データ不足ではなく意図的な抑止。
- **未対応（報告のみ）**:
  1. 十分な銘柄 44 の tier2 リーフ本文（中央値・取得日 2026-08-03）と県ハブ47（「2026-08-03時点」）は依然として古い。中央値を入れ替えるパッチ（または生成器の型追随）が別途必要。
  2. 逆方向（8/3 不足→10/5 十分）の ichirosu-card / karuizawa-30 の tier2 94ページは「現在集計中（取得日 2026-08-03）」のまま。中央値を差し込む変換は今回のパッチの対象外。
  3. 週次の `--exclude tier2` のままだと、tier2 HTML が参照する `_next/static/<buildId>` が毎週入れ替わる（今回は静的チャンク 200 を確認済み。要継続観察）。

### 2026-10-08 P2: tier2 全銘柄（リーフ2,397＋県ハブ47）の中央値・取得日・n・dateModified を週次データ（10/5）に同期
- **走査結果（before）**: tier2 リーフの取得日は **8/3=2,068・10/5=282（昨日の6銘柄）・6/29=47**（glenfarclas-105 のみ）。県ハブ47は全て「2026-08-03時点」。
  - 6/29 の原因: `fetch-yahoo-medians.py` の `BRAND_QUERIES` キーが旧 slug `glenfarclas-nv` のままで、brands.csv の `glenfarclas-105` に一致せず毎週 **SKIP (no query mapping)**。記事側（/articles/glenfarclas-105-kaitori/）も 6/29・¥8,225・n=52 で tier2 と一致していたので今回は値を変えず、キーを `glenfarclas-105` に直した（**10/12 の週次から取得される**）。
- **対応（全再生成はしない）**: `scripts/patch-tier2-yahoo-freshness.py` を全銘柄対応に拡張（出典を **brands.csv** に変更＝記事側 generate-brand-pages-v3.py と同じ列を読むので表示値が必ず一致）。4ケース＝十分→十分（中央値・n・日付差し替え）／不足→十分（生成器 sufficient=True 分岐の文言に変換）／十分→不足／不足→不足。書き込み前に検証（¥の出現 7＋JSON-LD 2、取得日/最終更新/dateModified スロットが全て新日付、集計中文言の残存ゼロ）、NGページは書かずに WARN。
  - ⚠️ 本文には Yahoo と無関係の日付が正当に入る（macallan-18 の「US$371 (2026-03-17, Whisky.Auction)」）。日付検証は **スロット限定**にすること（全文の日付を見ると誤検知で47ページ止まる）。
  - 結果: 変更 2,068（十分→十分 1,974＝42銘柄 / 不足→十分 94＝ichirosu-card ¥455,565 n=20・karuizawa-30 ¥32,450 n=242）、検証NG 0、2回目は変更 0（冪等）。bowmore-blackbowmore は csv の中央値が空＝自動で「集計中」のまま。
  - 県ハブ47: `gen-tier2-area.py` は brands.json だけ読む（price-history 非依存）ので再生成。差分はデータ行＋「時点」3箇所のみを確認。`dateModified` を固定値 `UPDATED(2026-06-23)` → `fetched`（取得日）に変更。
- **週次組込**: `[4.3/7]` 全銘柄パッチ（WARN をログに残す）→ `[4.4/7]` 県ハブ47再生成 → `[7/7]` 変更 slug のリーフ dir 部分 rsync＋`tier2/<pref>/index.html` 47本を同期（tier2 全体の `--exclude` は維持）。
- **デプロイ**: build EXIT0（3,006ページ）→ `*.txt` 削除（robots.txt 保全）→ root rsync（--exclude functions/tier2/_not-found）＋部分同期 2,068＋47 → precheck **全項目OK**。after: tier2 リーフ **10/5=2,350・6/29=47・8/3=0**、ハブ47=10/5。
- **buildId について**: 毎ビルドで全 HTML の RSC ペイロード内 `"b":"<buildId>"` が変わるため deploy のコミットは毎回 ~2,700 ファイル。同期しない tier2 ページに残る旧 buildId はファイル参照ではなく、全 HTML の `/_next/static/` 参照は実在を確認（precheck とは別に python で全3,007 HTML を走査）。`_headers` は deploy リポに存在しない（存在前提の記述は誤り）。
- **残課題**: 県ハブの「2026-10-05時点」は最高額銘柄の取得日を全体に当てている（glenfarclas-105 行だけ 6/29 データ）→10/12 にキー修正で解消見込み。`_not-found/index.html` は rsync 除外のまま古い CSS を参照（404.html は更新される・実害なし）。

### 2026-10-08 「ヒカカク 酒買取 口コミ／ウイスキー買取 評判／ヒカカク 口コミ」受け皿 新規（MediaXAI指示・3サイト横断） ✅本番反映済み
- title/h1/URL で「ヒカカク」検索→専用ページ無し（CTA言及のみ）→ `/articles/hikakaku-sake-kaitori-kuchikomi/` 新規（手書き page.tsx・souzoku記事の型を踏襲）
- 一次情報は hikakaku.com 生HTML（/lp/ 使い方・FAQ・利用規約・運営者情報・古物表記・公式クチコミ /hikakaku_reviews/・お酒カテゴリ=744社/52,971点・買取実績1円〜4,400,000円）。口コミは公式クチコミページの評価分布（総合3.4・1,083件・「悪い比率32.5%」は公式表示）＋傾向のみ。転載・架空・捏造なし
- 酒切り口: カテゴリ「日用品・コスメ・食品・お酒」→ウイスキー、未開封/液面/箱を備考に、高額銘柄は銘柄ページの実勢で照合、相続まとめ売りは出張・宅配
- 内部リンク元: 記事一覧チップ / whisky-sell-guide / whisky-kaitori-souba（関連記事カード）/ whisky-takaku-uru（同）/ whisky-souzoku-baikyaku / faq。sitemap 3005 URL（generate-sitemap.mjs が app/articles/* を列挙＝自動）
- precheck: 初回「og:image が無い」不合格（自前openGraphがlayoutのimagesを上書き）→ `images:["/og-image.png"]` 追加→✅全項目OK。ビルド12288で2回・各約10分

### 2026-10-09 P2: 「4業者」「4社」表記を実数「3」に修正（tier2 2,397＋kaitori 51＋ranking 51＋手書き5＋TOP）＋ tier2 に og:url
- **事実確認**: 全ページで実際に掲載している業者は **3社**。tier2・kaitori「参考リンク」・takaku-uru・hibiki/yamazaki ハブ＝LINXAS／バイセル／福ちゃん、kaitori「おすすめ買取業者」・ranking 1〜3位・TOP・track-record＝ヒカカク！／バイセル／リカスタ。「4」は 8/4 の JOYLAB 撤去後に文言だけ残ったもの（tier2 生成器の `<ul>` には空行が1つ残っている＝4つ目があった痕跡）。
- **触らなかった「4社」**: ranking 本文の「最低3社、できれば4社以上で相見積もり」（相見積もりの助言。業者数ではない）、kuchikomi の「744社」「3〜4社から結果が届く」（ヒカカク公式の掲載社数・口コミ傾向）。
- **生成器（再生成で戻らないように）**: `generate-tier2-v4-plan-a.py`（description 2種・intro 4種・本文・h3「主要4業者」＝全 4業者→3業者。metadata に `openGraph: { url: canonical, images: ["/og-image.png"] }` 追加）／`generate-brand-pages-v3.py`（meta description 2種・TOC「10. おすすめ買取業者4社」・h2・「下記の4業者ページ」）／`generate-angle-pages-v3.py`（ranking intro「買取業者4社を、ランキング形式で」）／`patch-tier2-yahoo-freshness.py` の description 正規表現を `[34]業者` に（新旧どちらの文言でも週次パッチが効く）。
- **tier2 は全再生成せず** `scripts/patch-tier2-buyer-count.py` 新設（冪等・app/tier2 の page.tsx を文字列差し替え。掲載リンクが3本でないページはスキップして WARN）。結果: 対象 2,397 / 変更 2,397 / スキップ 0。「4業者」出現 **5,746 → 0**（page.tsx ベース）。og:url は canonical と同値を 2,397 ページに追加（page 側で openGraph を持つと layout の images が継承されないので images を明記＝10/5 の教訓）。2回目実行で変更 0 を確認。
- **記事**: kaitori 51 と ranking 51（459 angle のうち）は週次と同じ生成器を回して再生成。`git diff` で 4→3 以外の差分 0 行を確認（brands.csv は 10/5 のまま＝価格・日付は不変）。手書き: `app/page.tsx`（「4選」「4社」）・`track-record`（「掲載4社」）・`whisky-takaku-uru`・`hibiki-kaitori`・`yamazaki-kaitori`。
- **検証・デプロイ**: build EXIT0（3,005ページ・heap12288）→ `*.txt` 削除（robots.txt 保全）→ precheck **全項目OK** → 方式B フル rsync（`--exclude .git/_not-found/functions`・tier2 込み）→ deploy `e90757773f`（3,007 M・buildId 入替のみ D3）／ソース `204b812cd`。本番 curl（CF公開まで約3分）: tier2 東京×山崎12年 description「3業者参考リンク」・og:url=canonical・og:title/og:image 維持・「4業者」0件、TOP「3選/3社」、track-record「掲載3社」、yamazaki-12-kaitori「3社の比較」、hakushu-12-ranking「3社を、ランキング」、`POST /api/contact {}`→**400 missing fields**、robots に Sitemap 行、JS チャンク 200。
- **数値（deploy リポの HTML、grep -o | wc -l）**: 「4業者」**16,390 → 0**（2,449ファイル→0）／「4社」（助言・744社・3〜4社を除く）**528 → 0**／tier2 の og:url **47（県ハブのみ）→ 2,444**（リーフ2,397＋ハブ47）。
- ⚠️ `patch-tier2-buyer-count.py` は週次には組み込んでいない（生成器を直したので再生成でも「4」に戻らない。再生成自体は引き続き禁止）。10/12 週次後に tier2 の og:url と「3業者」が残っているかは要確認（週次は tier2 を `--exclude` ＋変更 slug の部分同期なので消えない見込み）。

### 2026-10-09 ヒカカク口コミ受け皿 /articles/hikakaku-sake-kaitori-kuchikomi/ 競合差分の追加（12:00成長ルーチンC） ✅本番反映済み
- 競合（10位以内）: bikejin「口コミ1,083件を調べて」（直近100件のテーマ分類・運営変遷・じげん開示の業績）／uridoki（運営を「ジラフ」と記載＝旧情報）／gamekaitori-biyori（運営変遷あり）／ecopolis（ジラフ表記）／minhyo（2.73・7件）。うちに無かった＝**運営の変遷**・**投稿時期の分析**・**商材別の口コミ抽出**
- 足したもの（一次情報のみ）: ①公式クチコミ一覧13ページを全件取得し、投稿日を確認できた **1,078件**（上部内訳は1,083件・差5の理由は公式に記載なし）を年別集計（件数・平均・星1〜2割合。2020〜2023が938件、2025以降36件、最新2026-03-19）②**お酒を売った人の投稿26件**（星5×21・4×2・3×2・2×1、平均4.65）の要約8件と読み取り3点（定番銘柄は差が小さく希少品・状態不明品ほど差／返信は3〜5社の例が多い／古酒・焼酎・日本酒は値が付きにくい）③運営の変遷（ジラフ→会社分割で株式会社ヒカカク新設→じげんが全株取得→2024-10-01吸収合併。出典=じげん適時開示 2024-08-26 TDnet PDF）＋FAQ1問 ④お酒カテゴリ 52,971→**53,001点**（10/9）、dateModified 10/9（datePublished 10/8 は維持）
- URL検査（10/9 作業前）: **URL is unknown to Google**（公開翌日）→ Indexing API 1/1 再送
- precheck ✅全項目OK（3,005頁）。build heap12288 EXIT0 → `*.txt` 削除（robots.txt 保全）→ rsync（--exclude .git/_not-found/functions）→ source 8ab4bf088 / deploy 1d838d9d76。本番200・26件/運営の変遷/53,001点 反映（push後約3分）・/api/contact 400・robots Sitemap 行あり
- 未実施: みん評（Cloudflare チャレンジで生HTML取得不可）は本文に使っていない

### 2026-10-10 og:url を tier2 以外の全ページに（canonical と同値）
- **before（deploy リポ HTML・indexable 3,005）**: og:url 有 2,446（tier2 2,444＋author＋hikakaku）／無 559（articles 544・TOP・固定ページ13・/tier2/ 一覧）／og:url≠canonical 0／og:image 欠落 0。
- **after**: og:url 有 **3,005**／無 0／og:url≠canonical **0**／og:image 欠落 **0**。og:site_name 欠落は tier2 以外 2→0（author・hikakaku）。
- **実装（共通関数）**: `lib/og.ts` 新設＝`pageOpenGraph(overrides)` が type/locale/siteName/images（OG_IMAGE）/`url: "./"` を返す。`url: "./"` は Next 16 の `resolveAbsoluteUrlWithPathname`（canonical と同じ解決関数）で各ページの自URLになる。`app/layout.tsx` の openGraph を `pageOpenGraph()` に、自前 openGraph を持つ `app/author`・`app/articles/hikakaku-sake-kaitori-kuchikomi` も `pageOpenGraph({...})` 経由に（以前は site_name/locale が落ちていた）。**今後ページで openGraph を書くときは必ず pageOpenGraph() を使う**。
- **生成器**: generate-brand-pages-v3 / generate-angle-pages-v3 等の記事生成器は metadata に openGraph を持たない＝layout から継承するので、週次再生成（10/12）でも og:url は消えない（生成器の変更不要を grep で確認）。
- **未対応（範囲外・報告のみ）**: tier2 2,444（リーフ2,397＋県ハブ47）は og:site_name / og:locale が無い（generate-tier2-v4-plan-a.py・gen-tier2-area.py が openGraph を自前定義しているため）。直すなら冪等パッチ＋両生成器に siteName/locale を追加。
- build EXIT0（heap8192）→ `*.txt` 削除（robots.txt 保全）→ precheck ✅全項目OK（3,005）→ 方式B フル rsync（--exclude .git/_not-found/functions）→ deploy `388506e9b1`。

### 2026-10-10 (続き) tier2 2,444 ページに og:site_name / og:locale
- **before（deploy HTML）**: tier2（indexable 2,445）で og:site_name 欠落 2,444・og:locale 欠落 2,444（リーフ2,397＋県ハブ47。/tier2/ 一覧は layout 継承で有）。**after**: 0 / 0（tier2 以外も 0）。og:url 3,005＝canonical 一致・og:image 欠落 0 は維持。
- `scripts/patch-tier2-og-site.py` 新設（冪等・page.tsx の `openGraph: { ` 直後に `siteName: "PeatBid", locale: "ja_JP", ` を挿入＝pageOpenGraph() と同値）。1回目 変更 2,444／2回目 変更 0。**tier2 全再生成はしていない**。
- 生成器にも同値を追記: `generate-tier2-v4-plan-a.py`・`gen-tier2-area.py`・`patch-tier2-buyer-count.py`（openGraph 挿入テンプレ）。gen-tier2-area.py を実行して出力がパッチ済みハブ47と完全一致（diff 0）を確認＝週次の県ハブ再生成でも戻らない。
- build EXIT0（heap8192）→ `*.txt` 削除（robots.txt 保全）→ precheck ✅全項目OK → rsync（--exclude .git/_not-found/functions。tier2 全ページが変わったので tier2 込み）→ deploy `d3098769cf`。
- ⚠️ tier2 は og:type が無い（リーフ2,397＋県ハブ47＝2,444）。今回は範囲外・未対応。
