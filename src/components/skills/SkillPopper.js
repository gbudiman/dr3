import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

export default ({ name, description, startingPage, open }) => {
  const classes = useStyles();
  return (
    <Popper open={open} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <Typography variant='h6'>{name}</Typography>
            <Typography className={classes.typography} variant='body1'>
              {description}
              <br />
              Page Number: {startingPage}
            </Typography>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};
