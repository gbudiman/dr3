import { connect, useSelector, useDispatch  } from 'react-redux';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToonSter from '../toonsters/ToonSter';
import './AppBarWrapper.scss';
import history from '../../history';

const AppBarWrapper = () => {
  const dispatch = useDispatch();
  const login = dispatch => {
    history.push('/login');
  }

  return (
    <AppBar position='fixed'>
      <div className='container'>
        <div className='title' onClick={login}>DRpaedia3</div>
        <div className='toonster-container'>
          <ToonSter />
        </div>
      </div>
    </AppBar>
  );
};


export default AppBarWrapper;
