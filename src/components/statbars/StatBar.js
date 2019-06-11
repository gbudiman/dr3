import './StatBar.scss';
import React, { useState, useEffect } from 'react';
import StatElement from './StatElement';

function StatBar(props) {
  return(
    <div class='statbar'>
      <StatElement stat='hp' innate={props.innateHp} acquired={props.statHp} />
      <StatElement stat='mp' innate={props.innateMp} acquired={props.statMp} />
      <StatElement stat='rp' innate={props.innateRp} acquired={props.statRp} />
      <StatElement stat='inf' innate={props.innateInf} acquired={props.statInf} reduction={props.statIr} />
    </div>
  )
}

export default StatBar;