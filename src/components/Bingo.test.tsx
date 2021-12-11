import { render, screen } from '@testing-library/react';
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
});
