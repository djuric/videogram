import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      wp {
        generalSettings {
          title
        }
      }
    }
  `)

  const {
    wp: {
      generalSettings: { title },
    },
  } = data

  return (
    <Link className="navbar-brand" to="/">
      {title}
    </Link>
  )
}
