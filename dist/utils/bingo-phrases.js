import cyrb53 from './cyrb53-hash';
import createRandom from './seeded-random';
export const FREE = 'FREE';
export default function getBingoPhrases(bingoPhrases, freeSpace = FREE, seed) {
    const random = seed === undefined
        ? Math.random
        : createRandom(cyrb53(String(seed)) >>> 0);
    const setOfPhrases = new Set();
    let copyOfSource = Array.from(bingoPhrases);
    while (setOfPhrases.size < 24) {
        const item = copyOfSource[Math.floor(random() * copyOfSource.length)];
        setOfPhrases.add(item);
        copyOfSource = copyOfSource.filter(phrase => phrase !== item);
    }
    const squares = Array.from(setOfPhrases);
    squares.splice(12, 0, freeSpace);
    return squares;
}
//# sourceMappingURL=bingo-phrases.js.map