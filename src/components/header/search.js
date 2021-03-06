import React, { useState } from "react"
import { Link } from "gatsby"
import { getVideoLink } from "../../utils/url"
import { debounce } from "lodash"
import { useQuery, gql } from "@apollo/client"

/**
 * Flag for search query which should only run after debounce and if keyword is not empty.
 */
let skipQuery = true

export default () => {
  const [, setDebouncer] = useState("")
  const [keyword, setKeyword] = useState("")
  const [, updateState] = useState()

  const allowQuery = () => {
    skipQuery = false
    updateState({})
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  const handleKeyword = ({ target: { value } }) => {
    if (loading) {
      skipQuery = true
    }

    setKeyword(value)
    const search = debounce(allowQuery, 800)

    setDebouncer(prevDebouncer => {
      if (prevDebouncer.cancel) {
        prevDebouncer.cancel()
      }
      return search
    })

    search(value)
  }

  const SEARCH_RESULTS = gql`
    query Videos($keyword: String!) {
      videos(where: { search: $keyword }) {
        nodes {
          title
          slug
          featuredImage {
            node {
              altText
              sourceUrl(size: THUMBNAIL)
            }
          }
        }
      }
    }
  `

  const { loading, data } = useQuery(SEARCH_RESULTS, {
    variables: { keyword },
    skip: !keyword || skipQuery,
    fetchPolicy: "cache-and-network",
    onCompleted() {
      skipQuery = true
    },
  })

  const videos = data ? data.videos.nodes : []

  return (
    <div className="header-search">
      <form
        className="justify-content-md-end justify-content-sm-center header-search-form"
        onSubmit={handleSubmit}
      >
        <input
          type="seach"
          name="keyword"
          placeholder="Search"
          className="form-control"
          onChange={handleKeyword}
          value={keyword}
          autoComplete="off"
          aria-label="Search query"
        />
        {loading && (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </form>
      <div className="header-search-results shadow">
        {!loading &&
          videos.map(video => (
            <Link
              to={getVideoLink(video.slug)}
              key={video.slug}
              className="header-search-results__item"
            >
              {video.featuredImage && (
                <div className="header-search-results__item-col1">
                  <img
                    src={video.featuredImage.node.sourceUrl}
                    alt={video.featuredImage.node.altText}
                  />
                </div>
              )}
              <div className="header-search-results__item-col2">
                {video.title.length > 70
                  ? `${video.title.substr(0, 70)}...`
                  : video.title}
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
