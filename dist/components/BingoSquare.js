import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
function generateCssClassNames(phrase, selected, squareClassResolver) {
    const classNames = ['bingo-square'];
    if (selected) {
        classNames.push('selected');
    }
    if (squareClassResolver && typeof squareClassResolver === 'function') {
        classNames.push(squareClassResolver(phrase));
    }
    return classNames.filter(cls => typeof cls === 'string').join(' ');
}
function BingoSquare({ phrase, selected, onToggle, squareClassResolver }) {
    const onClick = () => {
        if (onToggle) {
            onToggle();
        }
    };
    const classNames = generateCssClassNames(phrase, selected, squareClassResolver);
    return (_jsx("div", Object.assign({ className: classNames, onClick: onClick }, { children: _jsx("span", { children: phrase }, void 0) }), void 0));
}
export default React.memo(BingoSquare);
//# sourceMappingURL=BingoSquare.js.map