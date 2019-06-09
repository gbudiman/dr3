import React from 'react';
import SkillBox from './SkillBox';

function SkillContainer(props) {
  let handleClick = (sid, tier) => { props.passClick(sid, tier); }

  return(
    <div>
      <SkillBox category='combat' t1='Florentine' t4='Mercenary' acquired={3} passClick={handleClick} />
      <SkillBox category='wasteland' t1='Enhanced Movement' t4='Flanker' acquired={4} passClick={handleClick} />
      <SkillBox category='anomaly' t1='Pyrokinetics' t4='Incinerator' acquired={4} passClick={handleClick} />
      <SkillBox category='civilized' t1='Financial Influence' t4='Fiscal Mysticist' acquired={4} passClick={handleClick} />
      <SkillBox category='civilized' t1='Artisan' t4='Techno Savant' acquired={0} passClick={handleClick} />
    </div>
  )
}

export default SkillContainer;
