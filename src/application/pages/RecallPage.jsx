import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
    HeaderDefault,
    FloatingActionButton,
    Recalls
  } from "../store/ConnectedComponents";
import { newRecall } from '../store/connections/resources/applicationActions';
  




function RecallPageComponent(props) {
  var [title, setTitle] = useState("");
  var [prompt, setPrompt] = useState("");
  var [body, setBody] = useState("");
  var [link, setLink] = useState("");

    return (
        <>	
        <HeaderDefault />
        <main>

          <div className="home-layout">
            <form onSubmit={e => {e.preventDefault(); props.newRecall(title, prompt, body, link)}}>
              <input placeholder="Title" type="text" onChange={e=>setTitle(e.target.value)}></input>
              <input placeholder="Prompt" type="text" onChange={e=>setPrompt(e.target.value)}></input>
              <input placeholder="Body" type="text" onChange={e=>setBody(e.target.value)}></input>
              <input placeholder="Link" type="text" onChange={e=>setLink(e.target.value)}></input>
              <button type="submit">Go</button>
            </form>
            <div className="home-main recalls-page">
              <div className="recalls">
                <Recalls />
              </div>
            </div>
          </div>
          <FloatingActionButton />
        </main>

        </>
    );
}

var connectors = [
  (store, props) => {
    return {}
  },
  dispatch => {
    return {
      newRecall: (title, prompt, body, link) => {
        dispatch(newRecall({title, prompt, body, link}));
      }
    }
  }
]

var RecallPage = connect(...connectors)(RecallPageComponent);

export default RecallPage;