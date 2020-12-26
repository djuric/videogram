import React from "react"
import DefaultImg from "../../../assets/images/noimage.png"
import { getVideoLink } from "../../../utils/url"
import { Link } from "gatsby"
import { Icon } from "react-icons-kit"
import { bin } from "react-icons-kit/icomoon/bin"

export default props => {
  const {
    data: { databaseId, title, slug, featuredImage },
    onRemoveFavorites,
    removingVideoId,
  } = props

  return (
    <div className="videoitem-favorites mb-3">
      <div className="row">
        <div className="col-sm-3">
          <Link to={getVideoLink(slug)} className="videoitem-image">
            {featuredImage ? (
              <img
                src={featuredImage.node.sourceUrl}
                className="img-fluid"
                alt={title}
              />
            ) : (
              <img src={DefaultImg} className="img-fluid" alt={title} />
            )}
          </Link>
        </div>
        <div className="col-sm-9">
          <h3 className="videoitem-title pt-1">
            <Link to={getVideoLink(slug)}>{title}</Link>
          </h3>
          <p>
            <button
              onClick={() => onRemoveFavorites(databaseId)}
              className="btn btn-sm btn-light"
              disabled={removingVideoId === databaseId}
            >
              <Icon icon={bin} />{" "}
              {removingVideoId === databaseId ? "Removing..." : "Remove"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
