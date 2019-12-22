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
          {edges.length ? (
            <div className="row">
              {edges.map(({ node }) => {
                return <VideoItem key={node.id} data={node} />
              })}
            </div>
          ) : (
            <p>There are no videos found in this category.</p>
          )}
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
