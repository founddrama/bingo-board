declare type squareClassResolver = (phrase: string) => string;
export declare type BingoProps = {
    phrases: string[];
    freeSquare?: string;
    seed?: string | number;
    squareClassResolver?: squareClassResolver;
    hideNewBoardButton?: boolean;
    hideClearBoardButton?: boolean;
};
export declare type BingoSquareProps = {
    phrase: string;
    selected?: boolean;
    onToggle?: () => void;
    squareClassResolver?: squareClassResolver;
};
export {};
//# sourceMappingURL=types.d.ts.map