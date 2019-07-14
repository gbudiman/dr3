import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import './StatQuad.scss';
import React from 'react';
import StatGrid from './StatGrid';

const StatQuad = (props) => {
  const stats = ['hp', 'mp', 'rp', 'inf'];
  const placement = {
    hp: 'bottom-start',
    mp: 'bottom',
    rp: 'bottom',
    inf: 'bottom-end',
  }
  const inverseAttributes = {
    hp: 'body',
    mp: 'mind',
    rp: 'resolve',
    inf: 'infection',
    ir: 'death',
  }

  const handlePopOpen = (stat, state) => { props.passPopOpen(stat, state) }
  const makeGrids = () => {
    return stats.map(statKey => {
      const reductionKey = statKey[0] + 'r';
      const reduction = () => { 
        return reductionKey in stat ? stat[reductionKey] : 0 
      }
      return (
        <StatGrid 
          key={statKey}
          stat={statKey}
          innate={innate[statKey] || 0}
          acquired={stat[statKey] || 0}
          reduction={reduction()}
          xp={statXp[statKey] || 0}
          statControl={statControl[statKey]}
          reductionControl={statControl[statKey[0] + 'r'] || { inc: true, dec: false }}
          passClick={handleStatAdjustment}
          passChange={handleStatChange}
          passReduction={handleReductionAdjustment}
          passPopOpen={handlePopOpen}
          placement={placement[statKey]}
          openState={props.openState[statKey]} />
      );
    })
  }
  const dispatch = useDispatch();
  const { stat, statXp, statControl, innate, currentToon, toonStorage } = useSelector(
    state => ({
      stat: state.characters.stat,
      statXp: state.characters.statXp,
      statControl: state.characters.statControl,
      innate: state.characters.innate,
      currentToon: state.characters.currentToon,
      toonStorage: state.characters.toonStorage,
    })
  )
  const handleStatAdjustment = (changedStat, adjustment) => {
    const initialValue = stat[changedStat];
    dispatch({
      type: 'STAT_ADJUSTED',
      payload: {
        stat: changedStat,
        adjustment: adjustment,
      }
    })
    if (initialValue != stat[changedStat]) {
      dispatch({
        type: 'STAT_VALID_CHANGE',
        payload: {
          stat: inverseAttributes[changedStat],
          value: stat[changedStat],
          remoteId: toonStorage[currentToon].remoteId,
        }
      })
    }
    dispatch({type: 'SAVE_STATE'});
  }
  const handleReductionAdjustment = (changedStat, adjustment) => {
    dispatch({
      type: 'STAT_REDUCTION_ADJUSTED',
      payload: {
        stat: changedStat,
        adjustment: adjustment,
      }
    })
    dispatch({type: 'SAVE_STATE'});
  }
  const handleStatChange = (changedStat, value) => {
    dispatch({
      type: 'STAT_CHANGED',
      payload: {
        stat: changedStat,
        value: value,
      }
    })
    dispatch({
      type: 'STAT_VALID_CHANGE',
      payload: {
        stat: inverseAttributes[changedStat],
        value: stat[changedStat],
        remoteId: toonStorage[currentToon].remoteId,
      }
    })
    dispatch({type: 'SAVE_STATE'});
  }

  return(
    <div className='statquad'>
      {makeGrids()}
    </div>
  )
}

export default React.memo(StatQuad);
