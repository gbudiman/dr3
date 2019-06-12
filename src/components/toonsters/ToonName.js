import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import DeleteForever from '@material-ui/icons/DeleteForever';
import PlayArrow from '@material-ui/icons/PlayArrow';

function ToonName(props) {
  let handleChange = (event) => {
    props.passChange(props.tid, event.target.value);
  }

  return(
    <div className='toon-row'>
      <DeleteForever className='toon-delete' />
      <div className='toon-subrow'>
        <InputBase
          className='toon-entry'
          value={props.name}
          onChange={handleChange}
          disabled={props.deleted}
        />
        <PlayArrow className={props.selected ? 'hidden' : ''} />
      </div>
    </div>
  )
}


export default ToonName;