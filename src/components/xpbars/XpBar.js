import './XpBar.scss';
import React, { useState, useEffect } from 'react';

function XpBar(props) {
  return(
    <div className='xpbar'>
      <div>Stat: {props.totalXp.stat}</div>
      <div>Skill: {props.totalXp.skill}</div>
      <div>Total: {props.totalXp.stat + props.totalXp.skill}</div>
    </div>
  )
}

export default XpBar;