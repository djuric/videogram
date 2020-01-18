import React from "react"
import { Link } from "gatsby"
import { range } from "lodash"
import { getPageNumber, getPageNumberLink } from "../../utils/pagination"

export default ({ totalPages, description, basePath, currentPath }) => {
  if (totalPages <= 1) {
    return null
  }

  /**
   * Number of neighbours that currently selected page should show
   *
   * @type {number}
   */
  const pageRange = 2

  /**
   * Total number of list items that will be displayed
   *
   * @type {number}
   */
  const showItems = pageRange * 2 + 1

  /**
   * Current page number.
   *
   * @type {number}
   */
  const currentPage = getPageNumber(currentPath)

  return (
    <nav aria-label={description}>
      <ul className="pagination">
        {currentPage > 2 &&
          currentPage > pageRange + 1 &&
          showItems < totalPages && (
            <li className="page-item">
              <Link to={getPageNumberLink(1, basePath)} className="page-link">
                &laquo;
              </Link>
            </li>
          )}

        {currentPage > 1 && showItems < totalPages && (
          <li className="page-item">
            <Link
              to={getPageNumberLink(currentPage - 1, basePath)}
              className="page-link"
            >
              &lsaquo;
            </Link>
          </li>
        )}

        {range(1, totalPages + 1).map(page => {
          if (
            !(
              page >= currentPage + pageRange + 1 ||
              page <= currentPage - pageRange - 1
            ) ||
            totalPages <= showItems
          ) {
            return (
              <li
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
                key={page}
              >
                <Link
                  to={getPageNumberLink(page, basePath)}
                  className="page-link"
                >
                  {page}
                </Link>
              </li>
            )
          }

          return null
        })}

        {currentPage < totalPages && showItems < totalPages && (
          <li className="page-item">
            <Link
              to={getPageNumberLink(currentPage + 1, basePath)}
              className="page-link"
            >
              &rsaquo;
            </Link>
          </li>
        )}

        {currentPage < totalPages - 1 &&
          currentPage + pageRange - 1 < totalPages &&
          showItems < totalPages && (
            <li className="page-item">
              <Link
                to={getPageNumberLink(totalPages, basePath)}
                className="page-link"
              >
                &raquo;
              </Link>
            </li>
          )}
      </ul>
    </nav>
  )
}
