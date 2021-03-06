import { jsx as _jsx } from "react/jsx-runtime";
import BingoSquare from './BingoSquare';
import cyrb53 from '../utils/cyrb53-hash';
import getBingoPhrases from '../utils/bingo-phrases';
import baseSquareClassResolver from '../style/square-class-resolver';
function Bingo({ phrases, freeSquare, squareClassResolver }) {
    const { length: minLength } = phrases;
    if (minLength < 24) {
        throw new RangeError(`prop 'phrases' length should be greater than 24 but was ${minLength}`);
    }
    const phrasesForBoard = getBingoPhrases(phrases, freeSquare);
    if (!squareClassResolver) {
        squareClassResolver = baseSquareClassResolver;
    }
    return (_jsx("main", Object.assign({ className: "Bingo" }, { children: phrasesForBoard.map(phrase => (_jsx(BingoSquare, { phrase: phrase, squareClassResolver: squareClassResolver }, cyrb53(phrase)))) }), void 0));
}
export default Bingo;
//# sourceMappingURL=Bingo.js.map