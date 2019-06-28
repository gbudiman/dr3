import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from '@material-ui/core';

import RenderField from '../Shared/RenderField';

const Form = ({ classes, handleSubmit }) => (
  <form className={classes.form} onSubmit={handleSubmit}>
    <Field component={RenderField} name='email' label='Email' type='text' />
    <Field
      component={RenderField}
      name='password'
      label='Password'
      type='password'
    />
    <Button
      className={classes.submit}
      color='primary'
      fullWidth
      onClick={handleSubmit}
      type='submit'
      variant='contained'
    >
      Login
    </Button>
  </form>
);

export default reduxForm({
  form: 'login'
})(Form);
