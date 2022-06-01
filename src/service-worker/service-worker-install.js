const publicVapidKey = 'BLmxzlcq4J2LK-tE4lanPwErqbpGNNd_7mRrjICbV3pRb6HoxeXg4mQ0gQDMen7qzSPOCqZCs0mGPGaBFa4W-KI';

if ('serviceWorker' in navigator) {

  run();
}

async function run() {
  const registration = await navigator.serviceWorker
    .register('/service-worker.js');


  const subscription = await registration.pushManager
    .subscribe({
      userVisibleOnly     : true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

  if (await registration.pushManager.getSubscription() === null) {
    await fetch('/subscribe', {
      method : 'POST',
      body   : JSON.stringify(subscription),
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}

// Boilerplate borrowed from https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


if ('serviceWorker' in navigator) {
  let checkForUpdate = async() => {
    let registration = await navigator.serviceWorker.register('/service-worker.js');
    registration.onupdatefound = () => {
      let installingWorker = registration.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed'
          && navigator.serviceWorker.controller) { return true; }

        return false;
      };
    };
  };


  checkForUpdate()
    .then(isAvailable => {
      if (isAvailable) {
        if (confirm('A new version of the app is available. Refresh?')) {
          navigator.serviceWorker.controller.postMessage({action: 'skipWaiting'});
          location.reload();
        }
      }
    });
} else {
  // eslint-disable-next-line no-console
  console.log('Service Worker is not supported by browser.');
}
