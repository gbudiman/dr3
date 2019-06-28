import React from 'react';

import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from '@material-ui/core';

const RenderField = ({
  autoComplete,
  autoFocus,
  input,
  label,
  name,
  type,
  meta: { asyncValidating, touched, error }
}) => (
  <FormControl error={error && touched} margin='normal' fullWidth {...input}>
    <InputLabel htmlFor={name} {...input}>
      {label}
    </InputLabel>
    <Input
      className={asyncValidating ? 'async-validating' : ''}
      id={name}
      name={name}
      type={type}
      aria-describedby='component-error-text'
      autoComplete={autoComplete && label}
      autoFocus={autoFocus}
    />
    <FormHelperText id='component-error-text'>
      {touched && error}
    </FormHelperText>
  </FormControl>
);

export default RenderField;
