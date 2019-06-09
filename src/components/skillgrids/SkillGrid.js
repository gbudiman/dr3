import React from 'react';

function SkillGrid(props) {
  let textual = props.name;
  let className = 'skill-grid'; //skill-' + props.cateogry + '-' + props.tier;
  let classNameGrid = 'skill-' + props.category + '-' + props.tier;

  if (props.tier === '0') {
    switch(props.category) {
      case 'civilized': textual = 'V'; break;
      default: textual = props.category[0].toUpperCase();
    }

    className += ' ' + classNameGrid;
  } else {
    if (props.unused) {
      className += ' skill-unused-' + props.tier;
    } else {
      className += ' ' + classNameGrid;
    }
  }

  return(
    <div
      className={className}
    >
      {textual}
    </div>
  )
}

export default SkillGrid;
