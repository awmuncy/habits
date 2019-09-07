const syncStatus = (state = 0, action) => {
  switch(action.type) {
    case "SYNC_READY":

      return "ready";
    case "SYNC_COMPLETE": 
      if(state=="queue") return "start";
      return "complete";

    case "SYNC_START":
      if (state == "underway") return "queue";
      return "start";

    case "SYNC_UNDERWAY":
      return "underway";

    case "SYNC_FAILED":
      return "failed";

    default: 
      return state;
  }
}

export default syncStatus;