const staticCacheName = "site-static-v1";
const cacheAssets = [
  "/",
  "asset/css/css_main.css",
  "asset/css/css_reset.css",
  "asset/img/preview512.jpg",
  "asset/js/main.js",
  "index.html",
  "asset/node_modules/remixicon/fonts/remixicon.css",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        console.log("caching assets...");
        cache.addAll(cacheAssets);
      })
      .catch((err) => {})
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((res) => {
        return res || fetch(evt.request);
      })
      .catch((err) => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("./index.html");
        }
      })
  );
});
