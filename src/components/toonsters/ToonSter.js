import './ToonSter.scss';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
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
    return Object.keys(props.toonStorage).map((tid) => {
      let tprop = props.toonStorage[tid];
      return(
        <ToonName 
          name={tprop.name} 
          passChange={handleChange} 
          passSwitch={handleSwitch}
          passDelete={handleDelete}
          passUndelete={handleUndelete}
          key={tid} 
          tid={tid} 
          selected={tid === props.currentToon}
          existance={tprop.state}
        />
      )
    })
  }

  return(
    <div className='toonster'>
      <Button onClick={handleClick}>
        {props.currentToon in props.toonStorage ? props.toonStorage[props.currentToon].name : 'default'}
        <ExpandLess className={open ? '' : 'expand-hidden'} />
        <ExpandMore className={open ? 'expand-hidden' : ''} />
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={props.placement} className='toonster' transition>
        {({ TransitionProps }) => (
          <Slide {...TransitionProps} timeout={300}>
            <div className='overlay'>
              {toonLister()}
              <Divider className='toon-divider' />
              <NewToon handleNewToon={handleNewToon} />
              <Divider className='toon-divider' />
              <DebugReset />
            </div>
          </Slide>
        )}
      </Popper>
    </div>
  )
}

export default ToonSter;
