import { connect } from 'react-redux';
import './StatQuad.scss';
import React from 'react';
import StatGrid from './StatGrid';

function StatQuad(props) {
  let stats = ['hp', 'mp', 'rp', 'inf'];
  let placement = {
    hp: 'bottom-start',
    mp: 'bottom',
    rp: 'bottom',
    inf: 'bottom-end',
  }
  //let handleClick = (stat, adjustment) => { props.passClick(stat, adjustment) }
  //let handleChange = (stat, value) => { props.passChange(stat, value) }
  let handlePopOpen = (stat, state) => { props.passPopOpen(stat, state) }
  //let handleReductionChange = (stat, adjustment) => { props.passReductionChange(stat, adjustment) };

  let makeGrids = () => {
    return stats.map(statKey => {
      const reductionKey = statKey[0] + 'r';
      const reduction = () => { 
        return reductionKey in props.stat ? props.stat[reductionKey] : 0 
      }
      return (
        <StatGrid 
          key={statKey}
          stat={statKey}
          innate={props.innate[statKey] || 0}
          acquired={props.stat[statKey] || 0}
          reduction={reduction()}
          xp={props.statXp[statKey] || 0}
          statControl={props.statControl[statKey]}
          reductionControl={props.statControl[statKey[0] + 'r'] || { inc: true, dec: false }}
          passClick={props.handleStatAdjustment}
          passChange={props.handleStatChange}
          passReduction={props.handleReductionAdjustment}
          passPopOpen={handlePopOpen}
          placement={placement[statKey]}
          openState={props.openState[statKey]} />
      );
    })
  }
  return(
    <div className='statquad'>
      {makeGrids()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    stat: state.stat,
    statXp: state.statXp,
    statControl: state.statControl,
    innate: state.innate,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleStatAdjustment: (stat, adjustment) => {
      dispatch({
        type: 'STAT_ADJUSTED',
        payload: {
          stat: stat,
          adjustment: adjustment,
        }
      })
    },
    handleReductionAdjustment: (stat, adjustment) => {
      dispatch({
        type: 'STAT_REDUCTION_ADJUSTED',
        payload: {
          stat: stat,
          adjustment: adjustment,
        }
      })
    },
    handleStatChange: (stat, value) => {
      dispatch({
        type: 'STAT_CHANGED',
        payload: {
          stat: stat,
          value: value,
        }
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatQuad);
//export default StatQuad;
