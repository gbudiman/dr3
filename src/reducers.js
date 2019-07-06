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

export default function reducer(state, action) {
  const payload = action.payload;

  switch(action.type) {
    case 'APP_LOAD': toonUtil.handleAppLoad(state); return state;
    case 'CREATE_NEW_CHARACTER': toonUtil.handleToonChange(state, 'new'); return state;
    case 'SWITCH_CHARACTER': toonUtil.handleToonChange(state, 'switch', payload.toonId); return state;
    case 'RENAME_CHARACTER': toonUtil.handleToonChange(state, 'rename', payload.toonId, payload.value); return state;
    case 'DELETE_CHARACTER': toonUtil.handleToonChange(state, 'delete', payload.toonId); return state;
    case 'UNDELETE_CHARACTER': toonUtil.handleToonChange(state, 'undelete', payload.toonId); return state;

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
      strainUtil.handleStrainChange(state, payload.strain);
      return save(state);
    case 'REMOTE_CHARACTERS_LOADED': 
      toonUtil.mergeRemoteToons(
        state, 
        payload.characterData,
        payload.strainLookup,
      ); 
      return state;

    case 'REMOTE_STRAINS_LOADED':
      strainUtil.buildRemoteDictionary(state, payload);
      return state;
    case 'REMOTE_SKILLS_LOADED':
      //console.log(payload);
      return state;
    default: return state;
  }
}
