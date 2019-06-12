import React, { useState, useEffect } from 'react';
import './App.scss';
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiTypography from '@material-ui/core/Typography';
import ToonSter from './components/toonsters/ToonSter';
import SkillContainer from './components/skillgrids/SkillContainer';
import SkillInitializer from './utils/SkillState';
import StrainInitializer from './utils/StrainState';
import StrainDictionary from './utils/StrainDictionary';
import SkillCalc from './utils/SkillCalc';
import SkillSummary from './components/summaries/SkillSummary';
import StrainPicker from './components/strains/StrainPicker';
import StatBar from './components/statbars/StatBar';
import XpBar from './components/xpbars/XpBar';
import uuid from 'uuid';

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
      color: '#888',
      padding: '2px 4px 4px 0px',
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
  let [stat, setStat] = useState({});
  let [statXp, setStatXp] = useState({});
  let [statControl, setStatControl] = useState({ 
    hp: { inc: true, dec: false },
    mp: { inc: true, dec: false },
    rp: { inc: true, dec: false },
    inf: { inc: true, dec: false },
  });
  let [innate, setInnate] = useState({});
  let [totalXp, setTotalXp] = useState({stat: 0, skill: 0});
  let [localStorageHasBeenLoaded, setLocalStorageHasBeenLoaded] = useState(false);
  let [toonStorage, setToonStorage] = useState({});
  let [currentToon, setCurrenToon] = useState({});
  let [toonData, setToonData] = useState({})
  let statLimit = { rp: 6, inf: 8 };
  let okToSaveState = true;

  useEffect(() => {
    if (localStorageHasBeenLoaded === false) {
      loadState();
      setLocalStorageHasBeenLoaded(true);
    } else {

      saveState();  
    }
  })

  let saveState = () => {
    //debugger
    toonData[currentToon] = {
      skill_state: skillState,
      skill_xp: skillXp,
      skill_hidden: skillHidden,
      selected_strain: selectedStrain,
      stat: stat,
      stat_xp: statXp,
      stat_control: statControl,
      innate: innate,
      total_xp: totalXp
    }
    localStorage.setItem('toonData', JSON.stringify(toonData));
  }

  let loadState = () => {
    let firstEnabledToon;
    toonStorage = JSON.parse(localStorage.getItem('toonStorage'));
    if (toonStorage != null) {
      firstEnabledToon = Object.keys(toonStorage).find((x) => { return toonStorage[x].state === 'enabled'} )

      for (const tid in toonStorage) {
        if (toonStorage[tid].state == 'deleted') {

        }
      }

      let deferredDeletes = Object.keys(toonStorage).filter(tid => toonStorage[tid].state == 'deleted');
      deferredDeletes.map(tid => {
        delete toonStorage[tid];
        delete toonData[tid];
      })

      setToonStorage(Object.assign({}, toonStorage));
      updateToonStorage();
    }

    console.log('fet: ' + firstEnabledToon);
    //debugger
    if (toonStorage == null) {
      toonStorage = {};
      currentToon = uuid.v1();
      toonStorage[currentToon] = { name: 'new', state: 'enabled' };
      setCurrenToon(currentToon);
      setToonStorage(Object.assign({}, toonStorage));
      updateToonStorage();

    } else if (firstEnabledToon == null) {
      currentToon = uuid.v1();
      toonStorage[currentToon] = { name: 'new', state: 'enabled' };
      setCurrenToon(currentToon);
      setToonStorage(Object.assign({}, toonStorage));
      updateToonStorage();

    } else {
      currentToon = firstEnabledToon;
      toonData = JSON.parse(localStorage.getItem('toonData'));
      setCurrenToon(currentToon);
      setToonStorage(Object.assign({}, toonStorage));

      const j = toonData[firstEnabledToon];
      setSkillState(j.skill_state);
      setSkillXp(j.skill_xp);
      setSkillHidden(j.skill_hidden);
      setSelectedStrain(j.selected_strain);
      setStat(j.stat);
      setStatXp(j.stat_xp);
      setStatControl(j.stat_control);
      setInnate(j.innate);
      setTotalXp(j.total_xp);

    }
  }

  let handleStrainChange = (newStrain) => {
    let lineage = StrainDictionary()[newStrain];
    let innateStat = StrainInitializer()[lineage].innate;
    
    setSelectedStrain(newStrain);
    setInnate({
      hp: innateStat.hp,
      mp: innateStat.mp,
      rp: innateStat.rp,
      inf: innateStat.inf,
    })

    for (const lstat in statLimit) {
      let statSum = (innateStat[lstat] || 0) + (stat[lstat] || 0);
      let limit = statLimit[lstat];

      if (statSum > limit) {
        let diff = statSum - limit;
        stat[lstat] -= diff;
        setStat(Object.assign({}, stat));
        calcXp(lstat, stat[lstat]);
        updateStatControl(lstat, 'inc', false);
        updateStatControl(lstat, 'dec', true);
      } else {
        updateStatControl(lstat, 'inc', true);
      }
    }
  }

  let handleStatClick = (changedStat, adjustment) => {
    let currentStat = changedStat in stat ? stat[changedStat] : 0;
    let newStat = currentStat + adjustment;
    let controlHasBeenAdjusted = false;
    
    if ((innate[changedStat] || 0) + newStat >= 0 && newStat >= 0) {
      if (changedStat in statLimit) {
        if ((innate[changedStat] || 0) + (stat[changedStat] || 0) + adjustment > statLimit[changedStat]) {
          return;
        } else {
          if ((innate[changedStat] || 0) + (stat[changedStat] || 0) + adjustment == statLimit[changedStat]) {
            updateStatControl(changedStat, 'inc', false);
            updateStatControl(changedStat, 'dec', true);
            controlHasBeenAdjusted = true;
          } else {
            updateStatControl(changedStat, 'inc', true);
            updateStatControl(changedStat, 'dec', true);
          }
        }
      }

      stat[changedStat] = newStat;
      setStat(Object.assign({}, stat));
      calcXp(changedStat, newStat);

      if (!controlHasBeenAdjusted) {
        if (newStat == 0) {
          updateStatControl(changedStat, 'dec', false);
        } else {
          updateStatControl(changedStat, 'dec', true);
          updateStatControl(changedStat, 'inc', true);
        }
      }
    }
  }

  let updateStatControl = (stat, direction, state) => {
    statControl[stat][direction] = state;
    setStatControl(Object.assign({}, statControl));
  }

  let calcXp = (changedStat, acquired) => {
    let linearCalc = (x) => { return 10 * x };
    let deciCalc = (x) => {
      let influx = (y) => { 
        if (y > 0) return (y - 10 < 0) ? y : 10;
        return 0;
      }

      let totalCost = influx(x) * 1; x -= 10;
      totalCost += influx(x) * 3; x -= 10;
      totalCost += influx(x) * 5; x -= 10;
      totalCost += influx(x) * 7; x -= 10;
      totalCost += influx(x) * 9; x -= 10;
      if (x > 0) totalCost += x * 10;

      return totalCost;
    }

    switch(changedStat) {
      case 'hp':
      case 'mp': statXp[changedStat] = deciCalc(acquired); break;
      case 'rp':
      case 'inf': statXp[changedStat] = linearCalc(acquired); break;
    }

    setStatXp(Object.assign({}, statXp));
    calcTotalXp();
  }

  let calcTotalXp = () => {
    totalXp = {
      stat: Object.values(statXp).reduce((a, b) => { return a + b }, 0),
      skill: skillXp.total,
    }
    setTotalXp(Object.assign({}, totalXp));
  }

  let handleSkillGridClick = (sid, tier) => {
    updateSkillState(sid, tier);
    skillXp = SkillCalc(skillState)
    setSkillXp(skillXp);
    calcTotalXp();
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
    if (tier > 0) {
      let deacquire = skillState[sid].acquired === tier && (tier > 1 || skillState[sid].innate === false)
      skillState[sid].acquired = tier - (deacquire ? 1 : 0);
      setSkillState(Object.assign({}, skillState));
    }
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

  let handleToonChange = (action, arg) => {
    if (action == 'new') {
      let skillState = SkillInitializer();
      let newName = uuid.v1();
      toonStorage[newName] = { name: 'new', state: 'enabled' };
      currentToon = newName;
      setCurrenToon(currentToon);
      setToonStorage(Object.assign({}, toonStorage));
      updateToonStorage();

      setSkillState(skillState);
      setSkillXp(SkillCalc(skillState));
      setSkillHidden({});
      setSelectedStrain(null);
      setStat({});
      setStatXp({});
      setStatControl({
        hp: { inc: true, dec: false },
        mp: { inc: true, dec: false },
        rp: { inc: true, dec: false },
        inf: { inc: true, dec: false },
      })
      setInnate({});
      setTotalXp({stat: 0, skill: 0});
    } else if (action == 'rename') {
      toonStorage[currentToon].name = arg;
      setToonStorage(Object.assign({}, toonStorage));
      updateToonStorage();
    } else if (action == 'switch') {
      currentToon = arg;
      setCurrenToon(currentToon);

      //console.log(currentToon);
      const j = toonData[currentToon];
      setSkillState(j.skill_state);
      setSkillXp(j.skill_xp);
      setSkillHidden(j.skill_hidden);
      setSelectedStrain(j.selected_strain);
      setStat(j.stat);
      setStatXp(j.stat_xp);
      setStatControl(j.stat_control);
      setInnate(j.innate);
      setTotalXp(j.total_xp);
    } else if (action == 'delete') {
      toonStorage[arg].state = 'deleted';
      setToonStorage(Object.assign({}, toonStorage));
      updateToonStorage();
    } else if (action == 'undelete') {
      toonStorage[arg].state = 'enabled';
      setToonStorage(Object.assign({}, toonStorage));
      updateToonStorage();
    }
  }

  let updateToonStorage = () => {
    localStorage.setItem('toonStorage', JSON.stringify(toonStorage));
  }

  return (
    <div>
      <AppBar position='fixed'>
        <Grid container className={classes.root} justify='space-evenly' spacing={1}>
          <Grid item xs={4}>
            <TypographyBanner>DRpaedia3</TypographyBanner>
          </Grid>
          <Grid item xs={8} className={classes.toonContainer}>
            <ToonSter passChange={handleToonChange} currentToon={currentToon} toonList={toonStorage} />
          </Grid>
        </Grid>
      </AppBar>
      <Grid container className={classes.builder}>
        <Grid item className={classes.builderItem}>
          <Grid container>
            <StrainPicker passChange={handleStrainChange} selectedStrain={selectedStrain} strainList={StrainInitializer()} />
            <XpBar totalXp={totalXp} />
          </Grid>
          <StatBar 
            passClick={handleStatClick} 
            stat={stat}
            statXp={statXp}
            statControl={statControl}
            innate={innate} />
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
