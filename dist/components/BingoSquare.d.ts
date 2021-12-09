import React from 'react';
import { BingoSquareProps } from '../types';
declare type BingoSquareState = {
    selected: boolean;
};
declare class BingoSquare extends React.PureComponent<BingoSquareProps, BingoSquareState> {
    constructor(props: BingoSquareProps);
    onClick: React.MouseEventHandler;
    generateCssClassNames: (phrase: string) => string;
    render(): JSX.Element;
}
export default BingoSquare;
//# sourceMappingURL=BingoSquare.d.ts.map