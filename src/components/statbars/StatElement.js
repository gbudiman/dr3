import React, { useState, useEffect } from 'react';

function StatElement(props) {
  let calcXp = () => {
    return 0;
  }

  return(
    <div class='stat-element'>
      <div class='stat-lead'>{props.stat}</div>
      <div class='stat-innate'>{props.innate}</div>
      <div class='stat-acquired'>
        <button class='stat-control'>&laquo;</button>
        <div class='value'>{props.acquired}</div>
        <button class='stat-control'>&raquo;</button>
      </div>
      <div class='stat-total'>
        <span class='total'>{props.innate + props.acquired}</span>
        /
        <span class='xp'>{calcXp()}</span>
      </div>
    </div>
  )
}

export default StatElement;