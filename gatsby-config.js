/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `VideoGram`,
  },
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "WP",
        fieldName: "wp",
        url: "http://videogram.loc/graphql",
        refetchInterval: 60,
      },
    },
  ],
}
