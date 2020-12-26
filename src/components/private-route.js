import React, { useContext } from "react"
import { AuthContext } from "../context/auth"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext)

  if (!isLoggedIn) {
    return (
      <div className="alert alert-warning">
        You must be logged in to access this section.
      </div>
    )
  }

  return <Component {...rest} />
}

export default PrivateRoute
