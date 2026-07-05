#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""誤着地クエリ自動抽出（グレンファークラス問題の一般形の検出）。
GSC Search Analytics(page+query)から「総称クエリが年代/数字特化ページに誤着地」しているペアを抽出。
検出条件:
  - 着地URLに年代スラッグ（-25-/-18-/-12-/-105-/-30- 等の数字トークン）が含まれる
  - クエリに対応する年代・数字トークンが含まれない（総称/年代非指定クエリ）
  - imp >= MIN_IMP かつ position が浅すぎない（受け皿を作れば拾える圏）
→ 受け皿候補リストとして出力。木曜の週次GSC定例に組み込んで自動で候補を積み上げる。
"""
import re, sys, datetime, urllib.parse
from pathlib import Path
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import AuthorizedSession

TOKEN = Path.home() / ".openclaw" / "workspace" / "secrets" / "gsc-token.json"
PROP = "sc-domain:peatbid.com"
MIN_IMP = 10
DAYS = 28

# 着地URLの年代/数字トークン（-25-kaitori 等）
URL_NUM_RE = re.compile(r"-(\d{1,3})-")
# クエリ中の年代・数字トークン
Q_NUM_RE = re.compile(r"\d{1,3}")

def main():
    creds = Credentials.from_authorized_user_file(str(TOKEN))
    s = AuthorizedSession(creds)
    end = datetime.date.today() - datetime.timedelta(days=1)
    start = end - datetime.timedelta(days=DAYS - 1)
    body = {
        "startDate": start.isoformat(),
        "endDate": end.isoformat(),
        "dimensions": ["page", "query"],
        "rowLimit": 5000,
    }
    url = f"https://searchconsole.googleapis.com/webmasters/v3/sites/{urllib.parse.quote(PROP, safe='')}/searchAnalytics/query"
    r = s.post(url, json=body)
    if r.status_code != 200:
        print(f"GSC error {r.status_code}: {r.text[:200]}", file=sys.stderr)
        sys.exit(1)
    rows = r.json().get("rows", [])

    cand = []
    for row in rows:
        page, query = row["keys"][0], row["keys"][1]
        imp, pos, clk = row["impressions"], row["position"], row["clicks"]
        if imp < MIN_IMP:
            continue
        slug = page.rstrip("/").split("/")[-1]
        m = URL_NUM_RE.findall(slug)
        if not m:
            continue  # 着地URLに年代トークンなし＝対象外
        url_nums = set(m)
        q_nums = set(Q_NUM_RE.findall(query))
        # クエリの数字が着地URLの年代と一致していれば正着地→除外
        if q_nums & url_nums:
            continue
        # クエリに年代/数字が全く無い（＝総称クエリ）を優先。数字はあるが不一致も候補
        generic = len(q_nums) == 0
        cand.append({
            "query": query, "page": page, "imp": imp,
            "pos": round(pos, 1), "clicks": clk,
            "url_year": ",".join(sorted(url_nums)), "generic": generic,
        })

    # 総称クエリ優先→imp降順
    cand.sort(key=lambda c: (not c["generic"], -c["imp"]))
    print(f"# 誤着地クエリ候補（{start}〜{end}・imp>={MIN_IMP}・{len(cand)}件）")
    print(f"# 総称クエリが年代特化ページに着地＝受け皿候補")
    for c in cand[:40]:
        tag = "総称" if c["generic"] else "数字不一致"
        print(f"[{tag}] q「{c['query']}」→ {c['page'].split('/articles/')[-1].rstrip('/')} "
              f"(年代{c['url_year']}) imp={c['imp']} pos={c['pos']} clk={c['clicks']}")
    if not cand:
        print("該当なし（誤着地は検出されませんでした）")

if __name__ == "__main__":
    main()
