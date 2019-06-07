import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toonButton: {
      maxWidth: '320px',
      margin: '0 0 0 auto',
      textTransform: 'none',
    },
  }),
);

function ToonSter(props) {
  const classes = useStyles();

  return(
    <Button className={classes.toonButton}>
      &laquo; {props.toonName || 'default'}
    </Button>
  )
}

export default ToonSter;
