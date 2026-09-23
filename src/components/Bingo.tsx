import { useEffect, useState } from 'react';
import { BingoProps } from '../types';
import BingoSquare from './BingoSquare';
import cyrb53 from '../utils/cyrb53-hash';
import getBingoPhrases from '../utils/bingo-phrases';
import baseSquareClassResolver from '../style/square-class-resolver';
import { loadCheckedSquares, saveCheckedSquares } from '../utils/checked-squares';

function Bingo({ phrases, freeSquare, seed, squareClassResolver }: BingoProps): JSX.Element {
  const { length: minLength } = phrases;
  if (minLength < 24) {
    throw new RangeError(
      `prop 'phrases' length should be greater than 24 but was ${minLength}`
    );
  }

  const phrasesForBoard = getBingoPhrases(phrases, freeSquare, seed);

  const [checkedSquares, setCheckedSquares] = useState<Set<number>>(
    () => loadCheckedSquares(seed)
  );

  useEffect(() => {
    saveCheckedSquares(seed, checkedSquares);
  }, [seed, checkedSquares]);

  if (!squareClassResolver) {
    squareClassResolver = baseSquareClassResolver;
  }

  const toggleSquare = (key: number): void => {
    setCheckedSquares(previous => {
      const next = new Set(previous);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <main className="Bingo">
      {phrasesForBoard.map(phrase => {
        const key = cyrb53(phrase);

        return (
          <BingoSquare
            key={key}
            phrase={phrase}
            selected={checkedSquares.has(key)}
            onToggle={() => toggleSquare(key)}
            squareClassResolver={squareClassResolver}
          />
        );
      })}
    </main>
  );
}

export default Bingo;
