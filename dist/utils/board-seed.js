export function readSeedFromHash() {
    try {
        const hash = window.location.hash.slice(1);
        return hash.length > 0 ? hash : undefined;
    }
    catch (_a) {
        return undefined;
    }
}
export function writeSeedToHash(seed) {
    try {
        window.location.hash = String(seed);
    }
    catch (_a) {
        // window/location may be unavailable -- URL sync is best-effort
    }
}
export function generateSeed() {
    return Math.random().toString(36).slice(2, 10);
}
//# sourceMappingURL=board-seed.js.map