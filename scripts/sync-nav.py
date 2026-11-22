#!/usr/bin/env python3
"""Stamp the shared nav into every page and rebuild the search index.

The top nav lives in ONE place: partials/nav.html (markup) + nav.css (styles).
After editing either, run from the repo root:

    python3 scripts/sync-nav.py          # update pages + search-index.json
    python3 scripts/sync-nav.py --check  # exit 1 if anything is out of date

What it does:
  1. Replaces the <nav>...</nav> block on every page (except NO_NAV below)
     with partials/nav.html, marking the current page's link class="active".
  2. Makes sure each page links /nav.css right after spine.css, with a
     ?v= cache-buster taken from nav.css's contents.
  3. Rebuilds /search-index.json (title, description, URL of every page in
     sitemap.xml) for the nav's search box. Blog posts come from the blog's
     own /blog/search-index.json.

The blog (www.thedealmentor.ai/blog) loads partials/nav.html and nav.css
from this site, so it picks up nav changes without its own edit.
"""
import hashlib
import html
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
NAV = ROOT / "partials" / "nav.html"
NAV_CSS = ROOT / "nav.css"
INDEX = ROOT / "search-index.json"
SITE = "https://www.thedealmentor.ai"

# Pages that deliberately have no site nav (checkout flow). lp/ landing pages
# keep their own mini-navs and are never touched.
NO_NAV = {"checkout.html", "thank-you.html"}

NAV_RE = re.compile(r"<nav\b[^>]*>.*?</nav>", re.S)
SPINE_CSS_RE = re.compile(r'(<link rel="stylesheet" href="/spine\.css\?v=[^"]*">)')
NAV_CSS_RE = re.compile(r'<link rel="stylesheet" href="/nav\.css\?v=[^"]*">\n?')


def pages():
    for p in sorted(ROOT.glob("*.html")) + sorted(ROOT.glob("resources/*.html")) + sorted(ROOT.glob("vs/*.html")):
        if p.name in NO_NAV and p.parent == ROOT:
            continue
        yield p


def url_path(page):
    rel = page.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    rel = rel[: -len(".html")]
    return "/" + (rel[: -len("/index")] if rel.endswith("/index") else rel)


def nav_for(page_url, nav_html):
    """The shared nav with the link to this page marked active."""
    def mark(m):
        tag = m.group(0)
        if 'class="wordmark"' in tag:
            return tag
        if re.search(r'class="([^"]*)"', tag):
            return re.sub(r'class="([^"]*)"', r'class="active \1"', tag, count=1)
        return tag[:-1] + ' class="active">'
    return re.sub(r'<a href="%s"[^>]*>' % re.escape(page_url), mark, nav_html)


def meta(text, pattern):
    m = re.search(pattern, text, re.S | re.I)
    return html.unescape(m.group(1)).strip() if m else ""


def build_index():
    sitemap = (ROOT / "sitemap.xml").read_text()
    out = []
    for loc in re.findall(r"<loc>([^<]+)</loc>", sitemap):
        path = loc.replace(SITE, "") or "/"
        file = ROOT / ("index.html" if path == "/" else path.lstrip("/") + ".html")
        if not file.exists():
            file = ROOT / path.lstrip("/") / "index.html"
        if not file.exists():
            print(f"  ! sitemap URL with no page file, skipped: {loc}")
            continue
        text = file.read_text()
        out.append({
            "t": re.sub(r"\s*\|\s*DealMentor\s*$", "", meta(text, r"<title>(.*?)</title>")),
            "d": meta(text, r'<meta name="description" content="([^"]*)"'),
            "u": path,
        })
    return json.dumps(out, ensure_ascii=False, indent=1) + "\n"


def main():
    check = "--check" in sys.argv
    nav_html = NAV.read_text().strip()
    css_v = hashlib.sha1(NAV_CSS.read_bytes()).hexdigest()[:8]
    css_link = f'<link rel="stylesheet" href="/nav.css?v={css_v}">'
    stale = []

    for page in pages():
        text = page.read_text()
        if not NAV_RE.search(text):
            print(f"  ! no <nav> found, skipped: {page.relative_to(ROOT)}")
            continue
        new = NAV_RE.sub(lambda _: nav_for(url_path(page), nav_html), text, count=1)
        new = NAV_CSS_RE.sub("", new)
        new, n = SPINE_CSS_RE.subn(lambda m: m.group(1) + "\n" + css_link, new, count=1)
        if not n:
            print(f"  ! no spine.css link, nav.css not added: {page.relative_to(ROOT)}")
        if new != text:
            stale.append(page.relative_to(ROOT).as_posix())
            if not check:
                page.write_text(new)

    index = build_index()
    if not INDEX.exists() or INDEX.read_text() != index:
        stale.append(INDEX.name)
        if not check:
            INDEX.write_text(index)

    if check:
        if stale:
            print("Out of date (run python3 scripts/sync-nav.py):\n  " + "\n  ".join(stale))
            sys.exit(1)
        print("Nav and search index are up to date.")
    else:
        print(f"Updated {len(stale)} file(s)." + ("\n  " + "\n  ".join(stale) if stale else ""))


if __name__ == "__main__":
    main()
