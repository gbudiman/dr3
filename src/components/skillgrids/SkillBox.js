import React from 'react';
import SkillGrid from './SkillGrid';

function SkillBox(props) {
  return(
    <div>
      <SkillGrid category={props.category} tier='0' />
      <SkillGrid category={props.category} tier='1' name={props.t1} />
      <SkillGrid category={props.category} tier='2' name='II' />
      <SkillGrid category={props.category} tier='3' name='III' />
      <SkillGrid category={props.category} tier='4' name={props.t4} />
    </div>
  )
}

export default SkillBox;
