import React from 'react';
import SkillGrid from './SkillGrid';

function SkillBox(props) {
  let isAcquired = (tier) => { 
    if (tier === 4 && 't4acquired' in props) return props.t4acquired;
    return (tier === 1 && props.innate === true) || props.acquired >= tier;
  };
  let sid = () => { return props.t1.replace(/\s+/, '_').toLowerCase() }
  let humanify = () => { 
    return props.t1.split('_').map((x) => { 
      return x[0].toUpperCase() + x.slice(1) 
    }).join(' ')
  }
  let handleClick = (sid, tier) => { props.passClick(sid, tier) };
  let getName = (tier) => {
    switch(tier) {
      case 0: return null;
      case 1: return humanify();
      case 2: return 'II';
      case 3: return 'III';
      case 4: return props.t4;
    }
  }
  let buildGrids = () => {
    let jsxes = [...Array(props.maxTier + 1).keys()].map((tier) => {
      return(
        <SkillGrid 
          key={props.t1 + '_' + tier}
          category={props.category} 
          sid={props.t1}
          tier={tier}
          name={getName(tier)} 
          acquired={isAcquired(tier)}
          visible={props.visible}
          innate={props.innate}
          passClick={handleClick} />
      )
    })

    return jsxes;
  }

  return(
    <div>
      {buildGrids()}
    </div>
  )
}

export default SkillBox;
