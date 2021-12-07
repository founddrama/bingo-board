import squareClassResolver from "./square-class-resolver";
import { FREE } from '../utils/bingo-phrases';

describe('squareClassResolver', () => {
  test('should .free-square when phrase is "FREE"', () => {
    expect(squareClassResolver(FREE)).toBe('free-square');
  });

  test('should return an empty string for anything else', () => {
    expect(squareClassResolver('anything else')).toBe('');
  });
});
