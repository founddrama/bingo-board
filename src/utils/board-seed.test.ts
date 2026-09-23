import { generateSeed, readSeedFromHash, writeSeedToHash } from './board-seed';

describe('board-seed', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  test('readSeedFromHash returns undefined when there is no hash', () => {
    expect(readSeedFromHash()).toBeUndefined();
  });

  test('readSeedFromHash returns the hash value without the leading "#"', () => {
    window.location.hash = '#jxwyosse';

    expect(readSeedFromHash()).toBe('jxwyosse');
  });

  test('writeSeedToHash sets the URL hash to the given seed', () => {
    writeSeedToHash('jxwyosse');

    expect(window.location.hash).toBe('#jxwyosse');
  });

  test('writeSeedToHash stringifies numeric seeds', () => {
    writeSeedToHash(12345);

    expect(window.location.hash).toBe('#12345');
  });

  test('generateSeed produces a non-empty string', () => {
    const seed = generateSeed();

    expect(typeof seed).toBe('string');
    expect(seed.length).toBeGreaterThan(0);
  });

  test('generateSeed produces different values across calls', () => {
    const seeds = new Set(Array.from({ length: 20 }, () => generateSeed()));

    expect(seeds.size).toBeGreaterThan(1);
  });
});
