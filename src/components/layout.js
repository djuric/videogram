import React from "react"
import Header from "./header"
import Navigation from "./navigation"
import Footer from "./footer"
import "../styles/bootstrap.min.css"

export default ({ children }) => (
  <div className="wrapper">
    <Header />
    <Navigation />
    {children}
    <Footer />
  </div>
)
