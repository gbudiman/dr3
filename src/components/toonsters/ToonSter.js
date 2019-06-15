import './ToonSter.scss';
import React, { useState, useRef } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ToonName from './ToonName';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NewToon from './NewToon';
import DebugReset from './DebugReset';

function ToonSter(props) {
  let [anchorEl, setAnchorEl] = useState(null);

  let handleClick = (event) => { setAnchorEl(anchorEl ? null : event.currentTarget) };
  let handleChange = (tid, newValue) => { props.passChange('rename', tid, newValue) };
  let handleSwitch = (tid) => { props.passChange('switch', tid) };
  let handleDelete = (tid) => { props.passChange('delete', tid) };
  let handleUndelete = (tid) => { props.passChange('undelete', tid) };
  let handleNewToon = () => { props.passChange('new') };

  let open = Boolean(anchorEl);
  let id = open ? 'popper' : undefined;
  let toonLister = () => {
    return Object.keys(props.toonList).map((tid) => {
      let tprop = props.toonList[tid];
      return(
        <ToonName 
          name={tprop.name} 
          passChange={handleChange} 
          passSwitch={handleSwitch}
          passDelete={handleDelete}
          passUndelete={handleUndelete}
          key={tid} 
          tid={tid} 
          selected={tid == props.currentToon}
          existance={tprop.state}
        />
      )
    })
  }

  return(
    <div className='toonster'>
      <Button onClick={handleClick}>
        {props.currentToon in props.toonList ? props.toonList[props.currentToon].name : 'default'}
        <ExpandLess className={open ? '' : 'expand-hidden'} />
        <ExpandMore className={open ? 'expand-hidden' : ''} />
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} className='toonster-overlay' placement='bottom-end' transition>
        {toonLister()}
        <Divider className='toon-divider' />
        <NewToon handleNewToon={handleNewToon} />
        <Divider className='toon-divider' />
        <DebugReset />
      </Popper>
    </div>
  )
}

export default ToonSter;
