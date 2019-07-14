import { connect, useSelector, useDispatch  } from 'react-redux';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToonSter from '../toonsters/ToonSter';
import './AppBarWrapper.scss';
import history from '../../history';
import SyncDisabled from '@material-ui/icons/SyncDisabled';

const AppBarWrapper = () => {
  const dispatch = useDispatch();
  const login = () => history.push('/login');
  const logout = () => dispatch({type: 'LOGOUT'});
  const { authConfig } = useSelector(
    state => ({
      authConfig: state.characters.authConfig,
    })
  )
  const getExpiration = () => {
    if (authConfig && 'expireBy' in authConfig) {
      return authConfig.expireBy;
    }

    return false;
  }
  const hasValidToken = () => {
    const expiration = getExpiration();
    if (!expiration) return false;
    if (Date.now() > expiration) return false;
    return true;
  }
  const titleBar = () => {
    const getLoggedInUsername = () => {
      if ('username' in authConfig) {
        return 'DR3: ' + authConfig.username;
      } else {
        return 'Fetching...';
      }
    }

    ///*<SyncDisabled onClick={logout} />*/
    if (hasValidToken()) {
      return(
        <div className='title'>
          { getLoggedInUsername() }
          <div className='logout'>
            <div onClick={logout}>Logout</div>
          </div>
        </div>
      )
    } else {
      return <div className='title login' onClick={login}>DR3 &raquo; Login</div>
    }
  }

  return (
    <AppBar position='fixed'>
      <div className='container'>
        {titleBar()}
        <div className='toonster-container'>
          <ToonSter />
        </div>
      </div>
    </AppBar>
  );
};


export default AppBarWrapper;
