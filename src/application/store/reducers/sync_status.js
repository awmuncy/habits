export default function habits(state = [], action) {
  switch (action.type) {
  case 'SYNC_START':
    return 'underway';
  case 'SYNC_SUCCESSFUL':
    return '';
  case 'SYNC_FAIL':
    return 'failed';
  }
  return state;
}
