function StrainInitializer() {
  let strains = {
    'Digitarian': 'elitariat',
    'Solestros': 'elitariat',
    'Pure Blood': 'elitariat',
    'Baywalker': 'townie',
    'Yorker': 'townie',
    'Vegasian': 'townie',
    'Diesel Jock': 'nomad',
    'Rover': 'nomad',
    'Saltwise': 'nomad',
    'Full Dead': 'gorger',
    'Semper Mort': 'gorger',
    'Lascarian': 'gorger',
    'Remnant': 'mutant',
    'Retrograde': 'mutant',
    'Tainted': 'mutant',
    'Merican': 'landsman',
    'Natural One': 'landsman',
    'Quiet Folk': 'landsman',
    'Accensorite': 'devoted',
    'Red Star': 'devoted',
    'Unborn': 'devoted',
    'Irons': 'evolved',
    'Reclaimers': 'evolved',
    'Unstable': 'evolved',
  }
  let lineageStats = {
    elitariat: { hp: 8, mp: 12, rp: 4, inf: 4 },
    townie: { hp: 10, mp: 10, rp: 4, inf: 4 },
    nomad: { hp: 9, mp: 11, rp: 5, inf: 3 },
    gorger: { hp: 11, mp: 9, rp: 5, inf: 3 },
    mutant: { hp: 12, mp: 8, rp: 3, inf: 5 },
    landsman: { hp: 12, mp: 8, rp: 5, inf: 3 },
    devoted: { hp: 10, mp: 10, rp: 2, inf: 6 },
    evolved: { hp: 11, mp: 9, rp: 3, inf: 5 },
  }

  let lineageStrain = {};

  for (const strain in strains) {
    let lineage = strains[strain];
    if (!(lineage in lineageStrain)) {
      lineageStrain[lineage] = {
        strains: [],
        innate: lineageStats[lineage],
      }
    }

    lineageStrain[lineage].strains.push(strain);
  }

  return {
    lineages: lineageStrain,
    strains: strains,
  }
}

export default StrainInitializer;
