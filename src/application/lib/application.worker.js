import initSqlJs from '@jlongster/sql.js';
import { SQLiteFS } from 'absurd-sql';
import IndexedDBBackend from 'absurd-sql/dist/indexeddb-backend.js';
import crdtDriver from '@awmuncy/sqlite-crdt/src/crdtDriver.js';

let channel = new BroadcastChannel('CRDT_MESSAGES');

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

  db.exec(`
        CREATE TABLE IF NOT EXISTS todos
            (
                id text primary key,
                name text,
                type text,
                ordered number,
                tombstone number default 0
            );
        CREATE TABLE IF NOT EXISTS users
            (
                id text primary key,
                email text,
                username text,
                password text,
                tombstone integer
            );
        CREATE TABLE IF NOT EXISTS habits
            (
                id text primary key ,
                user_id text,
                title text,
                description text,
                mode text,
                target window integer,
                interval integer,
                sleep integer,
                tombstone integer
            );
        CREATE TABLE  IF NOT EXISTS checkins
            (
                id text primary key,
                habit_id text,
                moment integer,
                description text,
                status text,
                tombstone integer
            );
        CREATE VIEW IF NOT EXISTS HabitList AS
            SELECT 
                h.title as title,
                h.id as habit_id,
                c.id as checkin_id,      
                c.moment,
                h.description,
                h.mode,
                h.interval,
                h.target,
                h.tombstone as tombstone      
            FROM habits h
            left join (select id, moment, habit_id from checkins where tombstone is null) c
                on c.habit_id=h.id
            WHERE h.tombstone is null
            ORDER BY habit_id desc, c.moment DESC;
`);

  const crdt = await crdtDriver(db, {debug: true, group: options.group});
  crdt.setSyncServer();
  crdt.sync();

  // Replace with "REQUEST_UPDATE" event from UI
  setInterval(async() => {
    await crdt.sync();
    updateStores();
  }, 30000);

  return crdt;
}

let databaseConnection = persistentStoreWorkerStartup({
  group: 'my-group'
});

async function updateStores() {
  let db = await databaseConnection;
  channel.postMessage({
    type   : 'STORE_UPDATE',
    payload: db.debug.db.exec('SELECT * FROM HabitList;')
  });
}

globalThis.databaseConnection = databaseConnection;

self.onconnect = async function(e) {
  let port = e.ports[0];
  let db = await databaseConnection;
  port.postMessage({type: 'CRDT_WORKER_READY'});
  port.start();
  port.addEventListener('message', async e => {
    switch (e.data.type) {
    case 'REQUEST_STORE':

      channel.postMessage({
        type   : 'STORE_UPDATE',
        payload: db.debug.db.exec('SELECT * FROM HabitList;')
      });
      break;
    case 'crdt_update':
      db.update(e.data.datastore, e.data.data);
      port.postMessage({id: e.data.id});
      updateStores();
      break;
    case 'crdt_tombstone':
      db.tombstone(e.data.datastore, e.data.data);
      port.postMessage({id: e.data.id});
      updateStores();
      break;
    case 'crdt_insert':
      db.insert(e.data.datastore, e.data.data);
      port.postMessage({id: e.data.id});
      updateStores();
      break;

    }
  });
};
