if ('serviceWorker' in navigator/* && self.location.hostname!=="localhost" */) {
  window.isUpdateAvailable = new Promise(function(resolve, reject) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Worker registration successful', reg.scope);
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          installingWorker.onstatechange = () => {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // new update available
                  resolve(true);
                } else {
                  // no update available
                  resolve(false);
                }
                break;
            }
          };
        };
      })
      .catch(err => console.error('[SW ERROR]', err));      
  });
  window['isUpdateAvailable']
  .then(isAvailable => {
    if (isAvailable) {
      if(confirm("A new version of the app is available. Refresh?")) {
        navigator.serviceWorker.controller.postMessage({action: "skipWaiting"});
        location.reload();
      }
    }
  });
} else {
    console.log('Service Worker is not supported by browser.');
}   