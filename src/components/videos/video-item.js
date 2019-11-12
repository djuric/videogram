import React from "react"
import { Link } from "gatsby"

export default ({ data: { title, featuredImage, slug, length } }) => {
  return (
    <div class="col-md-6 col-lg-4">
      <div class="videoitem">
        <Link to={`/${slug}`}>
          <img
            src={
              featuredImage
                ? featuredImage.mediaItemUrl
                : "https://via.placeholder.com/600x400"
            }
            class="videoitem-image img-fluid"
          />
        </Link>
        <div class="videoitem-meta py-1">
          <div class="row">
            <div class="col-6">
              <span class="badge badge-primary">Celebrity</span>
            </div>
            <div class="col-6 text-right">
              <span class="videoitem-length d-flex align-items-center justify-content-end">
                <ion-icon name="play"></ion-icon>
                <span class="videoitem-length-time">{length}</span>
              </span>
            </div>
          </div>
        </div>
        <h3 class="videoitem-title pb-3">
          <Link to={`/${slug}`}>{title}</Link>
        </h3>
      </div>
    </div>
  )
}
