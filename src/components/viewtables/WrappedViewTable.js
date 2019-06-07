import React from 'react';
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import MuiBadge from '@material-ui/core/Badge';
import BadgeGrid from '../badges/BadgeGrid';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ViewTable from './ViewTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    detailNoPad: {
      padding: 0,
    },
    title: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    flatFold: {
      marginTop: 0,
      marginBottom: 0,
    }
  }),
);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    //borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    marginTop: 0,
    minHeight: 12,
    padding: '0px 8px 0px 12px',
    margin: '8px 0px 8px 0px',
    '&$expanded': {
      minHeight: 12,
    },
  },
  content: {
    paddingRight: '8px',
    margin: '8px 0',
    '&$expanded': {
      margin: '8px 0',
      padding: '0px 8px 0px 0px',
    },
  },
  expandIcon: {
    padding: 0,
    margin: 0,
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanel = withStyles({
  root: {
    //marginTop: 8,
    //marginBottom: 8,
    '&$expanded': {
      //margin: 0,
      //marginBottom: 8,
      //marginTop: 8,
    },
  },
  expanded: {},
})(MuiExpansionPanel);

function WrappedViewTable(props) {
  const classes = useStyles();

  return(
    <ExpansionPanel defaultExpanded={props.defaultExpanded}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Grid container spacing={1} className={classes.flatFold}>
          <Grid item>
            <Typography className={classes.title}>{props.title}</Typography>
          </Grid>
          <BadgeGrid badgeContent={32} color='primary'/>
        </Grid>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.detailNoPad}>
        <ViewTable data={props.data} dwarf/>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default WrappedViewTable;
