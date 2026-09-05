const CACHE_NAME = 'dnsup-shell-v1';
const APP_SHELL = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './dns-data.json',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // IMPORTANT: only cache-serve our OWN static app-shell files (same origin, GET).
    // Ping measurements and the speed test deliberately hit third-party hosts
    // (dns.google, cloudflare-dns.com, speed.cloudflare.com, etc.) — those must
    // always go to the network untouched, or cached/opaque responses would silently
    // corrupt the latency/throughput numbers. Everything that isn't a known app-shell
    // file is left completely alone.
    if (event.request.method !== 'GET' || url.origin !== self.location.origin) {
        return;
    }
    const isShellFile = APP_SHELL.some((path) => url.pathname.endsWith(path.replace('./', '/')) || url.pathname === '/' && path === './');
    if (!isShellFile) return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            const network = fetch(event.request).then((response) => {
                if (response && response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => cached);
            return cached || network;
        })
    );
});
