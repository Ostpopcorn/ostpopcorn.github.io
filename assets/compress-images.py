#!/usr/bin/env python3
"""Compress screenshots for the blog: 256-colour palette, saved as lossless WebP.

Usage: python3 assets/compress-images.py FILE_OR_DIR [...]

Writes NAME.webp next to each NAME.png and leaves the PNG in place.
Needs Pillow with libimagequant (the engine behind pngquant).
"""
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageStat


def compress(png):
    original = Image.open(png).convert("RGB")
    palette = original.quantize(colors=256, method=Image.Quantize.LIBIMAGEQUANT,
                                dither=Image.Dither.NONE)
    # libimagequant can silently collapse an image to a single colour
    colours = len(palette.getcolors(256) or [])
    if colours < 16:
        raise RuntimeError(f"{png}: quantizer returned only {colours} colours")

    webp = png.with_suffix(".webp")
    palette.convert("RGB").save(webp, format="WEBP", lossless=True, method=6)

    error = sum(ImageStat.Stat(ImageChops.difference(original, Image.open(webp).convert("RGB"))).mean) / 3
    before, after = png.stat().st_size, webp.stat().st_size
    print(f"{webp}: {before // 1024} -> {after // 1024} KB "
          f"({1 - after / before:.0%} smaller, mean error {error:.2f}/255)")


def main(args):
    if not args:
        sys.exit(__doc__)
    for arg in map(Path, args):
        for png in sorted(arg.glob("*.png")) if arg.is_dir() else [arg]:
            compress(png)


if __name__ == "__main__":
    main(sys.argv[1:])
