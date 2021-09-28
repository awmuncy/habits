import React, { useState } from 'react';
import { newRecall } from '../store/connections/resources/applicationActions.js';
import { connect } from 'react-redux';

function C_NewRecallForm(props) {
  let [title, setTitle] = useState('');
  let [prompt, setPrompt] = useState('');
  let [body, setBody] = useState('');
  let [link, setLink] = useState('');

  function submitForm(e) {
    e.preventDefault();

    setTitle('');
    setPrompt('');
    setBody('');
    setLink('');
    props.newRecall(title, prompt, body, link);
  }

  return (
    <form onSubmit={submitForm}>
      <input placeholder='Title' type='text' value={title} onChange={e=>setTitle(e.target.value)}></input>
      <input placeholder='Prompt' type='text' value={prompt} onChange={e=>setPrompt(e.target.value)}></input>
      <input placeholder='Body' type='text' value={body} onChange={e=>setBody(e.target.value)}></input>
      <input placeholder='Link' type='text' value={link} onChange={e=>setLink(e.target.value)}></input>
      <button type='submit'>Submit</button>
    </form>
  );
}


let connectors = [
  (store, props) => {
    return {};
  },
  dispatch => {
    return {
      newRecall: (title, prompt, body, link) => {
        dispatch(newRecall({title, prompt, body, link, completions: []}));
      }
    };
  }
];

let NewRecallForm = connect(...connectors)(C_NewRecallForm);

export {
  NewRecallForm
};
