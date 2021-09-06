import { FILTER_TO_OUTSTANDING, CLEAR_OUTSTANDING_FILTER, CLEAR_FILTERS } from '../../../actions';

export default function habits(state = [], action) {
  let filters, index;
  switch (action.type) {
  case FILTER_TO_OUTSTANDING:
    filters = [...state];

    if (!filters.includes('outstanding')) { filters.push('outstanding'); }

    return filters;

  case CLEAR_OUTSTANDING_FILTER:
    filters = [...state];
    index = filters.indexOf('outstanding');
    if (index > -1) {
      filters.splice(index, 1);
    }

    return filters;
  case CLEAR_FILTERS:

    return [];

  default:
    return state;
  }
}
