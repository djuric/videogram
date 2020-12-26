import React from "react"
import Logo from "./logo"
import Search from "./search"
import Login from "./login"

export default () => (
  <div className="header bg-primary text-white py-1">
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center text-md-left">
          <Logo />
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-7">
              <Search />
            </div>
            <div className="col-md-5">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
