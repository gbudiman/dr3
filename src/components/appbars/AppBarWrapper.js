import { connect } from 'react-redux';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToonSter from '../toonsters/ToonSter';
import './AppBarWrapper.scss';

function AppBarWrapper(props) {
  return(
    <AppBar position='fixed'>
      <div className='container'>
        <div className='title'>DRpaedia3</div>
        <div className='toonster-container'>
          <ToonSter />
        </div>
      </div>
    </AppBar>
  );
}

const mapStateToProps = state => {
  return {
    currentToon: state.currentToon,
    toonStorage: state.toonStorage,
  }
}

export default AppBarWrapper;
