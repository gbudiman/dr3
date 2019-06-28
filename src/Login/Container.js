import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

import addSession from './actions/createSession';
import Page from './Page';
import styles from './styles';

const mapStateToProps = state => ({
  user: state.user
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { addSession }
  )
)(Page);
