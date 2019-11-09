import React from "react"
import { Link } from "gatsby"

export default ({ logoText }) => (
  <Link className="navbar-brand" to="/">
    {logoText}
  </Link>
)
