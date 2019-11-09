import React from "react"
import Logo from "./logo"
import Search from "./search"

export default ({ logoText }) => (
  <div className="header bg-primary text-white py-1">
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center text-md-left">
          <Logo logoText={logoText} />
        </div>
        <div className="col-md-6">
          <Search />
        </div>
      </div>
    </div>
  </div>
)
