import React, { useState, useEffect } from 'react';
import Popper from '@material-ui/core/Popper';

function SkillGrid(props) {
  let [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  let id = open ? `popper-${props.category}` : undefined;

  let handleToggle = (event) => { 
    setAnchorEl(anchorEl ? null : event.currentTarget);
    props.passPopOpen(props.category, anchorEl === null);
  }
  useEffect(() => {
    if (props.openState === 'closed') {
      anchorEl = null;
      setAnchorEl(anchorEl);
    }
  });

  return(
    <React.Fragment>
      <div className='skillgrid' onClick={handleToggle}>
        <div>{props.category[0].toUpperCase()}</div>
        <div>{props.skillXp}</div>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={props.placement} transition className={`skillgrid-overlay ${props.category}`}>
        Hi
      </Popper>
    </React.Fragment>
  )
}

export default SkillGrid;
