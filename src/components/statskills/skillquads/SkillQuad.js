import { connect, useSelector, useDispatch  } from 'react-redux';
import React from 'react';
import SkillGrid from './SkillGrid';
import './SkillQuad.scss';

function SkillQuad(props) {
  const dispatch = useDispatch();
  const categories = ['combat', 'civilized', 'wasteland', 'anomaly', 'community'];
  const placement = {
    combat: 'top-start',
    wasteland: 'top',
    civilized: 'top',
    anomaly: 'top',
    community: 'top-end',
  }
  const handlePopOpen = (category, openState) => { props.passPopOpen(category, openState) }
  const generateSkillGrids = () => {
    return categories.map(category => {
      return <SkillGrid 
        key={category}
        category={category}
        skillTotalXp={skillXp.sum[category]}
        skillQuantity={skillXp.grid.grid[category]}
        skillXp={skillXp.grid.xp[category]}
        passPopOpen={handlePopOpen}
        passSkillVisibilityToggle={handleSkillVisibilityToggle}
        placement={placement[category]}
        openState={props.openState[category]}
        toggleState={skillHidden[category]} />
    })
  }
  const { skillXp, skillHidden } = useSelector(
    state => ({
      skillXp: state.characters.skillXp,
      skillHidden: state.characters.skillHidden,
    })
  )
  const handleSkillVisibilityToggle = (category) => {
    dispatch({
      type: 'TOGGLE_SKILL_CATEGORY_VISIBILITY',
      payload: category,
    })
    dispatch({ type: 'SAVE_STATE' });
  }
  
  return(
    <div className='skillquad'>
      {generateSkillGrids()}
    </div>
  )
}

export default SkillQuad;
