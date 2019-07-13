import ToonUtil from '../utils/ToonUtil';
import SkillUtil from '../utils/SkillUtil';
import StatUtil from '../utils/StatUtil';
import StrainUtil from '../utils/StrainUtil';
import SkillCalc from '../utils/SkillCalc';
import { toonUpdateSaga } from '../sagas/auth';
import {
  APP_LOAD,
  CREATE_CHARACTER,
  SWITCH_CHARACTER,
  RENAME_CHARACTER,
  UPDATE_LS_TOON_STORAGE,
  DELETE_CHARACTER,
  UNDELETE_CHARACTER,
  SYNC_REMOTE_CHARACTER,
  TOGGLE_SKILL_CATEGORY_VISIBILITY,
  CLICK_SKILL_GRID,
  STAT_ADJUSTED,
  STAT_REDUCTION_ADJUSTED,
  STAT_CHANGED,
  STRAIN_CHANGED,
  REMOTE_CHARACTERS_LOADED,
  RECALCULATE_XP,
  SAVE_STATE,
} from './types';

const toonUtil = ToonUtil();
const skillUtil = SkillUtil();
const statUtil = StatUtil();
const strainUtil = StrainUtil();
const save = state => {
  toonUtil.saveState(state);
  return state;
};

export default (state={}, { payload, type }) => {
  switch (type) {
    case APP_LOAD:
      toonUtil.handleAppLoad(state);
      return state;
    // case 'LOGIN_SUCCESSFUL':
    //   //state.setAuthConfig(payload);
    //   return {
    //     ...state,
    //     authConfig: payload,
    //   }
    case SAVE_STATE:
      return save(state);
    case CREATE_CHARACTER:
      toonUtil.handleToonChange(state, 'new');
      return state;
    case SWITCH_CHARACTER:
      toonUtil.handleToonChange(state, 'switch', payload.toonId);
      return state;
    case RENAME_CHARACTER:
      //toonUtil.handleToonChange(state, 'rename', payload.toonId, payload.value);
      const storage = state.toonStorage;
      storage[payload.toonId].name = payload.value;
      return {
        ...state,
        ...{ toonStorage: storage }
      };
    case RENAME_CHARACTER:
      toonUtil.handleToonChange(state, 'rename');
      return state;
    case DELETE_CHARACTER:
      toonUtil.handleToonChange(state, 'delete', payload.toonId);
      return state;
    case UNDELETE_CHARACTER:
      toonUtil.handleToonChange(state, 'undelete', payload.toonId);
      return state;
    case SYNC_REMOTE_CHARACTER:
      return state;
    case TOGGLE_SKILL_CATEGORY_VISIBILITY:
      skillUtil.handleSkillVisibilityToggle(state, payload);
      return save(state);
    case CLICK_SKILL_GRID:
      return {
        ...state,
        skillState: {
          ...state.skillState,
          [payload.sid]: payload.newState
        }
      }
    case RECALCULATE_XP:
      const newSkillXp = SkillCalc(state.skillState);
      return {
        ...state,
        skillXp: newSkillXp,
        totalXp: {
          ...state.totalXp,
          skill: newSkillXp.total,
        }
      }
    case STAT_ADJUSTED:
      statUtil.handleStatAdjustment(state, payload.stat, payload.adjustment);
      return save(state);
    case STAT_REDUCTION_ADJUSTED:
      statUtil.handleStatReductionAdjustment(
        state,
        payload.stat,
        payload.adjustment
      );
      return save(state);
    case STAT_CHANGED:
      statUtil.handleStatChange(state, payload.stat, payload.value);
      return save(state);
    case STRAIN_CHANGED:
      strainUtil.handleStrainChange(state, payload.strain);
      return save(state);
    case REMOTE_CHARACTERS_LOADED:
      const toonStorage = toonUtil.mergeRemoteToons(
        state,
        payload.characterData,
        payload.strainLookup
      );

      state.setToonStorage(toonStorage);
      return {
        ...state,
        toonStorage: toonStorage,
        authConfig: state.authConfig
      };

    default:
      return state;
  }
};
