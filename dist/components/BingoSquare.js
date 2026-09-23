import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
class BingoSquare extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            const { onToggle } = this.props;
            if (onToggle) {
                onToggle();
            }
        };
        this.generateCssClassNames = (phrase) => {
            const { selected, squareClassResolver } = this.props;
            const classNames = ['bingo-square'];
            if (selected) {
                classNames.push('selected');
            }
            if (squareClassResolver && typeof squareClassResolver === 'function') {
                classNames.push(squareClassResolver(phrase));
            }
            return classNames.filter(cls => typeof cls === 'string').join(' ');
        };
    }
    render() {
        const { phrase } = this.props;
        const classNames = this.generateCssClassNames(phrase);
        return (_jsx("div", Object.assign({ className: classNames, onClick: this.onClick }, { children: _jsx("span", { children: phrase }, void 0) }), void 0));
    }
}
export default BingoSquare;
//# sourceMappingURL=BingoSquare.js.map