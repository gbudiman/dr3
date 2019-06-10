import React, { useState, useEffect } from 'react';
import SkillBox from './SkillBox';

function SkillContainer(props) {
  let handleClick = (sid, tier) => { props.passClick(sid, tier); }
  let buildBoxes = () => {
    console.log('bbx called');
    let jsxes = Object.keys(props.skillState).map((key) => {
      let value = props.skillState[key];
      return(
        <SkillBox 
          key={key}
          category={value.category}
          t1={key}
          t4={value.t4}
          innate={value.innate}
          maxTier={value.maxTier}  
          acquired={value.acquired}
          passClick={handleClick} />
      )
    })

    return jsxes;
  }

  return(
    <div>
      {buildBoxes()}
    </div>
  )
}

export default SkillContainer;
