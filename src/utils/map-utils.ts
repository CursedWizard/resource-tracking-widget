export function deepCloneMap<K, V>(map: Map<K, V>) {
  return new Map(JSON.parse(JSON.stringify(Array.from(map))));
}
