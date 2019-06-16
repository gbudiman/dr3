import './StatQuad.scss';
import React from 'react';
import StatGrid from './StatGrid';

function StatQuad() {
  return(
    <div className='statquad'>
      <StatGrid stat='hp' />
      <StatGrid stat='mp' />
      <StatGrid stat='rp' />
      <StatGrid stat='inf' />
    </div>
  )
}

export default StatQuad;
