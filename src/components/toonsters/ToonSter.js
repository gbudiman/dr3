import { connect } from 'react-redux';
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
  let handleClick = event => { setAnchorEl(anchorEl ? null : event.currentTarget) }
  let open = Boolean(anchorEl);
  let id = open ? 'popper' : undefined;
  let toonLister = () => {
    return Object.keys(props.toonStorage).map(tid => {
      let tprop = props.toonStorage[tid];
      return (
        <ToonName
          name={tprop.name}
          passChange={props.handleChange}
          passSwitch={props.handleSwitch}
          passDelete={props.handleDelete}
          passUndelete={props.handleUndelete}
          key={tid}
          tid={tid}
          selected={tid === props.currentToon}
          existance={tprop.state}
        />
      );
    });
  };

  return (
    <div className='toonster'>
      <Button onClick={handleClick}>
        {props.currentToon in props.toonStorage
          ? props.toonStorage[props.currentToon].name
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
              <NewToon handleNewToon={props.handleNewToon} />
              <Divider className='toon-divider' />
              <DebugReset />
            </div>
          </Slide>
        )}
      </Popper>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentToon: state.currentToon,
    toonStorage: state.toonStorage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    renameCharacter: (tid, newValue, remoteId) => { 
      dispatch({
        type: 'RENAME_CHARACTER',
        payload: {
          toonId: tid,
          value: newValue,
          remoteId: remoteId,
        }
      })
    },
    handleSwitch: (tid, remoteId) => { 
      if (remoteId) {
        dispatch({type: 'SYNC_REMOTE_CHARACTER', payload: { 
          toonId: tid, 
          remoteId: remoteId,
        }});
      } else {
        dispatch({type: 'SWITCH_CHARACTER', payload: { toonId: tid }});
      }
    },
    handleDelete: (tid) => { dispatch({type: 'DELETE_CHARACTER', payload: { toonId: tid }}) },
    handleUnDelete: (tid) => { dispatch({type: 'UNDELETE_CHARACTER', payload: { toonId: tid }}) },
    handleNewToon: () => { dispatch({type: 'CREATE_NEW_CHARACTER'}) },
  }
}

const mergeProps = (stateProps, dispatchProps) => {
  const handleChange = (tid, newValue) => {
    dispatchProps.renameCharacter(
      tid,
      newValue,
      stateProps.toonStorage[tid].remoteId,
    )
  }
  const handleSwitch = (tid) => { dispatchProps.handleSwitch(tid, stateProps.toonStorage[tid].remoteId); }

  return ({
    ...stateProps,
    ...dispatchProps,
    handleChange,
    handleSwitch,
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ToonSter);
