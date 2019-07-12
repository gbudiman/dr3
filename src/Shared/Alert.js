import React from 'react';
import classNames from 'classnames';
import {
  IconButton,
  Snackbar,
  SnackbarContent,
  withStyles
} from '@material-ui/core';
import { amber, blue, green, red } from '@material-ui/core/colors';
import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@material-ui/icons';

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: red[600]
  },
  info: {
    backgroundColor: blue[600]
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const Alert = ({
  classes,
  className,
  isOpen,
  message,
  onClose,
  variant,
  ...other
}) => {
  const Icon = variantIcon[variant];
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={isOpen}
      // autoHideDuration={6000}
      onClose={onClose}
    >
      <SnackbarContent
        aria-describedby='client-snackbar'
        className={classNames(classes[variant], className)}
        message={
          <span id='client-snackbar' className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    </Snackbar>
  );
};

export default withStyles(styles)(Alert);
