import React from 'react';
import './SkillSummary.scss';
import SkillSubCategory from './SkillSubCategory';

function SkillSummary(props) {
  let handleClick = (category) => { props.passClick(category) };
  let generateSubCategories = (cats) => {
    return cats.map(category => {
      return(
        <SkillSubCategory 
          key={category}
          category={category}
          passClick={handleClick}
          skillXp={props.skillXp}
          toggleState={props.skillHidden[category]} />
      )
    })
  }
  let categories = ['combat', 'wasteland', 'civilized', 'anomaly'];

  return <React.Fragment>{generateSubCategories(categories)}</React.Fragment>;
}

export default SkillSummary;
