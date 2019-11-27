/**
 * Paths and URLs related functions
 */

/**
 * Get single video page link
 *
 * @param {string} slug Video slu
 * @return {string} Video URL
 */
function getVideoLink(slug) {
  return `/${slug}`
}

/**
 * Get video category page link
 *
 * @param {string} slug Category slug
 * @return {string} Video category URL
 */
function getVideoCategoryLink(slug) {
  return `/category/${slug}`
}

export { getVideoLink, getVideoCategoryLink }
