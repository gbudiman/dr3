import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Paper, Typography } from '@material-ui/core';

import LoginForm from './Form';

const Page = ({ addSession, classes }) => (
  <main className={classes.main}>
    <CssBaseline />
    <Paper className={classes.paper}>
      <Typography component='h1' variant='h5'>
        Sign In
      </Typography>
      <LoginForm classes={classes} onSubmit={addSession} />
    </Paper>
  </main>
);

Page.propTypes = {
  addSession: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default Page;
