function SkillInitializer() {
  let autofill = (h) => {
    for (const key in h) {
      h[key].innate = h[key].innate || false;
      if (!('maxTier' in h[key])) h[key].maxTier = 4;
      h[key].acquired = 0;
    }

    return h;
  }

  let categorify = (category, h) => {
    for (const key in h) {
      h[key].category = category;
    }

    return h;
  } 

  let s_combat = categorify('combat', {
    avoid: { maxTier: 1 },
    combat_tactics: { t4: 'Battlefield Cmdr' },
    unarmed_combat: { t4: 'Bone Breaker', innate: true },
  })
  let s_civilized = categorify('civilized', {
    medical: { t4: 'Graverobber' },
  })
  let s_wasteland = categorify('wasteland', {
    enhanced_movement: { t4: 'Flanker' },
  })
  let s_anomaly = categorify('anomaly', {
    pyrokinetics: { t4: 'Incinerator' },
  })

  let skeleton = Object.assign(s_combat, s_civilized, s_wasteland, s_anomaly);
  return autofill(skeleton);
}

export default SkillInitializer;
