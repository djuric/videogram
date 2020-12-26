import React, { useState } from "react"
import { useQuery, useMutation, gql } from "@apollo/client"
import VideoItem from "./video-item"
import { getAuthToken, decodeAuthToken } from "../../../utils/auth"
import { cloneDeep } from "lodash"

const GET_FAVORITES = gql`
  query Favorites($id: ID!, $first: Int, $after: String) {
    user(idType: DATABASE_ID, id: $id) {
      id
      favorites(first: $first, after: $after) {
        edges {
          node {
            id
            databaseId
            title
            slug
            featuredImage {
              node {
                altText
                sourceUrl(size: MEDIUM)
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

const REMOVE_FAVORITES = gql`
  mutation RemoveFavorites($input: SetFavoritesInput!) {
    setFavorites(input: $input) {
      favorites
    }
  }
`

const Favorites = () => {
  const token = getAuthToken()
  const tokenDecoded = decodeAuthToken(token)

  const videosPerPage = 3

  const { data: { user: { id = 0 } = {} } = {} } = tokenDecoded

  const { loading, data: queryData, fetchMore } = useQuery(GET_FAVORITES, {
    variables: { id, first: videosPerPage, after: null },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  })

  const [removeFavorites, { loading: mutationLoading }] = useMutation(
    REMOVE_FAVORITES,
    {
      onError: () => null,
    }
  )

  const [removingVideoId, setRemovingVideoId] = useState(0)

  const handleRemoveFavorites = videoId => {
    setRemovingVideoId(videoId)
    removeFavorites({
      variables: {
        input: {
          clientMutationId: "",
          insert: false,
          videoId,
        },
      },
      update: cache => {
        let queryData = cache.readQuery({
          query: GET_FAVORITES,
          variables: {
            id,
            first: videosPerPage,
            after: null,
          },
        })

        queryData = cloneDeep(queryData)
        queryData.user.favorites.edges = queryData.user.favorites.edges.filter(
          ({ node: { databaseId } }) => {
            return databaseId !== videoId
          }
        )

        cache.writeQuery({
          query: GET_FAVORITES,
          data: queryData,
          variables: {
            id,
            first: videosPerPage,
            after: null,
          },
        })

        setRemovingVideoId(0)
      },
    })
  }

  const { hasNextPage, endCursor } =
    queryData && queryData.user.favorites.pageInfo
      ? queryData.user.favorites.pageInfo
      : {}

  return (
    <div className="videos-favorites mt-md-0 mt-3">
      {queryData &&
      queryData.user.favorites.edges &&
      queryData.user.favorites.edges.length > 0 ? (
        queryData.user.favorites.edges.map(({ node }) => {
          return (
            <VideoItem
              key={node.id}
              data={node}
              onRemoveFavorites={handleRemoveFavorites}
              mutationLoading={mutationLoading}
              removingVideoId={removingVideoId}
            />
          )
        })
      ) : (
        <p>You have no videos in favorites.</p>
      )}
      {hasNextPage && endCursor && (
        <button
          onClick={() => {
            fetchMore({
              variables: {
                after: endCursor,
              },
            })
          }}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : "Show more"}
        </button>
      )}
    </div>
  )
}

export default Favorites
