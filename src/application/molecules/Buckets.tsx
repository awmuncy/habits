import React from 'react';
import { connect } from 'react-redux';

function Buckets(props) {
  return (
    <ul>
      <li onClick={() => { props.applySort('points'); }}>Points</li>
      <li onClick={() => { props.applySort('status'); }}>Status</li>
      <li onClick={() => { props.applySort('category'); }}>Category</li>
      <li onClick={() => { props.applySort(''); }}>No sort</li>
    </ul>
  );
}


let connections = [
  (store, props) => {
    return {
      sort: store.sort
    };
  },
  dispatch => {
    return {
      applySort: (spec) => {
        dispatch({type: 'SORT_BY', spec});
      }
    };
  }
];

const ConnectedBuckets = connect(...connections)(Buckets);
export {
  ConnectedBuckets
};
