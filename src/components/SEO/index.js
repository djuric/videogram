import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"

const SEO = ({ title, lang, description }) => {
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

  const meta = []

  const pageTitle = title
    ? `${title} - ${siteTitle}`
    : `${siteTitle} - ${siteTagline}`

  if (description) {
    meta.push({
      name: "description",
      content: description,
    })
  } else if (!title) {
    meta.push({
      name: "description",
      content: siteTagline,
    })
  }

  return <Helmet title={pageTitle} htmlAttributes={{ lang }} meta={meta} />
}

export default SEO

SEO.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  lang: PropTypes.string,
}

SEO.defaultProps = {
  title: false,
  description: false,
  lang: "en",
}
