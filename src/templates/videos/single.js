import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { Icon } from "react-icons-kit"
import { play3 } from "react-icons-kit/icomoon/play3"
import { facebook2 } from "react-icons-kit/icomoon/facebook2"
import { twitter } from "react-icons-kit/icomoon/twitter"
import { whatsapp } from "react-icons-kit/icomoon/whatsapp"

export default ({ data }) => (
  <Layout>
    <div className="playtime bg-primary">
      <div className="container">
        <div className="row">
          <div className="col-12 px-0 px-md-3">
            <div className="embed-responsive embed-responsive-16by9 bg-dark">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.wp.videoBy.embedded_code,
                }}
              />
            </div>
          </div>
        </div>
        <h1 className="playtime-title">{data.wp.videoBy.title}</h1>
        <div className="playtime-meta pb-2">
          <div className="row">
            <div className="col-6">
              <span className="badge badge-danger">CATEGORY</span>
            </div>
            <div className="col-6 text-right text-white">
              <span className="videoitem-length d-flex align-items-center justify-content-end">
                <Icon icon={play3} />
                <span className="videoitem-length-time">
                  {data.wp.videoBy.length}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query($videoId: Int!) {
    wp {
      videoBy(videoId: $videoId) {
        title
        embedded_code
        length
      }
    }
  }
`
