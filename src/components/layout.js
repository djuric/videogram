import React from "react"
import Header from "./header"
import Navigation from "./navigation"
import Footer from "./footer"
import "../styles/bootstrap.min.css"

export default ({ children }) => {
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
    },
  ]

  return (
    <div className="wrapper">
      <Header />
      <Navigation items={menuItems} />
      {children}
      <Footer />
    </div>
  )
}
