function StrainInitializer() {
  let h = {
    elitariat: {
      strains: { ['Digitarian', 'Pure Blood', 'Solestros'] },
      innate: { { body: 8, mind: 12, resolve: 4, infection: 4 }},
    },
    townie: {
      strains: { ['Baywalker', 'Yorker', 'Vegasian'] },
      innate: { { body: 10, mind: 10, resolve: 4, infection: 4 }},
    },
    nomad: {
      strains: { ['Diesel Jock', 'Yorker', 'Saltwise'] },
      innate: { { body: 9, mind: 11, resolve: 5, infection: 3 }},
    },
    gorger: {
      strains: { ['Full Dead', 'Semper Mort', 'Lascarian'] },
      innate: { { body: 11, mind: 9, resolve: 5, infection: 3 }},
    },
    mutant: {
      strains: { ['Remnant', 'Retrograde', 'Tainted'] },
      innate: { { body: 12, mind: 8, resolve: 3, infection: 5 }},
    },
    landsman: {
      strains: { ['Merican', 'Natural One', 'Quiet Folk'] },
      innate: { { body: 12, mind: 8, resolve: 5, infection: 3 }},
    },
    devoted: {
      strains: { ['Accensorite', 'Red Star', 'Unborn'] },
      innate: { { body: 10, mind: 10, resolve: 2, infection: 6 }},
    },
    evolved: {
      strains: { ['Irons', 'Reclaimers', 'Unstable'] },
      innate: { { body: 11, mind: 9, resolve: 3, infection: 5 }},
    },
  }
}

export default StrainInitializer;
