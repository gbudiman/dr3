import './StatBar.scss';
import React, { useState, useEffect } from 'react';
import StatElement from './StatElement';

function StatBar(props) {
  let handleClick = (stat, adjustment) => { props.passClick(stat, adjustment) }
  return(
    <div className='statbar'>
      <StatElement stat='hp' innate={props.innate.hp || 0} acquired={props.stat.hp || 0} xp={props.statXp.hp || 0} passClick={handleClick} statControl={props.statControl.hp} />
      <StatElement stat='mp' innate={props.innate.mp || 0} acquired={props.stat.mp || 0} xp={props.statXp.mp || 0} passClick={handleClick} statControl={props.statControl.mp} />
      <StatElement stat='rp' innate={props.innate.rp || 0} acquired={props.stat.rp || 0} xp={props.statXp.rp || 0} passClick={handleClick} statControl={props.statControl.rp} />
      <StatElement stat='inf' innate={props.innate.inf || 0} acquired={props.stat.inf || 0} xp={props.statXp.inf || 0} passClick={handleClick} statControl={props.statControl.inf} />
    </div>
  )
}

export default StatBar;
