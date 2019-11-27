const VideoFragment = `
    fragment VideoFragment on WP_Video {
        id
        title
        slug
        embedded_code
        length
        featuredImage {
            altText
            mediaItemUrl
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
