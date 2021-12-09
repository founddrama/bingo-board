import { jsx as _jsx } from "react/jsx-runtime";
import BingoSquare from './BingoSquare';
import cyrb53 from '../utils/cyrb53-hash';
function Bingo({ phrases, squareClassResolver }) {
    return (_jsx("main", Object.assign({ className: "Bingo" }, { children: phrases.map(phrase => (_jsx(BingoSquare, { phrase: phrase, squareClassResolver: squareClassResolver }, cyrb53(phrase)))) }), void 0));
}
export default Bingo;
//# sourceMappingURL=Bingo.js.map