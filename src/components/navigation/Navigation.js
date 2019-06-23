import React from 'react';
import './Navigation.scss';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import grey from '@material-ui/core/colors/grey';
import PeopleIcon from '@material-ui/icons/People';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FeedbackIcon from '@material-ui/icons/Feedback';

const useStyles = makeStyles({
  bottomNavigation: {
    width: '100%',
    position: 'sticky',
    bottom: 0,
    backgroundColor: grey[800],
    zIndex: 1000,
  },
  label: {
    color: grey[400],
  },
  icon: {
    color: grey[400]
  }
});

export default ({ tab, setTab }) => {
  const classes = useStyles();
  return (
    <BottomNavigation
      value={tab}
      onChange={(event, newValue) => {
        setTab(newValue);
      }}
      showLabels
      className={classes.bottomNavigation}
    >
      <BottomNavigationAction
        className={classes.label}
        label='Characters'
        icon={<PeopleIcon className={classes.icon} />}
      />
      <BottomNavigationAction
        className={classes.label}
        label='Skills'
        icon={<AssessmentIcon className={classes.icon} />}
      />
      <BottomNavigationAction
        className={classes.label}
        label='Feedback'
        icon={<FeedbackIcon className={classes.icon} />}
      />
    </BottomNavigation>
  );
};
