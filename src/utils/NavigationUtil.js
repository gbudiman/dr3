import React from 'react';
import CharacterPage from '../components/CharacterPage/CharacterPage';
import SkillPage from '../components/SkillPage/SkillPage';
import FeedbackPage from '../components/FeedbackPage/FeedbackPage';
import StatUtil from './StatUtil';
import StrainUtil from './StrainUtil';
import SkillUtil from './SkillUtil';

export function switchTab(su, store) {
  let statUtil = StatUtil();
  let strainUtil = StrainUtil();
  let skillUtil = SkillUtil();

  let defaultState = () => {
    return(
      <CharacterPage
        su={su}
        store={store}
        passSkillGridClick={skillUtil.handleSkillGridClick}
        passSkillVisibilityToggle={skillUtil.handleSkillVisibilityToggle}
        passStrainChange={strainUtil.handleStrainChange}
        passStatClick={statUtil.handleStatClick}
        passStatChange={statUtil.handleStatChange}
        passStatReductionChange={statUtil.handleStatReductionChange}
      />
    )
  }

  switch (su.tab) {
    case 0: return defaultState();
    case 1: return <SkillPage />;
    case 2: return <FeedbackPage />;
    default: return defaultState();
  }
};
