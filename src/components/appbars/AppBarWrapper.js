import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToonSter from '../toonsters/ToonSter';
import './AppBarWrapper.scss';

function AppBarWrapper(props) {
  let handleToonChange = (action, arg, arb) => { props.passChange(action, arg, arb) };
  return(
    <AppBar position='fixed'>
      <div className='container'>
        <div className='title'>DRpaedia3</div>
        <div className='toonster-container'>
          <ToonSter 
            passChange={handleToonChange} 
            currentToon={props.su.currentToon} 
            toonStorage={props.su.toonStorage} />
        </div>
      </div>
    </AppBar>
  );
}

export default AppBarWrapper;
