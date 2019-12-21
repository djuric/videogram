const path = require(`path`)
const { VideoFragment } = require(`../src/templates/videos/data`)

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

  /**
   * Get category Ids which we will use to generate category pages
   */
  const GET_CATEGORY_IDS = `
    query Categories($first: Int, $after: String) {
      wp {
        videoCategories(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              termTaxonomyId
            }
          }
        }
      }
    }
  `

  /**
   * Get category and video data for each category
   */
  const GET_CATEGORY_DATA = `
    query CategoriesData($first: Int, $after: String, $termTaxonomyId: [ID]) {
      wp {
        videoCategories(where: {termTaxonomId: $termTaxonomyId}) {
          nodes {
            name
            slug
            videos(first: $first, after: $after) {
              pageInfo {
                endCursor
                hasNextPage
              }
              edges {
                node {
                  ...VideoFragment
                }
              }
            }
          }
        }
      }
    }

    ${VideoFragment}
  `

  /**
   * All fetched categories and their data is saved here.
   *
   * @type {Array}
   */
  const allCategories = []

  /**
   * Number of videos per page.
   *
   * @type {number}
   */
  const videosPerPage = 9

  /**
   * Base URL for category pages.
   *
   * Must also be changed from src/utils/url.js
   * @todo possibly put categoryBase as environment variable
   *
   * Base can be removed by settings this to false but in that case uniqueness of the pages can't be guaranteed.  If there is another page with the same URL then it will be overwritten.
   *
   * It defaults to "video-category" because this is the video taxonomy slug defined in WordPress plugin. However it's not required that it matches taxonomy slug but it's helpful when taxonomy links are added from Appearance > Menus.
   *
   * @type {string}
   */
  const categoryBase = "video-category"

  /**
   * Recursive function used for filling allCategories variable. When this
   * function is finished then we know allCategories is filled with fetched category pages.
   *
   * @param {number} first Number of categories to fetch per request
   * @param {string} after endCursor for category pagination
   * @returns {Array} allCategories Fetched category pages
   */
  const fetchCategories = async (first, after) => {
    const {
      data: {
        wp: {
          videoCategories: {
            pageInfo: { hasNextPage, endCursor },
            edges,
          },
        },
      },
    } = await graphql(GET_CATEGORY_IDS, { first, after })

    for (let i = 0; i < edges.length; i++) {
      const {
        node: { termTaxonomyId },
      } = edges[i]

      const categoryPages = await fetchCategoryPages(
        videosPerPage,
        null,
        termTaxonomyId
      )

      const pagination = {
        totalPages: categoryPages.length,
        perPage: videosPerPage,
        basePath: `/${categoryPages[0].slug}`,
      }

      categoryPages.forEach((page, index) => {
        page.pagination = pagination
        const pageNumber = index + 1
        console.log(`Fetched page ${pageNumber} of /${page.slug}/ category`)

        if (index > 0) {
          page.slug = `${page.slug}/page/${pageNumber}`
        }
      })

      allCategories.push(...categoryPages)
    }

    if (hasNextPage) {
      return fetchCategories(first, endCursor)
    }

    return allCategories
  }

  /**
   * Fetch and return all pages for specific category.
   * If category has enough videos to be paginated, return those pages. Otherwise return only one page.
   *
   * @param {number} first Number of videos per page
   * @param {string} after endCursor for video pagination
   * @param {number} termTaxonomyId category Id for this term (WordPress Id)
   * @param {Array} pages Array of page objects passed recursively if there is more than one
   * @returns {Array} pages Array of page objects
   */
  const fetchCategoryPages = async (
    first,
    after,
    termTaxonomyId,
    pages = []
  ) => {
    const {
      data: {
        wp: {
          videoCategories: { nodes },
        },
      },
    } = await graphql(GET_CATEGORY_DATA, { first, after, termTaxonomyId })

    let {
      name,
      slug,
      videos: {
        pageInfo: { endCursor, hasNextPage },
        edges,
      },
    } = nodes[0]

    pages.push({
      name,
      slug: categoryBase ? `${categoryBase}/${slug}` : slug,
      edges,
    })

    if (hasNextPage) {
      return fetchCategoryPages(first, endCursor, termTaxonomyId, pages)
    }

    return pages
  }

  /**
   * Fetch categories in batches by 50 categories per request
   */
  const fetchedCategories = await fetchCategories(50, null)

  /**
   * Create category pages for each category stored in allCategories
   */
  fetchedCategories.forEach(category => {
    console.log(`Creating video category page: /${category.slug}/`)

    createPage({
      path: category.slug,
      component: path.resolve("./src/templates/video-categories/category.js"),
      context: {
        ...category,
      },
    })
  })
}
