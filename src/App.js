import React, { useState, useEffect } from 'react';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import StateUtil from './utils/StateUtil';
import ToonUtil from './utils/ToonUtil';

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
      validateStatAndControls(lstat, true);
    }
  };

  let handleStatClick = (changedStat, adjustment) => {
    let currentStat = changedStat in su.stat ? su.stat[changedStat] : 0;
    su.stat[changedStat] = currentStat + adjustment;
    validateStatAndControls(changedStat);
  };

  let handleStatChange = (changedStat, newValue) => {
    su.stat[changedStat] = parseInt(newValue) || 0;
    validateStatAndControls(changedStat);
  };

  let handleStatReductionChange = (changedStat, adjustment) => {
    let reductionStatKey = changedStat[0] + 'r';
    let h = statHelper(changedStat);

    su.statControl[reductionStatKey] = {};

    if (h.reductionValue() < 0) {
      su.stat[reductionStatKey] = 0;
    } else if (h.reductionValue() + adjustment < 0) {
      su.stat[reductionStatKey] = 0;
    } else if (h.totalValue() < 0) {
      su.stat[reductionStatKey] = -h.totalValue();
    } else if (h.totalValue() === 0 && h.totalValue() - adjustment >= 0) {
      su.stat[reductionStatKey] = h.reductionValue() + adjustment;
    } else if (h.totalValue() === 0 && h.totalValue() - adjustment < 0) {
      su.stat[reductionStatKey] = h.reductionValue();
    } else if (
      h.totalValue() === h.limit &&
      h.totalValue() - adjustment < h.limit
    ) {
      su.stat[reductionStatKey] = h.reductionValue() + adjustment;
    } else if (
      h.totalValue() === h.limit &&
      h.totalValue() - adjustment >= h.limit
    ) {
      su.stat[reductionStatKey] = h.reductionValue();
    } else {
      su.stat[reductionStatKey] = h.reductionValue() + adjustment;
    }
    su.setStat(Object.assign({}, su.stat));
    su.statControl[reductionStatKey].dec =
      h.reductionValue() > 0 && h.belowLimit();
    su.statControl[reductionStatKey].inc = h.totalValue() > 0;
    su.setStatControl(Object.assign({}, su.statControl));
    calcXp(changedStat, su.stat[changedStat]);
    crossValidateControl(changedStat, 'main');
  };

  let validateStatAndControls = changedStat => {
    let h = statHelper(changedStat);

    if (h.totalValue() >= 0 && h.belowOrAtLimit() && h.acqValue() >= 0) {
      // pass
    } else {
      if (h.reductionValue() === 0) {
        if (h.acqValue() - h.reductionValue() < 0) {
          su.stat[changedStat] = h.reductionValue();
        }
      } else {
        if (h.acqValue() < 0) {
          su.stat[changedStat] = 0;
        } else if (h.totalValue() < 0) {
          su.stat[changedStat] = h.acqValue() - h.totalValue();
        }
      }

      if (h.limit !== undefined && h.aboveLimit()) {
        su.stat[changedStat] = h.limit - h.innateValue() + h.reductionValue();
      }
    }

    su.setStat(Object.assign({}, su.stat));
    su.statControl[changedStat].inc = h.belowLimit();
    su.statControl[changedStat].dec =
      h.reductionValue() === 0
        ? h.acqValue() > 0
        : h.totalValue() > 0 && h.acqValue() > 0;
    su.setStatControl(Object.assign({}, su.statControl));
    calcXp(changedStat, su.stat[changedStat]);
    crossValidateControl(changedStat, 'reduction');
  };

  let crossValidateControl = (changedStat, target) => {
    let controlKey =
      target === 'reduction' ? changedStat[0] + 'r' : changedStat;
    let control =
      controlKey in su.statControl
        ? su.statControl[controlKey]
        : { inc: true, dec: true };
    let h = statHelper(changedStat);

    if (target === 'reduction') {
      control.inc = h.totalValue() > 0;
      control.dec = h.belowLimit() && h.reductionValue() > 0;
    } else if (target === 'main') {
      control.inc = h.belowLimit();
      control.dec = h.acqValue() + h.reductionValue() > 0 && h.totalValue() > 0;
    }
    su.setStatControl(Object.assign({}, su.statControl));
  };

  let statHelper = key => {
    let reductionStatKey = key[0] + 'r';
    let innateValue = () => {
      return key in su.innate ? su.innate[key] : 0;
    };
    let acqValue = () => {
      return key in su.stat ? su.stat[key] : 0;
    };
    let reductionValue = () => {
      return reductionStatKey in su.stat ? su.stat[reductionStatKey] : 0;
    };
    let totalValue = () => {
      return innateValue() + acqValue() - reductionValue();
    };
    let limit = su.statLimit[key];
    let belowOrAtLimit = () => {
      return limit === undefined || totalValue() <= limit;
    };
    let belowLimit = () => {
      return limit === undefined || totalValue() < limit;
    };
    let aboveLimit = () => {
      return limit === undefined || totalValue() > limit;
    };

    return {
      innateValue: innateValue,
      acqValue: acqValue,
      reductionValue: reductionValue,
      totalValue: totalValue,
      limit: limit,
      belowOrAtLimit: belowOrAtLimit,
      belowLimit: belowLimit,
      aboveLimit: aboveLimit
    };
  };

  let calcXp = (changedStat, acquired) => {
    let linearCalc = x => {
      return 10 * x;
    };
    let deciCalc = x => {
      let influx = y => {
        if (y > 0) return y - 10 < 0 ? y : 10;
        return 0;
      };

      let totalCost = influx(x) * 1;
      x -= 10;
      totalCost += influx(x) * 3;
      x -= 10;
      totalCost += influx(x) * 5;
      x -= 10;
      totalCost += influx(x) * 7;
      x -= 10;
      totalCost += influx(x) * 9;
      x -= 10;
      if (x > 0) totalCost += x * 10;

      return totalCost;
    };

    switch (changedStat) {
      case 'hp':
      case 'mp':
        su.statXp[changedStat] = deciCalc(acquired || 0);
        break;
      case 'rp':
      case 'inf':
        su.statXp[changedStat] = linearCalc(acquired || 0);
        break;
    }

    su.setStatXp(Object.assign({}, su.statXp));
    calcTotalXp();
  };

  let calcTotalXp = () => {
    su.totalXp = {
      stat: Object.values(su.statXp).reduce((a, b) => {
        return a + b;
      }, 0),
      skill: su.skillXp.total
    };
    su.setTotalXp(Object.assign({}, su.totalXp));
  };

  let handleSkillGridClick = (sid, tier) => {
    updateSkillState(sid, tier);
    su.skillXp = SkillCalc(su.skillState);
    su.setSkillXp(su.skillXp);
    calcTotalXp();
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

  let handleToonChange = (action, arg, arb) => { 
    toonUtil.handleToonChange(su, action, arg, arb);
  }

  let switchTab = () => {
    let defaultState = () => {
      return(
        <CharacterPage
          su={su}
          passSkillGridClick={handleSkillGridClick}
          passStrainChange={handleStrainChange}
          passStatClick={handleStatClick}
          passStatChange={handleStatChange}
          passStatReductionChange={handleStatReductionChange}
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
        passChange={handleToonChange}
      />
      <div className='builder'>{switchTab(su.tab)}</div>
      <Navigation setTab={su.setTab} tab={su.tab} />
    </div>
  );
};

export default App;
