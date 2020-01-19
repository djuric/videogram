import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"

const SEO = ({ title, lang }) => {
  const data = useStaticQuery(graphql`
    query {
      wp {
        generalSettings {
          title
          siteTagline: description
        }
      }
    }
  `)

  const {
    wp: {
      generalSettings: { title: siteTitle, siteTagline },
    },
  } = data

  const pageTitle = title
    ? `${title} - ${siteTitle}`
    : `${siteTitle} - ${siteTagline}`

  return <Helmet title={pageTitle} htmlAttributes={{ lang }} />
}

export default SEO

SEO.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  lang: PropTypes.string,
}

SEO.defaultProps = {
  title: false,
  lang: "en",
}
