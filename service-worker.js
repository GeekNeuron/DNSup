const CACHE_NAME = 'dnsup-shell-v2'; // bumped: fonts are now part of the app shell
const APP_SHELL = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './dns-data.json',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    // Self-hosted fonts (replaces the old fonts.googleapis.com dependency) —
    // caching these is what actually makes icons/typography work offline now;
    // before this they were fetched from Google's CDN on every load and were
    // never part of the offline app shell at all.
    './fonts/fonts.css',
    './fonts/material-icons-latin-400-normal.woff2',
    './fonts/inter-latin-400-normal.woff2',
    './fonts/inter-latin-500-normal.woff2',
    './fonts/inter-latin-600-normal.woff2',
    './fonts/inter-latin-700-normal.woff2',
    './fonts/inter-latin-800-normal.woff2'
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
