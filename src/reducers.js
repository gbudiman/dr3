import ToonUtil from './utils/ToonUtil';
import SkillUtil from './utils/SkillUtil';
import StatUtil from './utils/StatUtil';
import StrainUtil from './utils/StrainUtil';
import { toonUpdateSaga } from './sagas/auth';

const toonUtil = ToonUtil();
const skillUtil = SkillUtil();
const statUtil = StatUtil();
const strainUtil = StrainUtil();
const save = (state) => { toonUtil.saveState(state); return state; }

export default function reducer(state = {}, action) {
  const payload = action.payload;

  switch(action.type) {
    case 'APP_LOAD': toonUtil.handleAppLoad(state); return state;
    case 'LOGIN_SUCCESSFUL':
      console.log('LOGIN Successful!');
      console.log(payload);
      state.setAuthConfig(payload);
      return {
        ...state,
        authConfig: payload,
      }
    case 'CREATE_NEW_CHARACTER': toonUtil.handleToonChange(state, 'new'); return state;
    case 'SWITCH_CHARACTER': 
      console.log(state.authConfig);
      console.log(state.toonStorage);
      toonUtil.handleToonChange(state, 'switch', payload.toonId); 
      return state;
    case 'SWITCH_CHARACTER_WITH_REMOTE_DATA': 
      const synced = toonUtil.syncToon(state, payload);

      return {
        ...state,
        skillState: synced.skillState,
        skillXp: synced.skillXp,
        selectedStrain: synced.selectedStrain,
        stat: synced.stat,
        statXp: synced.statXp,
        statControl: synced.statControl,
        innate: strainUtil.getInnateStats(state, synced.selectedStrain),
        totalXp: synced.totalXp,
        currentToon: synced.currentToon,
        toonStorage: synced.toonStorage,
        toonData: synced.toonData,
      }
    case 'RENAME_CHARACTER': 
      console.log(state);
      console.log(action);
      toonUtil.handleToonChange(state, 'rename', payload.toonId, payload.value); 
      return state;
    case 'DELETE_CHARACTER': toonUtil.handleToonChange(state, 'delete', payload.toonId); return state;
    case 'UNDELETE_CHARACTER': toonUtil.handleToonChange(state, 'undelete', payload.toonId); return state;
    case 'SYNC_REMOTE_CHARACTER': return state;
    case 'TOGGLE_SKILL_CATEGORY_VISIBILITY':
      skillUtil.handleSkillVisibilityToggle(state, payload);
      return save(state);
    case 'CLICKED_SKILL_GRID':
      skillUtil.handleSkillGridClick(state, payload.sid, payload.tier); 
      return save(state);
    case 'STAT_ADJUSTED': 
      statUtil.handleStatAdjustment(state, payload.stat, payload.adjustment);
      return save(state);
    case 'STAT_REDUCTION_ADJUSTED':
      statUtil.handleStatReductionAdjustment(state, payload.stat, payload.adjustment);
      return save(state);
    case 'STAT_CHANGED':
      statUtil.handleStatChange(state, payload.stat, payload.value);
      return save(state);
    case 'STRAIN_CHANGED':
      console.log(state);
      strainUtil.handleStrainChange(state, payload.strain);
      return save(state);
    case 'REMOTE_CHARACTERS_LOADED': 
      const toonStorage = toonUtil.mergeRemoteToons(
        state, 
        payload.characterData,
        payload.strainLookup,
      ); 

      state.setToonStorage(toonStorage);
      return {
        ...state,
        toonStorage: toonStorage,
        authConfig: state.authConfig,
      }

    case 'REMOTE_STRAINS_LOADED':
      strainUtil.buildRemoteDictionary(state, payload);
      return state;
    case 'REMOTE_SKILLS_LOADED':
      //console.log(payload);
      return state;
    default: return state;
  }
}
