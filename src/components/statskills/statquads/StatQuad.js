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
  let handleClick = (stat, adjustment) => { props.passClick(stat, adjustment) }
  let handleChange = (stat, value) => { props.passChange(stat, value) }
  let handlePopOpen = (stat, state) => { props.passPopOpen(stat, state) }
  let handleReductionChange = (stat, adjustment) => { props.passReductionChange(stat, adjustment) };

  let makeGrids = () => {
    return stats.map(statKey => {
      return (
        <StatGrid 
          key={statKey}
          stat={statKey}
          statReduction={props.stat[statKey[0] + 'r'] || 0}
          innate={props.innate[statKey] || 0}
          acquired={props.stat[statKey] || 0}
          reduction={props.stat[statKey[0] + 'r'] || 0}
          xp={props.statXp[statKey] || 0}
          statControl={props.statControl[statKey]}
          reductionControl={props.statControl[statKey[0] + 'r'] || { inc: true, dec: false }}
          passClick={handleClick}
          passChange={handleChange}
          passPopOpen={handlePopOpen}
          passReduction={handleReductionChange}
          placement={placement[statKey]}
          openState={props.openState[statKey]} />
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
