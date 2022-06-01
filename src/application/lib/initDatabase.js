import initSqlJs from '@jlongster/sql.js';
import crdtDriver from '@awmuncy/sqlite-crdt/src/crdtDriver.js';


async function initDatabase() {

  const SQL = await initSqlJs({
    // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    // You can omit locateFile completely when running in node
    locateFile: file => file
  });
  const db = new SQL.Database();

  db.run(`
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
                h.target                
            FROM habits h
            left join (select id, moment, habit_id from checkins where tombstone is null) c
                on c.habit_id=h.id
            ORDER BY habit_id desc, c.moment DESC;
    `);


  return crdtDriver(db, {debug: true, group: 'my-group'});

}


export {
  initDatabase
};
