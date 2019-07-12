import { connect } from 'react-redux';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToonSter from '../toonsters/ToonSter';
import './AppBarWrapper.scss';

const AppBarWrapper = () => {
  return (
    <AppBar position='fixed'>
      <div className='container'>
        <div className='title'>DRpaedia3</div>
        <div className='toonster-container'>
          <ToonSter />
        </div>
      </div>
    </AppBar>
  );
};

export default AppBarWrapper;
