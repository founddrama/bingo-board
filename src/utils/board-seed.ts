export function readSeedFromHash(): string | undefined {
  try {
    const hash = window.location.hash.slice(1);
    return hash.length > 0 ? hash : undefined;
  } catch {
    return undefined;
  }
}

export function writeSeedToHash(seed: string | number): void {
  try {
    window.location.hash = String(seed);
  } catch {
    // window/location may be unavailable -- URL sync is best-effort
  }
}

export function generateSeed(): string {
  return Math.random().toString(36).slice(2, 10);
}
