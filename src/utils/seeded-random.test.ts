import createRandom from './seeded-random';

describe('createRandom()', () => {
  test('same seed produces the same sequence', () => {
    const a = createRandom(42);
    const b = createRandom(42);

    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  test('different seeds produce different sequences', () => {
    const a = createRandom(42);
    const b = createRandom(43);

    expect(a()).not.toEqual(b());
  });

  test('returns values in the [0, 1) range', () => {
    const random = createRandom(1);

    for (let i = 0; i < 100; i++) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
