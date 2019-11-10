const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query Videos {
      wp {
        videos {
          edges {
            node {
              slug
              videoId
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
        videoId: node.videoId,
      },
    })
  })
}
