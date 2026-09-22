declare type squareClassResolver = (phrase: string) => string;
export declare type BingoProps = {
    phrases: string[];
    freeSquare?: string;
    seed?: string | number;
    squareClassResolver?: squareClassResolver;
};
export declare type BingoSquareProps = {
    phrase: string;
    squareClassResolver?: squareClassResolver;
};
export {};
//# sourceMappingURL=types.d.ts.map