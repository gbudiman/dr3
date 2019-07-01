import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

function SkillGrid(props) {
  const handleClick = () => { props.passClick(props.sid, props.tier) }

  const getTextualRepresentation = () => {
    if (props.tier === 0) {
      return props.infoExpanded ? <ExpandLess fontSize='small'/> : <ExpandMore fontSize='small'/>;
    } else {
      const innateMarker = props.innate && props.tier === 1 ? '*' : '';

      return <span className='text'>{props.name + innateMarker}</span>;
    }
  }

  const getClassName = () => {
    const classes = [
      'skill-grid',
      `skill-${props.category}-${props.tier}`,
      `skill-tier-${props.tier}`,
    ]

    if (props.tier === 0) {
      classes.push('skill-lead-left')
    } else {
      if (!props.acquired) classes.push(`skill-unused-${props.tier}`);
    }

    if (props.innate) classes.push('skill-innate');
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
