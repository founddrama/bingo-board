import cyrb53 from './cyrb53-hash';
import createRandom from './seeded-random';

export const FREE = 'FREE';

export default function getBingoPhrases(
  bingoPhrases: string[],
  freeSpace: string = FREE,
  seed?: string | number
): string[] {
  const random = seed === undefined
    ? Math.random
    : createRandom(cyrb53(String(seed)) >>> 0);

  const setOfPhrases: Set<string> = new Set();
  let copyOfSource: string[] = Array.from(bingoPhrases);

  while (setOfPhrases.size < 24) {
    const item = copyOfSource[Math.floor(random() * copyOfSource.length)];
    setOfPhrases.add(item);
    copyOfSource = copyOfSource.filter(phrase => phrase !== item);
  }

  const squares = Array.from(setOfPhrases);
  squares.splice(12, 0, freeSpace);

  return squares;
}
