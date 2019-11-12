const path = require(`path`)

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

  /**
   * todo: Implement pagination so that videos are fetched in batches when we have large number of videos to fetch */
  const result = await graphql(`
    query Videos {
      wp {
        videos {
          edges {
            node {
              slug
              title
              embedded_code
              length
              videoCategories(first: 5) {
                edges {
                  node {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  result.data.wp.videos.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve("./src/templates/videos/single.js"),
      context: {
        ...node,
      },
    })
  })
}
