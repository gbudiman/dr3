import { connect } from 'react-redux';
import React from 'react';
import SkillContainer from '../skillgrids/SkillContainer';
import StatSkill from '../statskills/StatSkill';
import StrainPicker from '../strains/StrainPicker';
import XpBar from '../xpbars/XpBar';
import './CharacterPage.scss';

const CharacterPage = (props) => {
  return (
    <div className='container'>
      <StrainPicker />
      <XpBar />
      <StatSkill />
      <SkillContainer />
    </div>
  );
};

export default CharacterPage;
