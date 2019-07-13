import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import SkillInfo from './SkillInfo';
import SkillBox from './SkillBox';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import './SkillGrid.scss';

export default () => {
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
                expanded={skillInfoVisible[key]}
              />
            </Paper>
          </Grow>
        </React.Fragment>
      );
    });
  };
  const dispatch = useDispatch();
  const {
    skillState,
    skillInfoVisible,
    currentToon,
    toonStorage,
    inverseSkillLookup,
    setSkillState,
  } = useSelector(state => ({
    skillState: state.characters.skillState,
    skillInfoVisible: state.characters.skillInfoVisible,
    currentToon: state.characters.currentToon,
    toonStorage: state.characters.toonStorage,
    inverseSkillLookup: state.characters.inverseSkillLookup,
    setSkillState: state.characters.setSkillState,
  }));
  const handleClick = (sid, tier) => {
    const newState = updateSkillState(sid, tier);
    dispatch({ type: 'CLICK_SKILL_GRID', payload: { sid: sid, newState: newState } });
    dispatch({ type: 'RECALCULATE_XP' });
    dispatch({ type: 'SAVE_STATE' });
    dispatch({
      type: 'SKILLS_CHANGED',
      payload: {
        value: transformToRemoteData(),
        remoteId: toonStorage[currentToon].remoteId
      }
    });
  };

  const updateSkillState = (sid, tier) => {
    const ssid = skillState[sid];

    if (tier > 0 && tier <= 3) {
      const t4acquired = 't4acquired' in ssid && ssid.t4acquired === true;
      const clickedAcquired = tier <= ssid.acquired || (tier === 4 && t4acquired);
      const clickedAtTier = tier === ssid.acquired || (tier === 4 && t4acquired);

      if (clickedAtTier && clickedAcquired) {
        if (tier === 2 && t4acquired) {
          ssid.t4acquired = false;
        } else {
          ssid.acquired = tier - 1;
        }
      } else {
        ssid.acquired = tier;
      }

      if (ssid.acquired < 2) ssid.t4acquired = false;
      if (ssid.acquired === 1 && ssid.innate) ssid.acquired = 0;
    } else if (tier === 4) {
      if (!('t4acquired' in ssid)) {
        ssid.t4acquired = true;
      } else {
        ssid.t4acquired = !ssid.t4acquired;
      }
      
      if (!ssid.t4only && ssid.t4acquired && ssid.acquired <= 2) ssid.acquired = 2;
    } else if (tier === 0) {

    }

    return ssid;
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
    });

    return remoteArray;
  };

  return (
    <div className='skill-container'>
      {buildBoxes()}
      <div className='buffer' />
    </div>
  );
};
