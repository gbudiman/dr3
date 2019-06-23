import StatUtil from './StatUtil';

const StrainUtil = () => {
  let handleStrainChange = (su, newStrain) => {
    let statUtil = StatUtil();
    let lineage = su.lineageStrain.strains[newStrain];
    let innateStat = su.lineageStrain.lineages[lineage].innate;

    su.setSelectedStrain(newStrain);
    su.innate = {
      hp: innateStat.hp,
      mp: innateStat.mp,
      rp: innateStat.rp,
      inf: innateStat.inf
    };
    su.setInnate(su.innate);

    for (const lstat in su.statLimit) {
      statUtil.validateStatAndControls(su, lstat, true);
    }
  };

  return {
    handleStrainChange: handleStrainChange,
  }
}

export default StrainUtil;
