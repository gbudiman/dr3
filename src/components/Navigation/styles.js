import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export default makeStyles({
  container: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: grey[800],
    zIndex: 1000
  },
  root: {
    color: grey[500],
    '&$selected': {
      color: grey[300]
    }
  },
  label: {
    fontFamily: 'Alegreya, serif'
  },
  selected: {
    color: grey[300]
  }
});
