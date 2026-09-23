import { fireEvent, render, screen } from '@testing-library/react';
import BingoSquare from './BingoSquare';

describe('<BingoSquare />', () => {
  const phrase = 'Square phrase';

  test('should render the phrase', () => {
    render(<BingoSquare phrase={phrase} />);
    expect(screen.getByText(phrase)).toBeInTheDocument();
  });

  test('should render .selected when the "selected" prop is true', () => {
    const { container } = render(<BingoSquare phrase={phrase} selected />);

    expect(container.querySelector('.selected')).toBeInTheDocument();
  });

  test('should not render .selected when the "selected" prop is false', () => {
    const { container } = render(<BingoSquare phrase={phrase} selected={false} />);

    expect(container.querySelector('.selected')).not.toBeInTheDocument();
  });

  test('should call onToggle when clicked', () => {
    const onToggle = jest.fn();
    const { container } = render(<BingoSquare phrase={phrase} onToggle={onToggle} />);
    fireEvent.click(container.querySelector('.bingo-square')!);

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  test('should not throw when clicked without an onToggle handler', () => {
    const { container } = render(<BingoSquare phrase={phrase} />);

    expect(() => {
      fireEvent.click(container.querySelector('.bingo-square')!);
    }).not.toThrow();
  });

  test('should apply a CSS class from squareClassResolver', () => {
    const simpleCls = () => 'simple-css-class';
    const { container } = render(<BingoSquare phrase={phrase} squareClassResolver={simpleCls} />);

    expect(container.querySelector('.simple-css-class')).toBeInTheDocument();
  });
});
