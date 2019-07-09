import { connect } from 'react-redux';
import './StrainPicker.scss';
import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import { upcase } from '../../utils/StringUtil';

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
    margin: '0px 2px 2px 2px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StrainPicker = () => {
  const classes = useStyles();
  const statCompressor = (stat) => { return [stat.hp, stat.mp, stat.rp, stat.inf].join('/') }
  const strainBuilder = () => {
    const optgroups = Object.keys(lineages).map((lineage) => {
      const lineageData = lineages[lineage];
      const innateStat = lineageData.innate;
      const strainList = lineageData.strains;

      let options = strainList.map((strain) => {
        return <option key={`${lineage}-${strain}`} value={strain}>{strain}</option>;
      })

      return(
        <optgroup 
          key={lineage} 
          label={`${upcase(lineage)} - ${statCompressor(innateStat)}`}
        >
          {options}
        </optgroup>
      );
    });

    return optgroups;
  }
  const { lineages, selectedStrain, inverseStrainLookup, currentToon, toonStorage } = useSelector(
    state => ({
      lineages: state.lineageStrain.lineages,
      selectedStrain: state.selectedStrain,
      currentToon: state.currentToon,
      toonStorage: state.toonStorage,
      inverseStrainLookup: state.inverseStrainLookup,
    })
  )
  const dispatch = useDispatch();
  const handleStrainChange = (event) => {
    const newStrain = event.target.value
    dispatch({
      type: 'STRAIN_CHANGED',
      payload: {
        strain: newStrain,
        strainId: inverseStrainLookup[newStrain],
        remoteId: toonStorage[currentToon].remoteId,
      }
    })
  }

  return(
    <NativeSelect 
      value={selectedStrain || ''}
      className={classes.root} 
      onChange={handleStrainChange}
      disableUnderline
    >
      <option value='' disabled> -- Lineage Strain -- </option>
      {strainBuilder()}
    </NativeSelect>
  )
}

export default StrainPicker;
