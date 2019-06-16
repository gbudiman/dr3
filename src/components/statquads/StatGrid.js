import React from 'react';

function StatGrid(props) {
  return(
    <div className='statgrid'>
      {props.stat.toUpperCase()}
    </div>
  );
}

export default StatGrid;
