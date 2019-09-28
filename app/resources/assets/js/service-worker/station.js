const station = () => {
    var store = new BroadcastChannel("store");
    store.addEventListener("message", e => {
        store.postMessage(true);
    });

}

export default station;