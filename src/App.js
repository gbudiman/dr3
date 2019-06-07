import React from 'react';
import './App.css';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ViewTable from './components/viewtables/ViewTable';
import WrappedViewTable from './components/viewtables/WrappedViewTable';
import ToonSter from './components/toonsters/ToonSter';

const masterList = 'a0c7e06766279591cc9abe3933be0e8a'.split('');
const stripList = '51351361'.split('');
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '640px',
      margin: '0px auto',
    },
    builder: {
      width: '100vw',
      margin: 0,
      marginTop: theme.spacing(1),
    },
    gridItem: {
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
      fontSize: '11px',
      color: '#aaa',
      padding: '2px 2px 4px 0px',
    },
    tableViewDwarf: {
      width: '100%',
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <div>
      <AppBar position='static'>
        <Grid container className={classes.root} justify='space-evenly' spacing={1}>
          <Grid item xs={4}>
            <Typography>DRpaedia</Typography>
          </Grid>
          <Grid item xs={4} className={classes.fullSizer}>
            <Typography>&raquo;</Typography>
          </Grid>
          <Grid item xs={4} className={classes.toonContainer}>
            <ToonSter />
          </Grid>
        </Grid>
      </AppBar>
      <Grid container className={classes.root}>
        <Grid container className={classes.builder} justify='space-evenly' spacing={1}>
          <Grid item className={classes.builderHalf}>
            <ViewTable data={masterList}/>
          </Grid>
          <Grid item className={classes.builderHalf}>
            <Grid container justify='flex-start' spacing={1}>
              <Grid item className={classes.tableViewDwarf}>
                <WrappedViewTable data={stripList} title='Acquired'/>
              </Grid>
              <Grid item className={classes.tableViewDwarf}>
                <WrappedViewTable data={stripList} title='Planned' defaultExpanded/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.footer} justify='flex-end'>
        Gloria Budiman - DRpaedia 3.0.0
      </Grid>
    </div>
  );
}

export default App;
