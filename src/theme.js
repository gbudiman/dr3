import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#333',
      offDark: '#3f3f3f',
      midtone: '#777',
      main: '#888',
      light: '#ccc'
    },
    anomaly: ['#00858B', '#004A4D', '#00585C', '#00696E', '#007A80'],
    combat: ['#7E3A16', '#682603', '#722F0B', '#7E3A16', '#8F4A26'],
    civilized: ['#56266A', '#3C0952', '#46145B', '#613674', '#6F4A7F'],
    wasteland: ['#293C22', '#1A3111', '#213819', '#374532', '546A4C']
  }
});

export default theme;
