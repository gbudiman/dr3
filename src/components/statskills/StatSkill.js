import React, { useState } from 'react';
import StatQuad from './statquads/StatQuad';
import SkillQuad from './skillquads/SkillQuad';

function StatSkill(props) {
  let handleStatClick = (stat, adjustment) => { props.passStatClick(stat, adjustment) }
  let handleStatChange = (stat, value) => { props.passStatChange(stat, value) }
  let handleStatReductionChange = (stat, adjustment) => { props.passStatReductionChange(stat, adjustment) }
  let handleSkillClick = (action, category, tier) => { props.passSkillClick(action, category, tier) }
  let handleSkillVisibilityToggle = (category) => { props.passSkillVisibilityToggle(category) }
  let [openState, setOpenState] = useState({
    hp: 'closed',
    mp: 'closed',
    rp: 'closed',
    inf: 'closed',
    combat: 'closed',
    civilized: 'closed',
    wasteland: 'closed',
    anomaly: 'closed',
  })

  let handlePopOpen = (key, state) => {
    if (state) {
      for (const cRef in openState) {
        openState[cRef] = cRef === key ? 'opened' : 'closed';
      }
    } else openState[key] = 'opened';

    setOpenState(Object.assign({}, openState));
  }

  return(
    <React.Fragment>
      <StatQuad 
        passClick={handleStatClick} 
        passChange={handleStatChange}
        passReductionChange={handleStatReductionChange}
        passPopOpen={handlePopOpen}
        stat={props.stat}
        statXp={props.statXp}
        statControl={props.statControl}
        innate={props.innate}
        openState={openState} />
      <SkillQuad 
        passClick={handleSkillClick} 
        passPopOpen={handlePopOpen}
        passSkillVisibilityToggle={handleSkillVisibilityToggle}
        skillXp={props.skillXp} 
        skillHidden={props.skillHidden}
        openState={openState} />
    </React.Fragment>
  )
}

export default StatSkill;
