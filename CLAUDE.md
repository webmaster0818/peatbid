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

### 2026-10-10 相場データ品質ゲート（成長ルーチン12:00）
- **発見**: 山崎25年の kaitori title に「中央値26,935円」（176件・平均368,980円・最大1,451,998円＝二山）。実物は百万円台。「山崎 25年 買取」imp52/20.1位。同類: 白州25年 21,000（平均147,237）・軽井沢30年 32,450（参考800万）・羽生カード 7,426（参考3,000万）・秩父ザ・ファースト 89,705（参考350万・別ボトル「ザ・ファースト テン」混入の疑い）・イチローズカード 455,565（参考1,500万・シリーズ混在）
- **恒久対策**: `fetch-yahoo-medians.py` に `quality_gate()`＝ 平均/中央値>2 または 中央値<reference_price_jpy_2026_05×5% → insufficient＋quality_flag。週次で自動適用
- **今回の適用**: yahoo-medians.json／brands.csv の中央値クリア／price-history 6銘柄の history を空に（同じ汚染クエリ由来）→ 生成器 [2/7]〜[4.5/7] を手動実行（tier2 282頁 十分→不足）→ build EXIT0・precheck ✅（3,005頁）→ source 736a13ed7 / deploy f35765f754・本番 title「状態別の目安」・旧値0件・/api/contact 400・Indexing 6
- 残課題: クエリ自体の精査（「山崎25年 700ml」に箱のみ・空瓶・ミニチュアが混ざる）。除外語（空瓶/ミニ/箱のみ/50ml）を入れれば実数を戻せる可能性

### 2026-10-11 tier2 2,444 ページに og:type（"website"）
- **before（deploy HTML・indexable）**: og:type 欠落 = tier2 リーフ2,397＋県ハブ47＝2,444、それ以外 0。既存値は "website"（TOP・固定ページ・/tier2/ 一覧・articles 544＝layout 継承）／"article" は author と hikakaku 口コミの2頁のみ（手書きで明示）。→ tier2 は kaitori 記事・/tier2/ 一覧と揃えて **"website"**（= lib/og.ts pageOpenGraph() の既定）。
- `scripts/patch-tier2-og-type.py` 新設（冪等・`openGraph: { ` 直後に `type: "website", ` 挿入。既に type があればスキップ）。1回目 変更 2,444／2回目 変更 0。**tier2 全再生成はしていない**。
- 生成器: `generate-tier2-v4-plan-a.py`・`gen-tier2-area.py`・`patch-tier2-buyer-count.py` の openGraph テンプレにも `type: "website"` を追加。gen-tier2-area.py を全47県で実行→パッチ済みハブと完全一致（diff 0）。
- 週次（10/12）確認: [4.3] patch-tier2-yahoo-freshness は openGraph に触れない（`--dry-run` 変更0・検証NG0）、[4.4] 県ハブ再生成は上記で一致確認済、リーフ生成器は週次で走らない、[7/7] は out/ から部分同期＝ソース修正済みなので戻らない。

### 2026-10-11 成長ルーチン12:00: 山崎NV／白州NV／響30年に「買取店の掲示価格」節（競合差分） ✅本番反映済み
- 競合（10位以内）: ヒカカク（山崎NV 直近90日レンジ・定価併記。ただしデータは2025/8/1）／ウリドキ（白州 店舗別・状態別の査定例）／LINXAS・ファイブニーズ・サケウル（店の掲示価格＋更新日＋月次推移グラフ）／大吉・ファイブニーズ（響30年の仕様別＝新型/旧型/観音開き/花鳥風月/有田焼、定価推移）。**うちに無かった＝店舗別の掲示価格（更新日つき）・2年分の推移・定価との比較・仕様別の価格差・店の買取実績**
- **実装（週次再生成で消えない）**: `data/store-prices.json`（手動確認・出典URL・店舗側の更新日・checked_at）＋`scripts/store_prices.py`（JSX ブロック・FAQ・TOC・title/desc 末尾）。`generate-brand-pages-v3.py` が import し「4. 現在の市場相場」末尾に `<h3 id="store-prices">`・`store-trend`（ファイブニーズ掲示の2024/7〜2026/9 月次 SVG＋表）・`teika`（サントリー発表の定価推移＋ヤフオク中央値÷税込定価）を挿入。JSON に無い slug は無変更（diff は3ページのみ確認）。中央値比は生成時の brands.csv から自動計算
- 響30年は非バンドなので title を「…536,800円｜新型・旧型・観音開き別の店舗買取価格も」に、12週スパークラインも追加。desc は precheck 160字上限に引っかかったので短縮（187→155）
- ⚠️ 掲示価格は**手動データ＝自動更新されない**。月替わりに各ページを再確認して `checked_at` と値を更新すること。サントリー公式（suntory.co.jp）は curl/WebFetch とも 403＝定価は公式リリース番号（14030/14499/14932）＋販売店記事で照合
- build EXIT0（heap12288・2回）→ precheck ✅全項目OK（3,005）→ source 10cfbcb9b / deploy db99b646ba → 本番3URL 200・新節反映・/api/contact 400・robots Sitemap 行 → Indexing 3/3

### 2026-10-11 (続き) 出典なし「過去5年（2021〜2026年）…累積30〜80%の上昇」を全51 kaitori から撤去（MediaXAI経由の指示）
- 出所は `generate-brand-pages-v3.py`（と未使用の v2）の「7. オークション落札データ」末尾の固定文。全51ページに同じ数字が入っていた＝架空数字。
- 置換（v3・週次でも戻らない）: `history_change_p`＝`data/price-history/{slug}.json` の有効点が4点以上・sufficient・DATA_QUALITY_EXCLUDE外なら「集計開始日の中央値(n)→最新(n)・変化率％（出典: PeatBid集計・/methodology/）・数年単位の値動きはこのデータからは言えない」。条件を満たさなければ一文ごと出さない。v2 は行削除のみ。
- 結果: 置換 38／削除 13（yamazaki-25・hakushu-25・karuizawa-30・hanyu-card・chichibu-the-first・ichirosu-card＝品質ゲートで履歴クリア、yamazaki-55・yoichi-nv・miyagikyo-nv・macallan-fine-rare・balvenie-portwood-21＝不足、bowmore-blackbowmore＝品質除外、glenfarclas-105＝履歴1点）。out/ と deploy の「累積30」0件。
- build EXIT0 → precheck ✅全項目OK（3,005）→ source 6399c1bfa / deploy 3e15d34ecb → 本番 yamazaki-12・hibiki-30・yamazaki-25・glenfarclas-105 で0件確認。

### 2026-10-12 週次更新(03:00)後の点検：二重起動で tier2 リーフ 2,397 が本番未同期 → 同期済み
- **原因**: 週次スクリプトが **launchd（com.peatbid.weekly-yahoo-update）と crontab（`0 3 * * 1 …weekly-yahoo-update.sh`）の両方**から 03:00:01／03:00:04 に2本起動。後発の [4.3] が `/tmp/peatbid-tier2-patched.txt` を空で上書き（2本目は変更0）→ [7/7] の部分同期が0件。片方のビルドは `.next` 取り合いで ENOENT 失敗（cron 側＝Webhook 無しで通知も出ない）。本番 tier2 リーフは 10/5 のまま、県ハブは 10/12 ＝ glenfarclas-105 はハブ ¥10,681・リーフ ¥8,225（6/29）と食い違っていた。
- **対応**: クリーンビルド（heap8192・EXIT0）→ precheck ✅（3,005）→ tier2 込みフル rsync（--exclude .git/_not-found/functions）→ deploy `da1c353705`。`weekly-yahoo-update.sh` に mkdir ロック（`/tmp/peatbid-weekly.lock`・pid 生存確認）を追加。**crontab の行はサンドボックスから編集不可（Operation not permitted）＝手動で削除が必要**（ロックで競合は防げるが、cron 側が先にロックを取ると Discord 通知が出ない）。
- **データ不足12**: 10/5 十分→10/12 不足の6銘柄（yamazaki-25・hakushu-25・karuizawa-30・hanyu-card・chichibu-the-first・ichirosu-card）は件数減ではなく **10/10 品質ゲート**（平均/中央値>2 または 中央値<参考価格5%）。件数は 22〜300 で十分。表示は記事＝「状態別の目安」・tier2＝「集計中」、汚染中央値（26,935/467,830/31,900 等）の表示 0。price-history は空のまま（latest に insufficient=true で保持のみ）。残り6銘柄は 10/5 から継続して不足（n=2〜16）／bowmore は強制除外。
- glenfarclas-105: キー修正が効き 10/12 に ¥10,681 n=34 取得（query は「…105 700ml 700ml」＝700ml が二重。6/29 点とクエリが異なり指数では「系列不連続」で除外）。本番 HTML の 2026-06-29 は price-history チャートの第1点（正当）。


### 2026-10-12 成長ルーチン: sitemap lastmod
- `scripts/generate-sitemap.mjs` の lastmod を「ビルド日」→「ページと参照データ（@/data の import）の最終コミット日」に変更。全URLが毎回同じ日付だと Google が lastmod を当てにせず、新規の受け皿記事が「Google が認識していない」まま残っていたため。
- 記事を直したら **コミットしてから** `node scripts/generate-sitemap.mjs`（未コミットのファイルは当日扱い）→ ビルド → deploy。週次スクリプトは従来どおり自動で生成する。

### 2026-10-13 P2: 品質ゲートで「目安」落ちした6銘柄の検索語・除外語見直し → 山崎25年のみ実数復帰 ✅本番反映済み
- **方法**: `fetch-yahoo-medians.py` に `TITLE_FILTERS`（6銘柄のみ）。検索結果 JSON の `listing.items` の title/price を読み、require（例 `山崎\s*25\s*年`）一致かつ共通 JUNK（空瓶/空箱/箱のみ/小冊子/ミニ/検:/好きの方/セット/まとめ/2〜9本/700以外の ml）・個別 exclude（山崎25=ミズナラ、秩父=テン/10年）に該当しないものだけで IQR→中央値。**登録外49銘柄＋EXTRA は従来の正規表現経路のまま**（同一HTMLを旧版/新版に食わせて出力一致を確認）。`--dry-run [--only a,b]` で残した/除いたタイトルを全件表示（`--only` は dry 専用＝非 dry だと yahoo-medians.json が対象だけで上書きされるため禁止）。
- **10/13 実データ（タイトル全件目視）**: 山崎25年 本体32件→IQR後 **n=29・中央値864,100円**（平均864,774・参考880,000）＝品質ゲート通過。除外=空瓶2・ミズナラ2・3本組・山崎12/18/10年・NV/白州NVの「…25年好きの方々へ」詰め込み出品・他社25年。
  - 白州25年: 本体は「700ml」付き/無し・表記ゆれの4クエリを合算しても180日で19件（700ml付きは15件）→ n<20 で目安のまま。
  - 軽井沢30年: 本体2件（バランタイン30年・響30年が大半）。羽生カード: 現クエリの結果は無関係な出品のみ（カード出品は「イチローズモルト カードシリーズ」名義）。秩父ザ・ファースト: 本体3件（49,000〜78,000円。他は別ボトル「ザ・ファーストテン」）。イチローズカード: 本体7件・カード違いの混在。→ 5銘柄とも insufficient のまま（汚染値より目安が正しい）。
- **当日反映（yamazaki-25 のみ）**: brands.csv/yahoo-medians.json/price-history を yamazaki-25 だけ更新→週次の [2/7]〜[4.5/7] を手動実行（tier2 パッチは `--slugs yamazaki-25`＝不足→十分 47）。他銘柄の差分は「関連銘柄カードに山崎25年が入った」分のみ・数値変化0。日付だけ変わる真贋ハブ8本は戻した。build（heap8192）EXIT0→precheck ✅→root rsync（--exclude tier2/_not-found/functions）＋yamazaki-25 リーフ47＋県ハブ47 → deploy `a607699f63`。
- ⚠️ dry 中にヤフオク closedsearch が全クエリ HTTP 500（約40リクエスト後・トップページは200）＝一時的なアクセス制限と思われる。当日データ書き込みは制限前に取得した同クエリ（3ページ・92件）の結果を同じ関数で集計した。
- ⚠️ 判断待ち: `reference_price_jpy_2026_05` が実勢と桁違いの銘柄がある（秩父ザ・ファースト 3,500,000＝実勢5万円台、イチローズカード 15,000,000／羽生カード 30,000,000＝単品は44〜80万円）。n≥20 になっても 5% ゲートで落ちる。hanyu-card と ichirosu-card は実質同じシリーズ。

### 2026-10-14 P2: 掲載業者（tier2=LINXAS/バイセル/福ちゃん・記事/ランキング=ヒカカク！/バイセル/リカスタ）の事実を各社公式と照合 ✅本番反映済み
- 公式（10/14 確認）: バイセル＝東証グロース上場・累計買取4,800万点以上（2015〜2025年）・出張は「離島を除く日本全国」・開封品は「買取できないことがほとんど」。リカスタ＝宅配/出張/店頭（大阪店・新宿店）・「未開封品のみの買取対象」・「即日現金化ももちろん可能」・送料/査定/キャンセル/返送料無料。ヒカカク！＝最大20社・完全無料（一致）。福ちゃん＝REGATE（BuySell グループ）、出張・店舗・宅配、手数料無料（一致）。
- **CTA 先 `www.buysell-onlineshop.jp` は NXDOMAIN（ドメイン自体が無い）** → tier2 と同じ `buysell-kaitori.com/liquor/japanese-whisky/` に。
- `scripts/patch-buyer-facts.py`（冪等・app と生成器3本を同時に置換・2回目変更0）。deploy HTML 件数 before→after: 「430万件超」204→0／「出張買取はエリア限定」102→0／「全域出張可能」4,757→0（→「出張は離島を除き{県}全域に対応」2,397頁）／開封済み「いずれも対応可能」「残量9割以上」「宅配で開封済みも対応」各102→0／「即日現金化はできない」102→0／buysell-onlineshop.jp 1,138→0。
- 触っていない（公式に記載なし＝判断待ち）: tier2 の福ちゃん「{主要都市}を中心に対応」（公式は事業所14拠点のみで対応エリアの記載なし）、ヒカカク「しつこい営業なし」「業界最多級」、比較表の所要日数（1〜2日/即日〜2日/2〜5日）。
- source 1f598c579/50f04df07・deploy 890ec45223。precheck ✅（3,005）・本番 200・/api/contact 400・robots Sitemap 行。

### 2026-10-15 響30年 /articles/hibiki-30-kaitori/ 競合差分の強化（「響 30年 買取」17.3位・imp91。競合調査 /tmp/g1015/competitors-1015.md KW1）
- **持ち方は従来どおり `data/store-prices.json`（hibiki-30）＋`scripts/store_prices.py`＝週次再生成で消えない**。generate-brand-pages-v3.py は呼び出しを足しただけ（`apply_faqs`・`fake_extra`・`sell_extra`・`toc_fake`/`toc_sell`・`page_updated`）。JSON に新キーが無い slug は無変更（51ページ再生成で差分は hibiki-30 のみを確認。yamazaki-nv／hakushu-nv の旧 `records` 表示も維持）。
- 追加（全値 2026-10-15 に各ページを WebFetch で再確認・出典リンクつき）:
  - 店舗表: サケウル更新日 10/15、JOYLAB（ページ上部 525,000円＝2026/09/11 名古屋店の実績）、Life Vacation（530,000円・推移表の最新 2026年6月）、バイセル（現行〜391,000円／旧ボトル＝観音開き〜467,500円・2025年11月時点の上限目安）。**「旧型」の定義が店で違う注記**（LINXAS は旧型 40万と観音開き 60万を別掲示／バイセル・大吉は旧ボトル＝金色の観音開き／ファイブニーズは新モデルも「茶色の観音開き箱」）
  - `record_groups`: JOYLAB 9件（店舗名・日付）、LINXAS 中身入り7件、ファイブニーズ6件、サケウル新着4件（2025-10-23 各475,000円）
  - 4-3 有田焼・九谷焼（バイセル〜998,700円 2025年11月時点／大吉 90万〜120万・110万円以上＝日付なし・市場全体の値／まねきや 同・基準日なし）。専門店4社のページには陶器ボトルの掲示なしと明記
  - 長期推移: Life Vacation の表 17点から9点を抜粋＋出典、自前データ（ヤフオク週次中央値）の範囲を price-history から自動表記
  - 9-2 新型・旧型の見分け方（表と文章のみ・画像転載なし）: 外箱・キャップ天面・キャップフィルム/ラベル「HIBIKI」・ホログラム。ホログラムは J-CAST 2022-06-17（2022年2月以降出荷・サントリー広報確認）とグルメWatch 2024-02-29（開封口＋背面の2か所・2024年3月製造分〜・響30年含む）。⚠️サントリー公式（news 14552・qrcodesticker）は WebFetch/curl とも 403 で未確認のためリンクしていない
  - 11-2 空き瓶・空箱（LINXAS 空き瓶実績7件 2,500〜20,000円・大吉の記述・バイセルは開封品原則不可）、11-3 税金（国税庁 No.3105 生活用動産と「1個または1組30万円超の貴金属・宝石・書画・骨とう等は除く」＝ウイスキーが該当するかは明記なし、No.3152 特別控除50万円・5年超は1/2、No.1900 給与1か所は20万円）
  - FAQ: 税金の回答を hibiki-30 だけ上記に置き換え（`faq_replace`）＋空き瓶・陶器ボトルの2問（`faq_extra`）。⚠️**他50ページの税金FAQ（生成器の共通文）は生活用動産・30万円の扱いに触れていない**＝未対応（範囲外）
  - title「…535,125円｜8店の価格比較・新型/旧型/有田焼別」(48字)・desc 148字・最終更新 2026-10-15（`page_updated` と取得日の新しい方）
- build（heap12288）EXIT0 → precheck ✅全項目OK（3,005）。⚠️掲示価格・実績は手動データ。月替わりに各店を再確認して `checked_at` と値を更新すること。

### 2026-10-16 P2: 10/14 に残した業者記述3点（福ちゃん対応エリア・ヒカカク「業界最多級」・所要日数）を公式で確認して修正 ✅本番反映済み
- 公式（10/16）: 福ちゃん＝出張/宅配/店舗の3方式、**対応エリアの記載なし**／ヒカカク＝「最大20社から一括査定」「完全無料」「納得しなければ依頼不要」「査定結果は最短1日でメール」、業界最多・しつこい営業なしの記載なし／バイセル＝「最短で即日のご訪問」／リカスタ＝「1営業日以内に連絡（本数により2営業日以上）」。`scripts/patch-buyer-facts-1016.py`（冪等・app＋生成器 generate-*/gen-*・2回目0）。tier2 FAQ の地元業者（掲載外）の出張エリア/最短即日の断定も掲載業者の公式記載に置換。県ハブは gen-tier2-area 再実行（差分は福ちゃん行のみ×47）。
- deploy HTML before→after: 業界最多 306→0／しつこい営業 102→0／福ちゃん「を中心に対応」4,794→0／tier2 FAQ 断定 9,588→0／全国をカバー 94→0／1〜2日・即日〜2日・2〜5日 各102→0。source ffd40c624/fe81edbb1・deploy 090ccb8f38・precheck ✅（3,005）・本番 200・/api/contact 400・robots Sitemap 行。

### 2026-10-16 「ブラックボウモア」11.4位（imp58）/articles/bowmore-blackbowmore-kaitori/ 競合差分＋誤記訂正 ✅本番反映済み
- 競合（「ブラックボウモア」「ブラックボウモア 買取」上位）: LINXAS 42年（6種の比較表＝発売年・度数・本数・ラベル表記、参考買取〜150万・価格更新日 2026.1.26、ページ更新日 2026.4.14）／TOPLOT 土屋守コラム（名前の由来・No.1ヴォルツ・29〜31年の度数と本数・発売時£100）／ストックラボ・ウイスキー王国（買取実績）／おたからや（ASK）／ヒカカク（最高買取相場）。**うちに無かった＝エディション別の仕様表・店の掲示価格/実績（出典つき）・発売時価格・海外オークション結果・どのエディションかの確かめ方**。
- **誤記の訂正**: 本文・スペック表が brands.csv の汎用列そのままで「アイラが手がけるノンエイジ（NV）」「度数49%」「若々しい味わい」「1本数百万〜数千万円」だった（実際はボウモア蒸溜所・1964年蒸留の29〜50年熟成・度数40.5〜50%）。angle 9本（rekishi 等）も同じ誤記。
- **実装（週次再生成で消えない）**: `data/store-prices.json` の bowmore-blackbowmore に `profile`（maker/age/abv/size/summary/tasting/distillery_extra/rarity_text）・`editions`・`stores`・`store_note`・`auction`・`identify`・`faq_replace`/`faq_extra`・`title_full`/`h1_full`/`desc_full`。`scripts/store_prices.py` に profile()/editions_block()/auction_block()/_identify()/title_full() 等を追加し、`generate-brand-pages-v3.py` と `generate-angle-pages-v3.py` が profile のある slug だけ表示を差し替える（**brands.csv は tier2・週次パッチが読むので触っていない**）。再生成の差分は blackbowmore 10本＋bowmore-18/25 の内部リンク1行のみを確認。
- 追加した事実（全て 2026-10-16 確認・出典リンクつき）: 6種＝1993 29年 50% 2,000本／1994 30年 50% 2,000本／1995 31年 FINAL EDITION 49% 1,812本（Broom 記事は1,182本＝注記）／2007 42年 40.5% 827本 £2,400／2016 50年 40.9% 159本 £16,000・米$25,000／2020 DB5 31年 49.6% 27本（販売25）£50,000。出典＝サザビーズ 2020-11-12・Suntory Global Spirits 2017-06-12・Aston Martin 2020-08・scotchwhisky.com 2016-11-07・TOPLOT・LINXAS。店: LINXAS 42年〜1,500,000（2026-01-26）／ストックラボ実績 1,050,000（日付なし）／ウイスキー王国実績 993,000（8月19日・年なし）／買取センター.com 30年〜900,000／ヒカカク 42年 450,000／おたからや ASK（2022-01-26）＋ライフバケーション（2012年25万→2016年60万円以上）。海外: 2018-01 30年 almost £12,000／2021初 DB5 £81,000／2022-08頃 3本セット £40,000／サザビーズ Archive Cabinet 予想 HK$4,000,000（落札額ではない）。
- title「ブラックボウモアとは？全6種の違いと買取相場【2026年10月最新】29年〜50年・DB5」、最終更新 2026-10-16。内部リンク: bowmore-18/25-kaitori（生成器 SIBLING_GUIDE）、bowmore-nv-kaitori（手書き・アンカー具体化）。
- build（heap12288）EXIT0×2 → precheck ✅全項目OK（3,005）→ rsync（--exclude .git/_not-found/functions）→ source 99be03bca/f93615cc8/6c4fc6efe・deploy fd9f775a6f。本番 200・title/1,812本/〜1,500,000円 反映・「度数49%」「アイラが手がけるノンエイジ」0件・/api/contact 400・robots Sitemap 行。
- ⚠️ 未対応: ①MarketPriceCard と 4章本文が「n<20 で不足」「n=82件」と食い違う（品質強制除外の表示が無い）②掲示価格は手動データ＝月替わりに再確認 ③竹鶴21年・グレンフィディック30年は今回未着手。

### 2026-10-16 全文言のビジネス文書化（MediaXAI「全文言をビジネス文書基準で棚卸し」・writing-standards.md §8）✅本番反映済み
- 対象: layout（description・フッター）／TOP／固定ページ8（about・content-policy・editorial・author・methodology・track-record・faq・contact）／手書き記事25本／相場ハブ4＋/tier2/一覧／生成器（brand v3・angle v3・真贋ハブ・県ハブ gen-tier2-area・store_prices・opportunity_band）とデータ文言（store-prices.json・brands.csv/brands_extra.py/prefectures_extra.py の説明文）／components（MarketPriceCard ほか）。です・ます調、「鉄則・要注意・徹底解説・完全ガイド・しましょう・最高値を引き出す・本気度・勇気」等を削除、見出しを宣言形に。用語: 蓄積中→集計中／未開封・完璧→未開封・付属品完備／Peatbid→PeatBid。
- **tier2 リーフ2,397は全再生成禁止のため `scripts/patch-tier2-copy-biz-1016.py`**: 生成器のテンプレ行（{p['name_ja']} 等）を正規表現化して既存ページに適用（JSON-LD の \uXXXX 版も同時）。生成器にも同じ置換。冪等（2回目で変更なし）。⚠️ 先頭プレースホルダは文頭（。、？" > の直後）からしか始めない・値は「。」をまたがない（demand / collectibility_note は例外）・気候特性は「、」を含む——を守らないと前の文を食う（初回に「、気候特性（…）」の崩れ200ページ→修復済み）。
- `patch-tier2-yahoo-freshness.py` は新旧どちらの文言（不足時の文・description の集計中文）にも当たるよう正規表現を更新。`--dry-run` で 変更0・検証NG0 を確認。⚠️ 不足ページの検証は「現在集計中」の出現数=3 を見ているので、新しい文に「現在集計中」を足さないこと。
- 機械的な崩れの修正: 「約約9,500店」・カテゴリ slug（japanese-whisky）と希少度コード（midクラス）の生表示・「12年熟成の熟成期間中」・「5つのコツ」見出しに3項目（tier2）・TOP「3ステップ」に2項目・「| PeatBid | PeatBid」・本文中の `**…**` 生表示（editorial）。
- 自サイトの事実の修正: TOP/実績の「500+銘柄」「毎日更新」→50銘柄・毎週更新、ジャパニーズ30/スコッチ20→32/18。出張買取のクーリング・オフの根拠を古物営業法→特定商取引法（消費者庁 特定商取引法ガイドで訪問購入8日以内を確認）。
- 検証: out/ 全3,008ファイルの表示テキスト＋JSON-LD で旧表現・§8 NG 語 68,524→0。外部リンクのドメイン別件数は本番と同一（ASP コードはサイト全体で0本のまま）。precheck ✅全項目OK（3,005）。
- source 264283b4b…bad95ad73 ／ deploy 806de5e1a2。本番 / ・/tier2/tokyo/yamazaki-12-kaitori/・/articles/yamazaki-12-kaitori/ ほかで新文言を確認、/api/contact 400、robots Sitemap 行。
- 未対応（事実・判断が要るもの）: 編集部紹介/メンバー紹介の経歴・人数（10年以上・専門書30冊・コレクター50名等）と methodology の算出方法（4情報源・±2σ・10点満点評価・月次更新）が実際の集計（ヤフオク180日中央値＋IQR・毎週）と食い違う／angle 生成器の出典なし数値（kihaku・auction-suii の年別上昇率・「5年で3〜5倍」・業者ランキングの総合スコア47/44/40・★評価）／tier2「未成年（18歳未満）…古物営業法により禁止」（他ページは20歳未満）／TOP「山崎25年は17年で17倍」・FAQ の2026年5月時点の相場・track-record の公開記事数506/URL 511（現在3,005）。

### 2026-10-17 copy-audit 指摘の残り
- ardbeg-nv-kaitori「並べています」→「掲載しています」。未使用の旧生成器（generate-angle-pages(-v2)・generate-brand-pages(-v2)・generate-tier2-full/samples(-v2)）の「完全ガイド」「徹底解説」「徹底比較」も言い換え（現行 v3/v4 は既に0）。
- deploy の `_not-found/index.html`（10/8 の古いビルド・旧 description に「徹底比較」）を現行ビルドで上書き（rsync 除外は維持し、このファイルだけ cp）。
- out/ の §8 NG 0・precheck 全項目OK（3,005）・copy-audit --n 60 で NG 0。source a8519bb9c / deploy 39abaead85。

### 2026-10-17 形容詞＋「です」止め（「〜が多いです」「〜が高いです」等）の言い換え
- 対象（自サイトの文のみ・引用なし）: FAQ 3問／手書き記事10本（bowmore-nv・talisker-nv・laphroaig-nv・glenmorangie・glenfarclas-nv・glenfiddich・hibiki・yamazaki・whisky-souzoku-baikyaku・whisky-toushi-hajimekata）／未使用の旧生成器 generate-angle-pages(-v2).py。例:「見方が多いです」→「との見方が大勢です」、「可能性が高いです」→「であると考えられます」、「現実的でないケースが多いです」→「容易ではありません」。`<strong>…高い</strong>です` のようにタグをまたぐ形も検出・修正。
- ⚠️ 依頼時の「tier2 約2,500件」はローカル checkout（origin/main より10コミット遅れ）の値。tier2 の「周辺へのアクセスにも対応するケースが多いです」等は 10/16 の patch-tier2-copy-biz-1016.py で既に解消済み（origin/main の tier2 は0件）。作業は origin/main からの worktree で実施。
- 件数（本番 HTML の表示テキスト＋JSON-LD）: before 29（11ページ）→ after out/ 0。precheck ✅全項目OK（3,005）。ASP コード 0本のまま（本番と同一）。tier2 は rsync 除外のまま（テキスト変更なし）。
- source df4d8718d ／ deploy f047e5a66f。
- 未対応: tier2 kanagawa 2ページの「人口は9（20万人417万世帯）」の崩れ（920万人・417万世帯の誤組版と思われる）。ローカル ~/projects/peatbid main が origin より遅れたまま（週次 weekly-yahoo-update.sh はこの checkout で生成・push するため、追いつかせないと 10/16 以降の文言が週次で戻るおそれ）。

### 2026-10-17 P1: tier2「流通ステータス・後継品」注記（2026年5月時点）を各社公式で再確認 ✅本番反映済み
- 期限切れ検索（キャンペーン期日・「◯月◯日まで」「今月」「期間限定」等）は該当0件。【年月】表記は全て2026年10月（週次自動）。
- 元データ = `data/brands_extra.py`（50銘柄。glenfarclas-105 はデータなし）→ tier2 リーフ 2,397 のプロフィール表のみが参照。
- **公式で確認できた19銘柄**（注記を「2026年10月17日時点」に＝`status_as_of`）: yamazaki-nv（house.suntory.com）／竹鶴 pure・17・21・25（nikka.com/brands/taketsuru/・アサヒ 2020/0116・2012/0516）／余市 nv・10・15・20、宮城峡 nv・12・15（アサヒ 2015/0615_3「2015年8月末をもって販売を終了」・2022/0714_1 余市10年 数量限定再発売・nikka.com/brands/yoichi_miyagikyo/）／mars-komagatake（hombo.co.jp/product/mars-singlemalt-komagatake/）／bowmore-18（bowmore.com/whiskies/18-years-old）／ardbeg uigeadail・corryvreckan（ardbeg.com/en-int/products/…）／glenfarclas-25（glenfarclas.com/whisky/the-aged-range/25-year-old-whisky/）／talisker-25（malts.com 製品ページ「Limited edition」）／laphroaig-25（公式掲載の最新は 2023 Edition・在庫切れ）。
- 値の修正: **余市10年 終売→現行品（2022年数量限定で再発売）**＋brands.csv description／竹鶴17・21・25「2020年生産終了」→「現行ラインアップに掲載なし」（終売年は公式記載なし）・竹鶴25 発売年 2014→2012／竹鶴 pure「2020終売→再発売」→「2020年3月31日リニューアル、数量限定」／余市・宮城峡 年表記版「2015年生産終了」→「2015年8月末で販売終了」／talisker-25・laphroaig-25 の「毎年新版」削除／blackbowmore 後継「一回限り、1964年原酒は枯渇」→5回リリース＋DB5／404 だった公式URL 11件差し替え（hibiki-21・bowmore-25・glenmorangie-signet 含む）。
- **確認できず（5月のまま）32銘柄**: suntory.co.jp・themacallan.com・springbank.scot は 403、glenfiddich.com・thebalvenie.com は 429、one-drinks.com はドメインパーキング、chichibu-distillery.jp は DNS なし。
- `scripts/patch-brand-status-1017.py`（冪等・旧値は data/.brand-status-1017-old.json）。1回目 1,083ファイル／2回目 0。生成器 generate-tier2-v4-plan-a.py の注記を `be.get("status_as_of","2026年5月")` に。週次はリーフを再生成しない・freshness パッチはこの文字列に触れない。
- source ccd0a4c2c/377eb78b3・deploy 8ad51d7c2e（CF 反映まで約17分）。本番: 10月17日注記 893／5月 1,504、/api/contact 400、robots Sitemap 行。
- (続き) パーキング／DNS不在の「公式情報」リンクを削除（MediaXAI 指示・cleaning 10/13 と同扱い）: one-drinks.com（イチローズ card/DD/MWR・羽生カード）・chichibu-distillery.jp（秩父ザ・ファースト）。deploy 全HTML before 752/188（235ページ・全て tier2）→ after 0/0。brands_extra の URL を ""、生成器は空なら「—」（`official_cell`）。`scripts/patch-tier2-dead-official-links-1017.py`（冪等・235→0）。source 5fa37199b・deploy ae5f29d44a。本番 235ページで0件。

### 2026-10-17 成長ルーチン12:00 C: グレンフィディック／竹鶴21年／富山県（GSC 11〜20位）✅本番反映済み
- **グレンフィディック 買取**（19.8位・30年ページに着地）: 重複を作らず既存ハブ `/articles/glenfiddich-kaitori/`（手書き）を強化＝10〜50年の店舗掲示価格表（LINXAS 2026-09-30・ヒカカク！日付なし・ファイブニーズ実績日）、旧ボトル/陶器/限定品（ピュアモルト特級・18年エンシェントリザーブ・26年グランデクロンヌ・30年エジンバラ等）、定価（ブラウンフォーマンジャパン 2025-05-19 限定パッケージ 12/15/18年）・輸入元（2025-01-01〜ブラウンフォーマンジャパン）、FAQ1問。30年ページは store-prices.json に `glenfiddich-30`（仕様別の掲示価格＋ハブへの導線）。23年グランクリュは店舗掲示なし。
- **竹鶴21年**: store-prices.json `taketsuru-21`＝5店の掲示価格（大黒屋 2026-10-14・LINXAS・サケウル・リカスタ・バイセル）、実績4店、2014年限定品3種（アサヒ 2014-03-07／06-18）、角瓶・旧ラベル・受賞記念ラベルの見分け方、FAQ2問。⚠️発売年2001年・定価15,000円・2020年3月末終売は店舗記載のみ（アサヒの終売リリースは見つからず、本文にもそう明記）。store_prices.py に editions の `heading`/`toc_label` 上書きを追加。
- **富山県 /tier2/toyama/**: `data/local-buyers.json`（新設・県キー）を `gen-tier2-area.py` が読み、県内でお酒を買い取る26店（買取大吉18・おたからや洋酒記載4・銀座蔵や4）／お酒を扱わない店／出張対応（バイセル・LINXAS・銀座蔵や）／三郎丸蒸留所＋FAQ2問。JSON に無い県は無変更（47県再生成で差分は toyama のみ）＝週次 [4.4] でも維持。⚠️店舗は月替わりに再確認。
- build EXIT0（heap12288）→ precheck ✅全項目OK（3,005）→ source 604e5554a / deploy c64af7f84f → 本番4URL 200・新title・/api/contact 400・robots Sitemap 行。Indexing API は4URLとも 429（未送信）。

### 2026-10-18 P2: 響17年「2018年生産終了」→ サントリー公式「休売中」＋サントリー10銘柄の流通ステータス公式確認 ✅本番反映済み
- **公式（10/18・ヘッドレス Chrome）**: https://www.suntory.co.jp/whisky/hibiki/portfolio/17years/ に「サントリーウイスキー「響17年」は休売中です。」「サントリー創業90周年を記念して1989年に新発売」。curl/WebFetch は 403。**開き方**: 素の headless は Akamai で Access Denied → 通常の Chrome UA を指定すると 200。年齢確認はサイト自身の `?o20=true`（verify-age-common.js の QKEY）、響ブランドの言語選択は CDP で `do_select_lang('JPN');do_set_lang()` を実行して本文を取得（/tmp/pb1018/bin/cdp.mjs＝node 25 の組み込み WebSocket で CDP、puppeteer 不要）。公式ページに「2018年」の記載はない（2018年は報道＝東洋経済/ロイター 2018-05「9月ごろ販売休止の見通し」）。
- **現行品の確認**: products.suntory.co.jp（商品情報）に 山崎12/18/25・白州NV/12/18/25・響JH/21/30 が掲載（響17年は検索0件）。山崎25年「年間生産本数千数百本の限定品」、響30年「数量限定商品」。旧 lineup URL（/whisky/yamazaki/lineup/…・/whisky/hakushu/lineup/…）は 404 → 公式URLを商品情報ページに差し替え。括弧書き（出荷制限あり・極めて品薄・年産量極小 等）は公式記載がないので外し、公式記載のある語だけ残した。
- `scripts/patch-brand-status-1018.py`（1017 と同方式・冪等・旧値 data/.brand-status-1018-old.json）: 11銘柄×47 tier2＋記事 hibiki-17-kaitori＋brands.csv の description（「終売後プレミアが続く名作」→「サントリー公式の表記は休売中で、プレミア価格が続く銘柄」＝週次の記事再生成でも戻らない。generate-brand-pages-v3 再実行で差分0を確認）。手書き hibiki-kaitori（「2018年9月に休売（事実上の終売）を発表」→「2018年、休売が報じられた（公式の表記は休売中）」）・faq（「終売銘柄（白州12年・響17年など）」→「休売・終売の銘柄（サントリー公式で休売中の響17年など）」）・generate-hub-pages.py の「終売前」→「休売前」。
- deploy HTML: 「2018年生産終了」188→0／「休売中（サントリー公式の表記）」0→188／10月18日注記 1,034（11銘柄×47×2）。build EXIT0（heap8192）×2・precheck ✅（3,005）・ASP計測リンク 0→0。source 3003a7ea3/3c31c57ef/bcfe999fe/7922e2361・deploy def889f2fd/41ebc5e3f2。
- **確認できず（5月のまま）**: yamazaki-55（house.suntory.com 年齢確認フォーム）・macallan 5銘柄（themacallan.com の登録URLが全て404）・springbank 15/21（会員限定ページ）・glenfiddich-30・balvenie-portwood-21・bowmore-25・blackbowmore（年齢確認フォーム。フォーム入力での突破はしていない）・glenmorangie-signet（製品ページの本文が出ない）・イチローズ/羽生/秩父（公式なし）・glenfarclas-105（データなし）。
- ⚠️ 判断待ち: 軽井沢12/30 の「公式情報」リンク先 karuizawawhiskydistillery.com は 2022年創業の新会社で、旧メルシャン軽井沢蒸溜所は「2012年に閉鎖・設備は解体」と記載＝当サイトの「2011年蒸溜所閉鎖、2016年解体」と食い違う（旧蒸溜所の公式ではないため未変更）。

### 2026-10-19 週次更新（03:00）のビルド失敗 → 型修正して手動反映 ✅本番反映済み
- **原因（tsc で確認）**: hanyu-card が 10/13 の TITLE_FILTERS で本体0件 → `data/yahoo-medians.json` に `median/mean/min/max: null`。`medians as Record<string, MedianEntry>`（`as unknown` なし）の手書き3本 bowmore-nv / laphroaig-nv / talisker-nv が TS2352 で失敗。他5本（ardbeg-nv・glenfarclas-nv・springbank-nv・glenfiddich・glenmorangie）は `as unknown as` で無関係。生成器に同じ型を出すものはない。
- **修正**: 3本の `MedianEntry` を `median?: number | null; filtered_n?: number | null`、`yen(v?: number | null)`。⚠️ yahoo-medians.json を型付きで読む手書きページを増やすときは null を許す型にすること（insufficient 銘柄は null が入る）。
- build（heap8192）EXIT0 → precheck ✅（3,005）→ tier2 込みフル rsync（--exclude .git/_not-found/functions）→ source a71f2dbd2/0a2cde2b7・deploy 757c1126f2。out/ と本番で「null円/NaN/undefined円」0件。羽生カードは記事＝「n<20 で不足」、tier2＝「現在集計中（取得日 2026-10-19、n=0）」、ランキング/指数/白書/県ハブには従来どおり非掲載。
- ⚠️ 今回も crontab 側が先にロックを取り（launchd 側は「別の週次更新が実行中」で終了）、Webhook の無い cron 側で失敗したため Discord 通知が出なかった。crontab 行の削除は MediaXAI 操作待ち。

### 2026-10-20 朝ルーチン: GSC 表示上位3記事の掲載業者情報を公式と照合 ✅本番反映済み
- 対象（GSC 9/22〜10/19・ページ別表示）: hakushu-nv-kaitori 485 / yamazaki-nv-kaitori 451 / taketsuru-21-kaitori 451。
- 公式（10/20 curl）で一致: バイセル＝東証グロース 7685（buysell-technologies.com/ir/stock/）・4,800万点以上（2015〜2025年）・最短即日訪問・出張/店頭/宅配・TVCM／リカスタ＝株式会社リスタ・大阪店/新宿店・1営業日以内連絡（本数により2営業日以上）・送料/査定料/キャンセル料/返品送料無料・全国宅配／ヒカカク！＝最大20社・完全無料・査定結果メール最短1日／福ちゃん＝出張・宅配・店舗・手数料無料。
- **食い違い→修正**（`scripts/patch-buyer-facts-1020.py`・冪等・app＋components＋生成器3本・2回目0・generate-brand-pages-v3／gen-tier2-area 再実行で差分0）:
  - `components/MarketPriceCard.tsx`（相場カード＝2,907ページ）のバイセル `www.buysell-japan.jp/sake/` は **NXDOMAIN** → `buysell-kaitori.com/liquor/japanese-whisky/`。福ちゃん `fukuchan.co.jp/oshina/sake/` は **別会社（アストジャパン＝餃子店）で 404** → 公式のお酒ページ `fuku-chan.jp/liquor/`。
  - 福ちゃん「総合買取の大手」（公式に記載なし）→ 会社概要どおり「株式会社REGATEが運営する買取専門店」（2,496ページ）。
- deploy HTML before→after: fukuchan.co.jp 5,814→0／buysell-japan.jp 5,814→0／総合買取の大手 4,765→0／fuku-chan.jp/liquor/ 0→5,814。ASP計測リンク 0→0。build EXIT0（heap8192）→ precheck ✅（3,005）→ tier2 込みフル rsync（--exclude .git/_not-found/functions・3,229ファイル）。source f71cec611/918abf7bc・deploy d7976f700f（CF 反映まで約17分）。本番: 上位3記事＋tier2/県ハブで旧値0・/api/contact 400・robots Sitemap 行。
- 触っていない: 店舗の掲示価格（hakushu/yamazaki は 10/11、竹鶴21年は 10/17 確認）、売却プロセスの一般論（「宅配は1〜3営業日で振込が一般的」「全体1〜2週間」＝特定業者の記載ではない）。

### 2026-10-20 成長ルーチン12:00: 「竹鶴 買取」受け皿の一覧ハブ新設／響30年の競合差分 ✅本番反映済み
- **竹鶴 買取**（20.3位・imp126・25年ページに着地。21年にも imp72・33.7位で割れていた）: URL検査で受け皿の `taketsuru-pure-kaitori` が **Discovered - currently not indexed**（25年・21年は indexed）。被リンクを増やしても未インデックスのページは着地できないため、競合上位（大黒屋・LINXAS・サケウル・買取大吉・なんぼや＝全てブランド単位の一覧ページ）と同じ型の手書きハブ `/articles/taketsuru-kaitori/` を新設。**役割分け**: ハブ＝「どの竹鶴か」の特定と全ボトル（NV白/黒・エッセンシャルズ2026・シェリーウッド・12年700/660/角瓶・17/21年の角瓶/旧ラベル/WWA/ノンチル/ポート/マディラ・25年・35年）の3店比較／年数ページ＝その年数の詳細（実績・限定品・見分け方）／taketsuru-pure＝年数表記なしの詳細。
  - 値は全て 2026-10-20 に各店のページで確認: 大黒屋（更新 10/19）・サケウル（10/18）・LINXAS（9/30）。アサヒ 2020-01-16（2020/3/31 リニューアル・年間22,000箱・参考4,000円税別）・アサヒ 2026-05-01 PR TIMES（エッセンシャルズ 2026・25,000円税別・日本1万本）・nikka.com（年数品は受賞歴欄のみ）。買取大吉の竹鶴ページは 25年 未使用品 65,000円／店舗実績 160,000円 など内部で食い違うため不採用。
  - 生成器: `CLUSTER` に `taketsuru`（全51 kaitori から被リンク）、`INTENT_SPLIT` の taketsuru-17/21/25 → ハブ。**taketsuru-pure の自動導線が自分自身を指していた**（NV_FAMILIES の slug が "-nv" でないため）→ ハブへ＋自動導線に自己参照ガード。
  - `store-prices.json` に `taketsuru-25`（3店・大黒屋実績2件・title「3店の掲示価格・箱なしの差」）、taketsuru-21 は大黒屋 10/19・サケウル 10/18（箱あり 60,000〜61,000円・箱なし問い合わせ）に更新＋ハブへのリンク。
  - ⚠️ 判断待ち: taketsuru-pure の Yahoo 中央値 12,250円（query「竹鶴 ピュアモルト 700ml」・mean 18,536・max 67,100）は年数品（17/21年ピュアモルト）混入の疑い。店舗の NV 掲示は 2,500〜8,000円。ハブには中央値を出していない。TITLE_FILTERS で年数表記を除外する見直しが必要（ヤフオク dry は1銘柄3回程度）。
- **響30年**（20.0位・imp62）: 10/15 の強化は 10/17 10:38 にクロール済み（URL検査 indexed）。競合上位に有ってうちに無かった＝大黒屋（10/19更新: ホログラム有＋響QRコードシール付 520,000円・無 460,000円・観音開き金箱 502,000円・陶器/花鳥風月は問い合わせ）、買取大吉（10/20更新: 0.7l 未使用品 670,000円・中古品 640,000円／0.75l 2020年10月 650,000→2026年10月 680,000円）。title「9店の価格比較」。
  - **サントリー公式「ブランドを守る取り組みについてのご案内」を初めて取得**（headless Chrome＋`?o20=true`。/tmp/pb1018/bin/cdp.mjs）: ①キャップシール（22年2月以降目途）②ラベル上部（24年3月以降製造分目途）、シール無し・1種類・2種類が混在、「真贋判定を目的としたものではありません」。従来の J-CAST／グルメWatch 由来の記述（「開封口と背面」）を公式の表現に置き換え。QRコードシールの公式案内は「響 100周年記念」のみ。
- build（heap8192）※1回目はバックグラウンド実行で Google Fonts 取得失敗→再実行で EXIT0 → precheck ✅（3,006）→ フル rsync（--exclude .git/_not-found/functions）→ source 5c54a3f18 / deploy 652389d1bb。ASP計測リンク 0→0。
- **(続き) 竹鶴ピュアモルトの中央値を修正（コーディネーター指示）**: `fetch-yahoo-medians.py` の `TITLE_FILTERS` に `taketsuru-pure`（require=竹鶴／exclude=数字+年・YEARS・漢数字の年数・ノンチル・エッセンシャル・シェリー・グランデ・ポートウッド・マディラ・記念・リミテッド・数量限定・限定品/ボトル/版。⚠️素の「限定」は除外しない＝「都内限定発送」等の配送条件が多い）。共通 JUNK（セット/まとめ/2〜9本/空瓶）・700ml 以外も除外。
  - ヤフオクは1回だけ取得（3ページ・150件）→ 結果を /tmp に保存してタイトル全件を目視 → 同じデータで再計算して書き込み（追加の検索なし）。除外された主なもの: 25年・21年・17年・12年ピュアモルト、エッセンシャルズ2026、6本/12本セット。
  - **before 12,250円（n=280・平均18,536・最大67,100）→ after 4,950円（n=67・平均5,732・3,136〜8,800）**。店舗の NV 掲示 2,500〜8,000円と整合。品質ゲート通過。
  - price-history の旧系列（5/25〜10/19・5,775〜18,000円で乱高下＝混入）は破棄し 2026-10-20 の1点から（note に記載）。週次は同じ TITLE_FILTERS を通るので戻らない。
  - 週次 [2/7]〜[4.5/7] を手動実行（tier2 は `--slugs taketsuru-pure`＝47ページ）。日付だけ変わる真贋ハブ9本は戻した。竹鶴ハブの中央値表にピュアモルトを追加（取得日は銘柄で異なれば範囲表記）。
  - source e4d20326c/5db58c90e・deploy 0a42e44754。out/・deploy の「12,250円」0件、ASP 0。Indexing は送っていない（指示）。

### 2026-10-21 朝ルーチン: 10/19 週次の本番反映確認＋GSC上位3記事の業者情報照合 ✅本番反映済み
- **週次（10/19 03:00）**: ログどおりビルド失敗（hanyu-card null 型・10/19 に手動反映済み `757c1126f2`）。今日の本番で確認＝tier2 リーフ 2,397 の取得日は 2026-10-19（taketsuru-pure 47 は 10/20 再集計）・旧日付0／全リーフ「3業者」／og 一式（og:title/description/url/image/type/site_name＋twitter 4種）は deploy の index.html 3,008 で欠け0／robots の Sitemap 行あり／POST /api/contact {} → 400／out と deploy の差分は _not-found のみ。二重起動は 10/19 も発生（launchd 側が「別の週次更新が実行中」で終了＝ロックは効いている）。crontab 行は残存（MediaXAI 操作待ち）。
- **GSC 9/23〜10/20 表示上位3**: hakushu-nv 487／taketsuru-21 453／yamazaki-nv 450（10/20 と同じ）。外部リンク全数の到達を確認（403 はサントリー/アサヒ/ニッカのボット遮断・429 は linx-as.store）。ASP 計測リンク 0→0。
- **食い違い→修正**: ①店舗名「サケウル（STOCK LAB）」は stock-lab.com のどのページにも出てこない（title/og:site_name＝「ストックラボ」・運営＝株式会社ストックラボ。blackbowmore 記事は既に「ストックラボ」表記）→ store-prices.json と手書き taketsuru-kaitori を「ストックラボ」に統一（deploy HTML 96→0・6記事）。②白州/山崎NV のストックラボ更新日 10/09→10/21（価格 9,000〜10,000円は同じ）・checked_at 10/21。③白州NV のファイブニーズ実績（「日付の新しいもの」を抜粋）に最新の 2026-08-07 白州 NV 700ml 7,000円が無かった→追加。LINXAS（白州 9,700円 6/6・180ml 1,800円 2/14／山崎 9,600円 9/30・180ml 2,000円 10/4）・ファイブニーズ（9,500円 9/30・27か月推移）は一致。
- source 61d9007c9/27fa1d5b4・deploy e2ce382c16（フル rsync・--exclude .git/_not-found/functions）。build（heap8192）EXIT0・precheck ✅（3,006）。CF 反映まで約19分。本番6記事で旧表記0・Indexing 3/3（上位3記事）。
- 未対応: tier2 北海道の地元業者表に「ストックラボ 北海道」（北海道全域・出張/宅配）とある（47リーフ）。公式の店舗一覧に北海道店があるかは未確認。

### 2026-10-21 成長ルーチン12:00: 「ブラックボウモア」11.6位（imp56）の競合差分／竹鶴ピュアモルト受け皿の URL 確認 ✅本番反映済み
- **ブラックボウモア**（/articles/bowmore-blackbowmore-kaitori/・10/20 クロール済み indexed）: 10/16 の追加（6種の表・買取6店・見分け方）と重ならない分だけ追加。単ワードの意図（どんな酒か・価格）向け。
  - 海外オークション表に 2025〜2026 年の結果（従来は 2022 年まで）: Whisky.Auction ロット202677＝セカンド（30年・No.92/2,000・液面 Middle shoulder・使用感あり）7,000ポンド（2025-04-22終了）／Whisky Advocate 2026-10-16＝Whisky Auctioneer 9月オークション（10/5終了）で 50年ラストカスク 47,580ドル（記事の米ドル表記）。intro に「液面低下・ラベル傷みで落札額が下がる傾向」。
  - エディション確認の項目に「ホワイト／ゴールドボウモアとの違い」（トリロジー: ブラック42年 2007 シェリー 40.5% 827本／ホワイト43年 2008 バーボン樽 42.8% 「/732」表記／ゴールド44年 2009 バーボン3+シェリー 42.4% 701本。出典=Scotch Whisky Auctions 第94回ロット094-0810 の記載＝不落札ロット、仕様の出典としてのみ使用）＋FAQ 2問（最近の落札価格／ホワイト・ゴールドとの違い）。
  - title「ブラックボウモアとは？全6種の違い・**価格と**買取相場【…】29年〜50年・DB5」、description に「ホワイト／ゴールドとの見分け方」「2025〜2026年を含む落札価格」。page_updated 10-21。
  - 不採用: Bonhams HK 2025-09 ファイナル（落札額がページに無い＝予想 HK$65,000〜95,000 のみ）、whiskyhunter（有料）、just-whisky 2019（不落札）。
  - 変更は `data/store-prices.json` のみ → 生成器2本の再生成で差分は blackbowmore-kaitori 1本。sitemap はコミット後に `generate-sitemap.mjs`（git 日付）で lastmod 10-21（差分1行）。
- **竹鶴ピュアモルト受け皿**: 実 URL＝`/articles/taketsuru-pure-kaitori/`（slug 違いではない。`-nv` は 404・存在しない）。本番 200・robots index,follow・canonical 自己・sitemap 掲載（lastmod 10-20）・内部リンク 395 ページ。GSC sitemap は 10/21 12:07 JST に読込（3,006 URL・エラー0）。URL 検査は 1回目「Discovered - currently not indexed」、2回目「URL is unknown to Google」（API の返答が揺れる）＝未クロール。sitemap 追加は不要。Indexing 通知を送った。
- build（heap8192）EXIT0 → precheck ✅全項目OK（3,006）→ `*.txt` 削除（robots.txt 保全）→ フル rsync（--exclude .git/_not-found/functions）→ source a087876b3（＋sitemap 272b5d114）・deploy a50bde3151。CF 反映約3分。本番: 新 title 4・旧 title 0・47,580ドル 6・最終更新 10-21・/api/contact 400・robots Sitemap 行・ASP 計測リンク 0→0。Indexing 2/2 OK（blackbowmore・taketsuru-pure）。

### 2026-10-22 P2: tier2 北海道 地元業者表の公式照合（ストックラボ・ファイブニーズ）
- **ストックラボ**（stock-lab.com 10/22確認）: 北海道の地域ページ「北海道は宅配買取エリアです」／店舗一覧27店に北海道店なし／出張は「関東・関西・沖縄などを中心とする一部地域」（宅配/出張/店頭エリア=東京・千葉・茨城・神奈川・大阪・兵庫・沖縄）。旧行「ストックラボ 北海道／北海道全域／出張・宅配／業界トップクラスのお酒買取実績」→「ストックラボ／北海道全域（道内に店舗なし）／宅配／公式で北海道は宅配買取エリア。出張買取は関東・関西・沖縄が中心」。`scripts/patch-tier2-hokkaido-stocklab-1022.py`（冪等・51→0）。
- **追加1件 ファイブニーズ**（joylab.jp 10/22確認）: 店名は JOYLAB 札幌店（札幌市中央区南12条西6丁目・市電 中島公園通駅/行啓通駅 徒歩約4分）、店頭/出張/宅配、店舗一覧は JOYLAB 10店、札幌店ページ「北海道内全域対応」。旧「全国15店舗展開」「10年以上の実績」（記載なし）を置換。`scripts/patch-tier2-hokkaido-joylab-1022.py`（冪等・51→0）。
- 両方とも `data/prefectures.py` の local_dealers も同値に変更（生成器 v4 が読む）。⚠️北海道リーフは 52 ディレクトリ中 51 リーフ（依頼の「47頁」ではない）。未照合: 大黒屋 質札幌店「札幌駅/大通駅徒歩4分・店頭・出張・質屋系列で即現金化」。
- build（heap8192）EXIT0×2・precheck ✅（3,006）→ tier2/hokkaido のみ部分 rsync（*.txt 除外・functions 保持）＋sitemap。deploy HTML: 「ストックラボ 北海道」102→0／「全国15店舗展開」102→0／新行 各102。ASP 計測リンク 0→0。source 271afa51a/fc93b3d65/7ce1d3122・deploy 89ba147033/d02f45a191。

### 2026-10-22 成長ルーチン12:00: 「竹鶴 21 年 買取 価格」10.2位（imp57）/articles/taketsuru-21-kaitori/ 2回目 ✅本番反映済み
- 競合上位（大黒屋・JOYLAB・バイセル×2・LINXAS・リンクサス酒販ブログ・買取エリート kaitori-off.net×2・ウイスキー図書館）: 買取エリートは title に当日日付「【26年10月22日最新】」＋冒頭に「買取上限価格 〜59,000円」1行、ストックラボは冒頭に箱あり/箱なし表＋最終更新日＋月別推移、リンクサス酒販は販売価格と買取価格を分けた日付つき表。**うちに無かった＝冒頭で「いくらで売れるか」が分かる表**（従来は冒頭がヤフオク中央値カードで、店の掲示価格は 4-2 まで下がらないと出なかった）・買取エリート・バイセル旧ボトル・ストックラボの月別推移・販売価格との違い。
- **実装（週次再生成で消えない）**: `store_prices.quick_block()`＝store-prices.json の `quick`（heading/lead/rows/note）を h1・最終更新の直下（相場カードの前）に出す。ヤフオク中央値の行は生成時に自動。`_trend_svg` は横軸を月の通し番号に（実績の無い月を飛ばした系列でも間隔が正しい。連続系列の既存3ページは出力が変わらないことを確認）＋ `heading`/`lead`/`source_note` を任意キーに。
- 追加（10/22 確認）: 買取エリート（〜59,000円・角瓶/ノンチル 各〜58,000円・10/22更新）、バイセル旧ボトル 〜46,700円（2025年11月時点）、ストックラボ 最終更新 10/21（60,000〜61,000円は不変）＋箱ありの月別中央値 2023/12〜2026/9（21点）、LINXAS 2026年9月の買取5本・最高55,000円／年別中央値 2022 54,000→2026 48,000、FAQ「通販で8万円以上なのに買取は6万円前後なのはなぜ」（リンクサス酒販 9/18 時点の販売価格 88,000円・角瓶箱付 110,000円）。LINXAS 掲示（9/30）・リカスタ・ファイブニーズ実績は不変。
- ⚠️ 大黒屋・JOYLAB は 10/22 終日「メンテナンス中」（503）で再確認できず → 大黒屋の値は 10/20 確認のまま、その旨を表の注記に明記。
- title「竹鶴21年の買取価格・相場【…】箱あり60,000〜61,000円｜6店比較・箱なし・限定品別」・h1・desc を title_full/h1_full/desc_full で。**掲示価格を title に入れた＝手動データ。月替わりの再確認で title も直すこと**。ハブ（竹鶴の買取価格一覧）とは「21年」の有無で分離、ハブ側のリンク文言を「6店」に。
- build（heap8192）EXIT0 → precheck ✅（3,006）→ フル rsync（--exclude .git/_not-found/functions）→ source 39b522a8a・deploy 6777907d9a。ASP 計測リンク 0→0。

### 2026-10-23 朝ルーチン: tier2 北海道 地元業者表「大黒屋 質札幌店」の公式照合 ✅本番反映済み
- **公式**（shichi.e-daikoku.com/shop/sapporo/ と質店舗一覧・10/23確認。※daikokuya78.com は daikokuya.com＝別会社の店舗一覧に 301 し、北海道店なし）: 札幌市中央区北一条西3-3 札幌中央ビル1F・2F／大通駅7番出口・地下鉄さっぽろ駅11番出口 徒歩4分／10:00〜19:00 年中無休（年末年始除く）／取扱=質預かり・ブランド買取・チケット買取/販売・メール/LINE査定、本文に「お酒買取や金券売買まで出来る」。**出張買取の対応店は全63店中3店（水戸50号バイパス・栃木・静岡）＝札幌店は出張なし**。
- 旧「札幌駅/大通駅徒歩4分／店頭・出張／質屋系列で即現金化」→「札幌市中央区北一条西3-3（地下鉄さっぽろ駅・大通駅 徒歩4分）／店頭／質屋（質預かり・買取）。店舗ページに「お酒買取」対応と記載。出張買取は札幌店の対応サービスに無し。10:00〜19:00・年中無休（年末年始除く）（2026年10月23日確認）」。`scripts/patch-tier2-hokkaido-daikoku-1023.py`（冪等・app 51＋prefectures.py＋旧 v2 生成器）。
- build（heap8192）EXIT0・precheck ✅（3,006）→ tier2/hokkaido のみ部分 rsync（52ファイル）。deploy HTML「質屋系列で即現金化」（北海道）102→0。ASP 計測リンク 0→0／ヒカカク生URL 606本・539ページ（うち rel=sponsored 11本・10ページ）＝不変。
- 未対応（報告のみ）: 宮城51リーフの「大黒屋 質仙台店／仙台駅近郊／店頭・出張／質屋系列で即現金化」＝質店舗一覧に宮城県の店は無い（実在しない可能性・削除なら判断待ち）。愛知「大黒屋 名古屋」も同型。旧 v2 生成器（未使用）の北海道ストックラボ/ファイブニーズ行は 10/22 前の値のまま。

### 2026-10-23 成長ルーチン12:00: 「宮城峡 nv 買取」14.0位（imp39）／「山崎 25年 買取」18.5位（imp33） ✅本番反映済み
- **競合上位**（ストックラボ・LINXAS・大黒屋・リカスタ・ファイブニーズ・買取エリート・ウリドキ・JOYLAB）: 冒頭に店舗の掲示価格表・最終更新日・月別推移・新旧/ホログラム別の行。**うちに無かった＝店舗の買取価格そのもの**（宮城峡NVはヤフオク n=2 で「集計中」しか無く、価格の記載ゼロ。山崎25年もヤフオク中央値だけ）。
- **宮城峡NV**（`store-prices.json` に `miyagikyo-nv` 新設・10/23確認）: 大黒屋「宮城峡 シングルモルト」2,500円（10/19）・リカスタ 新ラベル3,400/旧ラベル3,300円（日付なし）・LINXAS 箱付/箱無 3,700円（9/30）・ファイブニーズ 4,000円（日付なし）・ストックラボ 4,000〜5,000円（10/21）＋限定品（ピーテッド/グランデ）。ストックラボ月別中央値 36か月（2023/10 3,100→2026/9 4,000）。実績: LINXAS 2026-09-28 2,800円（9月37本・最高3,700円・年中央値2025 3,500→2026 2,800）・ストックラボ 2025-07-18 4店各4,000円・ファイブニーズ 2024-10-07 3,000円。見分け方（年数表記・2008年3月発売当初の縦書きラベル・限定品・蒸溜所限定ブレンデッド・箱）、FAQ「市場相場」を店舗価格で置換＋2問。title「宮城峡NV（ノンエイジ）の買取価格・相場【…】2,500〜5,000円｜5店比較・箱なし・月別推移」。⚠️定価（アサヒ 2023/1219 リリース）は 10/23 アサヒのサイトがメンテナンス中・nikka.com 403 で未確認＝書いていない。
- **山崎25年**（`yamazaki-25` 新設）: 大黒屋（新型ホロ有QR付 800,000／QR無 780,000／ホロ無 730,000／旧型 840,000／LE 743,000／ベロア1998〜2005 問い合わせ・10/19）・LINXAS（新型ホロ緑シール 820,000 10/13／ホロ無 700,000 10/4／旧型 860,000・LE 850,000 9/30）・ストックラボ（790〜791k／770〜771k／旧型 800〜801k・10/21）・リカスタ（現行完備 820,000／QRなし 770,000／旧ボトル 850,000・ボトルのみ 700,000）・買取エリート（新型〜800,000／旧型〜860,000・10/23）。実績: ファイブニーズ 2026-08-10 新ボトル 780,000円・ストックラボ 2025-11-29 4店各870,000円。ストックラボ月別（新型ホロ有完品・11点 2023/11〜2025/6、以後実績なし）。**定価の推移**（サントリー No.14030 125,000→160,000・No.14499 →360,000・商品情報ページ 415,000円税別＝headless Chrome で 10/23 確認）。**サントリー公式「ブランドを守る取り組み」山崎版**（/whisky/qrcodesticker/manual-yamazaki/?o20=true・山崎25年が対象に明記・2種類のシール・真贋判定目的ではない）。FAQ 税金を30万円超の扱いに置換（NTA 3105/3152/1900 を 10/23 確認）＋3問。title「山崎25年の買取価格・相場【…】新型79〜82万円・旧型80〜86万円｜6店比較・シール有無別」。**掲示価格を title に入れた＝手動データ。月替わりに再確認して title も直す**。
- **竹鶴21年**: 大黒屋は 10/23 に開けた（値・更新日 10/19 とも 10/20 と同じ）・ストックラボ（10/21 不変）・買取エリート（10/23 更新・〜59,000円不変）→ 注記を「10/23 再確認・値は同じ」に。JOYLAB は 10/23 も 503（値は 10/17 確認のまま）。
- 生成器2本の再生成で差分は3ページのみ。build（heap8192）EXIT0 → precheck ✅（3,006）→ sitemap（git 日付）→ `*.txt` 削除 → フル rsync（--exclude .git/_not-found/functions）。ASP 計測リンク 0→0・hikakaku 1,212→1,212。
- source f5dbc49d1（＋sitemap 74bd4a7cf）・deploy b935577dd0（CF 反映約2分）。本番 ?cb: 3URL 200・新 title・旧 title 0・竹鶴21「10/22 メンテナンス中だったため」0・/api/contact 400・robots Sitemap 行・ASP 0。Indexing 2/2 OK（宮城峡NV・山崎25年）。

### 2026-10-23 山崎25年 月別推移の 2025/4 外れ値を除外（MediaXAI「君が正しいと思う方で」→ B）✅本番反映済み
- ストックラボ月別中央値の 2025/4 490,000円（前後 955,000／885,000円・状態の記載なし）を `store-prices.json` yamazaki-25.trend から除外し、lead に「除外した値と理由」を明記（11→10か月・最低 490,000→885,000円）。
- 判断理由: 状態不明の1点で縦軸が半分まで伸び、推移の読み取り（緩やかな下落）が崩れる。値自体は注記に残し、隠していない。
- 再生成の差分は yamazaki-25 の1ページのみ。build heap8192 EXIT0・precheck ✅ 3,006・hikakaku 542→542・deploy fcb1c74a14。

### 2026-10-24 朝ルーチン: tier2 愛知 地元業者表「大黒屋 名古屋」の公式照合 ✅本番反映済み
- **公式**（shichi.e-daikoku.com 質店舗一覧・/shop/nagoya/・/shop/sakae/ 10/24確認）: 愛知県は3店＝大黒屋ブランド館 名古屋大須店（中区大須3-26-40 高田ビル）・大黒屋 質名古屋栄買取センター（中区栄3-7-9 新鏡栄ビル2F）・大黒屋 質豊田248店。「大黒屋 名古屋」という店名は無い（ただし名古屋市内に実店舗はある＝宮城のような削除案件ではない）。お酒(買取のみ)の記載があるのは名古屋大須店のページだけ（栄は取扱商品・本文ともお酒の記載なし）。両店とも 10:30〜19:30 年中無休（年末年始除く）、取扱サービスに出張買取なし（一覧の「出張買取 (3)」＝水戸50号バイパス・栃木・静岡のみ・10/24再確認）。
- 旧「大黒屋 名古屋／愛知県名古屋市／店頭・出張／質屋系列で安心、即現金化」→「大黒屋ブランド館 名古屋大須店／名古屋市中区大須3-26-40（上前津駅 徒歩4分・大須観音駅 徒歩5分）／店頭／質屋（質預かり・買取）。店舗ページに「お酒(買取のみ)」と記載。出張買取は対応サービスに無し。10:30〜19:30・年中無休（年末年始除く）。名古屋市内には質名古屋栄買取センター（中区栄）もあり（2026年10月24日確認）」。`scripts/patch-tier2-aichi-daikoku-1024.py`（冪等・app 51＋prefectures.py＋旧 v2 生成器）。
- build（heap8192）EXIT0・precheck ✅（3,006）→ tier2/aichi のみ部分 rsync（*.txt 除外・functions 保持）＋sitemap。deploy HTML「質屋系列で安心、即現金化」102→0・新店名 0→102。ASP 計測リンク 0→0／hikakaku URL 1,210→1,210。source cfe82aa9c/c206f8311・deploy 8d6bbd0f82。
- 未対応（報告のみ）: 愛知の同じ表の「福ちゃん 名古屋」「ファイブニーズ 名古屋（10年以上の実績）」は未照合（北海道 10/22 のファイブニーズ＝JOYLAB と同型の可能性）。

### 2026-10-24 成長ルーチン12:00: GSC 10〜20位クエリ9群（地域4県＋銘柄6）✅本番反映済み
- 着地（GSC 9/25〜10/22 query+page）: 山崎ノンエイジ→yamazaki-nv／富山・高岡→/tier2/toyama/／宮城狭12・10年→miyagikyo-nv（12年は miyagikyo-12 にも）・15年→miyagikyo-15／スプリングバンク→springbank-21（hub springbank-kaitori は indexed）／和歌山・茨城・奈良→各県ハブ／余市 nv→yoichi-10（**yoichi-nv は Discovered - not indexed**）／ボウモア 買取相場→blackbowmore・bowmore-25（**bowmore-nv は Crawled - not indexed**）／白州 ノンエイジ 価格推移→hakushu-nv。
- **県ハブ**（`data/local-buyers.json` に wakayama 32店・ibaraki 87店・nara 58店を新設、全て各社公式の店舗ページで 10/24 確認）: 買取大吉（県ページの全店で品目に「お酒」）・おたからや（店舗ページの品目に「洋酒」がある店のみ）・大黒屋 質水戸50号バイパス店・ストックラボ 茨城日立店・質屋かんてい局 つくば店・駅南やまご質店・リフレ館。出張（バイセル/LINXAS/福ちゃん/リカスタ/大黒屋 訪問査定エリア/DEゴザル/ストックラボ）。蒸溜所: 紀州熊野蒸溜所（プラム食品）・木内酒造 八郷蒸溜所・神息酒造 奈良蒸溜所（大和蒸溜所はジン）。富山: 買取大吉 高岡末広店・ジュエルカフェ アイタウン魚津店を追加（26→28店）＋全店の営業時間。
  - `gen-tier2-area.py`: 店舗の `hours`（あれば列を出す）・市町村別の店舗数の行（`#local-cities`）・`checked_label`・`distillery_label`/`distillery_checked` を任意キーに。JSON に無い県は無変更（7県再生成で差分は4県のみ）。
  - 除外（判断材料）: 和歌山 おたからや FC（合同会社福太）10店＝運営会社サイトに「お酒」あるが店舗別の品目表示なし／茨城 おたからや 赤塚店（HTTP 500）・FC 6店。JOYLAB は 10/24 終日 503。
- **銘柄**（`store-prices.json`）: `miyagikyo-12`（5店 28,000〜32,000円＋**宮城峡10年の参考行**（PeatBid に10年ページが無い）・新旧ラベル）・`miyagikyo-15`（5店 52,000〜63,000円）・`yoichi-nv`（4店 3,000〜5,300円・ストックラボ月別36か月）新設。title から実勢より高いヤフオク中央値（12年 37,398円・15年 64,899円）を外し店舗レンジに。identify に「宮城狭」表記の注記。yamazaki-nv/hakushu-nv に大黒屋・リカスタ・キングラムリカー（＋山崎はバイセル）・quick 表・**LINXAS の長期推移（山崎 2019〜・白州 2018〜）** を `longterm`（heading/label/source_note を任意キーに）で。title は変えていない（両ページは8位台で稼いでいるため）。
  - ⚠️ ストックラボ 宮城峡15年の月別グラフ（2024-08 4,200円の1点）は掲示 57,000円と桁が合わないため不採用。LINXAS 山崎NV グラフの「2022/11 7,500円」（並びが前後）は除外。
- **手書きハブ**: springbank-kaitori に年数別の掲示価格・買取実績表（10年〜50年・ローカルバーレイ・CV・旧ボトル）＋FAQ。bowmore-nv-kaitori を「ボウモアの買取相場」ハブ化（年数別・カモメラベル・限定品の表を0章に、title/h1/desc/パンくず）。生成器 INTENT_SPLIT: springbank-15/21 → springbank-kaitori、bowmore-18/25/black と yoichi-10/15/20 の導線文言を更新。
- 値は全て 10/24 に各店ページで確認（掲示価格は手動データ＝**月替わりに再確認して title も直す**）。サントリー/アサヒ公式（定価・発売/終売）は 403・メンテナンスで未確認＝書いていない。

### 2026-10-25 朝ルーチン: tier2 愛知 地元業者表「福ちゃん 名古屋」「ファイブニーズ 名古屋」の公式照合 ✅本番反映済み
- **福ちゃん**（fuku-chan.jp トップ・/liquor/・会社概要 10/25確認）: 運営 株式会社REGATE。店舗一覧の愛知県は2店＝名古屋 高針店（名東区牧の原1-907・10:00〜18:00 完全予約制・不定休）／名古屋 緑滝ノ水店（緑区万場山1丁目2207・10:00〜18:00 年中無休）。「福ちゃん 名古屋」という店名は無い（名古屋市内に実店舗あり＝削除案件ではない）。出張・宅配・店舗の3方式は一致。「大手で中部全域カバー」は対応エリアの記載なし（10/16 と同じ）→削除。
- **ファイブニーズ**（sakekaitori.com /shop/nagoya/・/company/、fiveneeds.co.jp/corporate 10/25確認）: 株式会社ファイブニーズ（2011年設立）の「愛知名古屋店」＝中区新栄2-2-1 イノフィスビル1F・新栄町駅 徒歩3分・店舗受付10:00〜19:00。**対応方法は店頭・出張・宅配**（旧「出張・宅配」は店頭が抜けていた）。出張対応エリア＝名古屋市16区・豊田/岡崎/一宮/豊橋/西尾など＋岐阜・三重・富山・石川・静岡。「10年以上の実績」→公式の文言は「丸10年」なので会社概要の設立年に置換。
- 🚨**新発見: JOYLAB とファイブニーズは別会社**（JOYLAB株式会社＝joylab.jp 10/25 のメンテナンス告知と会社案内 ／ 株式会社ファイブニーズ＝sakekaitori.com）。10/22 の北海道行「JOYLAB 札幌店（ファイブニーズ）」は誤り → 店名表記の「（ファイブニーズ）」だけ外した（JOYLAB 札幌店の内容は 10/22 確認のまま）。ファイブニーズは別に「北海道札幌店」（中央区北5条西25-4-18）と「宮城仙台店」（青葉区国分町3-2-2）を持つ＝北海道行の差し替え／宮城の大黒屋差し替え（B案）の候補。記事側のファイブニーズのリンクは sakekaitori.com で正しい。JOYLAB 公式は 10/22〜10/25 も 503（PHP 脆弱性対策で公開停止中）。
- `scripts/patch-tier2-aichi-fukuchan-fiveneeds-1025.py`（冪等・愛知 51×2行＋北海道 52＋prefectures.py＋旧 v2 生成器）。
- build（heap8192）EXIT0・precheck ✅（3,006）→ コミット後 sitemap → tier2/aichi・tier2/hokkaido 部分 rsync（*.txt 除外・functions 保持）＋sitemap（105ファイル M・削除0）。source d2dd5a59e/54685a76d・deploy c27a4a10ff（CF ビルド 00:27→00:52 UTC＝約25分）。ASP 計測リンク 0。本番 ?cb: 愛知2URL・北海道1URL 200・旧値0・新値あり・sitemap lastmod 10-25 105件・/api/contact 400・robots Sitemap 行。
- 未対応（報告のみ）: 宮城の「福ちゃん 仙台／出張・宅配・店頭／全国大手」＝福ちゃんの店舗一覧に宮城の店は無い（仙台センターは事業所）→「店頭」は誤りの可能性。「バイセル 仙台／東証上場大手」も未照合。旧 v2 生成器の北海道行は旧値のまま（未使用）。

### 2026-10-25 成長ルーチン12:00: GSC 10〜20位の9群（竹鶴25年・スプリングバンク21年・ラフロイグ・マッカラン12年・タリスカー・シグネット・イチローズ・石川/福井/高知/神奈川）✅本番反映済み
- **URL検査（10/25）**: taketsuru-kaitori ハブ＝indexed（10/20 クロール）／taketsuru-25＝indexed だが最終クロール 10/06（ハブ新設前）／taketsuru-pure＝Discovered - not indexed／laphroaig-nv・talisker-nv＝**Crawled - not indexed**（NVクエリが25年に着地する原因）／springbank-kaitori・-21・glenmorangie-kaitori・macallan-12・tier2/ishikawa＝indexed。
- **竹鶴**: 判断＝新ページは作らず、既存ハブ `/articles/taketsuru-kaitori/` を受け皿のまま、着地している25年ページの冒頭に「竹鶴25年と竹鶴の年数別早見表」（store-prices `quick`・NV白/黒・12・17・21・25・35年、各行から年数ページ/ハブへリンク）。title_full/h1/desc を「買取価格・相場…160,000〜185,000円｜3店比較・竹鶴の年数別早見表」。大黒屋（10/19）・ストックラボ（10/24更新・値は10/18と同じ）・LINXAS（9/30）を 10/25 に再確認、ハブの STORE_CHECKED/最終更新 10-25・ストックラボ更新日 10/24。
- **store-prices.json 新設7銘柄**（10/25 各店ページで確認・サブエージェント調査を /tmp/pb1025/ で検算）: springbank-21（LINXAS 70,000/100,000円・ボトラーズ40,000円・大黒屋実績・ハブとの役割分担の文）／talisker-25（掲示は大黒屋 1975-2001 NCS 95,000円のみ・実績24,000〜82,400円）／laphroaig-25（LINXAS エディション別 35,000〜70,000円＋【参考・年数表記なし】セレクト/ロア/トリプルウッド）／macallan-12（6店・シェリーオーク/ダブル/トリプル/ファインオーク別）／glenmorangie-signet（掲示店なし・実績1件 8,000円 2023-12）／ichirosu-mwr（5店 5,000〜6,500円・WWR）／ichirosu-double-distilleries（新旧ラベル別）。**掲示価格を title に入れた＝月替わりに再確認して title も直す**。
- `store_prices._ymd` が「YYYY-MM」（月単位の実績）を受けるように。
- **ラフロイグNV（手書き）** に店舗の掲示価格の節（3章）・title/desc・FAQ・最終更新 10-25。
- **角度ページ**（generate-angle-pages-v3）: 手書きブランド一覧ハブ（glenmorangie/taketsuru/springbank/macallan/glenfiddich-kaitori）への関連カードを追加（117ページ）＝「グレンモーレンジ 買取」がシグネットのランキングに着地していた対策。
- **県ハブ**: local-buyers.json に ishikawa 26店（白山市は買取大吉 白山市松任店のみ・オリエンタル金沢蒸溜所）・fukui 23店・kochi 9店（仁淀川蒸留所）・kanagawa 166店（買取大吉158・大黒屋3・キングラム2・LINXAS/ファイブニーズ/ストックラボ・丹沢蒸溜所。おたからやは店舗別品目が無く未掲載）。石川 title に「金沢市・白山市」。
- build（heap8192）EXIT0×2 → precheck ✅（3,006。1回目 talisker desc 164字・2回目 kanagawa desc 180字を短縮）→ フル rsync（--exclude .git/_not-found/functions）。source 77097ab6c/57def17f5・91d9c176b/055ef6410、deploy 5a2d2aca68・6ccd773874。ASP 計測リンク 0→0・hikakaku 1,212→1,212。
- 未対応: talisker-nv（店舗の掲示が無く足す値が無い）・JOYLAB は 10/25 も 503（竹鶴21年の JOYLAB 値は 10/17 のまま）。
