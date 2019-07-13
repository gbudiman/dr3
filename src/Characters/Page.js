import React from 'react';
import SkillContainer from '../components/skillgrids/SkillContainer';
import StatSkill from '../components/statskills/StatSkill';
import StrainPicker from '../components/strains/StrainPicker';
import XpBar from '../components/xpbars/XpBar';
import './styles.scss';

export default () => (
  <div className='builder'>
    <StrainPicker />
    <XpBar />
    <StatSkill />
    <SkillContainer />
  </div>
);
