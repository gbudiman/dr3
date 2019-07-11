import { connect } from 'react-redux';
import './ToonSter.scss';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
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
  const handleClick = event => { setAnchorEl(anchorEl ? null : event.currentTarget) }
  let open = Boolean(anchorEl);
  let id = open ? 'popper' : undefined;
  const toonLister = () => {
    return Object.keys(toonStorage).map(tid => {
      let tprop = toonStorage[tid];
      return (
        <ToonName
          name={tprop.name}
          passChange={handleChange}
          passSwitch={handleSwitch}
          passDelete={handleDelete}
          passUndelete={handleUndelete}
          key={tid}
          tid={tid}
          selected={tid === currentToon}
          existance={tprop.state}
        />
      );
    });
  };

  const { authConfig, currentToon, toonStorage } = useSelector(
    state => ({
      authConfig: state.authConfig,
      currentToon: state.currentToon,
      toonStorage: state.toonStorage,
    })
  )
  const dispatch = useDispatch();
  const handleChange = (toonId, newValue) => { 
    dispatch({
      type: 'RENAME_CHARACTER',
      payload: {
        toonId: toonId,
        value: newValue,
        remoteId: toonStorage[toonId].remoteId,
      }
    })
    dispatch({
      type: 'UPDATE_LS_TOON_STORAGE'
    })
  }
  const handleSwitch = (toonId) => {
    dispatch({ 
      type: 'SWITCH_CHARACTER', 
      payload: { toonId: toonId, remoteId: toonStorage[toonId].remoteId },
    })
  }
  const handleDelete = (toonId) => {
    dispatch({ type: 'DELETE_CHARACTER', payload: { toonId: toonId } })
  }
  const handleNewToon = () => { dispatch({ type: 'CREATE_NEW_CHARACTER' })}
  const handleUndelete = (toonId) => {
    dispatch({ type: 'UNDELETE_CHARACTER', payload: { toonId: toonId } })
  }

  return (
    <div className='toonster'>
      <Button onClick={handleClick}>
        {currentToon in toonStorage
          ? toonStorage[currentToon].name
          : 'default'}
        <ExpandLess className={open ? '' : 'expand-hidden'} />
        <ExpandMore className={open ? 'expand-hidden' : ''} />
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement='bottom-end'
        className='toonster'
        transition
      >
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
  );
}

export default ToonSter;
