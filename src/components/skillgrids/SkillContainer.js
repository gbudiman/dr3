import React, { useState, useEffect } from 'react';
import SkillBox from './SkillBox';
import './SkillGrid.scss';

function SkillContainer(props) {
  let handleClick = (sid, tier) => { props.passClick(sid, tier); }
  let buildBoxes = () => {
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
          t4acquired={value.t4acquired}
          innate={value.innate}
          visible={value.visible}
          passClick={handleClick} />
      )
    })

    return jsxes;
  }

  return(
    <div className='skill-container'>
      {buildBoxes()}
      <div className='buffer' />
    </div>
  )
}

export default SkillContainer;
