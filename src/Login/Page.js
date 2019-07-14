import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import LoginForm from './Form';
import './styles.scss';

const Page = ({ createSession }) => {
  return (
    <div className='login-container'>
      <Paper className='paper'>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <LoginForm onSubmit={createSession} />
      </Paper>
    </div>
  );
};

export default Page;
