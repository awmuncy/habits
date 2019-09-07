export default function ui(state = 0, action) {
  switch (action.type) {
	case "TOGGLE_NAV":
		if(!state) {
			return  true;
		}

		return false;

    default:
      return state
  }
}