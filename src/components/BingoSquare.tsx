import React, { useState } from 'react';
import { BingoSquareProps } from '../types';

function BingoSquare({ phrase, squareClassResolver }: BingoSquareProps): JSX.Element {
  const [ selected, setSelected ] = useState(false);
  const onClick: React.MouseEventHandler = () => {
    setSelected(!selected);
  };

  const generateCssClassNames = (phrase: string): string => {
    const classNames = ['bingo-square'];
    if (selected) {
      classNames.push('selected');
    }
    
    if (squareClassResolver && typeof squareClassResolver === 'function') {
      classNames.push(squareClassResolver(phrase));
    }

    return classNames.filter(cls => typeof cls === 'string').join(' ');
  };

  const classNames = generateCssClassNames(phrase);

  return (
    <div className={classNames} onClick={onClick}>
      <span>{phrase}</span>
    </div>
  );
}

export default BingoSquare;
