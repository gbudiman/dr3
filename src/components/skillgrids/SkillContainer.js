import React from 'react';
import SkillInfo from './SkillInfo';
import SkillBox from './SkillBox';
import Grow from '@material-ui/core/Grow';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import './SkillGrid.scss';

function SkillContainer(props) {
  const handleClick = (sid, tier) => { props.passClick(sid, tier) }
  const buildBoxes = () => {
    return Object.keys(props.skillState).map(key => {
      const value = props.skillState[key];
      return (
        <React.Fragment key={key}>
          <SkillBox
            key={'box_' + key}
            category={value.category}
            t1={key}
            t4={value.t4}
            innate={value.innate}
            maxTier={value.maxTier}
            acquired={value.acquired}
            t4acquired={value.t4acquired}
            t4only={value.t4only}
            visible={value.visible}
            passClick={handleClick}
            skillInfo={props.skillInfo}
            infoExpanded={props.skillInfoVisible[key]}
          />
          <Grow in={props.skillInfoVisible[key]} timeout={250}>
            <Paper elevation={0} style={{ transformOrigin: '0 0 0' }}>
              <SkillInfo
                key={'info_' + key}
                name={key}
                innate={value.innate}
                maxTier={value.maxTier}
                category={value.category}
                visible={value.visible}
                t4only={value.t4only}
                expanded={props.skillInfoVisible[key]} />
            </Paper>
          </Grow>
        </React.Fragment>
      );
    });
  };

  return (
    <div className='skill-container'>
      {buildBoxes()}
      <div className='buffer' />
    </div>
  );
}

export default SkillContainer;
