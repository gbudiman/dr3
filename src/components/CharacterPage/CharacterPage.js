import { connect } from 'react-redux';
import React from 'react';
import SkillContainer from '../skillgrids/SkillContainer';
import StatSkill from '../statskills/StatSkill';
import StrainPicker from '../strains/StrainPicker';
import XpBar from '../xpbars/XpBar';
import './CharacterPage.scss';

const CharacterPage = (props) => {
  let handleStrainChange = (value) => { props.passStrainChange(props.su, value) }
  let handleStatClick = (stat, adjustment) => { props.passStatClick(props.su, stat, adjustment) }
  let handleStatChange = (stat, value) => { props.passStatChange(props.su, stat, value) }
  let handleStatReductionChange = (stat, adjustment) => { props.passStatReductionChange(props.su, stat, adjustment) }
  let handleSkillVisibilityToggle = (category) => { props.passSkillVisibilityToggle(props.su, category) } 
  let handleSkillGridClick = (sid, tier) => { props.passSkillGridClick(props.su, sid, tier) }

  return (
    <div className='container'>
      <StrainPicker
        passStrainChange={handleStrainChange}
        selectedStrain={props.su.selectedStrain}
        lineages={props.su.lineageStrain.lineages}
      />
      <XpBar totalXp={props.su.totalXp} skillState={props.su.skillState} />
      <StatSkill
        passStatClick={handleStatClick}
        passStatChange={handleStatChange}
        passStatReductionChange={handleStatReductionChange}
        passSkillVisibilityToggle={handleSkillVisibilityToggle}
        stat={props.su.stat}
        statXp={props.su.statXp}
        statControl={props.su.statControl}
        innate={props.su.innate}
        skillXp={props.su.skillXp}
        skillHidden={props.su.skillHidden}
      />
      <SkillContainer
        store={props.store}
        passClick={handleSkillGridClick}
        skillState={props.su.skillState}
        skillInfoVisible={props.su.skillInfoVisible}
      />
    </div>
  );
};

export default connect()(CharacterPage);
//export default CharacterPage;
