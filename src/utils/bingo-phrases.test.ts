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

  test('same seed should produce the same board', () => {
    const first = getBingoPhrases(stubPhrases, undefined, 'shared-seed');
    const second = getBingoPhrases(stubPhrases, undefined, 'shared-seed');
    expect(first).toEqual(second);
  });

  test('different seeds should (typically) produce different boards', () => {
    const first = getBingoPhrases(stubPhrases, undefined, 'seed-one');
    const second = getBingoPhrases(stubPhrases, undefined, 'seed-two');
    expect(first).not.toEqual(second);
  });

  test('numeric seeds are supported', () => {
    const first = getBingoPhrases(stubPhrases, undefined, 12345);
    const second = getBingoPhrases(stubPhrases, undefined, 12345);
    expect(first).toEqual(second);
  });
});
