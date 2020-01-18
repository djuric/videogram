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
  return `/video-category/${slug}`
}

/**
 * Get navigation menu link based on base URL
 */
function getNavigationLink(url) {
  const baseUrl = process.env.WORDPRESS_URL
  return url ? url.replace(baseUrl, "") : "/"
}

export { getVideoLink, getVideoCategoryLink, getNavigationLink }
