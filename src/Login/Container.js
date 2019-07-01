import { connect } from 'react-redux';
import addSession from './actions/createSession';
import Page from './Page';

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { addSession }
)(Page);
