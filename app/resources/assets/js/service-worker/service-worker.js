import station from './station';
var v = "0.0.56";

console. devLog = function(message) {
	console.log("DEVELOPEMENT LOG:");
	console.log(message);
}

station();

var CACHE_NAME = 'Habit'

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
  '/service-worker-install.js'
];

const home_urls = [
  '/habits'
];




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

function matchesPresetUrls(urlString, presetUrls) {
  var urlObject = new URL(urlString);
  if(presetUrls.includes(urlObject.pathname)) {
    console.devLog("It's a match");
    return true;
  }

  return false;
}



self.addEventListener('push', ev => {
  const data = ev.data.json();
  console.log('Got push', data);
  var close = self.registration.showNotification(data.title, {
    body: data.body || 'Message from HabitApp',
    icon: data.icon || '/images/logo.png',
    image: data.image
  });

  ev.waitUntil(close);

});

self.addEventListener('fetch', function(event) {

  var request = event.request;
  if(matchesPresetUrls(request.url, home_urls)) request = "/home";

  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(request, {ignoreSearch:true}).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});