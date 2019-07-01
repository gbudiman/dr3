import React from 'react';
import SkillInfo from './SkillInfo';
import SkillBox from './SkillBox';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import './SkillGrid.scss';

function SkillContainer(props) {
  let handleClick = (sid, tier) => {
    props.passClick(sid, tier);
  };
  let buildBoxes = () => {
    let jsxes = Object.keys(props.skillState).map(key => {
      let value = props.skillState[key];
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
                expanded={props.skillInfoVisible[key]} />
            </Paper>
          </Grow>
        </React.Fragment>
      );
    });

    return jsxes;
  };

  return (
    <div className='skill-container'>
      {buildBoxes()}
      <div className='buffer' />
    </div>
  );
}

export default SkillContainer;
