import React, { useState } from 'react';

import { 
    HeaderDefault,
    FloatingActionButton,
    Recalls,
    NewRecallForm
  } from "../store/ConnectedComponents"; 


function RecallPageComponent(props) {

    return (
        <>	
        <HeaderDefault />
        <main>

          <div className="home-layout">
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
};


export default RecallPageComponent;