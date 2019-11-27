import React from "react"
import Layout from "../../components/layout"
import VideoItem from "../../components/videos/video-item"
import Pagination from "../../components/pagination"

export default props => {
  const {
    pageContext: { edges, name, pagination },
    location: { pathname },
  } = props

  return (
    <Layout>
      <div className="container">
        <h1>{name}</h1>
        <div className="videogallery">
          <div className="row">
            {edges.map(({ node }) => {
              return <VideoItem key={node.id} data={node} />
            })}
          </div>
        </div>
        <Pagination
          totalPages={pagination.totalPages}
          description="Video category pages"
          basePath={pagination.basePath}
          currentPath={pathname}
        />
      </div>
    </Layout>
  )
}
