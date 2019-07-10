import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import SkillInfo from './SkillInfo';
import SkillBox from './SkillBox';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import './SkillGrid.scss';

function SkillContainer(props) {  
  const buildBoxes = () => {
    return Object.keys(skillState).map(key => {
      const value = skillState[key];
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
            infoExpanded={skillInfoVisible[key]}
          />
          <Grow in={skillInfoVisible[key]} timeout={250}>
            <Paper elevation={0} style={{ transformOrigin: '0 0 0' }}>
              <SkillInfo
                key={'info_' + key}
                name={key}
                innate={value.innate}
                maxTier={value.maxTier}
                category={value.category}
                visible={value.visible}
                t4only={value.t4only}
                expanded={skillInfoVisible[key]} />
            </Paper>
          </Grow>
        </React.Fragment>
      );
    });
  };
  const dispatch = useDispatch();
  const { skillState, skillInfoVisible, currentToon, toonStorage, inverseSkillLookup } = useSelector(
    state => ({
      skillState: state.skillState,
      skillInfoVisible: state.skillInfoVisible,
      currentToon: state.currentToon,
      toonStorage: state.toonStorage,
      inverseSkillLookup: state.inverseSkillLookup,
    })
  )
  const handleClick = (sid, tier) => {
    dispatch({ type: 'CLICKED_SKILL_GRID', payload: { sid: sid, tier: tier } } )
    dispatch({ type: 'SKILLS_CHANGED', 
      payload: {
        value: transformToRemoteData(),
        remoteId: toonStorage[currentToon].remoteId,
      }
    })
  }
  const transformToRemoteData = () => {
    const remoteArray = [];

    console.log(inverseSkillLookup);
    Object.entries(skillState).forEach(([key, value]) => {
      if (value.acquired > 0) {
        for (let i = 1; i <= value.acquired; i++) {
          remoteArray.push(inverseSkillLookup[i][key]);
        }
      }
    })

    return remoteArray;
  }

  return (
    <div className='skill-container'>
      {buildBoxes()}
      <div className='buffer' />
    </div>
  );
}

export default SkillContainer;
