import React from 'react';
import { BingoSquareProps } from '../types';

class BingoSquare extends React.PureComponent<BingoSquareProps> {
  onClick: React.MouseEventHandler = () => {
    const { onToggle } = this.props;

    if (onToggle) {
      onToggle();
    }
  }

  generateCssClassNames = (phrase: string): string => {
    const { selected, squareClassResolver } = this.props;

    const classNames = ['bingo-square'];
    if (selected) {
      classNames.push('selected');
    }

    if (squareClassResolver && typeof squareClassResolver === 'function') {
      classNames.push(squareClassResolver(phrase));
    }

    return classNames.filter(cls => typeof cls === 'string').join(' ');
  }

  render(): JSX.Element {
    const { phrase } = this.props;

    const classNames = this.generateCssClassNames(phrase);

    return (
      <div className={classNames} onClick={this.onClick}>
        <span>{phrase}</span>
      </div>
    );
  }
}

export default BingoSquare;
