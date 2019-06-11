import './StrainPicker.scss';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontFamily: 'Bellefair, serif',
    width: 'calc(50% - 4px)',
    color: '#ccc',
    borderBottom: 0,
    backgroundColor: '#333',
    borderRadius: '16px',
    padding: '2px 12px 0px 16px',
    margin: '0px 2px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function StrainPicker(props) {
  const classes = useStyles();

  let handleChange = event => {
    props.passChange(event.target.value);
  }

  let strainBuilder = () => {
    let optgroups = Object.keys(props.strainList).map((lineage) => {
      let options = props.strainList[lineage].strains.map((strain) => {
        return <option key={lineage + '-' + strain} value={strain}>{strain}</option>;
      })

      return <optgroup key={lineage} label={lineage[0].toUpperCase() + lineage.slice(1)}>{options}</optgroup>;
    });

    return optgroups;
  }

  return(
    <NativeSelect 
      value={props.selectedStrain || ''}
      className={classes.root} disableUnderline
      onChange={handleChange}
      placeholder='Strain'
    >
      <option value='' disabled> -- Lineage Strain -- </option>
      {strainBuilder()}
    </NativeSelect>
  )
}

export default StrainPicker;
