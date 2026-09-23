const STORAGE_KEY_PREFIX = 'bingo-board:checked';
function storageKey(seed) {
    return `${STORAGE_KEY_PREFIX}:${seed}`;
}
export function loadCheckedSquares(seed) {
    if (seed === undefined) {
        return new Set();
    }
    try {
        const raw = window.localStorage.getItem(storageKey(seed));
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed)
            ? new Set(parsed.filter((value) => typeof value === 'number'))
            : new Set();
    }
    catch (_a) {
        return new Set();
    }
}
export function saveCheckedSquares(seed, checked) {
    if (seed === undefined) {
        return;
    }
    try {
        window.localStorage.setItem(storageKey(seed), JSON.stringify(Array.from(checked)));
    }
    catch (_a) {
        // localStorage may be unavailable (private browsing, quota, etc.) -- persistence is best-effort
    }
}
//# sourceMappingURL=checked-squares.js.map