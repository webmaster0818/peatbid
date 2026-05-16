#!/bin/bash
# Level 3 価格監視を Mac の launchd に登録するセットアップスクリプト
#
# 実行: ./scripts/install-cron.sh
#
# 動作: 毎週金曜 09:00 JST に scripts/level3-monitor.py --notify を実行

set -e

PROJECT=$(cd "$(dirname "$0")/.." && pwd)
PLIST_NAME="com.peatbid.level3monitor"
PLIST_PATH="$HOME/Library/LaunchAgents/${PLIST_NAME}.plist"

mkdir -p "$HOME/Library/LaunchAgents"

cat > "$PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${PLIST_NAME}</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>${PROJECT}/scripts/level3-monitor.py</string>
        <string>--notify</string>
    </array>
    <key>WorkingDirectory</key>
    <string>${PROJECT}</string>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Weekday</key>
        <integer>5</integer>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>${PROJECT}/data/scraper-state/cron.log</string>
    <key>StandardErrorPath</key>
    <string>${PROJECT}/data/scraper-state/cron.err</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin</string>
    </dict>
</dict>
</plist>
EOF

launchctl unload "$PLIST_PATH" 2>/dev/null || true
launchctl load "$PLIST_PATH"

echo "✅ launchd ジョブを登録しました"
echo "   plist: $PLIST_PATH"
echo "   実行: 毎週金曜 09:00 JST"
echo "   ログ: ${PROJECT}/data/scraper-state/cron.log"
echo ""
echo "テスト実行: launchctl start ${PLIST_NAME}"
echo "削除:      launchctl unload $PLIST_PATH && rm $PLIST_PATH"
