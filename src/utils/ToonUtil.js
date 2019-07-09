import axios from 'axios';
import { connect } from 'react-redux';
import { calcXpComponents, totalStatXp, calcTotalXp } from './XpUtil';
import SkillInitializer from './SkillInitializer';
import SkillCalc from './SkillCalc';
import StrainUtil from './StrainUtil';
import uuid from 'uuid';

const lookupTablesConstructed = false;
const api = (path) => { return 'http://devdrdb.dystopiarisingnetwork.com:5000/api/' + path }
const fetchRemoteStrains = async() => { return await axios.get(api('strains')) }

const ToonUtil = () => { 
  const loadNewToon = async(su, tid) => {
    const login = async() => {
      const tokenResponse = await axios.get(
        'http://devdrdb.dystopiarisingnetwork.com:5000/api/generateToken',
        { auth: { username: 'test', password: 'test1234'} }
      );
      const config = {
        headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
      }
      su.authConfig = config;
      su.setAuthConfig(su.authConfig);
    }
    const fetchCharacter = async(remoteId, config) => {
      if (su.authConfig == null) await login();
      const remoteData = await axios.get('http://devdrdb.dystopiarisingnetwork.com:5000/api/character/' + remoteId, su.authConfig);
      syncRemoteData(remoteData.data);
      saveState(su);
    }
    const syncRemoteData = (data) => {
      const normalizedStrain = su.strainLookup[data.strain_id];
      if (normalizedStrain) {
        su.selectedStrain = su.strainLookup[data.strain_id];
        su.setSelectedStrain(su.selectedStrain);
      }

      su.stat = {
        hp: data.body,
        mp: data.mind,
        rp: data.resolve,
        inf: data.infection,
        ir: 0,
      };

      su.setStat(su.stat);
      calcXpComponents(su);
      calcTotalXp(su);
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
        fetchCharacter(su.toonStorage[tid].remoteId);
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
      if (hasRemoteData) fetchCharacter(su.toonStorage[tid].remoteId);
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

  const generateNewToon = (su) => {
    su.currentToon = uuid.v1();
    su.toonStorage[su.currentToon] = { name: 'new', state: 'enabled' };
    persistCurrentToon(su);
    persistToonStorage(su, true);
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
    su.toonStorage = JSON.parse(localStorage.getItem('toonStorage'));

    let firstEnabledToon;
    const getPreviousSessionToon = () => {
      let previousSessionToon = localStorage.getItem('currentToon');

      if (su.toonStorage != null && previousSessionToon) {
        if (previousSessionToon in su.toonStorage) return previousSessionToon;
      }
    };
    const getFirstEnabledToon = () => {
      return Object.keys(su.toonStorage).find(x => {
        return su.toonStorage[x].state === 'enabled';
      });
    };

    if (su.toonStorage != null) {
      firstEnabledToon = getPreviousSessionToon() || getFirstEnabledToon();

      const deferredDeletes = Object.keys(su.toonStorage).filter(
        tid => su.toonStorage[tid].state === 'deleted'
      );
      deferredDeletes.forEach(tid => {
        delete su.toonStorage[tid];
        delete su.toonData[tid];
      });

      persistToonStorage(su);
    }

    if (su.toonStorage == null) {
      su.toonStorage = {};
      generateNewToon(su);
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

  const constructLookupTables = async(su) => {
    const strainUtil = StrainUtil();
    const remoteStrains = await fetchRemoteStrains();
      
    strainUtil.buildLookupTable(su, remoteStrains.data);
  }

  const handleAppLoad = async(su) => {
    await constructLookupTables(su);

    if (su.localStorageHasBeenLoaded === false) {
      loadState(su);
      su.setLocalStorageHasBeenLoaded(true);
      console.log('finished loading local storage');
    } else {
      saveState(su);
    }
  }

  // const syncToon = (su, payload) => {
  //   const characterData = payload.characterData;
  //   const strainLookup = payload.strainLookup;
  //   const tid = payload.tid;

  //   const remoteStats = {
  //     hp: characterData.body,
  //     mp: characterData.mind,
  //     rp: characterData.resolve,
  //     inf: characterData.infection,
  //     ir: 0,
  //   }
  //   const statXp = calcXpComponents(remoteStats);

  //   console.log(su.toonStorage);
  //   su.currentToon = tid;
  //   localStorage.setItem('currentToon', su.currentToon);
  //   su.skillState = SkillInitializer();
  //   su.skillXp = SkillCalc(su.skill_state);
  //   su.skillHidden = {};
  //   // su.skill_info_visible: su.skillInfoVisible;
  //   su.selectedStrain = strainLookup[characterData.strain_id];
  //   su.stat = remoteStats;
  //   // su.stat: su.stat;
  //   su.statXp = statXp;
  //   // su.stat_xp: su.statXp;
  //   su.statControl = {
  //     hp: { inc: true, dec: false },
  //     mp: { inc: true, dec: false },
  //     rp: { inc: true, dec: false },
  //     inf: { inc: true, dec: false },
  //     ir: { inc: false, dec: false },
  //   };
  //   // su.innate: su.innate;
  //   su.totalXp = {
  //     stat: totalStatXp(su),
  //     skill: 0,
  //   }

  //   saveState(su);
  //   return su;
  //   //handleToonChange(su, 'switch', tid);
  // }

  const mergeRemoteToons = (su, remoteToons, strainLookup) => {
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

    return su.toonStorage;
  }

  return {
    handleToonChange: handleToonChange,
    handleAppLoad: handleAppLoad,
    //syncToon: syncToon,
    saveState: saveState,
    mergeRemoteToons: mergeRemoteToons,
  }
}

export default ToonUtil;
