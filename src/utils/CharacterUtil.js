import React from 'react';
import CharacterPage from '../Characters/Page';
import StatUtil from './StatUtil';
import StrainUtil from './StrainUtil';
import SkillUtil from './SkillUtil';

const CharacterUtil = props => {
  let statUtil = StatUtil();
  let strainUtil = StrainUtil();
  let skillUtil = SkillUtil();

  return (
    <CharacterPage />
  );
};

export default CharacterUtil;
