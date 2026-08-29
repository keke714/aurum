/* ═══════════════════════════════════════════════════════
   ║  Aurum Service Worker
   ║  策略：
   ║  - Core shell（index.html/CSS/JS/manifest）→ 安装时预缓存 + Cache-First
   ║  - CodeMirror 本地化文件 → Cache-First（永不失效）
   ║  - YouTube iframe / 外部课程链接 → Network-Only（不走 SW）
   ║  - 运行时动态请求 → Stale-While-Revalidate
   ═══════════════════════════════════════════════════════ */

const CACHE_VERSION = 'aurum-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './css/style.css',
  './js/app.js',
  './js/workshop.js',
  './js/workshop-fx.js',
  './js/practice.js',
  './js/classroom.js',
  './js/courses.js',
  './js/languages.js',
  './js/exercises.js',
  './js/aifloat.js',
  './js/teacher.js',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// ── 安装：预缓存核心壳 ──
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

// ── 激活：清旧缓存 ──
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── fetch 策略路由 ──
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 跳过 YouTube / 外部 API / 非 http(s)
  if (url.hostname.includes('youtube.com') ||
      url.hostname.includes('youtu.be') ||
      url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // 本地 CodeMirror / lib → 永久 Cache-First
  if (url.pathname.startsWith('/lib/codemirror/')) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match('./index.html')))
    );
    return;
  }

  // HTML 导航 → Network-First（拿到最新版）
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // 其他静态资源 → Stale-While-Revalidate
  e.respondWith(
    caches.match(req).then((hit) => {
      const fetchPromise = fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => hit);
      return hit || fetchPromise;
    })
  );
});
