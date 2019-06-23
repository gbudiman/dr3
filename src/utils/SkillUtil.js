import { calcXp, calcTotalXp } from './XpUtil';
import SkillCalc from './SkillCalc';

const SkillUtil = () => {
  let handleSkillGridClick = (su, sid, tier) => {
    updateSkillState(su, sid, tier);
    su.skillXp = SkillCalc(su.skillState);
    su.setSkillXp(su.skillXp);
    calcTotalXp(su);
  };

  let handleSkillVisibilityToggle = (su, category) => {
    if (!(category in su.skillHidden)) {
      su.skillHidden[category] = true;
    } else {
      su.skillHidden[category] = !su.skillHidden[category];
    }

    setSkillVisibility(su, category, !su.skillHidden[category]);
    su.setSkillHidden(Object.assign({}, su.skillHidden));
  };

  let updateSkillState = (su, sid, tier) => {
    if (tier > 0 && tier <= 3) {
      let t4acquired =
        't4acquired' in su.skillState[sid] && su.skillState[sid].t4acquired === true;
      let clickedAcquired =
        tier <= su.skillState[sid].acquired || (tier === 4 && t4acquired);
      let clickedAtTier =
        tier === su.skillState[sid].acquired || (tier === 4 && t4acquired);

      if (clickedAtTier && clickedAcquired) {
        if (tier === 2 && t4acquired) {
          su.skillState[sid].t4acquired = false;
        } else {
          su.skillState[sid].acquired = tier - 1;
        }
      } else {
        su.skillState[sid].acquired = tier;
      }

      if (su.skillState[sid].acquired < 2) su.skillState[sid].t4acquired = false;
      if (su.skillState[sid].acquired === 1 && su.skillState[sid].innate)
        su.skillState[sid].acquired = 0;
      su.setSkillState(Object.assign({}, su.skillState));
    } else if (tier === 4) {
      if (!('t4acquired' in su.skillState[sid])) {
        su.skillState[sid].t4acquired = true;
      } else {
        su.skillState[sid].t4acquired = !su.skillState[sid].t4acquired;
      }

      if (su.skillState[sid].t4acquired && su.skillState[sid].acquired <= 2) {
        su.skillState[sid].acquired = 2;
      }
      su.setSkillState(Object.assign({}, su.skillState));
    }
  };

  let setSkillVisibility = (su, category, state) => {
    for (const key in su.skillState) {
      let unacquired = su.skillState[key].acquired === 0;
      if (unacquired && su.skillState[key].category === category) {
        su.skillState[key].visible = state;
      }
    }

    su.setSkillState(Object.assign({}, su.skillState));
  };

  return {
    handleSkillGridClick: handleSkillGridClick,
    handleSkillVisibilityToggle: handleSkillVisibilityToggle,
  }
}

export default SkillUtil;
