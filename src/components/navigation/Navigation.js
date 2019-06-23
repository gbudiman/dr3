import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import grey from '@material-ui/core/colors/grey';
import PeopleIcon from '@material-ui/icons/People';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FeedbackIcon from '@material-ui/icons/Feedback';

const useStyles = makeStyles({
  container: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: grey[800],
    zIndex: 1000,
  },
  root: {
    color: grey[500],
    '&$selected': {
      color: grey[300]
    }
  },
  label: {
    fontFamily: 'Alegreya, serif'
  },
  selected: {
    color: grey[300]
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
      classes={{ root: classes.root }}
      className={classes.container}
    >
      <BottomNavigationAction
        classes={{
          label: classes.label,
          root: classes.root,
          selected: classes.selected
        }}
        label='Characters'
        icon={<PeopleIcon className={classes.icon} />}
      />
      <BottomNavigationAction
        classes={{
          label: classes.label,
          root: classes.root,
          selected: classes.selected
        }}
        label='Skills'
        icon={<AssessmentIcon className={classes.icon} />}
      />
      <BottomNavigationAction
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
