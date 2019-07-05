import ToonUtil from './utils/ToonUtil';
import SkillUtil from './utils/SkillUtil';
import { toonUpdateSaga } from './sagas/auth';

const toonUtil = ToonUtil();
const skillUtil = SkillUtil();
let su = null;

export default function auth(state, action) {
  const payload = action.payload;

  switch(action.type) {
    case 'INITIALIZE_STATE_UTIL': su = payload.su; break;
    case 'APP_LOAD': toonUtil.handleAppLoad(su); break;
    case 'CREATE_NEW_CHARACTER': toonUtil.handleToonChange(su, 'new'); break;
    case 'SWITCH_CHARACTER': toonUtil.handleToonChange(su, 'switch', payload.toonId); break;
    case 'RENAME_CHARACTER': toonUtil.handleToonChange(su, 'rename', payload.toonId, payload.value); break;
    case 'DELETE_CHARACTER': toonUtil.handleToonChange(su, 'delete', payload.toonId); break;
    case 'UNDELETE_CHARACTER': toonUtil.handleToonChange(su, 'undelete', payload.toonId); break;
    case 'CLICKED_SKILL_GRID': 
      skillUtil.handleSkillGridClick(su, payload.sid, payload.tier); 
      toonUtil.saveState(su);
      break;
    case 'REMOTE_CHARACTERS_LOADED':
      toonUtil.mergeRemoteToons(su, payload); break;
      break;
    default: return state;
  }
}