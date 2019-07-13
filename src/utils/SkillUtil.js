import { calcTotalXp } from './XpUtil';
import { localize } from './StringUtil';
import SkillCalc from './SkillCalc';

const SkillUtil = () => {
  const handleSkillGridClick = (su, sid, tier) => {
    if (tier === 0) {
      updateSkillInfoVisibility(su, sid);
    } else {
      updateSkillState(su, sid, tier);
      su.skillXp = SkillCalc(su.skillState);
      su.setSkillXp(su.skillXp);
      calcTotalXp(su);
    }
  };

  const handleSkillVisibilityToggle = (su, category) => {
    if (!(category in su.skillHidden)) {
      su.skillHidden[category] = true;
    } else {
      su.skillHidden[category] = !su.skillHidden[category];
    }

    setSkillVisibility(su, category, !su.skillHidden[category]);
    su.setSkillHidden(Object.assign({}, su.skillHidden));
  };

  const updateSkillInfoVisibility = (su, sid) => {
    if (sid in su.skillInfoVisible) {
      su.skillInfoVisible[sid] = !su.skillInfoVisible[sid];
    } else {
      su.skillInfoVisible[sid] = true;
    }

    su.setSkillInfoVisible(Object.assign({}, su.skillInfoVisible));
  }

  // ported
  const updateSkillState = (su, sid, tier) => {
    if (tier > 0 && tier <= 3) {
      const t4acquired =
        't4acquired' in su.skillState[sid] && su.skillState[sid].t4acquired === true;
      const clickedAcquired =
        tier <= su.skillState[sid].acquired || (tier === 4 && t4acquired);
      const clickedAtTier =
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
      
      if (!su.skillState[sid].t4only && su.skillState[sid].t4acquired && su.skillState[sid].acquired <= 2) {
        su.skillState[sid].acquired = 2;
      }
      su.setSkillState(Object.assign({}, su.skillState));
    }
  };

  const setSkillVisibility = (su, category, state) => {
    for (const key in su.skillState) {
      const unacquired = su.skillState[key].acquired === 0 && !su.skillState[key].t4acquired;
      if (unacquired && su.skillState[key].category === category) {
        su.skillState[key].visible = state;
      }
    }

    su.setSkillState(Object.assign({}, su.skillState));
  };

  const buildLookupTable = (su, data) => {
    su.inverseSkillLookup = { 1: {}, 2: {}, 3: {} };
    data.map(skill => {
      su.skillLookup[skill.id] = { name: localize(skill.name), tier: parseInt(skill.tier) }
      su.inverseSkillLookup[skill.tier][localize(skill.name)] = skill.id;
    })
  }

  return {
    handleSkillGridClick: handleSkillGridClick,
    handleSkillVisibilityToggle: handleSkillVisibilityToggle,
    buildLookupTable: buildLookupTable,
  }
}

export default SkillUtil;
