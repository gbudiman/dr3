import React from 'react';
import SkillGrid from './SkillGrid';
import { humanify } from '../../utils/StringUtil';

function SkillBox(props) {
  const isAcquired = (tier) => { 
    if (tier === 4 && 't4acquired' in props) return props.t4acquired;
    return (tier === 1 && props.innate === true) || props.acquired >= tier;
  };
  const handleClick = (sid, tier) => { props.passClick(props.t1, tier) };
  const getName = (tier) => {
    switch(tier) {
      case 0: return null;
      case 1: return humanify(props.t1);
      case 2: return 'II';
      case 3: return 'III';
      case 4: return props.t4;
    }
  }

  const buildGrids = () => {
    const tiers = props.t4only ? [0, 4] : [0, 1, 2, 3, 4];

    return tiers.map((tier) => {
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
          infoExpanded={props.infoExpanded}
          passClick={handleClick} />
      )
    })
  }

  return(
    <React.Fragment>
      <div>{buildGrids()}</div>
    </React.Fragment>
  )
}

export default SkillBox;
