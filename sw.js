// PDVMix — Service Worker v1.14.1
// Estratégia: Network-First.
// Online: busca sempre a versão publicada no GitHub Pages.
// Offline: usa a última versão válida armazenada em cache.

const CACHE = 'pdvmix-v1.14.1';

const CORE_FILES = [
  './index.html',
  './manifest.json',
  './assets/pdvmix-logo.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

// Instala e pré-cacheia somente os arquivos essenciais.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(CORE_FILES))
  );
  self.skipWaiting();
});

// Assume imediatamente as abas abertas e remove SOMENTE caches antigos do PDVMix.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('pdvmix-') && key !== CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Rede primeiro. O cache só é usado como fallback quando a rede falha.
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Não interfere em ViaCEP, WhatsApp ou qualquer recurso externo.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;

        // Em navegação offline, abre o app pelo index previamente armazenado.
        if (event.request.mode === 'navigate') {
          const fallback = await caches.match('./index.html');
          if (fallback) return fallback;
        }

        return Response.error();
      })
  );
});
