import React, { useState, useEffect } from 'react';

function StatElement(props) {
  let handleSubtract = () => { props.passClick(props.stat, -1) }
  let handleAdd = () => { props.passClick(props.stat, 1) }

  return(
    <div className='stat-element'>
      <div className='stat-lead'>{props.stat}</div>
      <div className='stat-innate'>{props.innate}</div>
      <div className='stat-acquired'>
        <button className='stat-control' onClick={handleSubtract} disabled={!props.statControl.dec}>&laquo;</button>
        <div className='value'>{props.acquired}</div>
        <button className='stat-control' onClick={handleAdd} disabled={!props.statControl.inc}>&raquo;</button>
      </div>
      <div className='stat-total'>
        <span className='total'>{props.innate + props.acquired}</span>
        /
        <span className='xp'>{props.xp}</span>
      </div>
    </div>
  )
}

export default StatElement;
