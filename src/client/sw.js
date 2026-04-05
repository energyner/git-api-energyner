//sw.js
//convertir Ride-LimoG-Gold en APP junto con manifest.json
const CACHE_NAME = 'git-api-energyner';
const urlsToCache = [
  './index.html',
  './assets/img/logo2400x400.png',
  './assets/css/main1.css' 
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});