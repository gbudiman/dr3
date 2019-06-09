import React from 'react';
import './App.scss';
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiTypography from '@material-ui/core/Typography';
import ToonSter from './components/toonsters/ToonSter';
import SkillGrid from './components/skillgrids/SkillGrid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '480px',
      margin: '0px auto',
    },
    builder: {
      width: '100vw',
      margin: '0px auto',
      height: 'calc(100vh - 47px)',
      overflow: 'auto',
      backgroundColor: '#3f3f3f',
    },
    builderItem: {
      margin: '0px auto',
      maxWidth: '480px',
      width: '100%',
    },
    builderHalf: {
      width: '50%',
      height: 'calc(100vh - 44px - 8px)',
      overflow: 'auto',
    },
    fullSizer: {
      textAlign: 'center',
    },
    toonContainer: {
      textAlign: 'right',
    },
    footer: {
      borderTop: '1px solid #aaa',
      fontStyle: 'italic',
      fontSize: '12px',
      color: '#aaa',
      padding: '2px 2px 4px 0px',
      fontFamily: 'Alegreya, serif',
    },
    tableViewDwarf: {
      width: '100%',
    },
  })
);
const TypographyBanner = withStyles({
  root: {
    fontFamily: 'Alegreya, serif',
    fontSize: 22,
    marginTop: '2px',
  },
})(MuiTypography);
const AppBar = withStyles({
  root: {
    
  },
})(MuiAppBar);

function App() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position='static'>
        <Grid container className={classes.root} justify='space-evenly' spacing={1}>
          <Grid item xs={4}>
            <TypographyBanner>DRpaedia3.0</TypographyBanner>
          </Grid>
          <Grid item xs={4} className={classes.fullSizer}>
          </Grid>
          <Grid item xs={4} className={classes.toonContainer}>
            <ToonSter />
          </Grid>
        </Grid>
      </AppBar>
      <Grid container className={classes.builder}>
        <Grid item className={classes.builderItem}>
          <SkillGrid category='combat' tier='0' />
          <SkillGrid category='combat' tier='1' name='Florentine' />
          <SkillGrid category='combat' tier='2' name='II' />
          <SkillGrid category='combat' tier='3' name='III' />
          <SkillGrid category='combat' tier='4' name='Mercenary' />
          <br />
          <SkillGrid category='wasteland' tier='0' />
          <SkillGrid category='wasteland' tier='1' name='Enhanced Movement' />
          <SkillGrid category='wasteland' tier='2' name='II' />
          <SkillGrid category='wasteland' tier='3' name='III' />
          <SkillGrid category='wasteland' tier='4' name='Flanker' />
          <br />
          <SkillGrid category='anomaly' tier='0' />
          <SkillGrid category='anomaly' tier='1' name='Pyrokinetics' />
          <SkillGrid category='anomaly' tier='2' name='II' />
          <SkillGrid category='anomaly' tier='3' name='III' />
          <SkillGrid category='anomaly' tier='4' name='Incinerator' />
          <br />
          <SkillGrid category='civilized' tier='0' />
          <SkillGrid category='civilized' tier='1' name='Financial Influence' />
          <SkillGrid category='civilized' tier='2' name='II' />
          <SkillGrid category='civilized' tier='3' name='III' />
          <SkillGrid category='civilized' tier='4' name='Fiscal Mysticist' />
          <br />
          <SkillGrid category='civilized' tier='0' />
          <SkillGrid category='civilized' tier='1' name='Artisan' unused />
          <SkillGrid category='civilized' tier='2' name='II' unused />
          <SkillGrid category='civilized' tier='3' name='III' unused />
          <SkillGrid category='civilized' tier='4' name='Techno Savant' unused />
        </Grid>
      </Grid>
      <Grid container className={classes.footer} justify='flex-end'>
        Gloria Budiman - DRpaedia 3.0.0
      </Grid>
    </div>
  );
}

export default App;
