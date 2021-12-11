import { BingoProps } from '../types';
import BingoSquare from './BingoSquare';
import cyrb53 from '../utils/cyrb53-hash';
import getBingoPhrases from '../utils/bingo-phrases';
import baseSquareClassResolver from '../style/square-class-resolver';

function Bingo({ phrases, freeSquare, squareClassResolver }: BingoProps): JSX.Element {
  const { length: minLength } = phrases;
  if (minLength < 24) {
    throw new RangeError(
      `prop 'phrases' length should be greater than 24 but was ${minLength}`
    );
  }

  const phrasesForBoard = getBingoPhrases(phrases, freeSquare);

  if (!squareClassResolver) {
    squareClassResolver = baseSquareClassResolver;
  }

  return (
    <main className="Bingo">
      {phrasesForBoard.map(phrase => (
        <BingoSquare
          key={cyrb53(phrase)}
          phrase={phrase}
          squareClassResolver={squareClassResolver}
        />
      ))}
    </main>
  );
}

export default Bingo;
