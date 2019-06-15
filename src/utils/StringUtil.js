export function upcase(s) {
  return `${s[0].toUpperCase()}${s.slice(1)}`;
}

export function humanify(s) {
  return s.split('_').map((x) => { return upcase(x) }).join(' ')
}

export function underscore(s) {
  return s.replace(/\s+/, '_').toLowerCase();
}