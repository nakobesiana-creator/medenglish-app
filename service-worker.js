const CACHE_NAME = 'medenglish-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './english_learning_app.html',
  './styles.css',
  './app.js',
  './english_app_data.js',
  './enhanced_features.js',
  './manifest.json'
];

// Installazione: scarica e salva i file nella cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Recupero: usa i file in cache se offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
