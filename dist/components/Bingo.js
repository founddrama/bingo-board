import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import BingoSquare from './BingoSquare';
import cyrb53 from '../utils/cyrb53-hash';
import getBingoPhrases from '../utils/bingo-phrases';
import baseSquareClassResolver from '../style/square-class-resolver';
import { loadCheckedSquares, saveCheckedSquares } from '../utils/checked-squares';
import { generateSeed, readSeedFromHash, writeSeedToHash } from '../utils/board-seed';
function resolveInitialSeed(seed) {
    return seed !== undefined ? seed : readSeedFromHash();
}
function Bingo({ phrases, freeSquare, seed, squareClassResolver, hideNewBoardButton, hideClearBoardButton, }) {
    const { length: minLength } = phrases;
    if (minLength < 24) {
        throw new RangeError(`prop 'phrases' length should be greater than 24 but was ${minLength}`);
    }
    const [currentSeed, setCurrentSeed] = useState(() => resolveInitialSeed(seed));
    const phrasesForBoard = useMemo(() => getBingoPhrases(phrases, freeSquare, currentSeed), [phrases, freeSquare, currentSeed]);
    const [checkedSquares, setCheckedSquares] = useState(() => loadCheckedSquares(currentSeed));
    useEffect(() => {
        saveCheckedSquares(currentSeed, checkedSquares);
    }, [currentSeed, checkedSquares]);
    if (!squareClassResolver) {
        squareClassResolver = baseSquareClassResolver;
    }
    const toggleSquare = (key) => {
        setCheckedSquares(previous => {
            const next = new Set(previous);
            if (next.has(key)) {
                next.delete(key);
            }
            else {
                next.add(key);
            }
            return next;
        });
    };
    const handleNewBoard = () => {
        const nextSeed = generateSeed();
        writeSeedToHash(nextSeed);
        setCurrentSeed(nextSeed);
        setCheckedSquares(new Set());
    };
    const handleClearBoard = () => {
        setCheckedSquares(new Set());
    };
    const showActions = !hideNewBoardButton || !hideClearBoardButton;
    return (_jsxs(_Fragment, { children: [_jsx("main", Object.assign({ className: "Bingo" }, { children: phrasesForBoard.map(phrase => {
                    const key = cyrb53(phrase);
                    return (_jsx(BingoSquare, { phrase: phrase, selected: checkedSquares.has(key), onToggle: () => toggleSquare(key), squareClassResolver: squareClassResolver }, key));
                }) }), void 0), showActions && (_jsxs("div", Object.assign({ className: "Bingo-actions" }, { children: [!hideNewBoardButton && (_jsx("button", Object.assign({ type: "button", className: "Bingo-action", onClick: handleNewBoard }, { children: "New board" }), void 0)), !hideClearBoardButton && (_jsx("button", Object.assign({ type: "button", className: "Bingo-action", onClick: handleClearBoard }, { children: "Clear board" }), void 0))] }), void 0))] }, void 0));
}
export default Bingo;
//# sourceMappingURL=Bingo.js.map