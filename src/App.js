import React, { useState } from 'react';
import './App.scss';
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiTypography from '@material-ui/core/Typography';
import ToonSter from './components/toonsters/ToonSter';
import SkillContainer from './components/skillgrids/SkillContainer';
import SkillInitializer from './utils/SkillState';
import StrainInitializer from './utils/StrainState';
import SkillCalc from './utils/SkillCalc';
import SkillSummary from './components/summaries/SkillSummary';
import StrainPicker from './components/strains/StrainPicker';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '480px',
      margin: '0px auto',
    },
    builder: {
      width: '100vw',
      margin: '0px auto',
      height: 'calc(100vh - 0px)',
      overflow: 'auto',
      backgroundColor: '#3f3f3f',
    },
    builderItem: {
      margin: '52px auto 0px auto',
      maxWidth: '480px',
      width: '100%',
      padding: '0px 8px',
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
    marginLeft: '8px',
  },
})(MuiTypography);
const AppBar = withStyles({
  root: {
    
  },
})(MuiAppBar);

function App() {
  const classes = useStyles();
  let [skillState, setSkillState] = useState(SkillInitializer());
  let [skillXp, setSkillXp] = useState(SkillCalc(skillState));
  let [skillHidden, setSkillHidden] = useState({});
  let [selectedStrain, setSelectedStrain] = useState(null);

  let handleStrainChange = (newStrain) => {
    console.log(newStrain);
    setSelectedStrain(newStrain);
  }

  let handleSkillGridClick = (sid, tier) => {
    updateSkillState(sid, tier);
    setSkillXp(SkillCalc(skillState));
  }

  let handleSkillXpClick = (category) => {
    if (!(category in skillHidden)) {
      skillHidden[category] = true;
    } else {
      skillHidden[category] = !skillHidden[category];
    }

    setSkillVisibility(category, !skillHidden[category]);
    setSkillHidden(Object.assign({}, skillHidden));
  }

  let updateSkillState = (sid, tier) => {
    let deacquire = skillState[sid].acquired === tier && skillState[sid].innate === false
    skillState[sid].acquired = tier - (deacquire ? 1 : 0);
    setSkillState(Object.assign({}, skillState));
  }

  let setSkillVisibility = (category, state) => {
    for (const key in skillState) {
      let unacquired = skillState[key].acquired === 0;
      if (unacquired && skillState[key].category === category) {
        skillState[key].visible = state;
      }
    }

    setSkillState(Object.assign({}, skillState));
  }

  return (
    <div>
      <AppBar position='fixed'>
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
          <StrainPicker passChange={handleStrainChange} selectedStrain={selectedStrain} strainList={StrainInitializer()} />
          <SkillSummary passClick={handleSkillXpClick} skillXp={skillXp} skillHidden={skillHidden} />
          <SkillContainer passClick={handleSkillGridClick} skillState={skillState} />
        </Grid>
      </Grid>
      <Grid container className={classes.footer} justify='flex-end'>
        Gloria Budiman - DRpaedia 3.0.0
      </Grid>
    </div>
  );
}

export default App;
