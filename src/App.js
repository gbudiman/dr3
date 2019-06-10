import React, { useState } from 'react';
import './App.scss';
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiTypography from '@material-ui/core/Typography';
import ToonSter from './components/toonsters/ToonSter';
import SkillContainer from './components/skillgrids/SkillContainer';
import SkillInitializer from './utils/SkillState';
import SkillCalc from './utils/SkillCalc';
import SkillSummary from './components/summaries/SkillSummary';

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
  let [skillState, setSkillState] = useState(SkillInitializer());

  let handleClick = (sid, tier) => {
    updateSkillState(sid, tier);
    console.log(skillState);
    let y = SkillCalc(skillState);
    console.log(y);
  }

  let updateSkillState = (sid, tier) => {
    skillState[sid].acquired = tier;
    setSkillState(Object.assign({}, skillState));
  }

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
          <SkillSummary />
          <SkillContainer passClick={handleClick} skillState={skillState} />
        </Grid>
      </Grid>
      <Grid container className={classes.footer} justify='flex-end'>
        Gloria Budiman - DRpaedia 3.0.0
      </Grid>
    </div>
  );
}

export default App;
