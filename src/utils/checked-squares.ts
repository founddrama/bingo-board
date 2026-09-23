const STORAGE_KEY_PREFIX = 'bingo-board:checked';

function storageKey(seed: string | number): string {
  return `${STORAGE_KEY_PREFIX}:${seed}`;
}

export function loadCheckedSquares(seed?: string | number): Set<number> {
  if (seed === undefined) {
    return new Set();
  }

  try {
    const raw = window.localStorage.getItem(storageKey(seed));
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed)
      ? new Set(parsed.filter((value): value is number => typeof value === 'number'))
      : new Set();
  } catch {
    return new Set();
  }
}

export function saveCheckedSquares(seed: string | number | undefined, checked: Set<number>): void {
  if (seed === undefined) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey(seed), JSON.stringify(Array.from(checked)));
  } catch {
    // localStorage may be unavailable (private browsing, quota, etc.) -- persistence is best-effort
  }
}
