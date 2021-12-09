export const FREE = 'FREE';
export default function getBingoPhrases(bingoPhrases, freeSpace = FREE) {
    const setOfPhrases = new Set();
    let copyOfSource = Array.from(bingoPhrases);
    while (setOfPhrases.size < 24) {
        const item = copyOfSource[Math.floor(Math.random() * copyOfSource.length)];
        setOfPhrases.add(item);
        copyOfSource = copyOfSource.filter(phrase => phrase !== item);
    }
    const squares = Array.from(setOfPhrases);
    squares.splice(12, 0, freeSpace);
    return squares;
}
//# sourceMappingURL=bingo-phrases.js.map