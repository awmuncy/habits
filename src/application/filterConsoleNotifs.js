
export default () => {
  window.onerror = () => { return false; };
  // eslint-disable-next-line no-console
  console.filteredWarn = console.warn;

  console.warn = (message) => {

    let blockedWarnings = [
      'componentWillMount has been renamed, and is not recommended for use',
      'componentWillReceiveProps has been renamed',
      'componentWillUpdate has been renamed'
    ];

    let includesBlocked;

    blockedWarnings.forEach((blockedWarning) => {
      if (message.includes(blockedWarning)) { includesBlocked = true; }
    });

    if (includesBlocked) { return false; }
    // eslint-disable-next-line no-console
    return console.filteredWarn(message);
  };
};
