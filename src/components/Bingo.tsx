import { BingoProps } from '../types';
import BingoSquare from './BingoSquare';
import cyrb53 from '../utils/cyrb53-hash';
import baseSquareClassResolver from '../style/square-class-resolver';

function Bingo({ phrases, squareClassResolver }: BingoProps): JSX.Element {
  if (!squareClassResolver) {
    squareClassResolver = baseSquareClassResolver;
  }

  return (
    <main className="Bingo">
      {phrases.map(phrase => (
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
