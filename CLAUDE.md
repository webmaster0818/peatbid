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
