import React, { useState } from 'react';
import './SkillGrid.scss';
import skillInfo from '../../utils/skillInfo';
import { camelize, tierify } from '../../utils/StringUtil';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const SkillInfo = (props) => {
  let [value, setValue] = useState(0);
  const getInfoKeyArrays = () => {
    if (props.t4only) return [tierify(props.name, 4)];
    const tiers = [1,2,3].filter(n => n >= (props.innate ? 2 : 1));
    switch(props.maxTier) {
      case 1: return [camelize(props.name)];
      default: return tiers.map(tier => tierify(props.name, tier));
    }
  }
  const handleChange = (event, newValue) => { setValue(newValue) }
  const handleChangeIndex = index => { setValue(index) }

  const getSkillDescriptions = () => {
    return getInfoKeyArrays().map(skillInfoKey => {
      return(
        <div className='skill-description' key={skillInfoKey}>
          <div className='skill-blob-text'>{skillInfo[skillInfoKey].description}</div>
          <div className='skill-page-start'>Starting page: {skillInfo[skillInfoKey].startingPage}</div>
        </div>
      )
    })
  }

  const getSkillNames = () => {
    let tierCount = getInfoKeyArrays().length;
    let tierTabTitles = [];
    switch(tierCount) {
      case 2: tierTabTitles = ['Proficient', 'Master']; break;
      case 3: tierTabTitles = ['Basic', 'Proficient', 'Master']; break;
    }

    return tierTabTitles.map(tierTitle => {
      return <Tab label={tierTitle} key={tierTitle} />;
    })
  }

  const getTabClassName = () => {
    return [
      'skill-tab-container',
      props.category,
    ].join(' ')
  }

  const getInfoClassName = () => {
    return [
      'skill-info',
      (props.expanded && props.visible) ? '' : 'hidden'
    ].join(' ')
  }

  const buildTabs = () => {
    const renderMultiTierTab = () => {
      if (props.maxTier > 1) {
        return (
          <Tabs
            value={value}
            onChange={handleChange}
            variant='fullWidth'>
            {getSkillNames()}
          </Tabs>
        )
      }

      return <div />;
    }

    return (
      <div className={getTabClassName()}>
        {renderMultiTierTab()}
        <SwipeableViews
          index={value}
          onChangeIndex={handleChangeIndex}>
          {getSkillDescriptions()}
        </SwipeableViews>
      </div>
    )
  }

  return(
    <div className={getInfoClassName()}>
      {buildTabs()}
    </div>
  )
}

export default SkillInfo;
