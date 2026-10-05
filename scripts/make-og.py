#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""OG画像と favicon を作る（public/og-image.png 1200x630・icon.png・apple-icon.png・favicon.ico）。

⚠️ 画像に数字・件数・価格を入れない。銘柄数や相場は毎週変わるが、画像は作り直されないので
   古い数字だけが残る（公開前チェックでも画像の中の数字は検出できない）。数字はページ本文で出す。
   絵文字・他社ロゴも使わない。

  python3 scripts/make-og.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
W, H = 1200, 630
# サイトのパレット（app/globals.css）
OAK = (31, 26, 20)          # --foreground / --ink
OAK_LINE = (52, 43, 32)
AMBER = (201, 146, 61)      # --amber
AMBER_LIGHT = (224, 170, 82)
PARCH = (251, 247, 238)     # --background
DIM = (176, 163, 140)

SERIF = "/System/Library/Fonts/Supplemental/Didot.ttc"
JP_BOLD = "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc"
JP = "/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc"


def og() -> None:
    S = 2  # 2倍で描いて縮める
    im = Image.new("RGB", (W * S, H * S), OAK)
    d = ImageDraw.Draw(im)

    def put(xy, s, font, size, fill, index=0):
        d.text((xy[0] * S, xy[1] * S), s, font=ImageFont.truetype(font, size * S, index=index), fill=fill)

    # 枠（ラベルの二重罫線）
    d.rectangle([28 * S, 28 * S, (W - 28) * S, (H - 28) * S], outline=OAK_LINE, width=2 * S)
    d.rectangle([40 * S, 40 * S, (W - 40) * S, (H - 40) * S], outline=AMBER, width=1 * S)
    # 左のアクセント（琥珀色の帯）
    d.rectangle([92 * S, 120 * S, 98 * S, 400 * S], fill=AMBER)

    put((128, 104), "PeatBid", SERIF, 132, PARCH, index=1)
    put((132, 268), "ウイスキー買取の最高入札比較", JP_BOLD, 56, AMBER_LIGHT)
    put((132, 356), "主要銘柄の買取相場と買取業者を、実際の落札データをもとに比較", JP, 30, DIM)
    d.line([132 * S, 520 * S, (W - 132) * S, 520 * S], fill=OAK_LINE, width=2 * S)
    put((132, 540), "peatbid.com", SERIF, 34, DIM)

    out = PUB / "og-image.png"
    im.resize((W, H), Image.LANCZOS).save(out, optimize=True)
    print(f"書き出し → {out}")


def icons() -> None:
    N = 1024
    im = Image.new("RGBA", (N, N), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, N - 1, N - 1], radius=200, fill=OAK)
    d.rounded_rectangle([56, 56, N - 57, N - 57], radius=150, outline=AMBER, width=18)
    f = ImageFont.truetype(SERIF, 760, index=1)
    box = d.textbbox((0, 0), "P", font=f)
    d.text(((N - (box[2] - box[0])) / 2 - box[0], (N - (box[3] - box[1])) / 2 - box[1]), "P", font=f, fill=AMBER_LIGHT)

    im.resize((512, 512), Image.LANCZOS).save(PUB / "icon.png", optimize=True)
    # apple-touch-icon は透過不可（黒く抜ける）ので地色で埋める
    ap = Image.new("RGB", (N, N), OAK)
    ap.paste(im, mask=im.split()[3])
    ap.resize((180, 180), Image.LANCZOS).save(PUB / "apple-icon.png", optimize=True)
    im.resize((256, 256), Image.LANCZOS).save(PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"書き出し → {PUB}/icon.png, apple-icon.png, favicon.ico")


if __name__ == "__main__":
    og()
    icons()
