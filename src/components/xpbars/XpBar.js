import './XpBar.scss';
import React, { useState, useEffect, useRef } from 'react';

function XpBar(props) {
  const parentRef = useRef(null);
  const barRef = useRef(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);
  const tier1bar = 90;
  const tier2bar = 180;
  const tier3bar = 224;
  const minCurve = 32;

  useEffect(() => {
    let parentWidth = parentRef.current.getBoundingClientRect().width;

    let shiftedParentWidth = parentWidth - minCurve;
    let xpSum = props.totalXp.stat + props.totalXp.skill;
    let t1width = tier1bar/tier3bar * shiftedParentWidth + minCurve;
    let t2width = tier2bar/tier3bar * shiftedParentWidth + minCurve;
    let barWidth = Math.min(xpSum/tier3bar * shiftedParentWidth, shiftedParentWidth) + minCurve;
    t1Ref.current.setAttribute('style', 'width: ' + t1width + 'px');
    t2Ref.current.setAttribute('style', 'width: ' + t2width + 'px');
    
    let widthStyle = 'width: ' + barWidth + 'px';
    let barStyle = widthStyle;
    // if (barWidth > parentWidth - minCurve) {
    //   let delta = -1 * ((parentWidth - minCurve) - barWidth);
    //   let adjustedDelta = {
    //     1: 4,
    //     2: 6,
    //     3: 8,
    //     4: 10,
    //     5: 12,
    //     6: 14,
    //   };
    // if (xpSum )
    //   let borderTRStyle = 'border-top-right-radius: ' + (adjustedDelta[parseInt(delta)] || 16) + 'px';
    //   let borderBRStyle = 'border-bottom-right-radius: ' + (adjustedDelta[parseInt(delta)] || 16) + 'px';
    //   barStyle = [widthStyle, borderTRStyle, borderBRStyle].join(';');
    // }
    
    barRef.current.setAttribute('style', barStyle);
  })

  let getTier = () => {
    let xpSum = props.totalXp.stat + props.totalXp.skill;
    if (xpSum <= tier1bar) return 1;
    if (xpSum <= tier2bar) return 2;
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
      <div className='xptier' ref={barRef}/>
      <div className='tier-placeholder tier-placeholder-1' ref={t1Ref} />
      <div className='tier-placeholder tier-placeholder-2' ref={t2Ref} />
    </div>
  )
}

export default XpBar;