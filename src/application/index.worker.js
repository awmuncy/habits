import initSqlJs from '@jlongster/sql.js';
import { SQLiteFS } from 'absurd-sql';
import IndexedDBBackend from 'absurd-sql/dist/indexeddb-backend.js';

async function init() {
  let SQL = await initSqlJs({ locateFile: file => file });
  let sqlFS = new SQLiteFS(SQL.FS, new IndexedDBBackend());
  SQL.register_for_idb(sqlFS);

  SQL.FS.mkdir('/sql');
  SQL.FS.mount(sqlFS, {}, '/sql');

  let db = new SQL.Database('/sql/db.sqlite', { filename: true });
  db.exec(`
    PRAGMA page_size=8192;
    PRAGMA journal_mode=MEMORY;
  `);
  db.exec(`
        CREATE TABLE users
            (
                id text primary key,
                email text unique,
                username text unique,
                password text,
                tombstone integer
            );
        CREATE TABLE habits
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
        CREATE TABLE checkins
            (
                id text primary key,
                habit_id text,
                moment integer,
                description text,
                status text,
                tombstone integer
            );
  `);
  return db;
}
init();
