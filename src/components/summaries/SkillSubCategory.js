import React from 'react';

function SkillSubCategory(props) {
  let handleClick = () => { props.passClick(props.category) }
  let getClassName = () => {
    let base = 'summary summary-skill summary-' + props.category
    let activeFilter = props.toggleState ? 'summary-filter-inactive' : '';

    return [base, activeFilter].join(' ');
  }
  let displayXp = () => {
    let grid = props.skillXp.grid.grid[props.category];
    let xp = props.skillXp.grid.xp[props.category];
    let ehs = [];
    let xhs = [];

    for (let tier = 1; tier <= 4; tier++) {
      ehs.push((tier in grid) ? grid[tier] : 0);
      xhs.push((tier in xp) ? xp[tier] : 0);
    }

    return(
      <React.Fragment>
        <div>{ehs.join('/')}</div>
        <div>{xhs.join('/')}</div>
        <div>{props.skillXp.sum[props.category]}</div>
      </React.Fragment>
    )
  }

  return(
    <div 
      className={getClassName()}
      onClick={handleClick}
    >
      {displayXp()}
    </div>
  )
}

export default SkillSubCategory;
