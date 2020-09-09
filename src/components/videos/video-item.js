import React from "react"
import Img from "gatsby-image"
import DefaultImg from "../../assets/images/noimage.png"
import { getVideoLink, getVideoCategoryLink } from "../../utils/url"
import { Link } from "gatsby"
import { Icon } from "react-icons-kit"
import { play3 } from "react-icons-kit/icomoon/play3"

export default props => {
  const {
    data: { title, slug, length, videoCategories, featuredImage },
    showCategory,
  } = props

  return (
    <div className="col-md-6 col-lg-4">
      <div className="videoitem">
        <Link to={getVideoLink(slug)} className="videoitem-image">
          {featuredImage ? (
            <Img
              fluid={featuredImage.node.imageFile.childImageSharp.fluid}
              alt={title}
            />
          ) : (
            <img src={DefaultImg} className="img-fluid" alt={title} />
          )}
        </Link>
        <h3 className="videoitem-title pt-1">
          <Link to={getVideoLink(slug)}>{title}</Link>
        </h3>
        <div className="videoitem-meta pb-2">
          <div className="row">
            <div className="col-6">
              {showCategory && videoCategories.nodes.length > 0 && (
                <Link
                  key={videoCategories.nodes[0].id}
                  to={getVideoCategoryLink(videoCategories.nodes[0].slug)}
                  className="badge badge-primary"
                >
                  {videoCategories.nodes[0].name}
                </Link>
              )}
            </div>
            <div className="col-6 text-right">
              {length.length > 0 && (
                <span className="videoitem-length d-flex align-items-center justify-content-end">
                  <Icon icon={play3} />
                  <span className="videoitem-length-time">{length}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
