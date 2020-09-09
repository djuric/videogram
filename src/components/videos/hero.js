import React from "react"
import Img from "gatsby-image"
import DefaultImg from "../../assets/images/noimage.png"
import { Link, useStaticQuery, graphql } from "gatsby"
import { getVideoLink } from "../../utils/url"

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
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(maxWidth: 635) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  if (videos.nodes.length === 0) {
    return null
  }

  const { title, excerpt, slug, featuredImage } = videos.nodes[0]

  return (
    <div className="hero bg-primary text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-12">
            <Link to={getVideoLink(slug)}>
              {featuredImage ? (
                <Img
                  fluid={featuredImage.node.imageFile.childImageSharp.fluid}
                  alt={featuredImage.node.altText}
                />
              ) : (
                <img src={DefaultImg} className="img-fluid" alt={title} />
              )}
            </Link>
          </div>
          <div className="col-lg-5 col-md-12">
            <p className="h1">{title}</p>
            <div
              className="lead"
              dangerouslySetInnerHTML={{
                __html: excerpt,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
