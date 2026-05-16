# Level 3 Price Monitor

PeatBid の TOP10銘柄について、Yahoo Auctions の終了オークションデータを毎週監視し、
変動を検知して JSON 更新提案を生成するシステム。

## 動作概要

```
[毎週金曜 09:00 JST]
    ↓
GitHub Action (level3-price-monitor.yml) 起動
    ↓
scripts/level3-monitor.py 実行
    ↓
10銘柄について Yahoo Auctions closed search を取得
    ↓
HTML から 平均価格・最高価格・最低価格・出品件数を抽出
    ↓
data/scraper-state/<brand>.json に保存（前回スナップショットと比較）
    ↓
閾値超の変動を検出 → data/scraper-state/proposals/YYYY-MM-DD.md 生成
    ↓
（DISCORD_PRICE_WEBHOOK 設定時）Discord に通知
    ↓
tomomi が提案を確認 → 必要に応じて data/price-history/<brand>.json を編集
    ↓
./scripts/update-prices-and-deploy.sh でデプロイ
```

## 閾値

- **平均落札価格**: ±5% 以上で変動検知
- **出品件数**: ±20% 以上で変動検知

## ローカル実行

```bash
cd ~/projects/peatbid
python3 scripts/level3-monitor.py           # 通知なし
python3 scripts/level3-monitor.py --notify  # Discord通知あり（webhook URL 必要）
```

## GitHub Action

- スケジュール: `0 0 * * 5` (UTC 金曜 00:00 = JST 金曜 09:00)
- 手動実行: GitHub Actions タブから `workflow_dispatch`
- 必要な Secret: `DISCORD_PRICE_WEBHOOK`（Discord webhook URL、任意）

## ファイル構成

```
scripts/
  level3-monitor.py          # メインスクリプト
  LEVEL3-README.md           # このファイル

data/scraper-state/
  <brand>.json               # 各銘柄の最新スナップショット
  proposals/
    YYYY-MM-DD.md            # 週次変動レポート

.github/workflows/
  level3-price-monitor.yml   # GitHub Action 定義
```

## データ品質について

Yahoo Auctions の終了オークションデータは **二次流通市場の実取引価格** です。
業者買取価格は通常、これの **約 60〜70%** が目安となります。

提案レポートには「推定買取相場 = 平均落札 × 0.65」の参考値も記載されますが、
あくまで参考値であり、業者ごと・状態ごとに変動します。tomomi が他の情報源も
合わせて確認してから JSON を更新してください。

## トラブルシューティング

### 全銘柄エラーになる
- Yahoo Auctions の HTML 構造が変わった可能性
- `parse_yahoo()` 関数の正規表現を見直す

### 特定の銘柄だけエラーになる
- 検索クエリ（`BRANDS[*]["query"]`）が広すぎる/狭すぎる
- 候補が少なすぎる銘柄は WebFetch でも 404 を返すことあり

### Discord 通知が来ない
- `DISCORD_PRICE_WEBHOOK` Secret が設定されているか
- Webhook URL が有効か（Discord 側で確認）
