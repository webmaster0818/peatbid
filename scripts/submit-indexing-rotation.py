#!/usr/bin/env python3
"""peatbid Phase 1: 未表示ページ消化のための日次Indexing APIローテーション送信。

- sitemap.xmlの全URLをカーソル順に1日N件ずつ送信（クォータは全プロパティ共有のため控えめに）
- カーソルは ~/.openclaw/workspace/peatbid-indexing-cursor.json に永続化（repo外）
- 429（クォータ枯渇）が出たら即停止
- daily-gold-update.sh から毎朝呼ばれる
"""
import json
import re
import time
from pathlib import Path

BATCH = 60
ROOT = Path(__file__).resolve().parent.parent
CURSOR_FILE = Path.home() / ".openclaw" / "workspace" / "peatbid-indexing-cursor.json"
TOKEN = Path.home() / ".openclaw" / "workspace" / "secrets" / "gsc-token.json"

from google.oauth2.credentials import Credentials  # noqa: E402
from google.auth.transport.requests import AuthorizedSession  # noqa: E402

sm = (ROOT / "public" / "sitemap.xml").read_text(encoding="utf-8")
urls = re.findall(r"<loc>([^<]+)</loc>", sm)
if not urls:
    raise SystemExit("sitemap empty")

cursor = 0
if CURSOR_FILE.exists():
    cursor = json.loads(CURSOR_FILE.read_text()).get("cursor", 0) % len(urls)

creds = Credentials.from_authorized_user_file(str(TOKEN))
session = AuthorizedSession(creds)

ok = err = 0
i = cursor
for _ in range(BATCH):
    u = urls[i % len(urls)]
    r = session.post(
        "https://indexing.googleapis.com/v3/urlNotifications:publish",
        json={"url": u, "type": "URL_UPDATED"},
    )
    if r.status_code == 200:
        ok += 1
    else:
        err += 1
        if r.status_code == 429:
            print(f"quota exhausted at {ok} ok")
            break
    i += 1
    time.sleep(0.25)

CURSOR_FILE.write_text(json.dumps({"cursor": i % len(urls), "last_ok": ok, "last_err": err}))
print(f"indexing rotation: ok={ok} err={err} next_cursor={i % len(urls)} total={len(urls)}")
