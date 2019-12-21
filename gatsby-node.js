const createVideoPages = require("./gatsby-node/createVideoPages")
const createVideoCategoryPages = require("./gatsby-node/createVideoCategoryPages")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions }) => {
  await createVideoPages({ graphql, actions })
  await createVideoCategoryPages({ graphql, actions })
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions
  createResolvers({
    WP_MediaItem: {
      imageFile: {
        type: "File",
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.sourceUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}
