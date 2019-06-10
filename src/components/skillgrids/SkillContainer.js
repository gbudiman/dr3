import React, { useState, useEffect } from 'react';
import SkillBox from './SkillBox';

function SkillContainer(props) {
  let handleClick = (sid, tier) => { props.passClick(sid, tier); }
  let buildBoxes = () => {
    let jsxes = Object.keys(props.skillState).map((key) => {
      let value = props.skillState[key];
      return(
        <SkillBox 
          category={value.category}
          t1={key}
          t4={value.t4}
          innate={value.innate}
          maxTier={value.maxTier}
          acquired={value.acquired}
          passClick={handleClick} />
      )
    })

    console.log('bbx called');
    return jsxes;
  }

  return(
    <div>
      {buildBoxes()}
    </div>
  )
  // return(
  //   <div>
  //     <SkillBox category='combat' t1='Florentine' t4='Mercenary' acquired={3} passClick={handleClick} />
  //     <SkillBox category='wasteland' t1='Enhanced Movement' t4='Flanker' acquired={4} passClick={handleClick} />
  //     <SkillBox category='anomaly' t1='Pyrokinetics' t4='Incinerator' acquired={4} passClick={handleClick} />
  //     <SkillBox category='civilized' t1='Financial Influence' t4='Fiscal Mysticist' acquired={4} passClick={handleClick} />
  //     <SkillBox category='civilized' t1='Artisan' t4='Techno Savant' acquired={0} passClick={handleClick} />
  //   </div>
  // )
}

export default SkillContainer;
