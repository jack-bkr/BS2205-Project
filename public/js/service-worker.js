var cacheName = 'Storefront-v1';
var appShellFiles = [
    '/',
    '../img/image-placeholder.png',
    '../css/styles.css',
    '../js/index.js',
    '../favicon.ico'
];

var itemImages = [];

const itemsPromise = fetch(self.location.origin + "/api/item").then((response) => { // fetch data as promise from api
    for (var i = 0; i < response.length; i++) {
        itemImages.push('../img/' + response.json()[i]._id + '.png');
    }
});

var contentToCache = appShellFiles.concat(itemImages);

// Install service worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(async (cache) => {
            console.log('[Service Worker] Caching app shell and content');
            return cache.addAll(await contentToCache);
        })
    );
});

// Fetch content using service worker
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    )
});

// Activate the service worker
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (cacheName.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});