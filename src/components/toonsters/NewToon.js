import React from 'react';
import AddToon from '@material-ui/icons/NoteAdd';

function NewToon(props) {
  return(
    <div className='toon-row new-toon' onClick={props.handleNewToon}>
      <div className='toon-subrow'>
        Add Character
        <AddToon />
      </div>
    </div>
  );
}

export default NewToon;