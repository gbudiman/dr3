import makeStyles from '@material-ui/styles/makeStyles';

export default makeStyles(theme => ({
  primary: {
    color: theme.palette.primary.light,
    fontFamily: 'Alegreya, serif',
    fontSize: '18px',
    textDecoration: 'underline'
  },
  secondary: {
    color: theme.palette.primary.light,
    fontFamily: 'Alegreya, serif'
  },
  buffer: {
    height: '64px'
  }
}));
