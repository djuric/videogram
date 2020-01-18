import React, { useState } from "react"
import { Link } from "gatsby"
import { getVideoLink } from "../../utils/url"
import { debounce } from "lodash"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

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
          uri
          featuredImage {
            altText
            sourceUrl(size: THUMBNAIL)
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
        />
        {loading && (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </form>
      <div className="header-search-results shadow">
        {!loading &&
          videos.map(video => {
            return (
              <Link
                to={getVideoLink(video.uri)}
                key={video.uri}
                className="header-search-results__item"
              >
                <div className="header-search-results__item-col1">
                  <img
                    src={video.featuredImage.sourceUrl}
                    alt={video.featuredImage.altText}
                  />
                </div>
                <div className="header-search-results__item-col2">
                  {video.title.length > 70
                    ? `${video.title.substr(0, 70)}...`
                    : video.title}
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
