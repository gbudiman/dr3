import React from 'react';
import SkillGrid from './SkillGrid';

function _isAcquired(props, tier) {
  return props.acquired >= tier;
}

function SkillBox(props) {
  let isAcquired = (tier) => { return _isAcquired(props, tier) };

  return(
    <div>
      <SkillGrid category={props.category} tier='0' />
      <SkillGrid category={props.category} tier='1' name={props.t1} acquired={isAcquired(1)} />
      <SkillGrid category={props.category} tier='2' name='II' acquired={isAcquired(2)} />
      <SkillGrid category={props.category} tier='3' name='III' acquired={isAcquired(3)} />
      <SkillGrid category={props.category} tier='4' name={props.t4} acquired={isAcquired(4)} />
    </div>
  )
}

export default SkillBox;
