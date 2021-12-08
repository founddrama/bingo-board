import React from 'react';
import { BingoSquareProps } from '../types';

type BingoSquareState = {
  selected: boolean;
};

class BingoSquare extends React.PureComponent<BingoSquareProps, BingoSquareState> {
  constructor(props: BingoSquareProps) {
    super(props);

    this.state = { selected: false };
  }

  onClick: React.MouseEventHandler = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected });
  }

  generateCssClassNames = (phrase: string): string => {
    const { squareClassResolver } = this.props;

    const classNames = ['bingo-square'];
    if (this.state.selected) {
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
