var v = "0.0.54";

var CACHE_NAME = 'Habit'

const urlsToCache = [
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-256.png',
  '/icons/icon-512.png',
  '/home',
  '/css/style.css',
  '/js/app.js',
  '/fonts/Nunito_Sans/NunitoSans-Bold.ttf',
  '/fonts/Nunito_Sans/NunitoSans-Regular.ttf',
  '/fonts/Nunito_Sans/NunitoSans-BoldItalic.ttf',
  '/fonts/Nunito_Sans/NunitoSans-Italic.ttf',
  '/fonts/Nunito_Sans/NunitoSans-Black.ttf',
  '/fonts/Satisfy/Satisfy-Regular.ttf',
  '/fonts/fontAwesome/fontawesome-webfont.eot',
  '/fonts/fontAwesome/fontawesome-webfont.ttf',
  '/fonts/fontAwesome/fontawesome-webfont.woff',
  '/fonts/fontAwesome/fontawesome-webfont.woff2',
  '/fonts/fontAwesome/FontAwesome.otf'
];

self.addEventListener('message', function(event){ 
  console.log(event.data);
});



// Delete old caches, also updated
self.addEventListener('activate', event => {
  console.log("[SW] Actived");
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        }))
      )
  );
});


// This triggers when user starts the app
self.addEventListener('install', function(event) {

  event.waitUntil(self.skipWaiting());

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        fetch('manifest.json')
          .then(response => {
            response.json();
          })
          .then(assets => {
            cache.addAll(urlsToCache);
          })
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request, {ignoreSearch:true}).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          // cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});