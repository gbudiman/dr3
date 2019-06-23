import SkillInitializer from './SkillInitializer';
import SkillCalc from './SkillCalc';
import uuid from 'uuid';

const ToonUtil = () => { 
  let loadNewToon = (su, tid) => {
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

  let loadBlankToon = (su) => {
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

  let persistToonStorage = (su, writeChange) => {
    su.setToonStorage(Object.assign({}, su.toonStorage));
    if (writeChange)
      localStorage.setItem('toonStorage', JSON.stringify(su.toonStorage));
  };

  let persistCurrentToon = (su) => {
    su.setCurrentToon(su.currentToon);
    localStorage.setItem('currentToon', su.currentToon);
  };

  let generateNewToon = (su) => {
    su.currentToon = uuid.v1();
    su.toonStorage[su.currentToon] = { name: 'new', state: 'enabled' };
    persistCurrentToon(su, su.currentToon);
  };

  let saveState = (su) => {
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

  let loadState = (su) => {
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

  let handleToonChange = (su, action, arg, arb) => {
    switch(action) {
      case 'new':
        generateNewToon(su);
        persistToonStorage(su, true);
        loadBlankToon(su);
        break;
      case 'rename':
        su.toonStorage[arg].name = arb;
        persistToonStorage(su,true);
        break;
      case 'switch':
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

  let handleAppLoad = (su) => {
    if (su.localStorageHasBeenLoaded === false) {
      loadState(su);
      su.setLocalStorageHasBeenLoaded(true);
    } else {
      saveState(su);
    }
  }

  return {
    handleToonChange: handleToonChange,
    handleAppLoad: handleAppLoad,
  }
}

export default ToonUtil;
