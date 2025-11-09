#!/usr/bin/env python3
"""Simple link checker: given an HTML file or directory, find <a href> links and check HTTP status.
Usage: python tools/link_checker.py pages/index.html
"""
import sys
from pathlib import Path
import requests
from bs4 import BeautifulSoup

def check_file(path):
    p = Path(path)
    if not p.exists():
        print(f"Not found: {p}")
        return
    html = p.read_text(encoding='utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    links = [a.get('href') for a in soup.find_all('a') if a.get('href')]
    for href in sorted(set(links)):
        if href.startswith('#'):
            continue
        if href.startswith('mailto:'):
            print(f"SKIP mailto: {href}")
            continue
        if href.startswith('http'):
            try:
                r = requests.head(href, allow_redirects=True, timeout=5)
                print(f"{r.status_code} {href}")
            except Exception as e:
                print(f"ERR {href} -> {e}")
        else:
            # local file
            target = (p.parent / href).resolve()
            print(f"LOCAL {href} -> exists={target.exists()}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python tools/link_checker.py path/to/file.html')
        sys.exit(1)
    check_file(sys.argv[1])
