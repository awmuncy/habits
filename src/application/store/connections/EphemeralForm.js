export default [
  (store, props) => {
    return {
      title      : 'Some title',
      description: 'Hello',
      interval   : {
        seconds: '',
        minutes: '',
        hours  : '',
        days   : '',
        weeks  : '',
        months : ''
      },
      cron     : '* * * * *',
      notifiers: [
        {
          title : '',
          action: ''
        }
      ],
      successActions: [
        {
          title : '',
          action: ''
        }
      ]
    };
  },
  dispatch => {
    return {
      sendForm: ephemeral => {
        // eslint-disable-next-line no-console
        console.log(ephemeral);
        dispatch({ type: 'NEW_EPHEMERAL', ...ephemeral });
      }
    };
  }
];
