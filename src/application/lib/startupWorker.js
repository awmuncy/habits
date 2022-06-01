import { initDatabase } from './initDatabase.js';
import { initBackend } from 'absurd-sql/dist/indexeddb-main-thread.js';
import querier from '@awmuncy/sqlite-crdt/src/queryWorker.js';
import { refreshHabits } from './requests.js';


export async function persistentStoreStartup() {
  window.db = await initDatabase();
  let webworker = new SharedWorker(new URL('./application.worker.js', import.meta.url), {
    name: 'crdt-connection'
  });

  webworker.port.start();

  let quer = querier(webworker, window.db);
  let workerReady = new Promise((resolve, reject) => {
    webworker.port.addEventListener('message', async event => {
      if (event.data.type === 'CRDT_WORKER_READY') {
        resolve(await quer);

      }
    });
  });

  const channel = new BroadcastChannel('CRDT_MESSAGES');
  window.db.addPeer({
    deliverMessages: async(req) => {
      channel.postMessage({
        type: 'CRDT_NEW_MESSAGES',
        req
      });
      return {
        messages: [],
        merkle  : req.merkle
      };
    }
  });
  webworker.port.addEventListener('message', async e => {

    if (e.data.type === 'CRDT_HYDRATE') {
      window.db.receiveMessages(e.data.messages);
      refreshHabits();
    }
    if (e.data.type === 'CRDT_NEW_MESSAGES') {
      await window.db.deliverMessages(e.data.req);
      refreshHabits();
    }
  });

  // TODO: Respond to events instead of polling
  // setInterval(async() => {
  //   await window.db.sync([]);
  //   refreshHabits();
  // }, 3000);

  initBackend(webworker);

  return workerReady;

}
