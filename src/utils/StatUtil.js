import { calcXp } from './XpUtil';

const StatUtil = () => {
  const handleStatAdjustment = (su, changedStat, adjustment) => {
    let currentStat = changedStat in su.stat ? su.stat[changedStat] : 0;
    su.stat[changedStat] = currentStat + adjustment;
    validateStatAndControls(su, changedStat);
  };

  const handleStatChange = (su, changedStat, newValue) => {
    su.stat[changedStat] = parseInt(newValue) || 0;
    validateStatAndControls(su, changedStat);
  };

  const handleStatReductionAdjustment = (su, changedStat, adjustment) => {
    let reductionStatKey = changedStat[0] + 'r';
    let h = statHelper(su, changedStat);

    su.statControl[reductionStatKey] = {};

    if (h.reductionValue() < 0) {
      su.stat[reductionStatKey] = 0;
    } else if (h.reductionValue() + adjustment < 0) {
      su.stat[reductionStatKey] = 0;
    } else if (h.totalValue() < 0) {
      su.stat[reductionStatKey] = -h.totalValue();
    } else if (h.totalValue() === 0 && h.totalValue() - adjustment >= 0) {
      su.stat[reductionStatKey] = h.reductionValue() + adjustment;
    } else if (h.totalValue() === 0 && h.totalValue() - adjustment < 0) {
      su.stat[reductionStatKey] = h.reductionValue();
    } else if (
      h.totalValue() === h.limit &&
      h.totalValue() - adjustment < h.limit
    ) {
      su.stat[reductionStatKey] = h.reductionValue() + adjustment;
    } else if (
      h.totalValue() === h.limit &&
      h.totalValue() - adjustment >= h.limit
    ) {
      su.stat[reductionStatKey] = h.reductionValue();
    } else {
      su.stat[reductionStatKey] = h.reductionValue() + adjustment;
    }
    su.setStat(Object.assign({}, su.stat));
    su.statControl[reductionStatKey].dec =
      h.reductionValue() > 0 && h.belowLimit();
    su.statControl[reductionStatKey].inc = h.totalValue() > 0;
    su.setStatControl(Object.assign({}, su.statControl));
    calcXp(su, changedStat, su.stat[changedStat]);
    crossValidateControl(su, changedStat, 'main');
  };

  const validateStatAndControls = (su, changedStat, skipSetState=false) => {
    console.log('begin validation for ' + changedStat);
    let h = statHelper(su, changedStat);

    if (h.totalValue() >= 0 && h.belowOrAtLimit() && h.acqValue() >= 0) {
      // pass
    } else {
      if (h.reductionValue() === 0) {
        if (h.acqValue() - h.reductionValue() < 0) {
          su.stat[changedStat] = h.reductionValue();
        }
      } else {
        if (h.acqValue() < 0) {
          su.stat[changedStat] = 0;
        } else if (h.totalValue() < 0) {
          su.stat[changedStat] = h.acqValue() - h.totalValue();
        }
      }

      if (h.limit !== undefined && h.aboveLimit()) {
        su.stat[changedStat] = h.limit - h.innateValue() + h.reductionValue();
      }
    }

    if (!skipSetState) su.setStat(Object.assign({}, su.stat));
    su.statControl[changedStat].inc = h.belowLimit();
    su.statControl[changedStat].dec =
      h.reductionValue() === 0
        ? h.acqValue() > 0
        : h.totalValue() > 0 && h.acqValue() > 0;
    if (!skipSetState) su.setStatControl(Object.assign({}, su.statControl));
    calcXp(su, changedStat, su.stat[changedStat]);
    crossValidateControl(su, changedStat, 'reduction', skipSetState);
    console.log('validation done for ' + changedStat);
  };

  const validateAllStatsAndControls = (su) => {
    validateStatAndControls(su, 'hp', true);
    validateStatAndControls(su, 'mp', true);
    validateStatAndControls(su, 'rp', true);
    validateStatAndControls(su, 'inf', true); 
  }

  const crossValidateControl = (su, changedStat, target, skipSetState=false) => {
    let controlKey =
      target === 'reduction' ? changedStat[0] + 'r' : changedStat;
    let control =
      controlKey in su.statControl
        ? su.statControl[controlKey]
        : { inc: true, dec: true };
    let h = statHelper(su, changedStat);

    if (target === 'reduction') {
      control.inc = h.totalValue() > 0;
      control.dec = h.belowLimit() && h.reductionValue() > 0;
    } else if (target === 'main') {
      control.inc = h.belowLimit();
      control.dec = h.totalValue() > 0 && h.acqValue() > 0;
    }
    if (!skipSetState) su.setStatControl(Object.assign({}, su.statControl));
  };

  const statHelper = (su, key) => {
    let reductionStatKey = key[0] + 'r';
    let innateValue = () => {
      return key in su.innate ? su.innate[key] : 0;
    };
    let acqValue = () => {
      return key in su.stat ? su.stat[key] : 0;
    };
    let reductionValue = () => {
      return reductionStatKey in su.stat ? su.stat[reductionStatKey] : 0;
    };
    let totalValue = () => {
      return innateValue() + acqValue() - reductionValue();
    };
    let limit = su.statLimit[key];
    let belowOrAtLimit = () => {
      return limit === undefined || totalValue() <= limit;
    };
    let belowLimit = () => {
      return limit === undefined || totalValue() < limit;
    };
    let aboveLimit = () => {
      return limit === undefined || totalValue() > limit;
    };

    return {
      innateValue: innateValue,
      acqValue: acqValue,
      reductionValue: reductionValue,
      totalValue: totalValue,
      limit: limit,
      belowOrAtLimit: belowOrAtLimit,
      belowLimit: belowLimit,
      aboveLimit: aboveLimit
    };
  };

  return {
    handleStatAdjustment: handleStatAdjustment,
    handleStatChange: handleStatChange,
    handleStatReductionAdjustment: handleStatReductionAdjustment,
    validateStatAndControls: validateStatAndControls,
    validateAllStatsAndControls: validateAllStatsAndControls,
  }
}

export default StatUtil;
