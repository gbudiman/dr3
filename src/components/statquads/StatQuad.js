import './StatQuad.scss';
import React, { useRef, useState } from 'react';
import StatGrid from './StatGrid';

function StatQuad(props) {
  let stats = ['hp', 'mp', 'rp', 'inf'];
  let placement = {
    hp: 'bottom-start',
    mp: 'bottom',
    rp: 'bottom',
    inf: 'bottom-end',
  }
  let [refState, setRefState] = useState({
    hp: 'closed',
    mp: 'closed',
    rp: 'closed',
    inf: 'closed',
  })
  let handleClick = (stat, adjustment) => { props.passClick(stat, adjustment) }
  let handleChange = (stat, value) => { props.passChange(stat, value) }
  let handlePopOpen = (stat, openState) => {
    if (openState) {
      for (const cRef in refState) {
        refState[cRef] = cRef === stat ? 'opened' : 'closed';
      }
    } else refState[stat] = 'opened';

    setRefState(Object.assign({}, refState))
  }
  let handleDeathChange = (adjustment) => { props.passDeathChange(adjustment) };

  let makeGrids = () => {
    return stats.map(statKey => {
      return (
        <StatGrid 
          key={statKey}
          stat={statKey}
          statReduction={props.stat[statKey[0] + 'r'] || 0}
          innate={props.innate[statKey] || 0}
          acquired={props.stat[statKey] || 0}
          xp={props.statXp[statKey] || 0}
          statControl={props.statControl[statKey]}
          passClick={handleClick}
          passChange={handleChange}
          passPopOpen={handlePopOpen}
          passDeath={handleDeathChange}
          placement={placement[statKey]}
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
