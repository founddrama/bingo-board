import getBingoPhrases, { FREE } from './bingo-phrases';

const stubPhrases = [...new Array(25)].map((_, i) => `${i}`);

describe('getBingoSquares()', () => {
  test('it should return 25 phrases', () => {
    expect(getBingoPhrases(stubPhrases)).toHaveLength(25);
  });

  test('it should contain "FREE" as the center square', () => {
    const squares = getBingoPhrases(stubPhrases);
    expect(squares).toContain(FREE);
    expect(squares[12]).toBe(FREE);
  });

  test('second argument should override "FREE" space', () => {
    const DIFFERENT = 'DIFFERENT';
    const squares = getBingoPhrases(stubPhrases, DIFFERENT);
    expect(squares).toContain(DIFFERENT);
    expect(squares[12]).toBe(DIFFERENT);
  });
});
