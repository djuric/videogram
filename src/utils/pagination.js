/**
 * Common utility functions for pagination
 */

/**
 * Get page number from URL. Only used in cases when URL is in format ../page/{number} which is common for pagination
 *
 * @param {string} url URL to parse
 * @return {int} Page number
 */
function getPageNumber(url) {
  const lastSegment = url.split("/page/").pop()
  return isNaN(lastSegment) ? 1 : Number(lastSegment)
}

/**
 *
 * @param {number} pageNumber Page number
 * @param {string} basePath Base URL
 * @return {string} URL formatted for pagination
 */
function getPageNumberLink(pageNumber, basePath) {
  if (pageNumber <= 1) {
    return basePath
  }
  return `${basePath}/page/${pageNumber}`
}

export { getPageNumber, getPageNumberLink }
