import React, { useState, useEffect } from 'react';
import Popper from '@material-ui/core/Popper';
import './SkillQuad.scss';
import Visible from '@material-ui/icons/Visibility';
import Hidden from '@material-ui/icons/VisibilityOff';

function SkillGrid(props) {
  let [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  let id = open ? `popper-${props.category}` : undefined;

  let handleToggle = (event) => { 
    setAnchorEl(anchorEl ? null : event.currentTarget);
    props.passPopOpen(props.category, anchorEl === null);
  }
  let getClassName = () => {
    return [
      'skillgrid',
      anchorEl === null ? '' : 'overlay-active',
    ].join(' ')
  }
  let drawSkillTable = () => {
    let quant = props.skillQuantity;
    let xp = props.skillXp;

    let quantRow = () => {
      return [1,2,3,4].map(tier => {
        return(
          <td className={`quantity numeric t${tier}`}>
            {(tier in quant) ? quant[tier] : '-'}
          </td>
        )
      })
    }

    let xpRow = () => {
      return [1,2,3,4].map(tier => {
        return(
          <td className={`xp numeric t${tier}`}>
            {(tier in xp) ? xp[tier] : '-'}
          </td>
        )
      })
    }

    let isFiltered = 'toggleState' in props && props.toggleState === true;
    let isVisible = 'toggleState' in props && props.toggleState === false;
    let getVisibleClassName = () => { return isVisible ? '' : 'hidden' };
    let getHiddenClassName = () => { return isFiltered ? '' : 'hidden' };
    let handleSkillToggle = () => { props.passSkillToggle(props.category) };

    return(
      <div className='table-container'>
        <table className='summary-table'>
          <tr>
            <td>Count</td>
            {quantRow()}
          </tr>
          <tr>
            <td>XP</td>
            {xpRow()}
          </tr>
        </table>
        <Visible className={getVisibleClassName()} onClick={handleSkillToggle} />
        <Hidden className={getHiddenClassName()} onClick={handleSkillToggle} />
      </div>
    )
  }
  useEffect(() => {
    if (props.openState === 'closed') {
      anchorEl = null;
      setAnchorEl(anchorEl);
    }
  });

  return(
    <React.Fragment>
      <div className={getClassName()} onClick={handleToggle}>
        <div>{props.category[0].toUpperCase()}</div>
        <div>{props.skillTotalXp}</div>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={props.placement} transition className={`skillgrid-overlay ${props.category}`}>
        {drawSkillTable()}
      </Popper>
    </React.Fragment>
  )
}

export default SkillGrid;
