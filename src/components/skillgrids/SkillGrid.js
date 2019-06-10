import React, { useState, useEffect } from 'react';

function getClassName(props) {
  let className = 'skill-grid';
  let classNameGrid = 'skill-' + props.category + '-' + props.tier;

  if (props.tier === 0) {
    className += ' ' + classNameGrid + ' skill-lead-left';
  } else {
    if (props.acquired) {
      className += ' ' + classNameGrid;
    } else {
      className += ' skill-unused-' + props.tier;
    }
  }

  return className;
}

function getTextualRepresentation(props) {
  let textual = props.name;

  if (props.tier === 0) {
    switch(props.category) {
      case 'civilized': textual = 'V'; break;
      default: textual = props.category[0].toUpperCase();
    }
  }

  return textual;
}



function SkillGrid(props) {
  let handleClick = () => {  
    //toggleState();
    props.passClick(props.sid, props.tier);
  };
  let toggleState = () => {
    // let next_state;

    // switch(state) {
    //   case 'init': next_state = 'acquired'; break;
    //   case 'acquired': next_state = 'init'; break;
    // }

    // setState(next_state);
  }
  const [state, setState] = useState('init');

  return(
    <div
      className={getClassName(props)}
      onClick={handleClick}
    >
      {getTextualRepresentation(props)}
    </div>
  )
}

export default SkillGrid;
