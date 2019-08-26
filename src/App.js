import React, { useEffect } from 'react';
import './App.scss';
import Modal from '@material-ui/core/Modal';
import Navigation from './components/navigation/Navigation';
import StateUtil from './utils/StateUtil';
import ToonUtil from './utils/ToonUtil';
import { switchTab } from './utils/NavigationUtil';
import AppBarWrapper from './components/appbars/AppBarWrapper';

const App = () => {
  let su = StateUtil();
  let toonUtil = ToonUtil();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    toonUtil.handleAppLoad(su);
  });

  useEffect(() => {
    setOpen(true);
  }, [])

  return (
    <div className='app-window'>
      <AppBarWrapper su={su} passChange={toonUtil.handleToonChange} />
      <div className='builder'>{switchTab(su)}</div>
      <Navigation setTab={su.setTab} tab={su.tab} />
      <Modal
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <div className='getout'>
          DRpaedia has merged with Dystopia Rising.
          <hr />
          Please use the official
          &nbsp;
          <a href="https://characters.dystopiarisingnetwork.com">
            Dystopia Rising Evolved app
          </a>
          &nbsp;
          as DRpaedia will no longer receive updates.
          If you haven't received your invitation email, simply
          &nbsp;
          <a href="//evolved.dystopiarisingnetwork.com/reset">
            reset your password
          </a>
          .
          <br />
          <br />
          This app will remain online for the time being for archival purpose.
          <hr />
          Click/tap anywhere to close this box.
        </div>
      </Modal>
    </div>
  );
};

export default App;
