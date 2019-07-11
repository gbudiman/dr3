const linearCalc = x => {
  return 10 * x;
};
const deciCalc = x => {
  let influx = y => {
    if (y > 0) return y - 10 < 0 ? y : 10;
    return 0;
  };

  let totalCost = influx(x) * 1;
  x -= 10;
  totalCost += influx(x) * 3;
  x -= 10;
  totalCost += influx(x) * 5;
  x -= 10;
  totalCost += influx(x) * 7;
  x -= 10;
  totalCost += influx(x) * 9;
  x -= 10;
  if (x > 0) totalCost += x * 10;

  return totalCost;
};

export function totalStatXp(su) {
  return Object.values(su.statXp).reduce((a, b) => {
    return a + b;
  }, 0);
}

export function calcXp(su, changedStat, acquired, skipSetState=false) {
  switch (changedStat) {
    case 'hp':
    case 'mp':
      su.statXp[changedStat] = deciCalc(acquired || 0);
      break;
    case 'rp':
    case 'inf':
      su.statXp[changedStat] = linearCalc(acquired || 0);
      break;
  }

  if (!skipSetState) {
    su.setStatXp(Object.assign({}, su.statXp));
    calcTotalXp(su);
  }
};

export function calcXpComponents(su) {
  Object.keys(su.stat).forEach(stat => {
    calcXp(su, stat, su.stat[stat]);
  })
}

export function calcTotalXp(su) {
  su.totalXp = {
    stat: totalStatXp(su),
    skill: su.skillXp.total
  };
  su.setTotalXp(Object.assign({}, su.totalXp));
};
