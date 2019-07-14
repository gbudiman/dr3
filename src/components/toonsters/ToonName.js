import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import DeleteForever from '@material-ui/icons/DeleteForever';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Undo from '@material-ui/icons/Undo';
import Synchronized from '@material-ui/icons/CloudDone';

function ToonName(props) {
  const handleChange = (event) => props.passChange(props.tid, event.target.value);
  const handleSwitch = () => props.passSwitch(props.tid);
  const handleDelete = () => props.passDelete(props.tid);
  const handleUndelete = () => props.passUndelete(props.tid);
  const handleSelectAllText = (event) => event.target.select();
  const syncStatus = () => {
    const isRemote = props.remoteId;
    const className = props.remoteId ? '' : 'hidden';
    if (isRemote) {
      return <Synchronized className={className} />;
    } else {
      return(
        <React.Fragment>
          <DeleteForever className={'toon-delete ' + ((props.existance === 'deleted') ? 'hidden' : '')} onClick={handleDelete} />
          <Undo 
            className={'toon-undelete ' + ((props.existance === 'enabled') ? 'hidden' : '')} 
            onClick={handleUndelete} 
          />
        </React.Fragment>
      )
    }
  }

  return(
    <div className='toon-row'>
      { syncStatus() }
      <div className='toon-subrow'>
        <InputBase
          className={'toon-entry ' + (props.selected ? 'highlighted' : '')}
          value={props.name}
          onChange={handleChange}
          onClick={handleSelectAllText}
          disabled={props.existance === 'deleted'}
        />
        <PlayArrow 
          className={props.selected ? 'hidden' : ''} 
          onClick={handleSwitch}
        />
      </div>
    </div>
  )
}

export default ToonName;
