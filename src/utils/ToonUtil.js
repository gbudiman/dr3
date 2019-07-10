import axios from 'axios';
import { connect } from 'react-redux';
import { calcXpComponents, totalStatXp, calcTotalXp } from './XpUtil';
import LutUtil from './LutUtil';
import SkillInitializer from './SkillInitializer';
import SkillCalc from './SkillCalc';
import StrainUtil from './StrainUtil';
import SkillUtil from './SkillUtil';
import StatUtil from './StatUtil';
import uuid from 'uuid';

const SKIP_SET_STATE = true;
const lookupTablesConstructed = false;
const api = (path) => { return 'http://devdrdb.dystopiarisingnetwork.com:5000/api/' + path }
const fetchToken = async(username, password) => { 
  return await axios.get(
    api('generateToken'),
    { auth: { username: username, password: password} }
  )
}
const fetchRemoteCharacters = async(su) => { return await axios.get(api('characters'), su.authConfig) }
const fetchRemoteCharacter = async(su, remoteId) => { return await axios.get(api('character/' + remoteId), su.authConfig) }
const fetchRemoteStrains = async() => { return await axios.get(api('strains')) }
const fetchRemoteSkills = async() => { return await axios.get(api('skills')) }

const login = async(su) => {
  if (su.authConfig == null) {
    const tokenResponse = await fetchToken('test', 'test1234');
    const config = {
      headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
    }
    su.authConfig = config;
    su.setAuthConfig(su.authConfig);
    console.log('authConfig set!');
  }
}
const lutUtil = LutUtil();
const statUtil = StatUtil();
const strainUtil = StrainUtil();

const ToonUtil = () => { 
  const loadNewToon = async(su, tid) => {
    
    const fetch = (remoteId) => {
      console.log('login from loadNewToon');
      login(su).then(() => { 
        fetchRemoteCharacter(su, remoteId).then(data => {
          const remoteData = data.data;
          console.log('fetch remote character complete');
          const normalizedStrain = su.strainLookup[remoteData.strain_id];

          console.log('begin sync strain');
          console.log(normalizedStrain);
          strainUtil.handleStrainChange(su, normalizedStrain, SKIP_SET_STATE);
          console.log(su.selectedStrain);
          console.log('end sync strain');
          
          su.stat = {
            ...su.stat, 
            ...{
              hp: remoteData.body,
              mp: remoteData.mind,
              rp: remoteData.resolve,
              inf: remoteData.infection,
              //ir: 0,
            }
          };
          statUtil.validateAllStatsAndControls(su);
          updateStates();
        }) 
      })
    }

    const updateStates = () => {
      //su.setSelectedStrain({...{}, ...su.selectedStrain});
      su.setInnate({...{}, ...su.innate});
      su.setStat({...{}, ...su.stat});
      su.setStatControl({...{}, ...su.statControl});
      saveState(su);
    }
    
    const hasRemoteData = 'remoteId' in su.toonStorage[tid] && su.toonStorage[tid].remoteId != null;
    const loadData = (j) => {
      su.skillState = Object.assign(SkillInitializer(), j.skill_state); su.setSkillState(su.skillState);
      su.skillXp = j.skill_xp;                                          su.setSkillXp(su.skillXp);
      su.skillHidden = j.skill_hidden;                                  su.setSkillHidden(su.skillHidden);
      su.skillInfoVisible = j.skill_info_visible || {};                 su.setSkillInfoVisible(su.skillInfoVisible);
      su.selectedStrain = j.selected_strain;                            su.setSelectedStrain(j.selected_strain);
      su.stat = j.stat;                                                 su.setStat(su.stat);
      su.statXp = j.stat_xp;                                            su.setStatXp(su.statXp);
      su.statControl = j.stat_control;                                  su.setStatControl(su.statControl);
      su.innate = j.innate;                                             su.setInnate(su.innate);
      su.totalXp = j.total_xp;                                          su.setTotalXp(su.totalXp);
    }
    
    
    let j = su.toonData[tid];
    if (j == null) {
      if (hasRemoteData) {
        loadBlankToon(su);
        fetch(su.toonStorage[tid].remoteId);
      } else {
        // critical localStorageError
        console.log('Critical localStorageError');
        console.log('Toon ID: ' + tid);
        console.log('LS::currentToon: ' + localStorage.getItem('currentToon'));
        console.log('======= toonStorage =====');
        console.log(localStorage.getItem('toonStorage'));
        console.log('======= toonData =======');
        console.log(localStorage.getItem('toonData'));
        loadBlankToon(su);
      }
    } else {
      loadData(j);
      console.log('loaded locally');
      if (hasRemoteData) fetch(su.toonStorage[tid].remoteId);
    }
  };

  const loadBlankToon = (su) => {
    su.skillState = SkillInitializer();

    su.setSkillState(su.skillState);
    su.setSkillXp(SkillCalc(su.skillState));
    su.setSkillHidden({});
    su.setSkillInfoVisible({});
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

    saveState(su);
  };

  const blankToonTemplate = () => {
    const skillState = SkillInitializer();

    return {
      skillState: skillState,
      skillXp: SkillCalc(skillState),
      skillHidden: {},
      selectedStrain: null,
      stat: {},
      statXp: {},
      statControl: {
        hp: { inc: true, dec: false },
        mp: { inc: true, dec: false },
        rp: { inc: true, dec: false },
        inf: { inc: true, dec: false },
        ir: { inc: false, dec: false }
      },
      innate: {},
      totalXp: { stat: 0, skill: 0 }
    }
  }

  const persistToonStorage = (su, writeChange) => {
    su.setToonStorage(Object.assign({}, su.toonStorage));
    if (writeChange) 
      localStorage.setItem('toonStorage', JSON.stringify(su.toonStorage));
  };

  const persistCurrentToon = (su) => {
    su.setCurrentToon(su.currentToon);
    localStorage.setItem('currentToon', su.currentToon);
  };

  const generateNewToon = (storage, data) => {
    // su.currentToon = uuid.v1();
    // su.toonStorage[su.currentToon] = { name: 'new', state: 'enabled' };
    // persistCurrentToon(su);
    // persistToonStorage(su, true);
    const tid = uuid.v1();
    storage[tid] = { name: 'new', state: 'enabled'};
    
  };

  const saveStateInBackgroundSelective = (su, tid, mutation) => {
    Object.assign(su.toonData[tid], mutation);
    localStorage.setItem('toonData', JSON.stringify(su.toonData));
    console.log(JSON.parse(localStorage.getItem('toonData')));
  }

  const saveState = (su) => {
    console.log('saving state');
    su.toonData[su.currentToon] = {
      skill_state: su.skillState,
      skill_xp: su.skillXp,
      skill_hidden: su.skillHidden,
      skill_info_visible: su.skillInfoVisible,
      selected_strain: su.selectedStrain,
      stat: su.stat,
      stat_xp: su.statXp,
      stat_control: su.statControl,
      innate: su.innate,
      total_xp: su.totalXp,
    };
    localStorage.setItem('toonData', JSON.stringify(su.toonData));
  };

  const loadState = (su) => {
    // su.toonStorage = JSON.parse(localStorage.getItem('toonStorage'));
    const ts = localStorage.getItem('toonStorage');
    const td = localStorage.getItem('toonData');
    const toonStorage = ts && JSON.parse(ts);
    const toonData = (td && JSON.parse(td)) || {};

    let firstEnabledToon;
    const getPreviousSessionToon = () => {
      const previousSessionToon = localStorage.getItem('currentToon');

      if (toonStorage != null && previousSessionToon) {
        if (previousSessionToon in toonStorage) return previousSessionToon;
      }
    };
    const getFirstEnabledToon = () => {
      return Object.keys(toonStorage).find(x => {
        return toonStorage[x].state === 'enabled';
      });
    };

    if (toonStorage != null) {
      firstEnabledToon = getPreviousSessionToon() || getFirstEnabledToon();

      const deferredDeletes = Object.keys(toonStorage).filter(
        tid => toonStorage[tid].state === 'deleted'
      );
      deferredDeletes.forEach(tid => {
        delete toonStorage[tid];
        delete toonData[tid];
      });

      //persistToonStorage(su);
      localStorage.setItem('toonStorage', JSON.stringify(toonStorage));
      localStorage.setItem('toonData', JSON.stringify(toonData));
    }

    if (toonStorage == null) {
      const newStorageEntry = generateNewToon(toonStorage, toonData);
      localStorage = {...localStorage, ...generateNewToon()};
      persistToonStorage(su, true);
      saveState(su);
    } else if (firstEnabledToon == null) {
      generateNewToon(su);
      persistToonStorage(su, true);
      saveState(su);
    } else {
      su.currentToon = firstEnabledToon;
      su.toonData = JSON.parse(localStorage.getItem('toonData'));
      persistCurrentToon(su, su.currentToon);
      su.setToonData(su.toonData);
      persistToonStorage(su, false);
      loadNewToon(su, su.currentToon);
    }
  };

  const handleToonChange = (su, action, arg, arb) => {
    switch(action) {
      case 'new':
        generateNewToon(su);
        loadBlankToon(su);
        break;
      case 'rename':
        su.toonStorage[arg].name = arb;
        persistToonStorage(su, true);
        break;
      case 'switch':
        console.log('switching to ' + arg);
        su.currentToon = arg;
        persistCurrentToon(su);
        loadNewToon(su, su.currentToon);
        break;
      case 'delete':
        su.toonStorage[arg].state = 'deleted';
        persistToonStorage(su, true);
        break;
      case 'undelete':
        su.toonStorage[arg].state = 'enabled';
        persistToonStorage(su, true);
        break;
    }
  };

  const handleAppLoad = (su) => {
    loadState(su);
    console.log('app loaded');
    console.log('login from handleAppLoad');

    login(su).then(() => {
      fetchRemoteCharacters(su).then(data => { mergeRemoteToons(su, data.data) })
    })

    lutUtil.loadLookupTables(su, fetchRemoteStrains, fetchRemoteSkills);
  }

  const mergeRemoteToons = (su, remoteToons) => {
    const generateToonFromRemote = (remoteId, name) => {
      const tid = uuid.v1();
      su.toonStorage[tid] = { name: name, state: 'enabled', remoteId: remoteId };
    }

    const indexRemoteToons = (storage) => {
      return Object.fromEntries(
        Object.keys(storage).filter(x => 'remoteId' in storage[x]).map(uuid => {
          return [storage[uuid].remoteId, uuid]
        })
      )
    }
    const syncName = (tid, value) => {
      su.toonStorage[tid].name = value;
    }

    const mergedRemoteToons = indexRemoteToons(su.toonStorage);

    remoteToons.forEach(remoteToon => {
      const remoteId = remoteToon.id;
      if (!(remoteId in mergedRemoteToons)) {
        generateToonFromRemote(remoteId, remoteToon.name);
      } else { 
        syncName(mergedRemoteToons[remoteId], remoteToon.name);
      }
    })

    localStorage.setItem('toonStorage', JSON.stringify(su.toonStorage));

    console.log('remote characters merged!');
    su.setToonStorage({...{}, ...su.toonStorage});
  }

  return {
    handleToonChange: handleToonChange,
    handleAppLoad: handleAppLoad,
    saveState: saveState,
    mergeRemoteToons: mergeRemoteToons,
  }
}

export default ToonUtil;
