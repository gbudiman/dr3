import './ToonSter.scss';
import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ToonName from './ToonName';
import AddToon from '@material-ui/icons/NoteAdd';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toonButton: {
      maxWidth: '320px',
      margin: '-12px 0 -12px auto',
      textTransform: 'none',
      color: '#ccc',
      borderRadius: 0,
      padding: '12px 16px 0px 8px',
      fontFamily: 'Alegreya, serif',
      fontSize: 22,
    },
  }),
);

function ToonSter(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  let handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }
  let handleChange = (tid, newValue) => {
    props.passChange('rename', newValue);
  }
  let handleSwitch = (tid) => {
    props.passChange('switch', tid);
  }
  let handleDelete = (tid) => {
    props.passChange('delete', tid);
  }
  let handleUndelete = (tid) => {
    props.passChange('undelete', tid);
  }
  let handleNewToon = () => {
    props.passChange('new');
  }

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
          selected={tid == props.selectedToon}
          existance={tprop.state}
        />
      )
    })
  }

  return(
    <React.Fragment>
      <Button className={classes.toonButton} onClick={handleClick}>
        {props.currentToon in props.toonList ? props.toonList[props.currentToon].name : 'default'}
        <ExpandLess className={open ? '' : 'expand-hidden'} />
        <ExpandMore className={open ? 'expand-hidden' : ''} />
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} className='toonster-overlay' placement='bottom-end' transition>
        {toonLister()}
        <Divider className='toon-divider' />
        <div className='toon-row'>
          <div />
          <div className='toon-subrow'>
            New
            <AddToon onClick={handleNewToon} />
          </div>
        </div>
      </Popper>
    </React.Fragment>
  )
}

export default ToonSter;
