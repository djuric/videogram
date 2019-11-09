import React, { useState } from "react"
import { Link } from "gatsby"
import { Menu, X } from "react-feather"

export default ({ items }) => {
  const [showMenu, setShowMenu] = useState(false)

  const handleButtonClick = () => {
    setShowMenu(!showMenu)
  }

  const menuClass = showMenu ? "collapsed" : "collapse"

  return (
    <div className="navigation-categories bg-light">
      <div className="container">
        <nav className="navbar navbar-expand-md justify-content-md-center p-0">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navHeaderMain"
            aria-controls="navHeaderMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleButtonClick}
          >
            {showMenu ? <X size={16} /> : <Menu size={16} />}
          </button>

          <div
            className={`${menuClass} navbar-collapse justify-content-center`}
            id="navHeaderMain"
          >
            <ul className="navbar-nav">
              {items.map(item => (
                <li className="nav-item" key={item.id}>
                  <Link className="nav-link" to={item.url}>
                    {item.icon ? (
                      <>
                        {item.icon} {item.title}
                      </>
                    ) : (
                      item.title
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}
