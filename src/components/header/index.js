import React from "react"
import Logo from "./logo"
import Search from "./search"

export default () => (
  <div className="header bg-primary text-white py-1">
    <div className="container">
      <div className="row">
        <div className="col-md-8 text-center text-md-left">
          <Logo />
        </div>
        <div className="col-md-4">
          <Search />
        </div>
      </div>
    </div>
  </div>
)
