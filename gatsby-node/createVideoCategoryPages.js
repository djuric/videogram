const path = require(`path`)

module.exports = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query Categories {
      wp {
        videoCategories {
          edges {
            node {
              slug
              name
            }
          }
        }
      }
    }
  `)

  result.data.wp.videoCategories.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve("./src/templates/video-categories/category.js"),
      context: {
        ...node,
      },
    })
  })
}
