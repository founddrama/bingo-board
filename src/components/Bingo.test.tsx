import { render, screen } from '@testing-library/react';
import Bingo from './Bingo';
import mockBaseSquareClassResolver from '../style/square-class-resolver';

jest.mock('../style/square-class-resolver');

describe('<Bingo />', () => {
  const phrases = [
    'B1', 'I1', 'N1', 'G1', 'O1',
    'B2', 'I2', 'N2', 'G2', 'O2',
    'B3', 'I3', 'FREE', 'G3', 'O3',
    'B4', 'I4', 'N4', 'G4', 'O4',
    'B5', 'I5', 'N5', 'G5', 'O5',
  ];

  test('renders FREE square', () => {
    render(<Bingo phrases={phrases} />);
    const linkElement = screen.getByText(/FREE/i);
    expect(linkElement).toBeInTheDocument();
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
});
