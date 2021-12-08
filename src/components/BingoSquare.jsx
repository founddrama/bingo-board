import React from 'react';

class BingoSquare extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { selected: false };
  }

  onClick = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected });
  }

  generateCssClassNames = (phrase) => {
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

  render() {
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
