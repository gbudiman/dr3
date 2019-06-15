import React, { useState, useEffect } from 'react';
import MuiTypography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import ToonSter from '../toonsters/ToonSter';
import './AppBarWrapper.scss';

function AppBarWrapper(props) {
  let handleToonChange = (action, arg, arb) => { props.passChange(action, arg, arb) };
  return(
    <AppBar position='fixed'>
      <div class='container'>
        <div class='title'>DRpaedia3</div>
        <div class='toonster-container'>
          <ToonSter 
            passChange={handleToonChange} 
            currentToon={props.currentToon} 
            toonStorage={props.toonStorage} />
        </div>
      </div>
    </AppBar>
  );
}

export default AppBarWrapper;