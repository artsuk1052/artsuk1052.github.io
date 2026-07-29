/* 다시, 나의 일 — 서비스 워커 (배포판)
   - 페이지(HTML)는 network-first: 콘텐츠가 항상 최신으로 보이도록
   - 정적 자산(css/js/img/폰트)은 cache-first
   - 오프라인이면 캐시로 폴백 (진단 도구는 오프라인에서도 실행) */
const CACHE = 'consult-v6';
const CORE = [
  './',
  'index.html',
  'app.html',
  'site.css',
  'site.js',
  'adsense.js',
  'consult-manifest.json',
  'consult-icon-192.png',
  'consult-icon-512.png',
  'consult-apple-touch.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isFontHost(h){ return h === 'fonts.googleapis.com' || h === 'fonts.gstatic.com'; }

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  const sameOrigin = url.origin === self.location.origin;
  const isDoc = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  // HTML 문서: network-first (최신 우선), 실패 시 캐시
  if (isDoc && sameOrigin) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match(req).then((hit) => hit || caches.match('app.html') || caches.match('index.html')))
    );
    return;
  }

  // 그 외(자산·폰트): cache-first
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if ((sameOrigin || isFontHost(url.hostname)) && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(()=>{});
        }
        return res;
      }).catch(() => hit);
    })
  );
});
