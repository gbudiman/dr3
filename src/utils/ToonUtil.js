import SkillInitializer from './SkillInitializer';
import SkillCalc from './SkillCalc';
import uuid from 'uuid';

const ToonUtil = () => { 
  const loadNewToon = (su, tid) => {
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
      loadBlankToon(su);
    } else {
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

  const generateToonFromRemote = (su, remoteId, name) => {
    const tid = uuid.v1();
    su.toonStorage[tid] = { name: name, state: 'enabled', remoteId: remoteId };
    persistToonStorage(su, true);
    saveStateInBackground(su, tid, blankToonTemplate());
  }

  const saveStateInBackground = (su, tid, data) => {
    su.toonData[tid] = {
      skill_state: data.skillState,
      skill_xp: data.skillXp,
      skill_hidden: data.skillHidden,
      skill_info_visible: data.skillInfoVisible,
      selected_strain: data.selectedStrain,
      stat: data.stat,
      stat_xp: data.statXp,
      stat_control: data.statControl,
      innate: data.innate,
      total_xp: data.totalXp,
    }
    localStorage.setItem('toonData', JSON.stringify(su.toonData));
  }

  const saveState = (su) => {
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
    } else if (firstEnabledToon == null) {
      generateNewToon(su);
      persistToonStorage(su, true);
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
    if (su.localStorageHasBeenLoaded === false) {
      loadState(su);
      su.setLocalStorageHasBeenLoaded(true);
      console.log('finished loading local storage');
    } else {
      saveState(su);
    }
  }

  const syncDownstream = (su, tid, value) => {
    su.toonStorage[tid].name = value;
    persistToonStorage(su, true);
  }

  const mergeRemoteToons = (su, remoteToons) => {
    const mergedRemoteToons = indexRemoteToons(su.toonStorage);
    remoteToons.forEach(remoteToon => {
      const remoteId = remoteToon.id;
      if (!(remoteId in mergedRemoteToons)) {
        generateToonFromRemote(su, remoteId, remoteToon.name)
      } else {
        syncDownstream(su, mergedRemoteToons[remoteId], remoteToon.name)
      }
    })
  }

  const indexRemoteToons = (storage) => {
    return Object.fromEntries(
      Object.keys(storage).filter(x => 'remoteId' in storage[x]).map(uuid => {
        return [storage[uuid].remoteId, uuid]
      })
    )
  }

  return {
    handleToonChange: handleToonChange,
    handleAppLoad: handleAppLoad,
    saveState: saveState,
    mergeRemoteToons: mergeRemoteToons,
  }
}

export default ToonUtil;
