export async function pageTransition(callback) {
  if (!document.createDocumentTransition) {
    return;
  }
  // Ready the transition
  const transition = document.createDocumentTransition();
  document.documentElement.classList.add('transition-warming-up');

  const pageTransitionStarted = new Promise((res, rej) => {
    transition.start(async() => {

      window.pageIsRendering = true;

      res();
      // Fire the render
      if (callback) {
        callback();
      }
      // Create the promise which
      // Will resolve when the page
      // is rendered
      let renderedCompleted = new Promise((res, rej) => {

        // When grand central calls this
        // The transition takes place
        window.pageRenderComplete = () => {
          res();
          document.documentElement.classList.remove('transition-warming-up');
          window.pageRenderComplete = null;
          window.pageIsRendering = false;
        };
      });

      return await renderedCompleted;
    });
  });

  return await pageTransitionStarted;
}
