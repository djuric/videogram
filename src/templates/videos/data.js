const VideoFragment = `
    fragment VideoFragment on WP_Video {
        id
        databaseId
        title
        slug
        embedded_code
        length
        featuredImage {
          node {
            altText
            mediaItemUrl
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(maxWidth: 510) {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
        }
        videoCategories(first: 5) {
          nodes {
            id
            name
            slug
          }
        }
    }
`

module.exports.VideoFragment = VideoFragment
