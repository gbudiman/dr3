import React, { useEffect, useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

function StatGrid(props) {
  let [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  let id = open ? `popper-${props.stat}` : undefined;

  let handleToggle = (event) => { 
    setAnchorEl(anchorEl ? null : event.currentTarget);
    props.passPopOpen(props.stat, anchorEl === null);
  }
  let handleSubtract = () => { props.passClick(props.stat, -1) }
  let handleAdd = () => { props.passClick(props.stat, 1) }
  let handleChange = (event) => {
    props.passChange(props.stat, event.target.value);
  }
  let handleSelectAllText = (event) => {
    event.target.select();
  }
  let handleReductionSubtract = () => { props.passReduction(props.stat, -1) }
  let handleReductionAdd = () => { props.passReduction(props.stat, 1) }
  let getXpCost = () => {
    switch(props.stat) {
      case 'hp':
      case 'mp':
        let divisor = parseInt(props.acquired / 10);
        if (divisor < 5) return 2 * divisor + 1;
        return 10;
      case 'rp':
      case 'inf': return 10;
    }
  }
  let getDeathControl = () => {
    if (props.stat !== 'inf') return '';

    return (
      <div className='death-container'>
        <div className='title'>DEATH</div>
        <div className='death-control'>
          <div className={'stat-control left ' + (props.reductionControl.dec ? '' : 'disabled')} onClick={handleReductionSubtract}>
            <span>&laquo;</span>
          </div>
          <div className={'numeric'}>{props.statReduction}</div>
          <div className={'stat-control right ' + (props.reductionControl.inc ? '' : 'disabled')} onClick={handleReductionAdd}>
            <span>&raquo;</span>
          </div>
        </div>
      </div>
    )
  }
  let getDeathSubtraction = () => {
    if (props.stat !== 'inf') return '';
    return <span> - {props.statReduction}&nbsp;</span>;
  }
  let getTotalStat = () => {
    return <span> = {props.innate + props.acquired - props.statReduction} </span>;
  }

  useEffect(() => {
    if (props.forcedState === 'closed') {
      anchorEl = null;
      setAnchorEl(anchorEl);
    }
  });

  return(
    <React.Fragment>
      <div className='statgrid' onClick={handleToggle}>
        <span>{props.stat.toUpperCase()}</span>
        <span>{props.innate + props.acquired}</span>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} placement='bottom-start' transition className='statgrid-overlay'>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={300}>
            <div className={`grid grid-${props.stat}`}>
              <div className='stat-element'>
                <div className='control-container'>
                  <div className={'stat-control left ' + (props.statControl.dec ? '' : 'disabled')} onClick={handleSubtract}>
                    <span>&laquo;</span>
                  </div>
                  <div className='stat-lead'>
                    <span>{props.innate} + </span>
                    <InputBase
                      className='acq'
                      value={props.acquired}
                      onChange={handleChange}
                      onClick={handleSelectAllText}
                      disabled={props.existance === 'deleted'}
                    />
                    {getDeathSubtraction()}
                    {getTotalStat()}
                  </div>
                  <div className={'stat-control right ' + (props.statControl.inc ? '' : 'disabled')} onClick={handleAdd}>
                    <span>&raquo;</span>
                  </div>
                </div>
                <div className='stat-info'>
                  <div>
                    <span className='focus-point'>
                      {getXpCost()}
                    </span>
                    /pt
                  </div>
                  <div>
                    <span className='focus-point'>
                      {props.xp}
                    </span>
                    XP
                  </div>
                  {getDeathControl()}
                </div>
              </div>
            </div>
          </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
}

export default StatGrid;
