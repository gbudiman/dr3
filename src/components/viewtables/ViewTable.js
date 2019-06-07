import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
    },
    paperCut: {
      maxHeight: 240,
      overflow: 'auto',
      marginBottom: theme.spacing(0),
      width: '100%',
    },
    table: {
      minWidth: 240,
      width: '100%',
      maxHeight: '100vh',
    },
    skillCell: {
      padding: '2px 8px 2px 8px',
    },
  }),
);

function createCells(list) {
  return list.map(x => { 
    return { 
      name: x,
    } 
  });
}

function ViewTable(props) {
  const classes = useStyles();
  const rows = createCells(props.data);

  return (
    <Paper className={props.dwarf ? classes.paperCut : classes.paper}>
      <Table className={classes.table}>
        <TableBody>
          {rows.map(row => (
            <TableRow>
              <TableCell className={classes.skillCell}>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ViewTable;
