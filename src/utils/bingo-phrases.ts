export const FREE = 'FREE';

export default function getBingoPhrases(
  bingoPhrases: string[],
  freeSpace: string = FREE
): string[] {
  const setOfPhrases: Set<string> = new Set();
  let copyOfSource: string[] = Array.from(bingoPhrases);

  while (setOfPhrases.size < 24) {
    const item = copyOfSource[Math.floor(Math.random() * copyOfSource.length)];
    setOfPhrases.add(item);
    copyOfSource = copyOfSource.filter(phrase => phrase !== item);
  }

  const squares = Array.from(setOfPhrases);
  squares.splice(12, 0, freeSpace);

  return squares;
}
