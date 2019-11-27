/**
 * Common utility functions. They can be removed and replaced with 'lodash' later if needed
 */

/**
 * Get range of numbers
 *
 * @param {number} start Starting number
 * @param {number} end End of the range
 * @return {Array} Resulting array
 */
function range(start, end, step = 1) {
  return Array.from(
    { length: (end - start) / step + 1 },
    (_, i) => start + i * step
  )
}

export { range }
