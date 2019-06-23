import React, { useState, useEffect } from 'react';
import './App.scss';
import Navigation from './components/navigation/Navigation';
import StateUtil from './utils/StateUtil';
import SkillInitializer from './utils/SkillInitializer';
import SkillCalc from './utils/SkillCalc';
import SkillContainer from './components/skillgrids/SkillContainer';
import StrainPicker from './components/strains/StrainPicker';
import StatSkill from './components/statskills/StatSkill';
import XpBar from './components/xpbars/XpBar';
import AppBarWrapper from './components/appbars/AppBarWrapper';
import uuid from 'uuid';

import CharacterPage from './components/CharacterPage/CharacterPage';
import SkillPage from './components/SkillPage/SkillPage';
import FeedbackPage from './components/FeedbackPage/FeedbackPage';

const App = () => {
  let su = StateUtil();

  let loadNewToon = tid => {
    const j = su.toonData[tid];

    if (j == null) {
      // critical localStorageError
      console.log('Critical localStorageError');
      console.log('Toon ID: ' + tid);
      console.log('LS::currentToon: ' + localStorage.getItem('currentToon'));
      console.log('======= toonStorage =====');
      console.log(localStorage.getItem('toonStorage'));
      console.log('======= toonData =======');
      console.log(localStorage.getItem('toonData'));
      loadBlankToon();
    } else {
      su.setSkillState(j.skill_state);
      su.setSkillXp(j.skill_xp);
      su.setSkillHidden(j.skill_hidden);
      su.setSelectedStrain(j.selected_strain);
      su.setStat(j.stat);
      su.setStatXp(j.stat_xp);
      su.setStatControl(j.stat_control);
      su.setInnate(j.innate);
      su.setTotalXp(j.total_xp);
    }
  };

  let loadBlankToon = () => {
    su.skillState = SkillInitializer();

    su.setSkillState(su.skillState);
    su.setSkillXp(SkillCalc(su.skillState));
    su.setSkillHidden({});
    su.setSelectedStrain(null);
    su.setStat({});
    su.setStatXp({});
    su.setStatControl({
      hp: { inc: true, dec: false },
      mp: { inc: true, dec: false },
      rp: { inc: true, dec: false },
      inf: { inc: true, dec: false },
      ir: { inc: false, dec: false }
    });
    su.setInnate({});
    su.setTotalXp({ stat: 0, skill: 0 });
  };

  let persistToonStorage = writeChange => {
    su.setToonStorage(Object.assign({}, su.toonStorage));
    if (writeChange)
      localStorage.setItem('toonStorage', JSON.stringify(su.toonStorage));
  };

  let persistCurrentToon = () => {
    su.setCurrentToon(su.currentToon);
    localStorage.setItem('currentToon', su.currentToon);
  };

  let generateNewToon = () => {
    su.currentToon = uuid.v1();
    su.toonStorage[su.currentToon] = { name: 'new', state: 'enabled' };
    persistCurrentToon(su.currentToon);
  };

  useEffect(() => {
    if (su.localStorageHasBeenLoaded === false) {
      loadState();
      su.setLocalStorageHasBeenLoaded(true);
    } else {
      saveState();
    }
  });

  let saveState = () => {
    su.toonData[su.currentToon] = {
      skill_state: su.skillState,
      skill_xp: su.skillXp,
      skill_hidden: su.skillHidden,
      selected_strain: su.selectedStrain,
      stat: su.stat,
      stat_xp: su.statXp,
      stat_control: su.statControl,
      innate: su.innate,
      total_xp: su.totalXp,
    };
    localStorage.setItem('toonData', JSON.stringify(su.toonData));
  };

  let loadState = () => {
    su.toonStorage = JSON.parse(localStorage.getItem('toonStorage'));

    let firstEnabledToon;
    let getPreviousSessionToon = () => {
      let previousSessionToon = localStorage.getItem('currentToon');

      if (su.toonStorage != null && previousSessionToon) {
        if (previousSessionToon in su.toonStorage) return previousSessionToon;
      }
    };
    let getFirstEnabledToon = () => {
      return Object.keys(su.toonStorage).find(x => {
        return su.toonStorage[x].state === 'enabled';
      });
    };

    if (su.toonStorage != null) {
      firstEnabledToon = getPreviousSessionToon() || getFirstEnabledToon();

      let deferredDeletes = Object.keys(su.toonStorage).filter(
        tid => su.toonStorage[tid].state === 'deleted'
      );
      deferredDeletes.forEach(tid => {
        delete su.toonStorage[tid];
        delete su.toonData[tid];
      });

      persistToonStorage();
    }

    if (su.toonStorage == null) {
      su.toonStorage = {};
      generateNewToon();
      persistToonStorage(true);
    } else if (firstEnabledToon == null) {
      generateNewToon();
      persistToonStorage(true);
    } else {
      su.currentToon = firstEnabledToon;
      su.toonData = JSON.parse(localStorage.getItem('toonData'));
      persistCurrentToon(su.currentToon);
      su.setToonData(su.toonData);
      persistToonStorage(false);
      loadNewToon(su.currentToon);
    }
  };

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
    if (action === 'new') {
      generateNewToon();
      persistToonStorage(true);
      loadBlankToon();
    } else if (action === 'rename') {
      su.toonStorage[arg].name = arb;
      persistToonStorage(true);
    } else if (action === 'switch') {
      su.currentToon = arg;
      persistCurrentToon(su.currentToon);
      loadNewToon(su.currentToon);
    } else if (action === 'delete') {
      su.toonStorage[arg].state = 'deleted';
      persistToonStorage(true);
    } else if (action === 'undelete') {
      su.toonStorage[arg].state = 'enabled';
      persistToonStorage(true);
    }
  };

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
