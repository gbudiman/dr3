import React from 'react';
import CharacterPage from '../Characters/Page';
import StatUtil from './StatUtil';
import StrainUtil from './StrainUtil';
import SkillUtil from './SkillUtil';

export default su => {
  let statUtil = StatUtil();
  let strainUtil = StrainUtil();
  let skillUtil = SkillUtil();

  return (
    <CharacterPage
      su={su}
      passSkillGridClick={skillUtil.handleSkillGridClick}
      passSkillVisibilityToggle={skillUtil.handleSkillVisibilityToggle}
      passStrainChange={strainUtil.handleStrainChange}
      passStatClick={statUtil.handleStatClick}
      passStatChange={statUtil.handleStatChange}
      passStatReductionChange={statUtil.handleStatReductionChange}
    />
  );
};
