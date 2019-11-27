const path = require(`path`)
const { VideoFragment } = require(`../src/templates/videos/data`)

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

  const GET_VIDEOS = `
    query Videos($first: Int, $after: String) {
      wp {
        videos(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              ...VideoFragment
            }
          }
        }
      }
    }

    ${VideoFragment}
  `

  /**
   * All fetched videos are saved here.
   */
  const allVideos = []

  /**
   * Recursive function used for filling allVideos variable. When this
   * function is finished then we know allVideos is filled with fetched videos.
   *
   * @param {int} first Number of videos to fetch.
   * @param {null|string} after Pagination end cursor.
   */
  const fetchVideos = async (first, after) => {
    const {
      data: {
        wp: {
          videos: {
            pageInfo: { hasNextPage, endCursor },
            edges,
          },
        },
      },
    } = await graphql(GET_VIDEOS, { first, after })

    edges.forEach(({ node }) => {
      console.log(`Fetched video page: ${node.slug}`)
      allVideos.push(node)
    })

    if (hasNextPage) {
      return fetchVideos(first, endCursor)
    }

    return allVideos
  }

  /**
   * Fetch videos in batches by 50 videos per request
   */
  const fetchedVideos = await fetchVideos(50, null)

  /**
   * Create video page for each video stored in allVideos
   */
  fetchedVideos.forEach(video => {
    console.log(`Creating video page: /${video.slug}/`)
    createPage({
      path: video.slug,
      component: path.resolve("./src/templates/videos/single.js"),
      context: {
        ...video,
      },
    })
  })
}
