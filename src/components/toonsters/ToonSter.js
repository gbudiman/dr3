import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toonButton: {
      maxWidth: '320px',
      margin: '-8px 0 -12px auto',
      textTransform: 'none',
      color: '#ccc',
      borderRadius: 0,
      padding: '8px 16px 8px 8px',
      fontFamily: 'Alegreya, serif',
      fontSize: 22,
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
