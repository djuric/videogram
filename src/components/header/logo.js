import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const {
    site: {
      siteMetadata: { title },
    },
  } = data

  return (
    <Link className="navbar-brand" to="/">
      {title}
    </Link>
  )
}
