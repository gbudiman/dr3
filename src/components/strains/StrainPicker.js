import './StrainPicker.scss';
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

function StrainPicker(props) {
  const classes = useStyles();

  let handleChange = event => { props.passStrainChange(event.target.value) }
  let statCompressor = (stat) => { return [stat.hp, stat.mp, stat.rp, stat.inf].join('/') }

  let strainBuilder = () => {
    let optgroups = Object.keys(props.lineages).map((lineage) => {
      let lineageData = props.lineages[lineage];
      let innateStat = lineageData.innate;
      let strainList = lineageData.strains;

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

  return(
    <NativeSelect 
      value={props.selectedStrain || ''}
      className={classes.root} 
      onChange={handleChange}
      disableUnderline
    >
      <option value='' disabled> -- Lineage Strain -- </option>
      {strainBuilder()}
    </NativeSelect>
  )
}

export default StrainPicker;
