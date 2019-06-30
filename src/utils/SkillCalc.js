function SkillCalc(h) {
  let gridify = () => {
    let grid = {};
    let xp = {};

    for (const key in h) {
      let category = h[key].category;
      let acquiredTier = h[key].acquired;
      let t4acquired = ('t4acquired' in h[key]) && h[key].t4acquired;

      if (!(category in grid)) grid[category] = {};
      for (let tier = 1; tier <= acquiredTier; tier++) {
        if (!(tier in grid[category])) grid[category][tier] = 0;
        if (!(tier === 1 && h[key].innate === true)) grid[category][tier] += 1;
      }
      if (t4acquired) {
        if (!('4' in grid[category])) grid[category][4] = 0;
        grid[category][4] += 1;
      }
    }

    for (const category in grid) {
      xp[category] = {};
      for (const _tier in grid[category]) {
        let tier = parseInt(_tier);
        let tierCount = grid[category][tier]
        let tierCost = tier + 1;
        switch(tier) {
          case 4: xp[category][tier] = 10 * tierCount; break;
          default: xp[category][tier] = tierCount * (tierCost + tierCost * tierCount) / 2;
        }
      }
    }

    return {
      grid: grid,
      xp: xp,
    }
  }
  let compute = (grid) => {
    let costs = {};

    for (const category in grid) {
      let tiers = grid[category];
      if (!(category in costs)) costs[category] = 0;

      for (const _tier in tiers) {
        let tier = parseInt(_tier);
        let tierCost = tier + 1;
        let tierCount = tiers[tier];
        let subSum;

        switch(tier) {
          case 4: subSum = 10 * tierCount; break;
          default: subSum = tierCount * (tierCost + tierCost * tierCount) / 2;
        }
        
        costs[category] += subSum;
      }
    }

    return costs;
  }
  let nextCostify = (grid) => {
    let nextCosts = {};
    for (const category in grid) {
      nextCosts[category] = {};
      for (const _tier in grid[category]) {
        let tier = parseInt(_tier);
        let nextCost;

        switch(tier) {
          case 4: nextCost = 10; break;
          default: nextCost = grid[category][tier] * (parseInt(tier) + 1) + (tier + 1);
        }
        nextCosts[category][tier] = nextCost;
      }
    }

    return nextCosts;
  }
  let totalize = (sum) => { return Object.values(sum).reduce((a,b) => { return a + b }, 0) }

  let grid = gridify();
  let sum = compute(grid.grid);
  let nextCosts = nextCostify(grid.grid);
  let total = totalize(sum);
  
  return({
    grid: grid,
    sum: sum,
    total: total,
    nextCosts: nextCosts,
  });
}

export default SkillCalc;
