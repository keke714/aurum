#!/usr/bin/env python3
"""
Aurum 静态站点服务器 — 专为手机浏览器访问做了反缓存。

- 对于 HTML：永远 no-store / no-cache / must-revalidate
  （手机浏览器哪怕存了 HTML，也会重新拉最新版）
- 对于 CSS / JS：如果 URL 带 ?v=xxx 版本号，允许长期缓存
  （因为我们的版本号会随着每次 index.html 重新生成而变化）
  没带版本号的也强制 no-cache
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
import sys


PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
ROOT = os.path.dirname(os.path.abspath(__file__))


class NoCacheHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    # 禁用日志刷屏 (保留错误)
    def log_message(self, fmt, *args):
        # 仅打印 4xx/5xx
        if args and len(args) >= 2 and str(args[1]).startswith(('4', '5')):
            sys.stderr.write("[%s] %s\n" % (self.address_string(), fmt % args))

    def end_headers(self):
        path = self.path.split('?', 1)[0].lower()
        query = self.path.split('?', 1)[1] if '?' in self.path else ''

        has_version = 'v=' in query

        if path.endswith('.html') or path == '/' or path.endswith('/'):
            # HTML 永不缓存 (手机最容易缓存 HTML，然后一直看旧版)
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        elif path.endswith('.css') or path.endswith('.js') or path.endswith('.mjs'):
            if has_version:
                # 带版本号的可以缓存 1 天，下次版本号变了 URL 也会变
                self.send_header('Cache-Control', 'public, max-age=86400, immutable')
            else:
                # 没版本号的禁止缓存
                self.send_header('Cache-Control', 'no-cache, must-revalidate, max-age=0')
                self.send_header('Pragma', 'no-cache')
                self.send_header('Expires', '0')
        elif path.endswith(('.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico', '.woff', '.woff2', '.ttf')):
            self.send_header('Cache-Control', 'public, max-age=604800')
        else:
            self.send_header('Cache-Control', 'no-cache, max-age=0')

        # CORS (方便手机端从别的设备访问)
        self.send_header('Access-Control-Allow-Origin', '*')

        super().end_headers()


if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', PORT), NoCacheHandler)
    sys.stderr.write(f"🎬 Aurum 无缓存服务器启动 → http://localhost:{PORT}\n")
    sys.stderr.write(f"   📱 手机访问： http://<电脑IP>:{PORT}\n")
    sys.stderr.write(f"   🚫 缓存策略：HTML 永远不缓存，CSS/JS 带 ?v= 版本号自动强刷\n\n")
    sys.stderr.flush()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        sys.stderr.write("\n服务器已关闭\n")
