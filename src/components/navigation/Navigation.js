import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PeopleIcon from '@material-ui/icons/People';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FeedbackIcon from '@material-ui/icons/Feedback';

export default ({ tab, setTab }) => (
  <BottomNavigation
    value={tab}
    onChange={(event, newValue) => {
      setTab(newValue);
    }}
    showLabels
    className='bottom-nav'
  >
    <BottomNavigationAction label='Characters' icon={<PeopleIcon />} />
    <BottomNavigationAction label='Skills' icon={<AssessmentIcon />} />
    <BottomNavigationAction label='Feedback' icon={<FeedbackIcon />} />
  </BottomNavigation>
);
