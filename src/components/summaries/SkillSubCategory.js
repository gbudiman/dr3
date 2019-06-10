import React from 'react';

function SkillSubCategory(props) {
  let handleClick = () => { props.passClick(props.category) }
  
  return(
    <div 
      className={'summary summary-skill summary-' + props.category}
      onClick={handleClick}
    >
      XYZa
    </div>
  )
}

export default SkillSubCategory;
