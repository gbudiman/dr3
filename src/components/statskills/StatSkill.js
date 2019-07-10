import React, { useState } from 'react';
import StatQuad from './statquads/StatQuad';
import SkillQuad from './skillquads/SkillQuad';

function StatSkill(props) {
  let [openState, setOpenState] = useState({
    hp: 'closed',
    mp: 'closed',
    rp: 'closed',
    inf: 'closed',
    combat: 'closed',
    civilized: 'closed',
    wasteland: 'closed',
    anomaly: 'closed',
    community: 'closed',
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
      <StatQuad passPopOpen={handlePopOpen} openState={openState} />
      <SkillQuad passPopOpen={handlePopOpen} openState={openState} />
    </React.Fragment>
  )
}
export default StatSkill;
