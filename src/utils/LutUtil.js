import StrainUtil from './StrainUtil';
import SkillUtil from './SkillUtil';

const LUT_VERSION = 1; // TODO(gbudiman): use ENV vars
const strainUtil = StrainUtil();
const skillUtil = SkillUtil();

const LutUtil = () => {
  const loadLookupTables = (su, fetchRemoteStrains, fetchRemoteSkills) => {
    const localLut = localStorage.getItem('lut');
    const parsedLut = () => { return JSON.parse(localLut) };
    const lutVersion = () => { return parsedLut().lut_version };
    const needLutUpdate = () => { return LUT_VERSION > lutVersion() };
    const constructLookupTables = () => {
      const strainUtil = StrainUtil();
      const skillUtil = SkillUtil();
      const promiseStrains = fetchRemoteStrains().then(strains => {
        strainUtil.buildLookupTable(su, strains.data);
      });
      const promiseSkills = fetchRemoteSkills().then(skills => {
        skillUtil.buildLookupTable(su, skills.data);
      });

      return Promise.all([promiseStrains, promiseSkills]);
    }

    if (localLut === null || needLutUpdate()) {
      console.log('no local LUT found. constructing...');
      constructLookupTables().then(() => {
        console.log('LUT construction completed');
        updateHookStates(su);
        persistToLocalStorage(su);
      })
    } else {
      console.log('LUT found');
      loadFromLocalStorage(su, parsedLut()); 
      console.log('LUT loaded');
    }
  }

  const updateHookStates = (su) => {
    su.setStrainLookup({...{}, ...su.strainLookup});
    su.setInverseStrainLookup({...{}, ...su.inverseStrainLookup});
    su.setSkillLookup({...{}, ...su.skillLookup});
    su.setInverseSkillLookup({...{}, ...su.inverseSkillLookup});

    console.log('LUT hook states updated!');
  }

  const persistToLocalStorage = (su) => {
    const ls = {
      lut_version: LUT_VERSION,
      strain: su.strainLookup,
      inverse_strain: su.inverseStrainLookup,
      skill: su.skillLookup,
      inverse_skill: su.inverseSkillLookup,
    }

    localStorage.setItem('lut', JSON.stringify(ls));
  }

  const loadFromLocalStorage = (su, parsedLut) => {
    su.strainLookup = parsedLut.strain;
    su.inverseStrainLookup = parsedLut.inverse_strain;
    su.skillLookup = parsedLut.skill;
    su.inverseSkillLookup = parsedLut.inverse_skill;

    updateHookStates(su);
  }

  return {
    loadLookupTables: loadLookupTables,
  }
}

export default LutUtil;
