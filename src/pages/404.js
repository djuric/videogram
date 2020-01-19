import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import SEO from "../components/SEO"

export default () => (
  <Layout>
    <SEO title="Page not found" />
    <div className="container py-5">
      <h1>404 - Not Found</h1>
      <h3>Oops! That page can't be found.</h3>
      <p>
        It looks like there is nothing here. Click{" "}
        <Link to="/">
          <b>here</b>
        </Link>{" "}
        to return to homepage.
      </p>
    </div>
  </Layout>
)
