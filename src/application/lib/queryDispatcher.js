export default async function syncer(worker) {

  let message_pipe = worker.port || worker;

  async function update(datastore, data) {
    let responseFromSync = await sendQuery({
      type: 'crdt_update',
      datastore,
      data
    });

    return responseFromSync;
  }

  async function tombstone(datastore, data) {
    let responseFromSync = await sendQuery({
      type: 'crdt_tombstone',
      datastore,
      data
    });

    return responseFromSync;
  }

  async function insert(datastore, data) {
    let responseFromSync = await sendQuery({
      type: 'crdt_insert',
      datastore,
      data
    });

    return responseFromSync;
  }

  async function hydrate() {
    return await sendQuery({
      type: 'store_hydrate'
    });
  }

  async function sendQuery(message) {
    const id = Math.random();
    message.id = id;

    const openQuery = new Promise((resolve, reject) => {
      message_pipe.postMessage(message);

      setTimeout(() => reject(), 30001);

      message_pipe.addEventListener('message', function listener(event) {
        if (event.data?.id === id) {

          resolve(event.data.payload);
          message_pipe.removeEventListener('message', listener);
        }
      });
    });
    return await openQuery;
  }


  return {
    hydrate,
    insert,
    update,
    tombstone
  };
}
