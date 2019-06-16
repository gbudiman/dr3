import './StatQuad.scss';
import React, { useRef, useState } from 'react';
import StatGrid from './StatGrid';

function StatQuad(props) {
  let stats = ['hp', 'mp', 'rp', 'inf'];
  let [refState, setRefState] = useState({
    hp: 'closed',
    mp: 'closed',
    rp: 'closed',
    inf: 'closed',
  })
  let handleClick = (stat, adjustment) => { props.passClick(stat, adjustment) }
  let handleChange = (stat, value) => { props.passChange(stat, value) }
  let handlePopOpen = (stat, openState) => {
    console.log('parent received ' + stat + ' -> ' + openState);
    if (openState) {
      for (const cRef in refState) {
        refState[cRef] = cRef === stat ? 'opened' : 'closed';
      }
    } else {
      refState[stat] = 'opened';
    }

    setRefState(Object.assign({}, refState))
    console.log(refState);
  }

  let makeGrids = () => {
    return stats.map(statKey => {
      return (
        <StatGrid 
          key={statKey}
          stat={statKey}
          innate={props.innate[statKey] || 0}
          acquired={props.stat[statKey] || 0}
          xp={props.statXp[statKey] || 0}
          statControl={props.statControl[statKey]}
          passClick={handleClick}
          passChange={handleChange}
          passPopOpen={handlePopOpen}
          forcedState={refState[statKey]} />
      );
    })
  }
  return(
    <div className='statquad'>
      {makeGrids()}
    </div>
  )
}

export default StatQuad;
