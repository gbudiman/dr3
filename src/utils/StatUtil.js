import { calcXp } from './XpUtil';

const StatUtil = () => {
  // ported
  const handleStatAdjustment = (su, changedStat, adjustment) => {
    let currentStat = changedStat in su.stat ? su.stat[changedStat] : 0;
    su.stat[changedStat] = currentStat + adjustment;
    validateStatAndControls(su, changedStat);
  };

  const adjustStat = (stat, changedStat, adjustment) => {
    let currentStat = changedStat in stat ? stat[changedStat] : 0;
    stat[changedStat] = currentStat + adjustment;
  }

  const changeStat = (stat, changedStat, newValue) => {
    stat[changedStat] = parseInt(newValue) || 0;
  }

  // ported
  const handleStatChange = (su, changedStat, newValue) => {
    su.stat[changedStat] = parseInt(newValue) || 0;
    validateStatAndControls(su, changedStat);
  };

  const handleStatReductionAdjustment = (su, changedStat, adjustment, skipSetState = false) => {
    const reductionStatKey = changedStat[0] + 'r';
    let currentReduction = su.stat[reductionStatKey] || 0;
    let currentReductionControl = su.statControl[reductionStatKey];
    const h = statHelper(
      su,
      changedStat,
      su.stat[changedStat],
      currentReduction
    );

    if (currentReduction < 0) {
      currentReduction = 0;
    } else if (currentReduction + adjustment < 0) {
      currentReduction = 0;
    } else if (h.totalValue() < 0) {
      currentReduction = -h.totalValue();
    } else if (h.totalValue() === 0 && h.totalValue() - adjustment >= 0) {
      currentReduction = currentReduction + adjustment;
    } else if (h.totalValue() === 0 && h.totalValue() - adjustment < 0) {
      // no-op
    } else if (
      h.totalValue() === h.limit &&
      h.totalValue() - adjustment < h.limit
    ) {
      currentReduction = currentReduction + adjustment;
    } else if (
      h.totalValue() === h.limit &&
      h.totalValue() - adjustment >= h.limit
    ) {
      // no-op
    } else {
      currentReduction = currentReduction + adjustment;
    }

    currentReductionControl.dec =
      currentReduction > 0 && h.belowLimitWithReduction(currentReduction);
    currentReductionControl.inc = h.totalValue() - adjustment > 0;

    if (!skipSetState) {
      updateHookStates(
        su,
        reductionStatKey,
        currentReduction,
        currentReductionControl
      );
      calcXp(su, changedStat, su.stat[changedStat]);
    }

    su.stat[reductionStatKey] = currentReduction;
    const mainControl = crossValidateControl(su, changedStat, 'main', skipSetState);

    return [currentReduction, currentReductionControl, mainControl];
  };

  const validateStatAndControls = (su, changedStat, skipSetState = false) => {
    const reductionStatKey = changedStat[0] + 'r';
    let currentStat = su.stat[changedStat] || 0;
    const currentStatControl = su.statControl[changedStat];
    const h = statHelper(
      su,
      changedStat,
      currentStat,
      su.stat[reductionStatKey]
    );

    if (h.totalValue() >= 0 && h.belowOrAtLimit() && h.acqValue() >= 0) {
      // pass
    } else {
      if (h.reductionValue() === 0) {
        if (h.acqValue() - h.reductionValue() < 0) {
          currentStat = h.reductionValue();
        }
      } else {
        if (h.acqValue() < 0) {
          currentStat = 0;
        } else if (h.totalValue() < 0) {
          currentStat = h.acqValue() - h.totalValue();
        }
      }

      if (h.limit !== undefined && h.aboveLimit()) {
        currentStat = h.limit - h.innateValue() + h.reductionValue();
      }
    }

    currentStatControl.inc = h.belowLimitWithStat(currentStat);
    currentStatControl.dec =
      h.reductionValue() === 0
        ? h.acqValue() > 0
        : h.totalValue() > 0 && h.acqValue() > 0;

    if (!skipSetState) {
      updateHookStates(su, changedStat, currentStat, currentStatControl);
      calcXp(su, changedStat, currentStat);
    }
    const reductionControl = crossValidateControl(
      su, 
      changedStat, 
      'reduction', 
      skipSetState
    );

    return [currentStat, currentStatControl, reductionControl];
  };

  const crossValidateControl = (
    su,
    changedStat,
    target,
    skipSetState = false
  ) => {
    const reductionStat = changedStat[0] + 'r';
    let controlKey =
      target === 'reduction' ? changedStat[0] + 'r' : changedStat;
    let control =
      controlKey in su.statControl
        ? su.statControl[controlKey]
        : { inc: true, dec: true };

    let h = statHelper(
      su,
      changedStat,
      su.stat[changedStat],
      su.stat[reductionStat]
    );

    if (target === 'reduction') {
      control.inc = h.totalValue() > 0;
      control.dec = h.belowLimit() && h.reductionValue() > 0;
    } else if (target === 'main') {
      control.inc = h.belowLimit();
      control.dec = h.totalValue() > 0 && h.acqValue() > 0;
    }
    if (!skipSetState) su.setStatControl(Object.assign({}, su.statControl));

    return control;
  };

  const updateHookStates = (su, changedStat, stat, control) => {
    const remergedStat = su.stat;
    const remergedStatControl = su.statControl;

    remergedStat[changedStat] = stat;
    remergedStatControl[changedStat] = control;

    su.setStat({ ...su.stat, ...remergedStat });
    su.setStatControl({ ...su.statControl, ...remergedStatControl });
  };

  const validateAllStatsAndControls = (su, skipSetState = false) => {
    const newStat = {};
    const newStatControl = {};
    const stats = ['hp', 'mp', 'rp', 'inf'];

    stats.forEach(key => {
      [newStat[key], newStatControl[key]] = validateStatAndControls(
        su,
        key,
        true
      );
    });

    stats.forEach(key => {
      calcXp(su, key, newStat[key], skipSetState);
    });
    // su.setStat({...su.stat, ...newStat});
    // su.setStatControl({...su.statControl, ...newStatControl});
  };

  const statHelper = (su, key, currentValue, currentReduction) => {
    const reductionStatKey = key[0] + 'r';
    const innateValue = () => {
      return key in su.innate ? su.innate[key] : 0;
    };
    const acqValue = () => {
      return key in su.stat ? currentValue : 0;
    };
    const reductionValue = () => {
      return reductionStatKey in su.stat ? currentReduction : 0;
    };
    const totalValue = () => {
      return innateValue() + acqValue() - reductionValue();
    };
    const limit = su.statLimit[key];
    const belowOrAtLimit = () => {
      return limit === undefined || totalValue() <= limit;
    };
    const belowLimit = () => {
      return limit === undefined || totalValue() < limit;
    };
    const aboveLimit = () => {
      return limit === undefined || totalValue() > limit;
    };
    const belowLimitWithReduction = x => {
      return limit === undefined || innateValue() + acqValue() - x < limit;
    };
    const belowLimitWithStat = x => {
      return (
        limit === undefined || innateValue() + x - reductionValue() < limit
      );
    };

    return {
      innateValue: innateValue,
      acqValue: acqValue,
      reductionValue: reductionValue,
      totalValue: totalValue,
      limit: limit,
      belowOrAtLimit: belowOrAtLimit,
      belowLimit: belowLimit,
      aboveLimit: aboveLimit,
      belowLimitWithReduction: belowLimitWithReduction,
      belowLimitWithStat: belowLimitWithStat
    };
  };

  return {
    handleStatAdjustment: handleStatAdjustment,
    handleStatChange: handleStatChange,
    handleStatReductionAdjustment: handleStatReductionAdjustment,
    validateStatAndControls: validateStatAndControls,
    validateAllStatsAndControls: validateAllStatsAndControls,
    adjustStat: adjustStat,
    changeStat: changeStat,
  };
};

export default StatUtil;
