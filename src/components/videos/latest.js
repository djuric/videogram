import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import VideoItem from "./video-item"

export default () => {
  const query = graphql`
    query Videos {
      wp {
        videos(first: 12) {
          edges {
            node {
              id
              title
              slug
              embedded_code
              length
              featuredImage {
                node {
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(maxWidth: 510) {
                        ...GatsbyImageSharpFluid
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
          }
        }
      }
    }
  `

  const data = useStaticQuery(query)

  return (
    <div className="videos-latest py-3">
      <div className="container">
        <h2>Latest Videos</h2>
        <div className="videogallery">
          <div className="row">
            {data.wp.videos.edges.map(({ node }) => {
              return <VideoItem key={node.id} data={node} showCategory={true} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
