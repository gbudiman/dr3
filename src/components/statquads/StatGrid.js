import React, { useState } from 'react';
import Popper from '@material-ui/core/Popper';

function StatGrid(props) {
  let [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  let id = open ? 'popper' : undefined;

  let handleClick = (event) => { setAnchorEl(anchorEl ? null : event.currentTarget) };

  return(
    <React.Fragment>
      <div className='statgrid' onClick={handleClick}>
        {props.stat.toUpperCase()}
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} placement='bottom' transition className='statgrid'>
        Hi
      </Popper>
    </React.Fragment>
  );
}

export default StatGrid;
