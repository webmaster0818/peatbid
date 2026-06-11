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
