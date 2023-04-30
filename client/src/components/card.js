import React from 'react';

import "./card.css";


function card(props) {
    return (
      <div className="cardstyle">
        
        <div className="title">{props.title}</div>
        <div className="imgarea"><img src={props.imgsource} alt="not found"></img></div>
        
      </div>
    );
  }


  export default card;