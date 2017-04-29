export * from './token-type.enum';

export function getKeys(e: any) {
  let keys: string[] = [];
  for (let k in e) {
    if (typeof k === 'string') {
      keys.push(k);
    }
  }
  return keys;
}