"""Generate the bounded CRT lens field used by the SVG displacement filters.

Run with Python 3; no additional packages are needed. The inverse mapping gently
magnifies the center and returns to neutral at the rim so the HUD stays inside
the glass. See https://www.w3.org/TR/filter-effects-1/#feDisplacementMapElement.
"""

import struct
import zlib
from pathlib import Path

SIZE = 512
CURVATURE = 0.065  # Approximately 7% magnification at the center.
FILTER_SCALE = 0.1  # Must match the desktop filter's objectBoundingBox scale.


def png_chunk(kind, data):
    return (
        struct.pack(">I", len(data))
        + kind
        + data
        + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)
    )


pixels = bytearray()
for y in range(SIZE):
    pixels.append(0)  # PNG scanline without a prediction filter.
    py = 2 * y / (SIZE - 1) - 1
    for x in range(SIZE):
        px = 2 * x / (SIZE - 1) - 1
        weight = max(0, 1 - px**4 - py**4)
        dx = -CURVATURE * px * weight / 2
        dy = -CURVATURE * py * weight / 2
        red = round(255 * (0.5 + dx / FILTER_SCALE))
        green = round(255 * (0.5 + dy / FILTER_SCALE))
        pixels.extend((red, green, 128, 255))

png = (
    b"\x89PNG\r\n\x1a\n"
    + png_chunk(b"IHDR", struct.pack(">IIBBBBB", SIZE, SIZE, 8, 6, 0, 0, 0))
    + png_chunk(b"IDAT", zlib.compress(pixels, 9))
    + png_chunk(b"IEND", b"")
)
destination = Path(__file__).resolve().parents[1] / "public" / "crt-lens-map.png"
destination.write_bytes(png)
