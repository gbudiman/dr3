import React, { useState, useRef } from 'react';

function DebugReset(props) {
  let confirmLeft = useRef(null);
  let confirmRight = useRef(null);
  let [debugState, setDebugState] = useState('idle');

  let handleClearClick = () => {
    if (confirmLeft.current.checked && confirmRight.current.checked) {
      localStorage.clear();
      sessionStorage.clear();
      debugState = 'resetting';
      setDebugState(debugState);
      window.location.reload();
    }
  }

  let getText = () => {
    switch(debugState) {
      case 'idle': return(
        <React.Fragment>
          <div>Debug: Clear Local Data</div>
          <div className='small'>(Check both boxes to confirm)</div>
        </React.Fragment>);
      case 'resetting': return <div>Resetting page...</div>;
    }
  }

  return(
    <div className='toon-row debug'>
      <div><input type='checkbox' ref={confirmLeft} onClick={handleClearClick} /></div>
      <div className='instructions'>{getText()}</div>
      <div><input type='checkbox' ref={confirmRight} onClick={handleClearClick} /></div>
    </div>
  );
}

export default DebugReset;