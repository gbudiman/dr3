import { connect, useSelector, useDispatch } from 'react-redux';
import './XpBar.scss';
import React, { useRef, useEffect } from 'react';
import WarningIcon from '@material-ui/icons/Warning';

const XpBar = () => {
  const parentRef = useRef(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);
  const tier1bar = 90;
  const tier2bar = 180;
  const tier3bar = 200;
  const minCurve = 0;
  const { totalXp, skillState, maxXp } = useSelector(
    state => ({
      totalXp: state.characters.totalXp,
      skillState: state.characters.skillState,
      maxXp: state.characters.maxXp,
    })
  )

  useEffect(() => {
    let parentWidth = parentRef.current.getBoundingClientRect().width;

    let shiftedParentWidth = parentWidth - minCurve;
    let xpSum = totalXp.stat + totalXp.skill;
    let t1width = tier1bar/tier3bar * shiftedParentWidth + minCurve;
    let t2width = tier2bar/tier3bar * shiftedParentWidth + minCurve;
    let backgroundWidth = xpSum * 100 / tier3bar;
    let limitExceeded = maxXp != null && xpSum > maxXp;
    let acquiredClass = limitExceeded ? '#FCA' : '#777';
    let linearGradientStyle = [acquiredClass + ' ' + backgroundWidth + '%', '#333 ' + backgroundWidth + '%'].join(',')
    t1Ref.current.setAttribute('style', 'width: ' + t1width + 'px');
    t2Ref.current.setAttribute('style', 'width: ' + t2width + 'px');
    
    parentRef.current.setAttribute('style', 'background: linear-gradient(90deg, ' + linearGradientStyle + ')');
  })

  const getTier = () => {
    const xpSum = totalXp.stat + totalXp.skill;
    if (xpSum < tier1bar) return 1;
    if (xpSum < tier2bar) return 2;
    return 3;
  }

  const getNextTier = () => {
    if (maxXp === null) {
      // const xpSum = totalXp.stat + totalXp.skill;
      // if (xpSum < tier1bar) return '/' + tier1bar;
      // if (xpSum < tier2bar) return '/' + tier2bar;
      return '';
    }

    return '/' + maxXp;
  }

  const getWarningClassName = (tier) => {
    const maxTier = Object.values(skillState).reduce((a, x) => {return Math.max(x.acquired, a)}, 0);
    const hast4 = Object.values(skillState).reduce((a, b) => {return a || b}, false);
    const xpSum = totalXp.stat + totalXp.skill;

    if ((tier === 1 && xpSum < tier1bar && maxTier > 1 && hast4) ||
        (tier === 2 && xpSum < tier2bar && maxTier > 2)) {
      return 'warned';
    }
  }

  const getXpLimitClassName = () => {
    const classes = ['text'];
    if (maxXp != null) {
      if (totalXp.stat + totalXp.skill > maxXp) {
        classes.push('error');
      }
    }

    return classes.join(' ');
  }

  return(
    <div className='xpbar' ref={parentRef}>
      <div className={getXpLimitClassName()}>
        T{getTier()}: {totalXp.stat + totalXp.skill}{getNextTier()} XP
      </div>
      <div className='tier-placeholder tier-placeholder-1' ref={t1Ref}>
        <WarningIcon className={getWarningClassName(1)} />
      </div>
      <div className='tier-placeholder tier-placeholder-2' ref={t2Ref}>
        <WarningIcon className={getWarningClassName(2)} />
      </div>
    </div>
  )
}

export default XpBar;
