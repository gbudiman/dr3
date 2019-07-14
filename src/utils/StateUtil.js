import SkillInitializer from './SkillInitializer';
import StrainInitializer from './StrainInitializer';
import SkillCalc from './SkillCalc';
import { useState } from 'react';

const StateUtil = () => {
  let lineageStrain = StrainInitializer();
  let statLimit = { rp: 6, inf: 8 };

  let [skillState, setSkillState] = useState(SkillInitializer());
  let [skillXp, setSkillXp] = useState(SkillCalc(skillState));
  let [skillHidden, setSkillHidden] = useState({});
  let [skillInfoVisible, setSkillInfoVisible] = useState({});
  let [selectedStrain, setSelectedStrain] = useState(null);
  let [stat, setStat] = useState({});
  let [statXp, setStatXp] = useState({});
  let [statControl, setStatControl] = useState({
    hp: { inc: true, dec: false },
    mp: { inc: true, dec: false },
    rp: { inc: true, dec: false },
    inf: { inc: true, dec: false },
    ir: { inc: false, dec: false }
  });
  let [innate, setInnate] = useState({});
  let [totalXp, setTotalXp] = useState({ stat: 0, skill: 0 });
  let [maxXp, setMaxXp] = useState(null);
  let [toonStorage, setToonStorage] = useState({});
  let [toonData, setToonData] = useState({});
  let [currentToon, setCurrentToon] = useState({});
  let [tab, setTab] = useState(0);
  let [authConfig, setAuthConfig] = useState(null);
  let [strainLookup, setStrainLookup] = useState({});
  let [inverseStrainLookup, setInverseStrainLookup] = useState({});
  let [skillLookup, setSkillLookup] = useState({});
  let [inverseSkillLookup, setInverseSkillLookup] = useState({});

  return {
    lineageStrain: lineageStrain,
    skillState: skillState,
    setSkillState: setSkillState,
    skillXp: skillXp,
    setSkillXp: setSkillXp,
    skillHidden: skillHidden,
    setSkillHidden: setSkillHidden,
    skillInfoVisible: skillInfoVisible,
    setSkillInfoVisible: setSkillInfoVisible,
    selectedStrain: selectedStrain,
    setSelectedStrain: setSelectedStrain,
    stat: stat,
    setStat: setStat,
    statXp: statXp,
    setStatXp: setStatXp,
    statControl: statControl,
    setStatControl: setStatControl,
    innate: innate,
    setInnate: setInnate,
    totalXp: totalXp,
    setTotalXp: setTotalXp,
    maxXp: maxXp,
    setMaxXp: setMaxXp,
    toonStorage: toonStorage,
    setToonStorage: setToonStorage,
    toonData: toonData,
    setToonData: setToonData,
    currentToon: currentToon,
    setCurrentToon: setCurrentToon,
    statLimit: statLimit,
    tab: tab,
    setTab: setTab,
    authConfig: authConfig,
    setAuthConfig: setAuthConfig,
    strainLookup: strainLookup,
    setStrainLookup: setStrainLookup,
    skillLookup: skillLookup,
    setSkillLookup: setSkillLookup,
    inverseStrainLookup: inverseStrainLookup,
    setInverseStrainLookup: setInverseStrainLookup,
    inverseSkillLookup: inverseSkillLookup,
    setInverseSkillLookup: setInverseSkillLookup
  };
};

export default StateUtil;
