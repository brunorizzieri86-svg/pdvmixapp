const CACHE = 'pdvmix-v1.13.1';
const CORE = [
  './', './index.html', './manifest.json',
  './assets/pdvmix-logo.png',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  const url = new URL(req.url);
  const isNavigation = req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname === '/' || url.pathname.endsWith('/manifest.json');
  if (isNavigation) {
    event.respondWith(
      fetch(req, {cache:'no-store'}).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return response;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
      return response;
    }))
  );
});
