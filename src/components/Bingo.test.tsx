import { fireEvent, render, screen } from '@testing-library/react';
import Bingo from './Bingo';
import mockBaseSquareClassResolver from '../style/square-class-resolver';

jest.mock('../style/square-class-resolver');

describe('<Bingo />', () => {
  const phrases = [
    'B1', 'I1', 'N1', 'G1', 'O1',
    'B2', 'I2', 'N2', 'G2', 'O2',
    'B3', 'I3', 'N3', 'G3', 'O3',
    'B4', 'I4', 'N4', 'G4', 'O4',
    'B5', 'I5', 'N5', 'G5', 'O5',
    'X1', 'X2', 'X3', 'X4', 'X5',
  ];

  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = '';
  });

  test('renders FREE square', () => {
    render(<Bingo phrases={phrases} />);
    const freeSquare = screen.getByText(/FREE/i);
    expect(freeSquare).toBeInTheDocument();
  });

  test('should render a custom FREE square when provided', () => {
    render(<Bingo phrases={phrases} freeSquare="FOO SQUARE" />);
    const freeSquare = screen.getByText(/FOO SQUARE/i);
    expect(freeSquare).toBeInTheDocument();
  });

  test('should render 25 Bingo squares', () => {
    const { container } = render(<Bingo phrases={phrases} />);
    const squares = Array.from(container.querySelectorAll('.bingo-square'));

    expect(squares).toHaveLength(25);
  });

  test('should call base "square-class-resolver" when no squareClassResolver is provided', () => {
    render(<Bingo phrases={phrases} />)

    expect(mockBaseSquareClassResolver).toHaveBeenCalled();
  });

  test('should call squareClassResolver when it is provided', () => {
    const mockCustomSquareClassProvider = jest.fn();
    render(<Bingo phrases={phrases} squareClassResolver={mockCustomSquareClassProvider} />);

    expect(mockCustomSquareClassProvider).toHaveBeenCalled();
    expect(mockBaseSquareClassResolver).not.toHaveBeenCalled();
  });

  test('should throw a RangeError is phrases is too small', () => {
    expect(() => {
      render(<Bingo phrases={[]} />);
    }).toThrow(`prop 'phrases' length should be greater than 24 but was 0`);
  });

  test('same seed should render the same phrases in the same order', () => {
    const first = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const firstText = Array.from(first.container.querySelectorAll('.bingo-square'))
      .map(square => square.textContent);
    first.unmount();

    const second = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const secondText = Array.from(second.container.querySelectorAll('.bingo-square'))
      .map(square => square.textContent);

    expect(secondText).toEqual(firstText);
  });

  test('checked squares persist across a reload when a seed is provided', () => {
    const first = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const firstSquares = Array.from(first.container.querySelectorAll('.bingo-square'));

    fireEvent.click(firstSquares[0]);
    fireEvent.click(firstSquares[5]);
    expect(firstSquares[0]).toHaveClass('selected');
    expect(firstSquares[5]).toHaveClass('selected');

    first.unmount();

    const second = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const secondSquares = Array.from(second.container.querySelectorAll('.bingo-square'));

    expect(secondSquares[0]).toHaveClass('selected');
    expect(secondSquares[5]).toHaveClass('selected');
    expect(secondSquares[1]).not.toHaveClass('selected');
  });

  test('unchecking a square and reloading keeps it unchecked', () => {
    const first = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const firstSquares = Array.from(first.container.querySelectorAll('.bingo-square'));

    fireEvent.click(firstSquares[0]);
    fireEvent.click(firstSquares[0]);
    first.unmount();

    const second = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const secondSquares = Array.from(second.container.querySelectorAll('.bingo-square'));

    expect(secondSquares[0]).not.toHaveClass('selected');
  });

  test('checked squares do not persist across reloads when no seed is provided', () => {
    const first = render(<Bingo phrases={phrases} />);
    const firstSquares = Array.from(first.container.querySelectorAll('.bingo-square'));

    fireEvent.click(firstSquares[0]);
    expect(firstSquares[0]).toHaveClass('selected');

    first.unmount();

    const second = render(<Bingo phrases={phrases} />);
    const secondSquares = Array.from(second.container.querySelectorAll('.bingo-square'));

    secondSquares.forEach(square => {
      expect(square).not.toHaveClass('selected');
    });
  });

  test('checked squares are isolated per seed', () => {
    const seedOne = render(<Bingo phrases={phrases} seed="seed-one" />);
    const seedOneSquares = Array.from(seedOne.container.querySelectorAll('.bingo-square'));
    fireEvent.click(seedOneSquares[0]);
    seedOne.unmount();

    const seedTwo = render(<Bingo phrases={phrases} seed="seed-two" />);
    const seedTwoSquares = Array.from(seedTwo.container.querySelectorAll('.bingo-square'));

    seedTwoSquares.forEach(square => {
      expect(square).not.toHaveClass('selected');
    });
  });

  test('renders "New board" and "Clear board" buttons by default', () => {
    render(<Bingo phrases={phrases} />);

    expect(screen.getByRole('button', { name: 'New board' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear board' })).toBeInTheDocument();
  });

  test('hides the "New board" button when hideNewBoardButton is set', () => {
    render(<Bingo phrases={phrases} hideNewBoardButton />);

    expect(screen.queryByRole('button', { name: 'New board' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear board' })).toBeInTheDocument();
  });

  test('hides the "Clear board" button when hideClearBoardButton is set', () => {
    render(<Bingo phrases={phrases} hideClearBoardButton />);

    expect(screen.getByRole('button', { name: 'New board' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear board' })).not.toBeInTheDocument();
  });

  test('hides both buttons when both are set', () => {
    render(<Bingo phrases={phrases} hideNewBoardButton hideClearBoardButton />);

    expect(screen.queryByRole('button', { name: 'New board' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Clear board' })).not.toBeInTheDocument();
  });

  test('clicking "New board" reshuffles the board and updates the URL hash', () => {
    const { container } = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const firstText = Array.from(container.querySelectorAll('.bingo-square'))
      .map(square => square.textContent);

    fireEvent.click(screen.getByRole('button', { name: 'New board' }));

    const secondText = Array.from(container.querySelectorAll('.bingo-square'))
      .map(square => square.textContent);

    expect(secondText).not.toEqual(firstText);
    expect(window.location.hash).not.toBe('');
    expect(window.location.hash).not.toBe('#shared-seed');
  });

  test('clicking "New board" clears any checked squares', () => {
    const { container } = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const squares = Array.from(container.querySelectorAll('.bingo-square'));
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveClass('selected');

    fireEvent.click(screen.getByRole('button', { name: 'New board' }));

    const squaresAfter = Array.from(container.querySelectorAll('.bingo-square'));
    squaresAfter.forEach(square => {
      expect(square).not.toHaveClass('selected');
    });
  });

  test('a board loads the seed already present in the URL hash', () => {
    window.location.hash = '#shared-seed';

    const withHash = render(<Bingo phrases={phrases} />);
    const withHashText = Array.from(withHash.container.querySelectorAll('.bingo-square'))
      .map(square => square.textContent);
    withHash.unmount();

    const withSeedProp = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const withSeedPropText = Array.from(withSeedProp.container.querySelectorAll('.bingo-square'))
      .map(square => square.textContent);

    expect(withHashText).toEqual(withSeedPropText);
  });

  test('clicking "Clear board" resets checked squares without reshuffling', () => {
    const { container } = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const squares = Array.from(container.querySelectorAll('.bingo-square'));
    fireEvent.click(squares[0]);
    fireEvent.click(squares[5]);
    const textBefore = squares.map(square => square.textContent);

    fireEvent.click(screen.getByRole('button', { name: 'Clear board' }));

    const squaresAfter = Array.from(container.querySelectorAll('.bingo-square'));
    const textAfter = squaresAfter.map(square => square.textContent);

    expect(textAfter).toEqual(textBefore);
    squaresAfter.forEach(square => {
      expect(square).not.toHaveClass('selected');
    });
  });

  test('clearing the board persists after a reload', () => {
    const first = render(<Bingo phrases={phrases} seed="shared-seed" />);
    const firstSquares = Array.from(first.container.querySelectorAll('.bingo-square'));
    fireEvent.click(firstSquares[0]);

    fireEvent.click(screen.getByRole('button', { name: 'Clear board' }));
    first.unmount();

    const second = render(<Bingo phrases={phrases} seed="shared-seed" />);
    Array.from(second.container.querySelectorAll('.bingo-square')).forEach(square => {
      expect(square).not.toHaveClass('selected');
    });
  });
});
