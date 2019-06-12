import React, { useState, useEffect } from 'react';

function StatElement(props) {
  let handleSubtract = () => { props.passClick(props.stat, -1) }
  let handleAdd = () => { props.passClick(props.stat, 1) }

  return(
    <div className='stat-element'>
      <div className={'stat-control left ' + (props.statControl.dec ? '' : 'disabled')} onClick={handleSubtract}>
        <span>&laquo;</span>
      </div>
      <div className='stat-lead'>
        {props.stat}: {props.innate} + {props.acquired} 
      </div>
      <div className='stat-total'>
        <span className='amount'>{props.innate + props.acquired}</span>
        /
        {props.xp}
      </div>
      <div className={'stat-control right ' + (props.statControl.inc ? '' : 'disabled')} onClick={handleAdd}>
        <span>&raquo;</span>
      </div>
    </div>
  )
}

export default StatElement;
