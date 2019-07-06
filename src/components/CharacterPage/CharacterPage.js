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

  return (
    <div className='container'>
      <StrainPicker />
      <XpBar totalXp={props.totalXp} skillState={props.skillState} />
      <StatSkill />
      <SkillContainer />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedStrain: state.selectedStrain,
    lineageStrain: state.lineageStrain,
    totalXp: state.totalXp,
    skillState: state.skillState,
    stat: state.stat,
    statXp: state.statXp,
    statControl: state.statControl,
    innate: state.innate,
    skillXp: state.skillXp,
    skillHidden: state.skillHidden,
    skillInfoVisible: state.skillInfoVisible,
  }
}
export default connect(
  mapStateToProps
)(CharacterPage);
//export default CharacterPage;
