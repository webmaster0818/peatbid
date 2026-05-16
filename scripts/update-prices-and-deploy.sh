#!/bin/bash
# PeatBid 価格データ更新 & デプロイ（週次運用スクリプト）
#
# 使い方:
#   1. data/price-history/*.json を編集（最新月の boxed/no_box/opened を更新）
#   2. ./scripts/update-prices-and-deploy.sh  を実行
#
# 動作:
#   - public/sitemap.xml の lastmod を更新
#   - next build → out/ 生成
#   - peatbid-deploy リポジトリへコピー & push
#   - Cloudflare Pages が自動でデプロイ

set -e

SRC="/Users/takashi.hasegawa/projects/peatbid"
DEPLOY="/Users/takashi.hasegawa/projects/peatbid-deploy"

cd "$SRC"

echo "📊 [1/5] sitemap.xml 再生成（lastmod 更新）"
node scripts/generate-sitemap.mjs

echo "🏗️  [2/5] Next.js ビルド"
npm run build 2>&1 | tail -5

echo "📦 [3/5] deploy リポジトリへコピー"
find "$DEPLOY" -mindepth 1 -maxdepth 1 ! -name ".git" ! -name "CNAME" -exec rm -rf {} +
cp -a "$SRC/out/." "$DEPLOY/"

echo "📤 [4/5] 両リポジトリへ push"
cd "$SRC"
git add -A
TIMESTAMP=$(date "+%Y-%m-%d")
git commit -m "Weekly price update: $TIMESTAMP" --allow-empty
git push

cd "$DEPLOY"
git add -A
git commit -m "Deploy: weekly price update $TIMESTAMP" --allow-empty
git push

echo "✅ [5/5] 完了。Cloudflare Pages のビルドを確認してください: https://peatbid.com/"
