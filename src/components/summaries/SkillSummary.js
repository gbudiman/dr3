import React from 'react';
import './SkillSummary.scss';
import SkillSubCategory from './SkillSubCategory';

function SkillSummary(props) {
  let handleClick = (category) => { props.passClick(category) };

  return(
    <div>
      <div className='summary xp-summary'>
        <SkillSubCategory category='combat' passClick={handleClick} />
        <SkillSubCategory category='wasteland' passClick={handleClick} />
      </div>
      <div className='summary xp-summary'>
        <SkillSubCategory category='civilized' passClick={handleClick} />
        <SkillSubCategory category='anomaly' passClick={handleClick} />
      </div>
    </div>
  )
}

export default SkillSummary;
