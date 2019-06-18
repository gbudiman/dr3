import React, { useState, useEffect } from 'react';
import './App.scss';
import SkillContainer from './components/skillgrids/SkillContainer';
import SkillInitializer from './utils/SkillInitializer';
import StrainInitializer from './utils/StrainInitializer';
import SkillCalc from './utils/SkillCalc';
import SkillSummary from './components/summaries/SkillSummary';
import StrainPicker from './components/strains/StrainPicker';
// import StatBar from './components/statbars/StatBar';
import StatQuad from './components/statquads/StatQuad';
import XpBar from './components/xpbars/XpBar';
import AppBarWrapper from './components/appbars/AppBarWrapper';
import uuid from 'uuid';

function App() {
  let lineageStrain = StrainInitializer();
  let [skillState, setSkillState] = useState(SkillInitializer());
  let [skillXp, setSkillXp] = useState(SkillCalc(skillState));
  let [skillHidden, setSkillHidden] = useState({});
  let [selectedStrain, setSelectedStrain] = useState(null);
  let [stat, setStat] = useState({});
  let [statXp, setStatXp] = useState({});
  let [statControl, setStatControl] = useState({ 
    hp: { inc: true, dec: false },
    mp: { inc: true, dec: false },
    rp: { inc: true, dec: false },
    inf: { inc: true, dec: false },
    ir: { inc: false, dec: false },
  });
  let [innate, setInnate] = useState({});
  let [totalXp, setTotalXp] = useState({stat: 0, skill: 0});
  let [localStorageHasBeenLoaded, setLocalStorageHasBeenLoaded] = useState(false);
  let [toonStorage, setToonStorage] = useState({});
  let [currentToon, setCurrentToon] = useState({});
  let [toonData, setToonData] = useState({})
  let statLimit = { rp: 6, inf: 8 };

  let loadNewToon = tid => {
    const j = toonData[tid];

    setSkillState(j.skill_state);
    setSkillXp(j.skill_xp);
    setSkillHidden(j.skill_hidden);
    setSelectedStrain(j.selected_strain);
    setStat(j.stat);
    setStatXp(j.stat_xp);
    setStatControl(j.stat_control);
    setInnate(j.innate);
    setTotalXp(j.total_xp);
  }

  let loadBlankToon = () => {
    skillState = SkillInitializer();
    
    setSkillState(skillState);
    setSkillXp(SkillCalc(skillState));
    setSkillHidden({});
    setSelectedStrain(null);
    setStat({});
    setStatXp({});
    setStatControl({
      hp: { inc: true, dec: false },
      mp: { inc: true, dec: false },
      rp: { inc: true, dec: false },
      inf: { inc: true, dec: false },
      ir: { inc: false, dec: false },
    })
    setInnate({});
    setTotalXp({stat: 0, skill: 0});
  }

  let persistToonStorage = (writeChange) => {
    setToonStorage(Object.assign({}, toonStorage));
    if (writeChange) localStorage.setItem('toonStorage', JSON.stringify(toonStorage));
  }

  let persistCurrentToon = () => {
    setCurrentToon(currentToon);
    localStorage.setItem('currentToon', currentToon);
  }

  let generateNewToon = () => {
    currentToon = uuid.v1();
    toonStorage[currentToon] = { name: 'new', state: 'enabled' };
    persistCurrentToon(currentToon);
  }

  useEffect(() => {
    if (localStorageHasBeenLoaded === false) {
      loadState();
      setLocalStorageHasBeenLoaded(true);
    } else {
      saveState();  
    }
  })

  let saveState = () => {
    toonData[currentToon] = {
      skill_state: skillState,
      skill_xp: skillXp,
      skill_hidden: skillHidden,
      selected_strain: selectedStrain,
      stat: stat,
      stat_xp: statXp,
      stat_control: statControl,
      innate: innate,
      total_xp: totalXp
    }
    localStorage.setItem('toonData', JSON.stringify(toonData));
  }

  let loadState = () => {
    toonStorage = JSON.parse(localStorage.getItem('toonStorage'));

    let firstEnabledToon;
    let getPreviousSessionToon = () => {
      let previousSessionToon = localStorage.getItem('currentToon');

      if (toonStorage != null && previousSessionToon) {
        if (previousSessionToon in toonStorage) return previousSessionToon;
      }
    }
    let getFirstEnabledToon = () => {
      return Object.keys(toonStorage).find((x) => { return toonStorage[x].state === 'enabled' });
    }
    
    if (toonStorage != null) {
      firstEnabledToon = getPreviousSessionToon() || getFirstEnabledToon();

      let deferredDeletes = Object.keys(toonStorage).filter(tid => toonStorage[tid].state === 'deleted');
      deferredDeletes.forEach(tid => {
        delete toonStorage[tid];
        delete toonData[tid];
      })

      persistToonStorage();
    }

    if (toonStorage == null) {
      toonStorage = {};
      generateNewToon();
      persistToonStorage(true)
    } else if (firstEnabledToon == null) {
      generateNewToon();
      persistToonStorage(true);
    } else {
      currentToon = firstEnabledToon;
      toonData = JSON.parse(localStorage.getItem('toonData'));
      persistCurrentToon(currentToon);
      setToonData(toonData);
      persistToonStorage(false);
      loadNewToon(currentToon);
    }
  }

  let handleStrainChange = (newStrain) => {
    let lineage = lineageStrain.strains[newStrain];
    let innateStat = lineageStrain.lineages[lineage].innate;
    
    setSelectedStrain(newStrain);
    innate = {
      hp: innateStat.hp,
      mp: innateStat.mp,
      rp: innateStat.rp,
      inf: innateStat.inf,
    };
    setInnate(innate);

    for (const lstat in statLimit) { validateStatAndControls(lstat, true) };
  }

  let handleStatClick = (changedStat, adjustment) => {
    let currentStat = changedStat in stat ? stat[changedStat] : 0;
    let newStat = currentStat + adjustment;

    stat[changedStat] = currentStat + adjustment;
    validateStatAndControls(changedStat);
  }

  let handleStatChange = (changedStat, newValue) => {
    stat[changedStat] = parseInt(newValue) || 0;
    validateStatAndControls(changedStat);
  }

  let handleReductionChange = (changedStat, adjustment) => {
    let reductionStatKey = changedStat[0] + 'r';
    let innateValue = () => { return changedStat in innate ? innate[changedStat] : 0 }
    let acqValue = () => { return changedStat in stat ? stat[changedStat] : 0 }
    let reductionValue = () => { return reductionStatKey in stat ? stat[reductionStatKey] : 0 }
    let totalValue = () => { return innateValue() + acqValue() - reductionValue() }
    let limit = statLimit[changedStat];
    let belowOrAtLimit = () => { return limit === undefined || totalValue() <= limit }
    let belowLimit = () => { return limit === undefined || totalValue() < limit }

    if (reductionValue() < 0) {
      stat[reductionStatKey] = 0;
    } else if (reductionValue() + adjustment < 0) {
      stat[reductionStatKey] = 0;
    } else if (totalValue() < 0) {
      stat[reductionStatKey] = -totalValue();
    } else if (totalValue() == 0 && (totalValue() - adjustment >= 0)) {
      stat[reductionStatKey] = reductionValue() + adjustment;
    } else if (totalValue() == 0 && (totalValue() - adjustment < 0)) {
      stat[reductionStatKey] = reductionValue();
    } else if (totalValue() == limit && (totalValue() - adjustment < limit)) {
      stat[reductionStatKey] = reductionValue() + adjustment;
    } else if (totalValue() == limit && (totalValue() - adjustment >= limit)) {
      stat[reductionStatKey] = reductionValue();
    } else {
      stat[reductionStatKey] = reductionValue() + adjustment;
    }
    setStat(Object.assign({}, stat));
    statControl[reductionStatKey].dec = reductionValue() > 0 && belowLimit();
    statControl[reductionStatKey].inc = totalValue() > 0;
    setStatControl(Object.assign({}, statControl));
    calcXp(changedStat, stat[changedStat]);
    crossValidateControl(changedStat, 'main');
  }

  let validateStatAndControls = (changedStat) => {
    let reductionStatKey = changedStat[0] + 'r';
    let innateValue = () => { return changedStat in innate ? innate[changedStat] : 0 }
    let acqValue = () => { return changedStat in stat ? stat[changedStat] : 0 }
    let reductionValue = () => { return reductionStatKey in stat ? stat[reductionStatKey] : 0 }
    let totalValue = () => { return innateValue() + acqValue() - reductionValue() }
    let limit = statLimit[changedStat];
    let belowOrAtLimit = () => { return limit === undefined || totalValue() <= limit }
    let belowLimit = () => { return limit === undefined || totalValue() < limit }
    let aboveLimit = () => { return limit === undefined || totalValue() > limit }

    if (acqValue >= 0 && belowOrAtLimit()) {
      setStat(Object.assign({}, stat));
    } else {
      //console.log(acqValue(), reductionValue());
      if (reductionValue() == 0) {
        if (acqValue() - reductionValue() < 0) stat[changedStat] = reductionValue();  
      } else {
        console.log(reductionValue(), acqValue())
        if (totalValue() < 0 || acqValue() < 0) stat[changedStat] = acqValue() + (-totalValue());
        //Math.min(reductionValue(), acqValue());//0; //reductionValue();
      }
      
      if (limit !== undefined && aboveLimit()) stat[changedStat] = limit - innateValue() + reductionValue();
      //console.log(stat[changedStat]);
      setStat(Object.assign({}, stat));
    }

    statControl[changedStat].inc = belowLimit();
    statControl[changedStat].dec = (reductionValue() == 0) ? (acqValue() > 0) : (totalValue() > 0 && acqValue() > 0);
    setStatControl(Object.assign({}, statControl));
    calcXp(changedStat, stat[changedStat]);
    crossValidateControl(changedStat, 'reduction');
  }

  let crossValidateControl = (changedStat, target) => {
    let controlKey = target == 'reduction' ? changedStat[0] + 'r' : changedStat;
    let control = controlKey in statControl ? statControl[controlKey] : { inc: true, dec: true };

    let reductionStatKey = changedStat[0] + 'r';
    let innateValue = () => { return changedStat in innate ? innate[changedStat] : 0 }
    let acqValue = () => { return changedStat in stat ? stat[changedStat] : 0 }
    let reductionValue = () => { return reductionStatKey in stat ? stat[reductionStatKey] : 0 }
    let totalValue = () => { return innateValue() + acqValue() - reductionValue() }
    let limit = statLimit[changedStat];
    let belowOrAtLimit = () => { return limit === undefined || totalValue() <= limit }
    let belowLimit = () => { return limit === undefined || totalValue() < limit }

    if (target == 'reduction') {
      control.inc = totalValue() > 0;
      control.dec = belowLimit() && reductionValue() > 0;
    } else if (target == 'main') {
      console.log(totalValue());
      control.inc = belowLimit();
      //control.dec = totalValue() > 0;
      control.dec = acqValue() + reductionValue() > 0 && totalValue() > 0;
    }
    setStatControl(Object.assign({}, statControl));
  }

  let calcXp = (changedStat, acquired) => {
    let linearCalc = (x) => { return 10 * x };
    let deciCalc = (x) => {
      let influx = (y) => { 
        if (y > 0) return (y - 10 < 0) ? y : 10;
        return 0;
      }

      let totalCost = influx(x) * 1; x -= 10;
      totalCost += influx(x) * 3; x -= 10;
      totalCost += influx(x) * 5; x -= 10;
      totalCost += influx(x) * 7; x -= 10;
      totalCost += influx(x) * 9; x -= 10;
      if (x > 0) totalCost += x * 10;

      return totalCost;
    }

    switch(changedStat) {
      case 'hp':
      case 'mp': statXp[changedStat] = deciCalc(acquired || 0); break;
      case 'rp':
      case 'inf': statXp[changedStat] = linearCalc(acquired || 0); break;
    }

    setStatXp(Object.assign({}, statXp));
    calcTotalXp();
  }

  let calcTotalXp = () => {
    totalXp = {
      stat: Object.values(statXp).reduce((a, b) => { return a + b }, 0),
      skill: skillXp.total,
    }
    setTotalXp(Object.assign({}, totalXp));
  }

  let handleSkillGridClick = (sid, tier) => {
    updateSkillState(sid, tier);
    skillXp = SkillCalc(skillState)
    setSkillXp(skillXp);
    calcTotalXp();
  }

  let handleSkillXpClick = (category) => {
    if (!(category in skillHidden)) {
      skillHidden[category] = true;
    } else {
      skillHidden[category] = !skillHidden[category];
    }

    setSkillVisibility(category, !skillHidden[category]);
    setSkillHidden(Object.assign({}, skillHidden));
  }

  let updateSkillState = (sid, tier) => {
    if (tier > 0 && tier <= 3) {
      let t4acquired = ('t4acquired' in skillState[sid]) && skillState[sid].t4acquired === true;
      let clickedAcquired = (tier <= skillState[sid].acquired) || (tier === 4 && t4acquired);
      let clickedAtTier = (tier === skillState[sid].acquired) || (tier === 4 && t4acquired);
      
      if (clickedAtTier && clickedAcquired) {
        if (tier === 2 && t4acquired) {
          skillState[sid].t4acquired = false
        } else {
          skillState[sid].acquired = tier - 1;  
        }
      } else {
        skillState[sid].acquired = tier;
      }
      
      if (skillState[sid].acquired < 2) skillState[sid].t4acquired = false;
      setSkillState(Object.assign({}, skillState));
    } else if (tier === 4) {
      if (!('t4acquired' in skillState[sid])) {
        skillState[sid].t4acquired = true
      } else {
        skillState[sid].t4acquired = !skillState[sid].t4acquired;
      }

      if (skillState[sid].t4acquired && skillState[sid].acquired <= 2) {
        skillState[sid].acquired = 2;
      }
      setSkillState(Object.assign({}, skillState));
    }
  }

  let setSkillVisibility = (category, state) => {
    for (const key in skillState) {
      let unacquired = skillState[key].acquired === 0;
      if (unacquired && skillState[key].category === category) {
        skillState[key].visible = state;
      }
    }

    setSkillState(Object.assign({}, skillState));
  }

  let handleToonChange = (action, arg, arb) => {
    if (action === 'new') {
      generateNewToon();
      persistToonStorage(true);
      loadBlankToon();
    } else if (action === 'rename') {
      toonStorage[arg].name = arb;
      persistToonStorage(true);
    } else if (action === 'switch') {
      currentToon = arg;
      persistCurrentToon(currentToon);
      loadNewToon(currentToon);
    } else if (action === 'delete') {
      toonStorage[arg].state = 'deleted';
      persistToonStorage(true);
    } else if (action === 'undelete') {
      toonStorage[arg].state = 'enabled';
      persistToonStorage(true);
    }
  }

  return (
    <div className='app-window'>
      <AppBarWrapper passChange={handleToonChange} currentToon={currentToon} toonStorage={toonStorage} />
      <div className='builder'>
        <div className='container'>
          <StrainPicker passChange={handleStrainChange} selectedStrain={selectedStrain} lineages={lineageStrain.lineages} />
          <XpBar totalXp={totalXp} skillState={skillState} />
          <StatQuad 
            passClick={handleStatClick} 
            passChange={handleStatChange}
            passReductionChange={handleReductionChange}
            stat={stat}
            statXp={statXp}
            statControl={statControl}
            innate={innate} />
          <SkillSummary passClick={handleSkillXpClick} skillXp={skillXp} skillHidden={skillHidden} />
          <SkillContainer passClick={handleSkillGridClick} skillState={skillState} />
        </div>
      </div>
      <div className='footer'>
        <div className='text'>Gloria Budiman - DRpaedia 3.0.0</div>
      </div>
    </div>
  );    
}

export default App;
