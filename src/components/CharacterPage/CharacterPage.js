import React, { useState, useEffect } from 'react';
import SkillContainer from '../skillgrids/SkillContainer';
import SkillInitializer from '../../utils/SkillInitializer';
import StrainInitializer from '../../utils/StrainInitializer';
import SkillCalc from '../../utils/SkillCalc';
import StatSkill from '../statskills/StatSkill';
import StrainPicker from '../strains/StrainPicker';
import XpBar from '../xpbars/XpBar';
import uuid from 'uuid';
import skillInfo from '../../utils/skillInfo';
import './CharacterPage.scss';

const CharacterPage = (props) => {
  let handleStrainChange = (value) => { props.passStrainChange(value) }
  let handleStatClick = (stat, adjustment) => { props.passStatClick(stat, adjustment) }
  let handleStatChange = (stat, value) => { props.passStatChange(stat, value) }
  let handleStatReductionChange = (stat, adjustment) => { props.passStatReductionChange(stat, adjustment) }
  let handleSkillVisibilityToggle = (category) => { props.passSkillVisibilityToggle(category) } 
  let handleSkillGridClick = (sid, tier) => { props.passSkillGridClick(sid, tier) }

  return (
    <div className='container'>
      <StrainPicker
        passStrainChange={handleStrainChange}
        selectedStrain={props.selectedStrain}
        lineages={props.lineageStrain.lineages}
      />
      <XpBar totalXp={props.totalXp} skillState={props.skillState} />
      <StatSkill
        passStatClick={handleStatClick}
        passStatChange={handleStatChange}
        passStatReductionChange={handleStatReductionChange}
        passSkillVisibilityToggle={handleSkillVisibilityToggle}
        stat={props.stat}
        statXp={props.statXp}
        statControl={props.statControl}
        innate={props.innate}
        skillXp={props.skillXp}
        skillHidden={props.skillHidden}
      />
      <SkillContainer
        passClick={handleSkillGridClick}
        skillState={props.skillState}
      />
    </div>
  );
};

export default CharacterPage;
