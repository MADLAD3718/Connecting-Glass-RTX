/**
 * Sets the bit at postion `k` in `n` to `1`.
 * @param {Number} n 
 * @param {Number} k 
 * @returns {Number}
 */
export function setBit(n, k) {
    return n | 1 << k;
}

/**
 * Sets the bit at position `k` in `n` to `0`.
 * @param {Number} n 
 * @param {Number} k 
 * @returns {Number}
 */
export function resetBit(n, k) {
    return n & ~(1 << k);
}