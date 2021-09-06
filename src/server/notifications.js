const webpush = require('web-push');
const CronJob = require('cron').CronJob;


export default (app) => {

  let publicVapidKey = 'BLmxzlcq4J2LK-tE4lanPwErqbpGNNd_7mRrjICbV3pRb6HoxeXg4mQ0gQDMen7qzSPOCqZCs0mGPGaBFa4W-KI';
  let privateVapidKey = 'Oe9-gKn1HNgmC3fpuiOYFUURAuNPlNeMgALBt7A6wnY';

  webpush.setVapidDetails('mailto:allen@allenmuncy.com', publicVapidKey, privateVapidKey);



  let subscriptions = [];
  let sending_payload;
  let payload;

  payload = {
    title: new Date().toString()
  };


  app.post('/subscribe', (req, res) => {
    res.status(201).json({});

    let at = subscriptions.findIndex((item)=>{
      return item.endpoint === req.body.endpoint;
    });

    if (at !== -1) { return; }
    subscriptions.push(req.body);

    // eslint-disable-next-line no-console
    console.log('Added a subscriber.');

  });


  let cron = new CronJob('45 21 * * *', function() {
    // Check fill list of subscribers, in Mongo
    // Check if any users needs to be notified
    // Attempt notification
    // If notif is reject (by google?), deregister subscribers
    if (subscriptions.length < 1) {
      // eslint-disable-next-line no-console
      console.log('No one to notify');
    } else {
      subscriptions.forEach(subscription => {
        notify('Remember to check off your habits.', subscription);
      });
      // eslint-disable-next-line no-console
      console.log(`Sent notifications to ${subscriptions.length} subscribers`);
    }


  }, null, true, 'America/New_York');



  function notify(message, subscriber) {
    // eslint-disable-next-line no-console
    console.log('Notified');
    payload.title = message;
    payload.body = 'You\'re doing great on your habits. Really! Now, go check off what you have left for the day.';
    sending_payload = JSON.stringify(payload);
    webpush.sendNotification(subscriber, sending_payload).then((respone)=>{
      // eslint-disable-next-line no-console
      console.log(respone);
    }).catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      if (error.statusCode === 410) {
        let at = subscriptions.findIndex((item)=>{
          return item === subscriber;
        });
        subscriptions = subscriptions.slice(at, 1);
        // eslint-disable-next-line no-console
        console.log('We tried to deliver a notification, but the subscriber is gone. We\'ve removed their address');
      }
    });
  }

};
