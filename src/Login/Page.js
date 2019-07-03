import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import useStyles from './styles';

import LoginForm from './Form';

const Page = ({ addSession, theme }) => {
  const classes = useStyles(theme);
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <LoginForm classes={classes} onSubmit={addSession} />
      </Paper>
    </main>
  );
};

export default Page;
