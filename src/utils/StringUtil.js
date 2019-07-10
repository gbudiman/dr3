export function upcase(s) {
  return `${s[0].toUpperCase()}${s.slice(1)}`;
}

export function downcaseFirstLetter(s) {
 return `${s[0].toLowerCase()}${s.slice(1)}`; 
}

export function humanify(s) {
  return s.split('_').map((x) => { return upcase(x) }).join(' ')
}

export function underscore(s) {
  return s.replace(/\s+/, '_').toLowerCase();
}

export function camelize(s) {
  return downcaseFirstLetter(
    s.split('_').map((x) => { return upcase(x) }).join('')
  )
}

export function tierify(s, tier) {
  if (tier === 4) return camelize(s);
  const tierPrefix = { 1: 'basic', 2: 'proficient', 3: 'master' };
  return tierPrefix[tier] + upcase(camelize(s))
}

export function localize(s) {
  return underscore(s.replace(/(Basic|Proficient|Master)\s+/, '')).replace(/-/, '_');
}
