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
  let getXpCost = () => {
    let divisor = parseInt(props.acquired / 10);
    switch(props.stat) {
      case 'hp':
      case 'mp':
        switch(divisor) {
          case 5: return 10;
          default: return 2 * divisor + 1;
        }
      case 'rp':
      case 'inf': return 10;
    }
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
                    <span> = {props.innate + props.acquired} </span>
                    <span> &nbsp;(/{getXpCost()})</span>
                  </div>
                  <div className={'stat-control right ' + (props.statControl.inc ? '' : 'disabled')} onClick={handleAdd}>
                    <span>&raquo;</span>
                  </div>
                </div>
                <div>
                  {props.innate} + {props.acquired} = {props.innate + props.acquired}
                  /
                  {props.xp}
                </div>
                <div>
                  <div>
                    {props.xp}
                  </div>
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
