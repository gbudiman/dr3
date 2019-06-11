function StrainInitializer() {
  return {
    elitariat: {
      strains: ['Digitarian', 'Pure Blood', 'Solestros'],
      innate: { hp: 8, mp: 12, rp: 4, inf: 4 },
    },
    townie: {
      strains: ['Baywalker', 'Yorker', 'Vegasian'],
      innate: { hp: 10, mp: 10, rp: 4, inf: 4 },
    },
    nomad: {
      strains: ['Diesel Jock', 'Rover', 'Saltwise'],
      innate: { hp: 9, mp: 11, rp: 5, inf: 3 },
    },
    gorger: {
      strains: ['Full Dead', 'Semper Mort', 'Lascarian'],
      innate: { hp: 11, mp: 9, rp: 5, inf: 3 },
    },
    mutant: {
      strains: ['Remnant', 'Retrograde', 'Tainted'],
      innate: { hp: 12, mp: 8, rp: 3, inf: 5 },
    },
    landsman: {
      strains: ['Merican', 'Natural One', 'Quiet Folk'],
      innate: { hp: 12, mp: 8, rp: 5, inf: 3 },
    },
    devoted: {
      strains: ['Accensorite', 'Red Star', 'Unborn'],
      innate: { hp: 10, mp: 10, rp: 2, inf: 6 },
    },
    evolved: {
      strains: ['Irons', 'Reclaimers', 'Unstable'],
      innate: { hp: 11, mp: 9, rp: 3, inf: 5 },
    },
  }
}

export default StrainInitializer;
