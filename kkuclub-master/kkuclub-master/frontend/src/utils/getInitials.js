export default (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => { return v && v[0].toUpperCase(); })
  .join('');
