import React, { useContext } from "react"
import { Link, navigate } from "gatsby"
import { AuthContext } from "../../context/auth"

export default () => {
  const { isLoggedIn, logout } = useContext(AuthContext)

  return (
    <div className="header-login">
      <ul className="list-inline mb-0">
        {isLoggedIn ? (
          <>
            <li className="list-inline-item">
              <Link to="/account/profile" className="btn btn-danger">
                Profile
              </Link>
            </li>
            <li className="list-inline-item">
              <button
                className="btn btn-info text-white"
                onClick={() => {
                  logout()
                  navigate("/")
                }}
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="list-inline-item">
              <Link to="/signin" className="btn btn-warning text-white">
                Sign In
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="/signup" className="btn btn-warning text-white">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
