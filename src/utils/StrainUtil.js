import StatUtil from './StatUtil';

const StrainUtil = () => {
  const handleStrainChange = (su, newStrain, skipSetState=false) => {
    const statUtil = StatUtil();
    const innateStats = getInnateStats(su, newStrain);    

    su.selectedStrain = newStrain;
    su.innate = innateStats; // TODO(gbudiman): this looks like cheating, but doesn't update otherwise
    
    if (!skipSetState) {
      su.setSelectedStrain(su.selectedStrain);
      su.setInnate({...{}, ...innateStats});
      for (const lstat in su.statLimit) {
        statUtil.validateStatAndControls(su, lstat);
      }
    }
  }

  const getInnateStats = (su, strain) => {
    if (strain) {
      const lineage = su.lineageStrain.strains[strain];
      const innateStat = su.lineageStrain.lineages[lineage].innate;

      return {
        hp: innateStat.hp,
        mp: innateStat.mp,
        rp: innateStat.rp,
        inf: innateStat.inf,
      }
    } else { return { hp: 0, mp: 0, rp: 0, inf: 0 } }
  }

  const buildLookupTable = (su, data) => {
    data.filter(x => x.lineage !== null).map(strain => {
      su.strainLookup[strain.id] = strain.name;
      su.inverseStrainLookup[strain.name] = strain.id;
    });
  }

  return {
    handleStrainChange: handleStrainChange,
    buildLookupTable: buildLookupTable,
    getInnateStats: getInnateStats,
  }
}

export default StrainUtil;
