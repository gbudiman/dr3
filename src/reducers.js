import ToonUtil from './utils/ToonUtil';
import SkillUtil from './utils/SkillUtil';

const toonUtil = ToonUtil();
const skillUtil = SkillUtil();

export default function auth(state, action) {
  // console.log(state);
  // console.log(action);
  const payload = action.payload;
  switch(action.type) {
    case 'APP_LOAD': toonUtil.handleAppLoad(state); break;
    case 'CREATE_NEW_CHARACTER': toonUtil.handleToonChange(state, 'new'); break;
    case 'SWITCH_CHARACTER': toonUtil.handleToonChange(state, 'switch', payload.toonId); break;
    case 'RENAME_CHARACTER': toonUtil.handleToonChange(state, 'rename', payload.toonId, payload.value); break;
    case 'DELETE_CHARACTER': toonUtil.handleToonChange(state, 'delete', payload.toonId); break;
    case 'UNDELETE_CHARACTER': toonUtil.handleToonChange(state, 'undelete', payload.toonId); break;
    case 'CLICKED_SKILL_GRID': 
      skillUtil.handleSkillGridClick(state, payload.sid, payload.tier); 
      toonUtil.saveState(state);
      break;
    default: return state;
  }
}