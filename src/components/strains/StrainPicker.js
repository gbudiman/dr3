import { connect } from 'react-redux';
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
  const statCompressor = (stat) => { return [stat.hp, stat.mp, stat.rp, stat.inf].join('/') }
  const strainBuilder = () => {
    const optgroups = Object.keys(props.lineages).map((lineage) => {
      const lineageData = props.lineages[lineage];
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

  return(
    <NativeSelect 
      value={props.selectedStrain || ''}
      className={classes.root} 
      onChange={props.handleStrainChange}
      disableUnderline
    >
      <option value='' disabled> -- Lineage Strain -- </option>
      {strainBuilder()}
    </NativeSelect>
  )
}

const mapStateToProps = state => {
  return {
    lineages: state.lineageStrain.lineages,
    selectedStrain: state.selectedStrain,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleStrainChange: (event) => dispatch({
      type: 'STRAIN_CHANGED',
      payload: event.target.value,
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StrainPicker);
