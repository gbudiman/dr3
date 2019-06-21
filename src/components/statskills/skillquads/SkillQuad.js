import React, { useRef, useState, useEffect } from 'react';
import Popper from '@material-ui/core/Popper';
import SkillGrid from './SkillGrid';
import './SkillQuad.scss';

function SkillQuad(props) {
  let categories = ['combat', 'wasteland', 'civilized', 'anomaly'];
  let placement = {
    combat: 'bottom-start',
    wasteland: 'bottom',
    civilized: 'bottom',
    anomaly: 'bottom-end',
  }
  let handlePopOpen = (category, openState) => { props.passPopOpen(category, openState) }
  let generateSkillGrids = () => {
    return categories.map(category => {
      return <SkillGrid 
        key={category}
        category={category}
        skillXp={props.skillXp.sum[category]}
        passPopOpen={handlePopOpen}
        placement={placement[category]}
        openState={props.openState[category]} />
    })
  }
  
  return(
    <div className='skillquad'>
      {generateSkillGrids()}
    </div>
  )
}

export default SkillQuad;
