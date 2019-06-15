function SkillInitializer() {
  let autofill = (h) => {
    for (const key in h) {
      h[key].innate = h[key].innate || false;
      if (!('maxTier' in h[key])) h[key].maxTier = 4;
      h[key].acquired = 0;
      h[key].t4acquired = false;
      h[key].visible = true;
    }

    return h;
  }

  let categorify = (category, h) => {
    for (const key in h) h[key].category = category;

    return h;
  } 

  let s_combat = categorify('combat', {
    avoid: { maxTier: 1 },
    balance: { maxTier: 1 },
    blinding: { maxTier: 1 },
    break: { maxTier: 1 },
    choking_blow: { maxTier: 1 },
    interfere: { maxTier: 1 },
    piercing_strike: { maxTier: 1 },
    take_down: { maxTier: 1 },
    combat_tactics: { t4: 'Battlefield Commander' },
    florentine: { t4: 'Mercenary' },
    exotic_weapon: { t4: 'Violent Technician', innate: true },
    melee_small: { t4: 'Assassin', innate: true },
    melee_standard: { t4: 'Bad-Ass', innate: true },
    melee_two_handed: { t4: 'Blooded Lance', innate: true },
    projectile: { t4: 'Marksman', innate: true },
    shield: { t4: 'Phalanx Doyen', innate: true },
    thrown_weapon: { t4: 'Death Chuckah', innate: true },
    unarmed_combat: { t4: 'Bone Breaker', innate: true },
  })
  let s_civilized = categorify('civilized', {
    agricultural: { t4: 'Shepherd of the Land' },
    artisan: { t4: 'Techno Savant' },
    culinary: { t4: 'Artisanal Cuisiner' },
    education: { t4: 'Sage' },
    larceny: { t4: 'Villon' },
    medical: { t4: 'Graverobber' },
    criminal_influence: { t4: 'Inner Circle' },
    financial_influence: { t4: 'Fiscal Mysticist' },
    trade_connections: { t4: 'Entrepreneur' },
    social_influence: { t4: 'Overlord' },
  })
  let s_wasteland = categorify('wasteland', {
    awareness: { t4: 'Veteran' },
    enhanced_movement: { t4: 'Flanker' },
    foraging: { t4: 'Scavenger' },
    hunting: { t4: 'Wasteland Striker' },
    malicious: { t4: 'Inquisitor' },
    mental_endurance: { t4: 'Mind Killer' },
    sailing: { t4: 'Bluejacket' },
    salvaging: { t4: 'Avontuur' },
    stealth: { t4: 'Shadow' },
    trailblazing: { t4: 'Gear Head' },
  })
  let s_anomaly = categorify('anomaly', {
    biogenetics: { t4: 'Free Radical' },
    necrokinetics: { t4: 'Grave Attuned' },
    pyrokinetics: { t4: 'Incinerator' },
    telekinetics: { t4: 'Mentalist' },
    telepathy: { t4: 'Thought Bender' },
    faith_vessel: { t4: 'Apocatastian Templar' },
    faithful_miracles: { t4: 'Saint' },
    faithful_patterns: { t4: 'Doctrinarian' },
    faithful_spirit: { t4: 'Pernicious Saviour' },
    faithful_will: { t4: 'Life Binder' },
  })

  let skeleton = Object.assign(s_combat, s_civilized, s_wasteland, s_anomaly);
  return autofill(skeleton);
}

export default SkillInitializer;
