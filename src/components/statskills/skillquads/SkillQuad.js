import React from 'react';
import SkillGrid from './SkillGrid';
import './SkillQuad.scss';

function SkillQuad(props) {
  let categories = ['combat', 'civilized', 'wasteland', 'anomaly'];
  let placement = {
    combat: 'top-start',
    wasteland: 'top',
    civilized: 'top',
    anomaly: 'top-end',
  }
  let handlePopOpen = (category, openState) => { props.passPopOpen(category, openState) }
  let handleSkillVisibilityToggle = (category) => { props.passSkillVisibilityToggle(category) }
  let generateSkillGrids = () => {
    return categories.map(category => {
      return <SkillGrid 
        key={category}
        category={category}
        skillTotalXp={props.skillXp.sum[category]}
        skillQuantity={props.skillXp.grid.grid[category]}
        skillXp={props.skillXp.grid.xp[category]}
        passPopOpen={handlePopOpen}
        passSkillVisibilityToggle={handleSkillVisibilityToggle}
        placement={placement[category]}
        openState={props.openState[category]}
        toggleState={props.skillHidden[category]} />
    })
  }
  
  return(
    <div className='skillquad'>
      {generateSkillGrids()}
    </div>
  )
}

export default SkillQuad;
