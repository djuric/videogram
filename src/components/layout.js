import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Navigation from "./navigation"
import Footer from "./footer"
import "../styles/bootstrap.min.css"

export default ({ children }) => {
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

  const menuItems = [
    {
      id: 1,
      title: "Home",
      url: "/",
      icon: false,
    },
    {
      id: 2,
      title: "Contact Us",
      url: "/",
      icon: false,
    },
    {
      id: 3,
      title: "About Us",
      url: "/",
      icon: false,
    }
  ]

  return (
    <div className="wrapper">
      <Header logoText={title} />
      <Navigation items={menuItems} />
      {children}
      <Footer />
    </div>
  )
}
