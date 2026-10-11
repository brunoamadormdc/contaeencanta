const CACHE = 'conta-encanta-v1';
const FILES = [
  '/', '/index.html', '/styles.css', '/math.css', '/mobile.css',
  '/app.js', '/story.js', '/more-stories.js', '/birthday-stories.js',
  '/engine.js', '/progress.js', '/drag.js', '/audio.js', '/auto-check.js',
  '/math.js', '/math-ui.js', '/install.js', '/manifest.webmanifest',
  '/assets/icon.svg', '/assets/icon-192.png', '/assets/icon-512.png',
  '/assets/apple-touch-icon.png',
  ...[
    'backpack', 'banana', 'biblioteca-flores', 'boats', 'bolo-sumido',
    'cast', 'clock', 'cloud-castle', 'festa-silencio', 'frog',
    'garden-flowers', 'garden-seed', 'kite', 'launch', 'lulu-chuva',
    'lunar-ride', 'lunar-cheese', 'mapa-bolhas', 'math-fair', 'mirror',
    'moon', 'picnic', 'pipo-patins', 'ribbons', 'search',
    'semente-amanha', 'tito-ponte', 'trem-estrelas'
  ].map(name => `/assets/${name}.webp`)
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('conta-encanta-') && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {}));
      }
      return response;
    } catch {
      const cache = await caches.open(CACHE);
      return (await cache.match(request, {ignoreSearch: true})) ||
        (request.mode === 'navigate' ? await cache.match('/') : Response.error());
    }
  })());
});
