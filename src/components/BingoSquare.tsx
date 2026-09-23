import React from 'react';
import { BingoSquareProps } from '../types';

function generateCssClassNames(
  phrase: string,
  selected: boolean | undefined,
  squareClassResolver: BingoSquareProps['squareClassResolver']
): string {
  const classNames = ['bingo-square'];
  if (selected) {
    classNames.push('selected');
  }

  if (squareClassResolver && typeof squareClassResolver === 'function') {
    classNames.push(squareClassResolver(phrase));
  }

  return classNames.filter(cls => typeof cls === 'string').join(' ');
}

function BingoSquare({ phrase, selected, onToggle, squareClassResolver }: BingoSquareProps): JSX.Element {
  const onClick: React.MouseEventHandler = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const classNames = generateCssClassNames(phrase, selected, squareClassResolver);

  return (
    <div className={classNames} onClick={onClick}>
      <span>{phrase}</span>
    </div>
  );
}

export default React.memo(BingoSquare);
