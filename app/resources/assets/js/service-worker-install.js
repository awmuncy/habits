// if ('serviceWorker' in navigator/* && self.location.hostname!=="localhost" */) {
//   window.isUpdateAvailable = new Promise(function(resolve, reject) {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(reg => {
//         console.log('Worker registration successful', reg.scope);
//         reg.onupdatefound = () => {
//           const installingWorker = reg.installing;
//           installingWorker.onstatechange = () => {
//             switch (installingWorker.state) {
//               case 'installed':
//                 if (navigator.serviceWorker.controller) {
//                   // new update available
//                   resolve(true);
//                 } else {
//                   // no update available
//                   resolve(false);
//                 }
//                 break;
//             }
//           };
//         };
//       })
//       .catch(err => console.error('[SW ERROR]', err));      
//   });
//   window['isUpdateAvailable']
//   .then(isAvailable => {
//     if (isAvailable) {
//       if(confirm("A new version of the app is available. Refresh?")) {
//         navigator.serviceWorker.controller.postMessage({action: "skipWaiting"});
//         location.reload();
//       }
//     }
//   });
// } else {
//     console.log('Service Worker is not supported by browser.');
// }   




const publicVapidKey = 'BLmxzlcq4J2LK-tE4lanPwErqbpGNNd_7mRrjICbV3pRb6HoxeXg4mQ0gQDMen7qzSPOCqZCs0mGPGaBFa4W-KI';

if ('serviceWorker' in navigator) {
  console.log('Registering service worker');

  run()
  //.catch(error => console.error(error));
}

async function run() {
  console.log('Registering service worker');
  const registration = await navigator.serviceWorker.
    register('/service-worker.js');
  console.log('Registered service worker');

  console.log('Registering push');
  console.log(registration.pushManager.getSubscription());
  const subscription = await registration.pushManager.
    subscribe({
      userVisibleOnly: true,
      // The `urlBase64ToUint8Array()` function is the same as in
      // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
  console.log('Registered push');

  console.log('Subscribing to push');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('Subscribed to push');
}

// Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}