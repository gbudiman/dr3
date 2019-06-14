import React, { useState, useEffect } from 'react';

function SkillGrid(props) {
  let handleClick = () => { props.passClick(props.sid, props.tier) };
  const [state, setState] = useState('init');

  let getTextualRepresentation = () => {
    let textual = props.tier > 0 ? props.name : '|';
    let innateMarker = props.innate && props.tier === 1 ? '*' : '';

    return(
      <span className='text'>{textual + innateMarker}</span>
    );
  }

  let getClassName = () => {
    let classes = [
      'skill-grid',
      'skill-' + props.category + '-' + props.tier,
      'skill-tier-' + props.tier,
    ]

    if (props.tier === 0) {
      classes.push('skill-lead-left')
    } else {
      if (!props.acquired) classes.push('skill-unused-' + props.tier);
    }

    if (!props.visible) classes.push('skill-hidden');

    return classes.join(' ');
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
