import React from "react"
import Layout from "../../components/layout"
import VideosLatest from "../../components/videos/latest"
import { getVideoCategoryLink } from "../../utils/url"
import { Link } from "gatsby"
import { Icon } from "react-icons-kit"
import { play3 } from "react-icons-kit/icomoon/play3"

export default ({
  pageContext: { title, embedded_code, length, videoCategories },
}) => (
  <Layout>
    <div className="playtime bg-primary">
      <div className="container">
        <div className="row">
          <div className="col-12 px-0 px-md-3">
            <div className="embed-responsive embed-responsive-16by9 bg-dark">
              <div
                dangerouslySetInnerHTML={{
                  __html: embedded_code,
                }}
              />
            </div>
          </div>
        </div>
        <h1 className="playtime-title">{title}</h1>
        <div className="playtime-meta pb-2">
          <div className="row">
            <div className="col-6 playtime-meta-categories">
              {videoCategories.nodes.map(category => {
                return (
                  <Link
                    key={category.id}
                    to={getVideoCategoryLink(category.slug)}
                    className="badge badge-danger"
                  >
                    {category.name}
                  </Link>
                )
              })}
            </div>
            <div className="col-6 playtime-meta-length text-right text-white">
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
    <VideosLatest />
  </Layout>
)
