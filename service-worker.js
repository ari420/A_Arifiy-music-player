// Define a cache name and the files to cache
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  'asset/css/css_main.css',
  'asset/css/css_reset.css',
  'asset/img/preview512.jpg',
  'asset/img/preview192.jpg',
  'asset/js/main.js',
  'index.html',
  'asset/node_modules/remixicon/fonts/remixicon.css'
];

// Install event - caches the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serves cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached version or fetch from network if not cached
        return response || fetch(event.request);
      })
  );
});

// Activate event - cleans up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
