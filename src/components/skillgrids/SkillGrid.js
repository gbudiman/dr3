import React, { useState, useEffect } from 'react';

function SkillGrid(props) {
  let handleClick = () => { props.passClick(props.sid, props.tier) };
  const [state, setState] = useState('init');

  let getTextualRepresentation = () => {
    let textual = props.name;
    let innateMarker = props.innate && props.tier === 1 ? '*' : '';

    if (props.tier === 0) {
      switch(props.category) {
        case 'civilized': textual = 'V'; break;
        default: textual = props.category[0].toUpperCase();
      }
    }

    return textual + innateMarker;
  }

  let getClassName = () => {
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

    className += props.visible === false ? ' skill-hidden' : '';

    return className;
  }

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
