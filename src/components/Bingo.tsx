import { useEffect, useMemo, useState } from 'react';
import { BingoProps } from '../types';
import BingoSquare from './BingoSquare';
import cyrb53 from '../utils/cyrb53-hash';
import getBingoPhrases from '../utils/bingo-phrases';
import baseSquareClassResolver from '../style/square-class-resolver';
import { loadCheckedSquares, saveCheckedSquares } from '../utils/checked-squares';
import { generateSeed, readSeedFromHash, writeSeedToHash } from '../utils/board-seed';

function resolveInitialSeed(seed?: string | number): string | number | undefined {
  return seed !== undefined ? seed : readSeedFromHash();
}

function Bingo({
  phrases,
  freeSquare,
  seed,
  squareClassResolver,
  hideNewBoardButton,
  hideClearBoardButton,
}: BingoProps): JSX.Element {
  const { length: minLength } = phrases;
  if (minLength < 24) {
    throw new RangeError(
      `prop 'phrases' length should be greater than 24 but was ${minLength}`
    );
  }

  const [currentSeed, setCurrentSeed] = useState<string | number | undefined>(
    () => resolveInitialSeed(seed)
  );

  const phrasesForBoard = useMemo(
    () => getBingoPhrases(phrases, freeSquare, currentSeed),
    [phrases, freeSquare, currentSeed]
  );

  const [checkedSquares, setCheckedSquares] = useState<Set<number>>(
    () => loadCheckedSquares(currentSeed)
  );

  useEffect(() => {
    saveCheckedSquares(currentSeed, checkedSquares);
  }, [currentSeed, checkedSquares]);

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

  const handleNewBoard = (): void => {
    const nextSeed = generateSeed();
    writeSeedToHash(nextSeed);
    setCurrentSeed(nextSeed);
    setCheckedSquares(new Set());
  };

  const handleClearBoard = (): void => {
    setCheckedSquares(new Set());
  };

  const showActions = !hideNewBoardButton || !hideClearBoardButton;

  return (
    <>
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
      {showActions && (
        <div className="Bingo-actions">
          {!hideNewBoardButton && (
            <button type="button" className="Bingo-action" onClick={handleNewBoard}>
              New board
            </button>
          )}
          {!hideClearBoardButton && (
            <button type="button" className="Bingo-action" onClick={handleClearBoard}>
              Clear board
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Bingo;
