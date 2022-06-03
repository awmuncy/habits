import { initDatabase } from './initDatabase.js';
import { initBackend } from 'absurd-sql/dist/indexeddb-main-thread.js';
import querier from './queryDispatcher.js';
import { refreshHabits } from './requests.js';


export async function workerStartup() {
  let webworker;
  let worker_pipe;
  if (typeof SharedWorker !== undefined) {
    webworker = new SharedWorker(new URL('./application.worker.js', import.meta.url), {
      name: 'crdt-connection'
    });
    webworker.port.start();
    worker_pipe = webworker.port;
  } else {
    webworker = new Worker(new URL('./application.worker.js', import.meta.url), {
      name: 'crdt-connection'
    });
    worker_pipe = webworker;
  }


  let quer = querier(webworker);
  window.quer = quer;
  let workerReady = new Promise((resolve, reject) => {
    worker_pipe.addEventListener('message', async event => {
      if (event.data.type === 'CRDT_WORKER_READY') {
        resolve(await quer);

      }
    });
  });
  const channel = new BroadcastChannel('CRDT_MESSAGES');

  channel.addEventListener('message', async e => {

    switch (e.data.type) {
    case 'STORE_UPDATE':
      refreshHabits(e.data.payload);
      break;
    }
  });
  initBackend(webworker);

  await workerReady;
  worker_pipe.postMessage({type: 'REQUEST_STORE'});

  return workerReady;

}
