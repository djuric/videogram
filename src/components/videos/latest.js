import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import VideoItem from "./video-item"

export default () => {
  const query = graphql`
    query Videos {
      wp {
        videos {
          edges {
            node {
              slug
              title
              length
              videoCategories(first: 1) {
                edges {
                  node {
                    id
                    name
                    slug
                  }
                }
              }
              featuredImage {
                altText
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  `
  const data = useStaticQuery(query)
  console.log(data)

  return (
    <div className="videos-latest">
      <h2>Latest Videos</h2>
      <div class="videogallery py-5">
        <div class="container">
          <div class="row">
            {data.wp.videos.edges.map(({ node }) => {
              console.log(node)
              return <VideoItem data={node} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
