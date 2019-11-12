const createVideoPages = require("./gatsby-node/createVideoPages")
const createVideoCategoryPages = require("./gatsby-node/createVideoCategoryPages")

exports.createPages = async ({ graphql, actions }) => {
  await createVideoPages({ graphql, actions })
  await createVideoCategoryPages({ graphql, actions })
}
