import React, { useState, useEffect } from 'react';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import StateUtil from './utils/StateUtil';
import ToonUtil from './utils/ToonUtil';
import StatUtil from './utils/StatUtil';
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

  useEffect(() => {
    toonUtil.handleAppLoad(su);
  });

  let handleStrainChange = newStrain => {
    let lineage = su.lineageStrain.strains[newStrain];
    let innateStat = su.lineageStrain.lineages[lineage].innate;

    su.setSelectedStrain(newStrain);
    su.innate = {
      hp: innateStat.hp,
      mp: innateStat.mp,
      rp: innateStat.rp,
      inf: innateStat.inf
    };
    su.setInnate(su.innate);

    for (const lstat in su.statLimit) {
      statUtil.validateStatAndControls(su, lstat, true);
    }
  };

  let handleSkillGridClick = (sid, tier) => {
    updateSkillState(sid, tier);
    su.skillXp = SkillCalc(su.skillState);
    su.setSkillXp(su.skillXp);
    calcTotalXp(su);
  };

  let handleSkillVisibilityToggle = category => {
    if (!(category in su.skillHidden)) {
      su.skillHidden[category] = true;
    } else {
      su.skillHidden[category] = !su.skillHidden[category];
    }

    setSkillVisibility(category, !su.skillHidden[category]);
    su.setSkillHidden(Object.assign({}, su.skillHidden));
  };

  let updateSkillState = (sid, tier) => {
    if (tier > 0 && tier <= 3) {
      let t4acquired =
        't4acquired' in su.skillState[sid] && su.skillState[sid].t4acquired === true;
      let clickedAcquired =
        tier <= su.skillState[sid].acquired || (tier === 4 && t4acquired);
      let clickedAtTier =
        tier === su.skillState[sid].acquired || (tier === 4 && t4acquired);

      if (clickedAtTier && clickedAcquired) {
        if (tier === 2 && t4acquired) {
          su.skillState[sid].t4acquired = false;
        } else {
          su.skillState[sid].acquired = tier - 1;
        }
      } else {
        su.skillState[sid].acquired = tier;
      }

      if (su.skillState[sid].acquired < 2) su.skillState[sid].t4acquired = false;
      if (su.skillState[sid].acquired === 1 && su.skillState[sid].innate)
        su.skillState[sid].acquired = 0;
      su.setSkillState(Object.assign({}, su.skillState));
    } else if (tier === 4) {
      if (!('t4acquired' in su.skillState[sid])) {
        su.skillState[sid].t4acquired = true;
      } else {
        su.skillState[sid].t4acquired = !su.skillState[sid].t4acquired;
      }

      if (su.skillState[sid].t4acquired && su.skillState[sid].acquired <= 2) {
        su.skillState[sid].acquired = 2;
      }
      su.setSkillState(Object.assign({}, su.skillState));
    }
  };

  let setSkillVisibility = (category, state) => {
    for (const key in su.skillState) {
      let unacquired = su.skillState[key].acquired === 0;
      if (unacquired && su.skillState[key].category === category) {
        su.skillState[key].visible = state;
      }
    }

    su.setSkillState(Object.assign({}, su.skillState));
  };

  let switchTab = () => {
    let defaultState = () => {
      return(
        <CharacterPage
          su={su}
          passSkillGridClick={handleSkillGridClick}
          passStrainChange={handleStrainChange}
          passStatClick={statUtil.handleStatClick}
          passStatChange={statUtil.handleStatChange}
          passStatReductionChange={statUtil.handleStatReductionChange}
          passSkillVisibilityToggle={handleSkillVisibilityToggle}
        />
      )
    }
    switch (su.tab) {
      case 0:
        return defaultState();
      case 1:
        return <SkillPage />;
      case 2:
        return <FeedbackPage />;
      default:
        return defaultState();
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
