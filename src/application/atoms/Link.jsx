import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { pageTransition } from '../lib/pageTransition';

function handleTransitionClickEvent(e, props) {
  if (!document.createDocumentTransition) {
    if (props.do) {
      props.do();
    }
    return;
  }
  const target = e.target;
  if (window.pageIsRendering) {

  } else {
    e.preventDefault();
    window.pageIsRendering = true;
    pageTransition(props.do).then(() => {
      target.click();
    });
  }

}


function Link(props) {

  return (
    <RouterLink {...props} onClick={e => handleTransitionClickEvent(e, props)} />
  );
}

export { Link };
