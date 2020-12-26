import React from "react"
import Layout from "../components/layout"
import { Router } from "@reach/router"
import { Link } from "gatsby"
import Profile from "../components/account/profile"
import Favorites from "../components/account/favorites"
import PrivateRoute from "./../components/private-route"

export default () => (
  <Layout>
    <div className="container py-5">
      <h1>My Account</h1>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="list-group">
            <Link
              to="/account/profile"
              className="list-group-item list-group-item-action"
            >
              Profile
            </Link>
            <Link
              to="/account/favorites"
              className="list-group-item list-group-item-action"
            >
              Favorites
            </Link>
          </div>
        </div>
        <div className="col-md-8">
          <Router basepath="/account">
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/favorites" component={Favorites} />
          </Router>
        </div>
      </div>
    </div>
  </Layout>
)
