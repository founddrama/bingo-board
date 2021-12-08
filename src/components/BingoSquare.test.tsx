import { fireEvent, render, screen } from '@testing-library/react';
import BingoSquare from './BingoSquare';

describe('<BingoSquare />', () => {
  const phrase = 'Square phrase';

  test('should render the phrase', () => {
    render(<BingoSquare phrase={phrase} />);
    expect(screen.getByText(phrase)).toBeInTheDocument();
  });

  test('should render .selected after being clicked', () => {
    const { container } = render(<BingoSquare phrase={phrase} />);
    fireEvent.click(container.querySelector('.bingo-square')!);

    expect(container.querySelector('.selected')).toBeInTheDocument();
  });

  test('should apply a CSS class from squareClassResolver', () => {
    const simpleCls = () => 'simple-css-class';
    const { container } = render(<BingoSquare phrase={phrase} squareClassResolver={simpleCls} />);

    expect(container.querySelector('.simple-css-class')).toBeInTheDocument();
  });
});
