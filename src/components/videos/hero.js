import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const {
    wp: { videos },
  } = useStaticQuery(graphql`
    query Video {
      wp {
        videos(first: 1, where: { featured: true }) {
          nodes {
            title
            excerpt
            embedded_code
          }
        }
      }
    }
  `)

  return (
    <div className="hero bg-primary text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-12">
            <div
              className="embed-responsive embed-responsive-16by9"
              dangerouslySetInnerHTML={{
                __html: videos.nodes[0].embedded_code,
              }}
            />
          </div>
          <div className="col-lg-4 col-md-12">
            <p className="h1">{videos.nodes[0].title}</p>
            <div
              className="lead"
              dangerouslySetInnerHTML={{
                __html: videos.nodes[0].excerpt,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
