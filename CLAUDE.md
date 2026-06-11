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

#### 同日: 問い合わせ窓口構築（MediaXAI依頼。広告出稿・被リンクバーター交渉の受け皿）
- **構成**: `/contact/`（app/contact/page.tsx＋components/ContactForm.tsx, honeypot付き）→ POST `/api/contact` → **CF Pages Function**（peatbid-deploy repo の `functions/api/contact.js`）→ Discord Webhook で peatbidチャンネル(1481155786087469068)に通知（MediaXAI＋tomomiメンション）
- **シークレット**: deploy repoは**公開**のためWebhook URLはコード直書き禁止。CF Pages環境変数 `DISCORD_WEBHOOK_URL` が必要（**peatbidのCFアカウントは webmaster0818**（MediaXAI訂正 2026-06-11。mediax.saburo.ai0818ではない）。APIトークンは手元に無く**手動設定が必要**）。値は週次plist `com.peatbid.weekly-yahoo-update` の `DISCORD_PRICE_WEBHOOK` と同じでよい（このWebhookは生きていて宛先がpeatbid ch。GETで確認する際はUser-Agent必須=curl/8等、無いと403）
- **rsync注意**: deploy側 `functions/` は rsync --delete で消えるため weekly-yahoo-update.sh と手動rsyncに `--exclude="functions"` 必須（weekly側は追加済）
- 運用フロー: 通知→tomomiがドラフト返信をchに投稿→MediaXAI承認→メール送信（当面手動 or Gmail連携認証後にtomomiから）。Webhook経由bot投稿ではtomomiが自動起動しない可能性→MediaXAIメンションで起動
- footer「お問い合わせ（広告出稿・提携）」/sitemap 2,918 URL
- **✅稼働開始(2026-06-11 14:00頃)**: MediaXAIが新規Webhook作成→CF env var `DISCORD_WEBHOOK_URL`(Secret)設定→再デプロイ→tomomiのテストPOSTが200・Discord通知着弾を確認。全経路正常。CF保存ボタンが押せない時はフォーカス外し/空行削除/タイプをテキストにで回避
- **✅返信メール基盤(同日15:00頃)**: webmaster@mediax.biz からGmail APIで送信可能に。OAuth=`~/.openclaw/workspace/gsc-api/gmail_oauth_setup.py`(リモート承認: URL生成→MediaXAIが承認→redirect URLを貼ってもらいcode交換。**PKCE code_verifierをstateファイルに永続化必須**)。token=`secrets/gmail-webmaster-token.json`(gmail.sendのみ)。送信=`gsc-api/send_reply.py --to --subject --body[-file]`(差出人「PeatBid編集部 <webmaster@mediax.biz>」)。Gmail API有効化はMediaXAIがproject 487571920418で実施済。テスト送信をMediaXAIがスマホで受信確認済
- **運用フロー確定**: 着信通知→tomomiがドラフト＋対応方針をch投稿→MediaXAI承認→send_reply.pyで送信→送信報告をchへ。送信は必ず承認後
