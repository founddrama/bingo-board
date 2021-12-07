type squareClassResolver = (phrase: string) => string;

export type BingoProps = {
  phrases: string[];
  squareClassResolver?: squareClassResolver;
};

export type BingoSquareProps = {
  phrase: string;
  squareClassResolver?: squareClassResolver;
};
