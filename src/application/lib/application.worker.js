import initSqlJs from '@jlongster/sql.js';
import { SQLiteFS } from 'absurd-sql';
import IndexedDBBackend from 'absurd-sql/dist/indexeddb-backend.js';
import crdtDriver from '@awmuncy/sqlite-crdt/src/crdtDriver.js';

let channel = new BroadcastChannel('CRDT_MESSAGES');

channel.addEventListener('message', async(e) => {
  if (e.data.type === 'CRDT_NEW_MESSAGES') {
    let db = await databaseConnection;
  }
});

async function persistentStoreWorkerStartup(options) {
  let SQL = await initSqlJs({ locateFile: file => file });
  let sqlFS = new SQLiteFS(SQL.FS, new IndexedDBBackend());
  SQL.register_for_idb(sqlFS);


  SQL.FS.mkdir('/sql');
  SQL.FS.mount(sqlFS, {}, '/sql');

  const path = '/sql/db.sqlite';
  if (typeof SharedArrayBuffer === 'undefined') {
    let stream = SQL.FS.open(path, 'a+');
    await stream.node.contents.readIfFallback();
    SQL.FS.close(stream);
  }

  let db = new SQL.Database(path, { filename: true });

  db.exec(`
    PRAGMA journal_mode=MEMORY;
    PRAGMA page_size=8192;
  `);

  const crdt = await crdtDriver(db, {debug: true, messagesOnly: true, group: options.group});
  crdt.setSyncServer();


  return crdt;
}

let databaseConnection = persistentStoreWorkerStartup({
  group: 'my-group'
});

globalThis.databaseConnection = databaseConnection;

self.onconnect = async function(e) {
  let port = e.ports[0];
  port.start();
  let db = await databaseConnection;
  port.postMessage({type: 'CRDT_WORKER_READY', client_id: db.getNodeId()});
  let initMessages = (await databaseConnection).listMessages();
  port.postMessage({
    type    : 'CRDT_HYDRATE',
    messages: initMessages
  });
  port.addEventListener('message', async function(event) {
    let response;
    switch (event.data?.type) {
    case 'crdt_sync':
      let newFromServer = await db.sync([]);
      response = await db.deliverMessages(event.data.req);
      db.sync([]);

      port.postMessage({id: event.data.id, payload: response});
      break;
    }
  });



};
