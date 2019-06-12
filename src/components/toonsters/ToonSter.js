import './ToonSter.scss';
import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import ToonName from './ToonName';
import AddToon from '@material-ui/icons/NoteAdd';
import Divider from '@material-ui/core/Divider';


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
  const [toonList, setToonList] = useState(props.toonList);
  const [selectedToon, setSelectedToon] = useState('default');

  let handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }
  let handleChange = (tid, newValue) => {
    toonList[tid].name = newValue;
    setToonList(Object.assign({}, toonList));
  }
  let handleNewToon = () => {
    props.passChange('new');
  }

  let open = Boolean(anchorEl);
  let id = open ? 'popper' : undefined;
  let toonLister = () => {
    return Object.keys(toonList).map((tid) => {
      let tprop = toonList[tid];
      return(
        <ToonName name={tprop.name} passChange={handleChange} key={tid} tid={tid} selected={tid == selectedToon} />
      )
    })
  }

  return(
    <React.Fragment>
      <Button className={classes.toonButton} onClick={handleClick}>
        &laquo; {selectedToon}
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
