import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import DeleteForever from '@material-ui/icons/DeleteForever';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Undo from '@material-ui/icons/Undo';

function ToonName(props) {
  let handleChange = (event) => {
    props.passChange(props.tid, event.target.value);
  }

  let handleSwitch = () => {
    props.passSwitch(props.tid);
  }

  let handleDelete = () => {
    props.passDelete(props.tid);
  }

  let handleUndelete = () => {
    props.passUndelete(props.tid);
  }

  let handleSelectAllText = (event) => {
    event.target.select();
  }

  return(
    <div className='toon-row'>
      <DeleteForever className={'toon-delete ' + ((props.existance === 'deleted') ? 'hidden' : '')} onClick={handleDelete} />
      <Undo className={'toon-undelete ' + ((props.existance === 'enabled') ? 'hidden' : '')} onClick={handleUndelete} />
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
