let v = '0.0.80';

// eslint-disable-next-line no-console
console.log('Service worker version:', v);

let CACHE_NAME = 'Habit';

const urlsToCache = [
  '/favicon.ico',
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
  '/fonts/fontAwesome/FontAwesome.otf',
  '/js/service-worker-install.js',
  '/sql-wasm.wasm',
  '/js/crdt-connection.js',
  '/js/sql-wasm.wasm'
];
const urlsPatternsToCache = [
  '/habit/(([\\d|[a-z]){24}|([\\d|[a-z]){6})'
];

const home_urls = [
  '/habits'
];




self.addEventListener('activate', event => {
  // eslint-disable-next-line no-console
  console.log('[SW] Actived');
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
          });
      })
  );
});

function matchesPresetUrls(urlString, presetUrls) {
  let urlObject = new URL(urlString);
  let matchesExistingPatterns = false;
  urlsPatternsToCache.forEach(pattern => {
    if (urlObject.pathname.match(pattern)) {
      matchesExistingPatterns = true;
    };
  });

  return matchesExistingPatterns;
}



self.addEventListener('push', ev => {
  const data = ev.data.json();

  let close = self.registration.showNotification(data.title, {
    body  : data.body || 'Message from HabitApp',
    icon  : data.icon || '/images/logo.png',
    image : data.image,
    action: 'open'
  });
  ev.waitUntil(close);

});

self.addEventListener('message', ev => {
  if (ev.data.type !== 'newNotification') { return; }
  let title = 'Hi!';

  let close = self.registration.showNotification(title, {
    body       : 'Hello',
    // eslint-disable-next-line
    showTrigger: new TimestampTrigger(new Date().getTime() + 3 * 1000)
  });

  ev.waitUntil(close);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // eslint-disable-next-line
  clients.openWindow('/habits');
}, false);

self.addEventListener('fetch', function(event) {

  let request = event.request;
  if (matchesPresetUrls(request.url, home_urls)) { request = '/home'; }

  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(request, {ignoreSearch: true}).then(function(response) {
        return response || fetch(event.request).then(function(response) {
          if (event.request.method !== 'POST' && response.status > 400) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});
