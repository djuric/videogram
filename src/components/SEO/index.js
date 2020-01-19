import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"

const SEO = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  const {
    wp: {
      generalSettings: { title: siteTitle, description },
    },
  } = data

  return (
    <Helmet>
      <title>
        {title ? `${title} - ${siteTitle}` : `${siteTitle} - ${description}`}
      </title>
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

SEO.defaultProps = {
  title: false,
}
