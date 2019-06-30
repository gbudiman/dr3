import React, { useState, useEffect } from 'react';
import Popper from '@material-ui/core/Popper';
import './SkillQuad.scss';
import Visible from '@material-ui/icons/Visibility';
import Hidden from '@material-ui/icons/VisibilityOff';
import Wasteland from '@material-ui/icons/Pets';
import Anomaly from '@material-ui/icons/AcUnit';
import Civilized from '@material-ui/icons/AccountBalance';
import Combat from '@material-ui/icons/Gavel';
import Community from '@material-ui/icons/People';
import { upcase } from '../../../utils/StringUtil';

function SkillGrid(props) {
  let [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  let id = open ? `popper-${props.category}` : undefined;
  let isVisible = 'toggleState' in props && (props.toggleState === false || props.toggleState === undefined);
  let isFiltered = !isVisible;

  const handlePopperToggle = (event) => { 
    setAnchorEl(anchorEl ? null : event.currentTarget);
    props.passPopOpen(props.category, anchorEl === null);
  }
  const getQuadClassName = () => {
    return [
      'skillgrid',
      props.category,
      isVisible ? '' : 'muted',
      anchorEl === null ? '' : 'overlay-active',
    ].join(' ')
  }
  const getOverlayClassName = () => {
    return [
      'skillgrid-overlay',
      props.category,
      isVisible ? '' : 'muted',
    ].join(' ')
  }
  const drawSkillTable = () => {
    const quant = props.skillQuantity;
    const xp = props.skillXp;

    const quantRow = () => {
      return [1,2,3,4].map(tier => {
        return(
          <td key={tier} className={`quantity numeric t${tier}`}>
            {(tier in quant) ? quant[tier] : '-'}
          </td>
        )
      })
    }

    const xpRow = () => {
      return [1,2,3,4].map(tier => {
        return(
          <td key={tier} className={`xp numeric bold t${tier}`}>
            {(tier in xp) ? xp[tier] : '-'}
          </td>
        )
      })
    }

    const getVisibleClassName = () => { return isVisible ? '' : 'hidden' };
    const getHiddenClassName = () => { return isFiltered ? '' : 'hidden' };
    const handleSkillVisibilityToggle = () => { props.passSkillVisibilityToggle(props.category) };

    return(
      <div className='table-container'>
        <table className='summary-table'>
          <tbody>
            <tr>
              <td>{upcase(props.category)}</td>
              {quantRow()}
            </tr>
            <tr>
              <td>XP</td>
              {xpRow()}
            </tr>
          </tbody>
        </table>
        <Visible className={getVisibleClassName()} onClick={handleSkillVisibilityToggle} />
        <Hidden className={getHiddenClassName()} onClick={handleSkillVisibilityToggle} />
      </div>
    )
  }
  const getCategorySymbol = () => {
    switch(props.category) {
      case 'wasteland': return <Wasteland fontSize='small' />;
      case 'combat': return <Combat fontSize='small' />;
      case 'civilized': return <Civilized fontSize='small' />;
      case 'anomaly': return <Anomaly fontSize='small' />;
      case 'community': return <Community fontSize='small' />;
    }
  }
  useEffect(() => {
    if (props.openState === 'closed') {
      anchorEl = null;
      setAnchorEl(anchorEl);
    }
  });

  return(
    <React.Fragment>
      <div className={getQuadClassName()} onClick={handlePopperToggle}>
        <div className='symbol'>{getCategorySymbol()}</div>
        <div className='bold'>{props.skillTotalXp}</div>
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={props.placement} transition className={getOverlayClassName()}>
        {drawSkillTable()}
      </Popper>
    </React.Fragment>
  )
}

export default SkillGrid;
