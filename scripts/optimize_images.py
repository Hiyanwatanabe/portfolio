"""Build the optimized images in src/assets/img from the original photos.

Usage: python scripts/optimize_images.py <folder with originals>

Only crops, resizes and re-encodes. Faces are never retouched. To replace a photo,
drop the new original in the source folder under the same name and run this again.
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "../_orig_assets")
OUT = Path(__file__).resolve().parent.parent / "src" / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)

# name: (source file, crop box as fractions (left, top, right, bottom) or None, widths)
JOBS = {
    "portrait": ("portrait-navy.jpg", (0.0, 0.07, 1.0, 1.0), [480, 760, 960]),
    "swim-fly": ("Swim1.jpg", None, [720, 1280]),
    "swim-medal": ("Swim2.jpg", (0.18, 0.0, 0.86, 1.0), [520, 860]),
    "cognisense-dashboard": ("Dashboard1.png", None, [947]),
    "cognisense-report": ("Report1.png", None, [850]),
    # Diploma: name, degree, distinction and date only. Signatures and the university seal are cropped
    # out on purpose (public site). The source image is small, so this is also the largest version.
    "diploma": ("diploma.jpg", (0.0, 0.0, 1.0, 0.762), [484]),
    # Certificates, uncropped: name, credential, dates and the issuer's own verification details.
    "cert-aws": ("aws-cert.png", None, [484]),
    "cert-google": ("google-cert.jpg", None, [640, 1287]),
    # PSAC "Athlete of the Week" graphic, from the conference's Instagram post. Cropped to the title,
    # photo and name, which also removes Instagram's on-screen buttons.
    # Online front desk: frames from Hiyan's explainer video (example names and data).
    "fd-callback": ("fd-callback.png", None, [540]),
    "fd-outcome": ("fd-outcome.png", None, [540]),
    "fd-texts": ("fd-texts.png", None, [540]),
    "psac-aotw": ("psac-aotw.jpg", (150 / 720, 89 / 810, 555 / 720, 768 / 810), [405]),
}
# Optional: only build the named images, e.g. `python scripts/optimize_images.py ../_orig_assets cert-aws`
ONLY = set(sys.argv[2:])


def crop(img, box):
    if not box:
        return img
    w, h = img.size
    return img.crop((int(box[0] * w), int(box[1] * h), int(box[2] * w), int(box[3] * h)))


for name, (file, box, widths) in JOBS.items():
    if ONLY and name not in ONLY:
        continue
    img = ImageOps.exif_transpose(Image.open(SRC / file)).convert("RGB")
    img = crop(img, box)
    for w in widths:
        w = min(w, img.width)
        h = round(img.height * w / img.width)
        out = OUT / f"{name}-{w}.webp"
        img.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=82, method=6)
        print(f"{out.name}: {w}x{h}, {out.stat().st_size // 1024} KB")

if ONLY:
    sys.exit(0)

# Social preview (1200x630): portrait on the right of a dark panel is composed in og.py-free way:
portrait = ImageOps.exif_transpose(Image.open(SRC / "portrait-navy.jpg")).convert("RGB")
og = Image.new("RGB", (1200, 630), (11, 16, 22))
p = crop(portrait, (0.25, 0.1, 0.75, 0.6))
p = p.resize((round(630 * p.width / p.height), 630), Image.LANCZOS)
og.paste(p, (1200 - p.width, 0))
og.save(OUT.parent.parent.parent / "public" / "og-base.png")
print("og-base.png written")

# Text for the social preview. Fonts: Segoe UI on Windows; falls back to Pillow's default.
from PIL import ImageDraw, ImageFont


def font(name, size):
    for path in (f"C:/Windows/Fonts/{name}", f"/System/Library/Fonts/Supplemental/{name}"):
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            pass
    return ImageFont.load_default(size)


og = Image.open(OUT.parent.parent.parent / "public" / "og-base.png")
d = ImageDraw.Draw(og)
for i, y in enumerate(range(70, 630, 92)):
    for x in range(0, 700, 12):
        d.line([(x, y), (x + 3, y)], fill=(30, 40, 52))
d.text((72, 190), "Hiyan Kubagawa", font=font("seguisb.ttf", 66), fill=(233, 238, 243))
d.text((76, 290), "Software Engineer / Systems & Automation", font=font("consola.ttf", 24), fill=(111, 214, 201))
d.text((76, 350), "Python · SQL · AWS · React · integrations", font=font("segoeui.ttf", 24), fill=(180, 192, 205))
d.line([(76, 440), (520, 440)], fill=(111, 214, 201), width=2)
d.line([(520, 426), (520, 454)], fill=(226, 182, 83), width=3)
og.save(OUT.parent.parent.parent / "public" / "og.png", optimize=True)
(OUT.parent.parent.parent / "public" / "og-base.png").unlink()
print("og.png written")
