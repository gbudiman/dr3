import ToonUtil from './utils/ToonUtil';
import SkillUtil from './utils/SkillUtil';
import { toonUpdateSaga } from './sagas/auth';

const toonUtil = ToonUtil();
const skillUtil = SkillUtil();

export default function reducer(state, action) {
  const payload = action.payload;

  switch(action.type) {
    case 'APP_LOAD': toonUtil.handleAppLoad(state); return state;
    case 'CREATE_NEW_CHARACTER': toonUtil.handleToonChange(state, 'new'); return state;
    case 'SWITCH_CHARACTER': toonUtil.handleToonChange(state, 'switch', payload.toonId); return state;
    case 'RENAME_CHARACTER': toonUtil.handleToonChange(state, 'rename', payload.toonId, payload.value); return state;
    case 'DELETE_CHARACTER': toonUtil.handleToonChange(state, 'delete', payload.toonId); return state;
    case 'UNDELETE_CHARACTER': toonUtil.handleToonChange(state, 'undelete', payload.toonId); return state;
    case 'CLICKED_SKILL_GRID': 
      skillUtil.handleSkillGridClick(state, payload.sid, payload.tier); 
      toonUtil.saveState(state);
      return state;
    case 'REMOTE_CHARACTERS_LOADED': toonUtil.mergeRemoteToons(state, payload); return state;
    default: return state;
  }
}
