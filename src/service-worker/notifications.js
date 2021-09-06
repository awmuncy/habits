Notification.requestPermission(function(status) {
  // eslint-disable-next-line no-console
  console.log('Notification permission status:', status);
});

function displayNotification() {

  if (Notification.permission === 'granted') {

    navigator.serviceWorker.getRegistration().then(function(reg) {
      let options = {
        body   : 'Here is a notification body!',
        icon   : 'icons/icon-512.png',
        vibrate: [100, 50, 100],
        data   : {
          dateOfArrival: Date.now(),
          primaryKey   : 1
        },
        actions: [
          {action: 'explore',
            title : 'Explore this new world',
            icon  : 'icons/icon-512.png'},
          {action: 'close',
            title : 'Close notification',
            icon  : 'icons/icon-512.png'}
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}
displayNotification();
