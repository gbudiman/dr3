import './XpBar.scss';
import React, { useState, useEffect, useRef } from 'react';

function XpBar(props) {
  const parentRef = useRef(null);
  const barRef = useRef(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);
  const tier1bar = 90;
  const tier2bar = 180;
  const tier3bar = 200;
  const minCurve = 0;

  useEffect(() => {
    let parentWidth = parentRef.current.getBoundingClientRect().width;

    let shiftedParentWidth = parentWidth - minCurve;
    let xpSum = props.totalXp.stat + props.totalXp.skill;
    let t1width = tier1bar/tier3bar * shiftedParentWidth + minCurve;
    let t2width = tier2bar/tier3bar * shiftedParentWidth + minCurve;
    let barWidth = Math.min(xpSum/tier3bar * shiftedParentWidth, shiftedParentWidth) + minCurve;
    let backgroundWidth = xpSum * 100 / tier3bar;
    let linearGradientStyle = ['#777 ' + backgroundWidth + '%', '#333 ' + backgroundWidth + '%'].join(',')
    t1Ref.current.setAttribute('style', 'width: ' + t1width + 'px');
    t2Ref.current.setAttribute('style', 'width: ' + t2width + 'px');
    
    //background: linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%);
    parentRef.current.setAttribute('style', 'background: linear-gradient(90deg, ' + linearGradientStyle + ')');
  })

  let getTier = () => {
    let xpSum = props.totalXp.stat + props.totalXp.skill;
    if (xpSum < tier1bar) return 1;
    if (xpSum < tier2bar) return 2;
    return 3;
  }

  let getNextTier = () => {
    let xpSum = props.totalXp.stat + props.totalXp.skill;
    if (xpSum < tier1bar) return '/' + tier1bar;
    if (xpSum < tier2bar) return '/' + tier2bar;
    return '';
  }

  return(
    <div className='xpbar' ref={parentRef}>
      <div className='text'>T{getTier()}: {props.totalXp.stat + props.totalXp.skill}{getNextTier()}</div>
      <div className='tier-placeholder tier-placeholder-1' ref={t1Ref} />
      <div className='tier-placeholder tier-placeholder-2' ref={t2Ref} />
    </div>
  )
}

export default XpBar;