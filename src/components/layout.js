import React from "react"
import Header from "./header"
import Navigation from "./navigation"
import Footer from "./footer"
import { NotifyContainer } from "../utils/notification"
import "../styles/bootstrap.min.css"
import "../styles/style.css"

export default ({ children }) => (
  <div className="wrapper">
    <Header />
    <Navigation />
    {children}
    <Footer />
    <NotifyContainer />
  </div>
)
