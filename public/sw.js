// Service Worker — caches static assets for instant repeat loads
const CACHE = "portfolio-v4";
const PRELOAD = [
  "/",
  "/fonts/optimized/oppo-sans-portfolio.woff",
];

// Install: pre-cache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRELOAD)).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for static assets, network-first for HTML
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Skip Netlify redirects and non-GET
  if (event.request.method !== "GET") return;

  // HTML: network-first, fallback to cache
  if (event.request.destination === "document") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Static assets: cache-first. For images, only cache real image responses;
  // missing assets can be rewritten to index.html by SPA fallbacks.
  if (
    event.request.destination === "script" ||
    event.request.destination === "style" ||
    event.request.destination === "font" ||
    event.request.destination === "image"
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((response) => {
          const contentType = response.headers.get("content-type") || "";
          const isCacheableImage =
            event.request.destination !== "image" || contentType.startsWith("image/");

          if (response.ok && isCacheableImage) {
            const clone = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }
});
