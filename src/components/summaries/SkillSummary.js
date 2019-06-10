import React from 'react';
import './SkillSummary.scss';
import SkillSubCategory from './SkillSubCategory';

function SkillSummary(props) {
  let handleClick = (category) => { props.passClick(category) };

  return(
    <div>
      <div className='summary xp-summary'>
        <SkillSubCategory category='combat' passClick={handleClick} skillXp={props.skillXp} toggleState={props.skillHidden.combat}/>
        <SkillSubCategory category='wasteland' passClick={handleClick} skillXp={props.skillXp} toggleState={props.skillHidden.wasteland}/>
      </div>
      <div className='summary xp-summary'>
        <SkillSubCategory category='civilized' passClick={handleClick} skillXp={props.skillXp} toggleState={props.skillHidden.civilized}/>
        <SkillSubCategory category='anomaly' passClick={handleClick} skillXp={props.skillXp} toggleState={props.skillHidden.anomaly}/>
      </div>
    </div>
  )
}

export default SkillSummary;
