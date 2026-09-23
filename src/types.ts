type squareClassResolver = (phrase: string) => string;

export type BingoProps = {
  phrases: string[];
  freeSquare?: string;
  seed?: string | number;
  squareClassResolver?: squareClassResolver;
  hideNewBoardButton?: boolean;
  hideClearBoardButton?: boolean;
};

export type BingoSquareProps = {
  phrase: string;
  selected?: boolean;
  onToggle?: () => void;
  squareClassResolver?: squareClassResolver;
};
