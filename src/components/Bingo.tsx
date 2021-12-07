import BingoSquare from './BingoSquare';
import cyrb53 from '../utils/cyrb53-hash';
import { BingoProps } from '../types';

function Bingo({ phrases, squareClassResolver }: BingoProps): JSX.Element {
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
