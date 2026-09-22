type squareClassResolver = (phrase: string) => string;

export type BingoProps = {
  phrases: string[];
  freeSquare?: string;
  seed?: string | number;
  squareClassResolver?: squareClassResolver;
};

export type BingoSquareProps = {
  phrase: string;
  squareClassResolver?: squareClassResolver;
};
