#!/usr/bin/env python3
"""Checks the website: every local link, image, video, font and script exists, HTML is well formed
(balanced tags, unique ids, alt on every img, lang on <html>), and the total size stays small.
Usage: python3 website/check_site.py   (from anywhere)"""
import os, re, sys
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote

ROOT = os.path.dirname(os.path.abspath(__file__))
BASE = "/golden-hour-golf/"
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}
problems = []

class Page(HTMLParser):
    def __init__(self, name):
        super().__init__(convert_charrefs=True)
        self.name, self.stack, self.ids, self.refs, self.has_lang = name, [], set(), [], False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html" and a.get("lang"): self.has_lang = True
        if tag not in VOID: self.stack.append((tag, self.getpos()))
        if "id" in a:
            if a["id"] in self.ids: problems.append(f"{self.name}: duplicate id {a['id']}")
            self.ids.add(a["id"])
        if tag == "img" and "alt" not in a: problems.append(f"{self.name}: img without alt {a.get('src')}")
        for k in ("href", "src", "poster", "data-href-nl"):
            if a.get(k): self.refs.append(a[k])
        if a.get("srcset"):
            self.refs += [p.strip().split(" ")[0] for p in a["srcset"].split(",")]
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.stack.pop()
    def handle_endtag(self, tag):
        if tag in VOID: return
        if not self.stack or self.stack[-1][0] != tag:
            problems.append(f"{self.name}: unexpected </{tag}> at line {self.getpos()[0]} (open: {self.stack[-1][0] if self.stack else None})")
            # recover
            for i in range(len(self.stack) - 1, -1, -1):
                if self.stack[i][0] == tag: del self.stack[i:]; break
        else:
            self.stack.pop()

pages = sorted(f for f in os.listdir(ROOT) if f.endswith(".html"))
for name in pages:
    text = open(os.path.join(ROOT, name), encoding="utf-8").read()
    p = Page(name); p.feed(text); p.close()
    if p.stack: problems.append(f"{name}: unclosed {[t for t, _ in p.stack]}")
    if not p.has_lang: problems.append(f"{name}: <html> without lang")
    if "<title>" not in text: problems.append(f"{name}: no <title>")
    for ref in p.refs:
        u = urlparse(ref)
        if u.scheme in ("http", "https", "mailto", "tel") or ref.startswith("#"): continue
        path = unquote(u.path)
        if path.startswith(BASE): path = path[len(BASE):]
        elif path.startswith("/"): problems.append(f"{name}: root-absolute link {ref}"); continue
        if path in ("", "./"): path = "index.html"
        target = os.path.normpath(os.path.join(ROOT, path))
        if os.path.isdir(target): target = os.path.join(target, "index.html")
        if not os.path.exists(target): problems.append(f"{name}: missing {ref}")
        if u.fragment and target.endswith(".html"):
            if f'id="{u.fragment}"' not in open(target, encoding="utf-8").read():
                problems.append(f"{name}: missing anchor {ref}")

# CSS url() references
for dirpath, _, files in os.walk(os.path.join(ROOT, "assets", "css")):
    for f in files:
        css = open(os.path.join(dirpath, f), encoding="utf-8").read()
        for ref in re.findall(r'url\("?([^")]+)"?\)', css):
            if not os.path.exists(os.path.normpath(os.path.join(dirpath, ref))): problems.append(f"{f}: missing {ref}")

total = sum(os.path.getsize(os.path.join(d, f)) for d, _, fs in os.walk(ROOT) for f in fs)
print(f"{len(pages)} pages checked, site size {total / 1e6:.1f} MB")
if total > 25e6: problems.append("site is larger than 25 MB")
for p in problems: print("PROBLEM:", p)
sys.exit(1 if problems else 0)
