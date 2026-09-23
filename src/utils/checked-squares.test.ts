import { loadCheckedSquares, saveCheckedSquares } from './checked-squares';

describe('checked-squares storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('loadCheckedSquares returns an empty set when nothing is stored', () => {
    expect(loadCheckedSquares('some-seed')).toEqual(new Set());
  });

  test('loadCheckedSquares returns an empty set when no seed is given', () => {
    saveCheckedSquares('some-seed', new Set([1, 2, 3]));

    expect(loadCheckedSquares(undefined)).toEqual(new Set());
  });

  test('saveCheckedSquares is a no-op when no seed is given', () => {
    saveCheckedSquares(undefined, new Set([1, 2, 3]));

    expect(window.localStorage.length).toBe(0);
  });

  test('round-trips a set of checked squares under the same seed', () => {
    saveCheckedSquares('shared-seed', new Set([111, 222, 333]));

    expect(loadCheckedSquares('shared-seed')).toEqual(new Set([111, 222, 333]));
  });

  test('numeric seeds are supported, and equivalent string/numeric seeds share storage', () => {
    saveCheckedSquares(12345, new Set([1]));

    expect(loadCheckedSquares(12345)).toEqual(new Set([1]));
    expect(loadCheckedSquares('12345')).toEqual(new Set([1]));
  });

  test('different seeds are stored independently', () => {
    saveCheckedSquares('seed-one', new Set([1, 2]));
    saveCheckedSquares('seed-two', new Set([3, 4]));

    expect(loadCheckedSquares('seed-one')).toEqual(new Set([1, 2]));
    expect(loadCheckedSquares('seed-two')).toEqual(new Set([3, 4]));
  });

  test('saving an empty set clears previously checked squares', () => {
    saveCheckedSquares('shared-seed', new Set([1, 2]));
    saveCheckedSquares('shared-seed', new Set());

    expect(loadCheckedSquares('shared-seed')).toEqual(new Set());
  });

  test('loadCheckedSquares recovers from corrupt stored data', () => {
    window.localStorage.setItem('bingo-board:checked:shared-seed', 'not valid json');

    expect(loadCheckedSquares('shared-seed')).toEqual(new Set());
  });

  test('loadCheckedSquares ignores non-array stored data', () => {
    window.localStorage.setItem('bingo-board:checked:shared-seed', JSON.stringify({ foo: 'bar' }));

    expect(loadCheckedSquares('shared-seed')).toEqual(new Set());
  });
});
