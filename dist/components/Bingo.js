import { jsx as _jsx } from "react/jsx-runtime";
import BingoSquare from './BingoSquare';
import cyrb53 from '../utils/cyrb53-hash';
import baseSquareClassResolver from '../style/square-class-resolver';
function Bingo({ phrases, squareClassResolver }) {
    if (!squareClassResolver) {
        squareClassResolver = baseSquareClassResolver;
    }
    return (_jsx("main", Object.assign({ className: "Bingo" }, { children: phrases.map(phrase => (_jsx(BingoSquare, { phrase: phrase, squareClassResolver: squareClassResolver }, cyrb53(phrase)))) }), void 0));
}
export default Bingo;
//# sourceMappingURL=Bingo.js.map