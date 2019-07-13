import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PeopleIcon from '@material-ui/icons/People';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FeedbackIcon from '@material-ui/icons/Feedback';
import useStyles from './styles';

export default ({ tab, setTab }) => {
  const classes = useStyles();
  return (
    <BottomNavigation
      value={tab}
      onChange={(event, newValue) => {
        setTab(newValue);
      }}
      showLabels
      classes={{ root: classes.root }}
      className={classes.container}
    >
      <BottomNavigationAction
        component={Link}
        to='/characters'
        classes={{
          label: classes.label,
          root: classes.root,
          selected: classes.selected
        }}
        label='Characters'
        icon={<PeopleIcon className={classes.icon} />}
      />
      <BottomNavigationAction
        component={Link}
        to='/skills'
        classes={{
          label: classes.label,
          root: classes.root,
          selected: classes.selected
        }}
        label='Skills'
        icon={<AssessmentIcon className={classes.icon} />}
      />
      <BottomNavigationAction
        component={Link}
        to='/feedback'
        classes={{
          label: classes.label,
          root: classes.root,
          selected: classes.selected
        }}
        label='Feedback'
        icon={<FeedbackIcon className={classes.icon} />}
      />
    </BottomNavigation>
  );
};
