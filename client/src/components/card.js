import React from 'react';




function card(props) {
    return (
      <div className="cardstyle">
        <button type="button" className="btn btn-primary">
        <h1>{props.title}</h1>
        </button>
      </div>
    );
  }


  export default card;