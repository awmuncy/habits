export default function view_date(state = 0, action) {
  switch (action.type) {
    case "SET_VIEW_DATE":
      return action.view_date;
    
    default:
      return state
  }
}