import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Icon } from "react-icons-kit"
import { menu } from "react-icons-kit/icomoon/menu"
import { cross } from "react-icons-kit/icomoon/cross"

const NAVIGATION_QUERY = graphql`
  query NavigationItems {
    wp {
      menuItems(where: { location: VIDEOGRAM_HEADER_MAIN }) {
        edges {
          node {
            id
            label
            url
          }
        }
      }
    }
  }
`

export default () => {
  const [showMenu, setShowMenu] = useState(false)

  const handleButtonClick = () => {
    setShowMenu(!showMenu)
  }

  const menuClass = showMenu ? "collapsed" : "collapse"

  const data = useStaticQuery(NAVIGATION_QUERY)

  const items = data.wp.menuItems.edges.map(({ node }) => {
    return {
      id: node.id,
      title: node.label,
      url: node.url,
      icon: false,
    }
  })

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
            {showMenu ? (
              <Icon icon={cross} size={32} />
            ) : (
              <Icon icon={menu} size={32} />
            )}
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
