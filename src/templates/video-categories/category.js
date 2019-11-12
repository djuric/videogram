import React from "react"
import Layout from "../../components/layout"

export default ({ pageContext: { name } }) => (
  <Layout>
    <h1>{name}</h1>
  </Layout>
)
