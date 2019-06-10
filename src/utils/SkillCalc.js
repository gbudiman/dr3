function SkillCalc(h) {
  let gridify = () => {
    let grid = {};

    for (const key in h) {
      let category = h[key].category;
      let acquiredTier = h[key].acquired;

      if (!(category in grid)) grid[category] = {};
      for (let tier = 1; tier <= acquiredTier; tier++) {
        if (!(tier in grid[category])) grid[category][tier] = 0;
        grid[category][tier] += 1;
      }
    }

    return grid;
  }
  let compute = (grid) => {
    let costs = {};

    for (const category in grid) {
      let tiers = grid[category];
      if (!(category in costs)) costs[category] = 0;

      for (const tier in tiers) {
        let tierCost = parseInt(tier) + 1;
        let tierCount = tiers[tier];
        let subSum = tierCount * (tierCost + tierCost * tierCount) / 2;
        costs[category] += subSum;
      }
    }

    return costs;
  }
  let nextCostify = (grid) => {
    let nextCosts = {};
    for (const category in grid) {
      nextCosts[category] = {};
      for (const tier in grid[category]) {
        nextCosts[category][tier] = grid[category][tier] * (parseInt(tier) + 1);
      }
    }

    return nextCosts;
  }
  let totalize = (sum) => {
    return Object.values(sum).reduce((a,b) => { return a + b }, 0);
  }

  let grid = gridify();
  let sum = compute(grid);
  let nextCosts = nextCostify(grid);
  let total = totalize(sum);
  
  return({
    grid: grid,
    sum: sum,
    total: total,
    nextCosts: nextCosts,
  });
}

export default SkillCalc;
