import StatUtil from './StatUtil';

const StrainUtil = () => {
  const handleStrainChange = (su, newStrain) => {
    const statUtil = StatUtil();
    const innateStats = getInnateStats(su, newStrain);    

    su.selectedStrain = newStrain;
    su.setSelectedStrain(su.selectedStrain);
    // su.innate = {
    //   hp: innateStat.hp,
    //   mp: innateStat.mp,
    //   rp: innateStat.rp,
    //   inf: innateStat.inf
    // };
    su.innate = innateStats
    su.setInnate(su.innate);

    for (const lstat in su.statLimit) {
      statUtil.validateStatAndControls(su, lstat, true);
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

  return {
    handleStrainChange: handleStrainChange,
    getInnateStats: getInnateStats,
  }
}

export default StrainUtil;
