import { connect } from 'react-redux';
import React from 'react';
import SkillGrid from './SkillGrid';
import './SkillQuad.scss';

function SkillQuad(props) {
  let categories = ['combat', 'civilized', 'wasteland', 'anomaly', 'community'];
  let placement = {
    combat: 'top-start',
    wasteland: 'top',
    civilized: 'top',
    anomaly: 'top',
    community: 'top-end',
  }
  let handlePopOpen = (category, openState) => { props.passPopOpen(category, openState) }
  let generateSkillGrids = () => {
    return categories.map(category => {
      return <SkillGrid 
        key={category}
        category={category}
        skillTotalXp={props.skillXp.sum[category]}
        skillQuantity={props.skillXp.grid.grid[category]}
        skillXp={props.skillXp.grid.xp[category]}
        passPopOpen={handlePopOpen}
        passSkillVisibilityToggle={props.handleSkillVisibilityToggle}
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

const mapStateToProps = state => {
  return {
    skillXp: state.skillXp,
    skillHidden: state.skillHidden,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSkillVisibilityToggle: (category) => dispatch({
      type: 'TOGGLE_SKILL_CATEGORY_VISIBILITY',
      payload: category,
    }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillQuad);
