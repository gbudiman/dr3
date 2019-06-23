import React, { useState, useEffect } from 'react';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import StateUtil from './utils/StateUtil';
import ToonUtil from './utils/ToonUtil';
import { calcXp, calcTotalXp } from './utils/XpUtil';
import { switchTab } from './utils/NavigationUtil';
import SkillInitializer from './utils/SkillInitializer';
import SkillCalc from './utils/SkillCalc';
import SkillContainer from './components/skillgrids/SkillContainer';
import StrainPicker from './components/strains/StrainPicker';
import StatSkill from './components/statskills/StatSkill';
import XpBar from './components/xpbars/XpBar';
import AppBarWrapper from './components/appbars/AppBarWrapper';

const App = () => {
  let su = StateUtil();
  let toonUtil = ToonUtil();

  useEffect(() => {
    toonUtil.handleAppLoad(su);
  });

  return (
    <div className='app-window'>
      <AppBarWrapper su={su} passChange={toonUtil.handleToonChange} />
      <div className='builder'>{switchTab(su)}</div>
      <Navigation setTab={su.setTab} tab={su.tab} />
    </div>
  );
};

export default App;
