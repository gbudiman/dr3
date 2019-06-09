import React from 'react';
import SkillGrid from './SkillGrid';

function _isAcquired(props, tier) {
  return props.acquired >= tier;
}

function SkillBox(props) {
  let isAcquired = (tier) => { return _isAcquired(props, tier) };
  let sid = () => { return props.t1.replace(/\s+/, '_').toLowerCase() }
  let handleClick = (sid, tier) => { props.passClick(sid, tier) };

  return(
    <div>
      <SkillGrid 
        category={props.category} 
        sid={sid()}
        tier='0'
        passClick={handleClick} />
      <SkillGrid 
        category={props.category} 
        sid={sid()}
        tier='1' 
        name={props.t1} 
        acquired={isAcquired(1)}
        passClick={handleClick} />
      <SkillGrid 
        category={props.category} 
        sid={sid()}
        tier='2' 
        name='II' 
        acquired={isAcquired(2)}
        passClick={handleClick} />
      <SkillGrid 
        category={props.category} 
        sid={sid()}
        tier='3' 
        name='III' 
        acquired={isAcquired(3)}
        passClick={handleClick} />
      <SkillGrid 
        category={props.category} 
        sid={sid()}
        tier='4' 
        name={props.t4} 
        acquired={isAcquired(4)}
        passClick={handleClick} />
    </div>
  )
}

export default SkillBox;
