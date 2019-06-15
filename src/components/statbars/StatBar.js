import './StatBar.scss';
import React, { useState, useEffect } from 'react';
import StatElement from './StatElement';

function StatBar(props) {
  let handleClick = (stat, adjustment) => { props.passClick(stat, adjustment) }
  let generateStatElements = (stats) => {
    return stats.map(stat => {
      return(
        <StatElement
          stat={stat}
          innate={props.innate[stat] || 0}
          acquired={props.stat[stat] || 0}
          xp={props.statXp[stat] || 0}
          statControl={props.statControl[stat]}
          passClick={handleClick} />
      );
    })
  }
  let stats = ['hp', 'mp', 'rp', 'inf'];

  return <div className='statbar'>{generateStatElements(stats)}</div>;
}

export default StatBar;
