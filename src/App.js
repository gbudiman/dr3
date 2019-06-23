import React, { useState, useEffect } from 'react';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import StateUtil from './utils/StateUtil';
import ToonUtil from './utils/ToonUtil';
import StatUtil from './utils/StatUtil';
import StrainUtil from './utils/StrainUtil';
import SkillUtil from './utils/SkillUtil';
import { calcXp, calcTotalXp } from './utils/XpUtil';

import SkillInitializer from './utils/SkillInitializer';
import SkillCalc from './utils/SkillCalc';
import SkillContainer from './components/skillgrids/SkillContainer';
import StrainPicker from './components/strains/StrainPicker';
import StatSkill from './components/statskills/StatSkill';
import XpBar from './components/xpbars/XpBar';
import AppBarWrapper from './components/appbars/AppBarWrapper';

import CharacterPage from './components/CharacterPage/CharacterPage';
import SkillPage from './components/SkillPage/SkillPage';
import FeedbackPage from './components/FeedbackPage/FeedbackPage';

const App = () => {
  let su = StateUtil();
  let toonUtil = ToonUtil();
  let statUtil = StatUtil();
  let strainUtil = StrainUtil();
  let skillUtil = SkillUtil();

  useEffect(() => {
    toonUtil.handleAppLoad(su);
  });

  let switchTab = () => {
    let defaultState = () => {
      return(
        <CharacterPage
          su={su}
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

  return (
    <div className='app-window'>
      <AppBarWrapper
        su={su}
        passChange={toonUtil.handleToonChange}
      />
      <div className='builder'>{switchTab(su.tab)}</div>
      <Navigation setTab={su.setTab} tab={su.tab} />
    </div>
  );
};

export default App;
