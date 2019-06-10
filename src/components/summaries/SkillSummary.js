import React from 'react';
import './SkillSummary.scss';

function SkillSummary(props) {
  return(
    <div>
      <div className='summary xp-summary'>
        <div className='summary summary-skill summary-combat'>
          XYZ
        </div>
        <div className='summary summary-skill summary-civilized'>
          XYZ
        </div>
      </div>
      <div className='summary xp-summary'>
        <div className='summary summary-skill summary-wasteland'>
          XYZ
        </div>
        <div className='summary summary-skill summary-anomaly'>
          XYZ
        </div>
      </div>
    </div>
  )
}

export default SkillSummary;
