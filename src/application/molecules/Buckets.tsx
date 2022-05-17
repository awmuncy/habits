import React from 'react';

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

export {
  Buckets
};
