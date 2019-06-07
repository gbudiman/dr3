import React from 'react';
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiBadge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pushRight: {
      margin: '0 8px 0 auto',
    },
  }),
);

const Badge = withStyles({
  root: {
    textAlign: 'right',
  },
})(MuiBadge);

function BadgeGrid() {
  const classes = useStyles();

  return(
    <Grid item className={classes.pushRight}>
      <Badge badgeContent={32} color='primary'> </Badge>
    </Grid>
  )
}

export default BadgeGrid;
