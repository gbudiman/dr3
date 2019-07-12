import { connect } from 'react-redux';
import createSession from './actions/createSession';
import Page from './Page';

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { createSession }
)(Page);
