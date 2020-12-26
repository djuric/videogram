import React from "react"
import Layout from "../../components/layout"
import VideosLatest from "../../components/videos/latest"
import SEO from "../../components/SEO"
import { getVideoCategoryLink } from "../../utils/url"
import { Link } from "gatsby"
import { Icon } from "react-icons-kit"
import { starEmpty } from "react-icons-kit/icomoon/starEmpty"
import { starFull } from "react-icons-kit/icomoon/starFull"
import { getAuthToken, decodeAuthToken } from "../../utils/auth"
import { useQuery, useMutation, gql } from "@apollo/client"
import { notify } from "../../utils/notification"

const VIDEO_IN_FAVORITES = gql`
  query VideoInFavorites($id: ID!, $videoId: Int!) {
    user(idType: DATABASE_ID, id: $id) {
      id
      favorites(where: { in: $videoId }) {
        edges {
          node {
            id
            databaseId
          }
        }
      }
    }
  }
`

const SET_FAVORITES = gql`
  mutation AddToFavorites($input: SetFavoritesInput!) {
    setFavorites(input: $input) {
      favorites
    }
  }
`

function VideoSingle({
  pageContext: { databaseId, title, embedded_code, videoCategories },
}) {
  const token = getAuthToken()
  const tokenDecoded = decodeAuthToken(token)

  const { data: { user: { id = 0 } = {} } = {} } = tokenDecoded

  const { data: queryData, loading: queryLoading } = useQuery(
    VIDEO_IN_FAVORITES,
    {
      variables: { id, videoId: databaseId },
      fetchPolicy: "no-cache",
    }
  )

  const [
    setFavorites,
    { loading: mutationLoading, data: mutationData },
  ] = useMutation(SET_FAVORITES, {
    refetchQueries: [
      {
        query: VIDEO_IN_FAVORITES,
        variables: { id, videoId: databaseId },
      },
    ],
    awaitRefetchQueries: true,
    onError: () => {
      notify("You must be logged in to add to favorites.", "error")
    },
  })

  let isInFavorites =
    queryData &&
    queryData.user &&
    queryData.user.favorites.edges &&
    queryData.user.favorites.edges.length > 0
      ? true
      : false

  if (mutationData) {
    if (mutationData.setFavorites.favorites.includes(databaseId)) {
      notify("Added to favorites.", "success")
      isInFavorites = true
    } else {
      notify("Removed from favorites.", "info")
      isInFavorites = false
    }
  }

  return (
    <Layout>
      <SEO title={title} />
      <div className="playtime bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-12 px-0 px-md-3">
              <div className="embed-responsive embed-responsive-16by9 bg-dark">
                <div
                  dangerouslySetInnerHTML={{
                    __html: embedded_code,
                  }}
                />
              </div>
            </div>
          </div>
          <h1 className="playtime-title">{title}</h1>
          <div className="playtime-meta pb-2">
            <div className="row align-items-center">
              <div className="col-6 playtime-meta-categories">
                {videoCategories.nodes.map(category => {
                  return (
                    <Link
                      key={category.id}
                      to={getVideoCategoryLink(category.slug)}
                      className="badge badge-danger"
                    >
                      {category.name}
                    </Link>
                  )
                })}
              </div>
              <div className="col-6 playtime-meta-favorites text-right text-white">
                <span className="videoitem-favorites-control d-flex align-items-center justify-content-end">
                  {isInFavorites ? (
                    <button
                      className="btn btn-default text-danger"
                      onClick={() => {
                        setFavorites({
                          variables: {
                            input: {
                              clientMutationId: "",
                              insert: false,
                              videoId: databaseId,
                            },
                          },
                        })
                      }}
                    >
                      {mutationLoading || queryLoading ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <Icon icon={starFull} size={20} />
                      )}
                    </button>
                  ) : (
                    <button
                      className="btn btn-default text-danger"
                      onClick={() => {
                        setFavorites({
                          variables: {
                            input: {
                              clientMutationId: "",
                              insert: true,
                              videoId: databaseId,
                            },
                          },
                        })
                      }}
                    >
                      {mutationLoading || queryLoading ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <Icon icon={starEmpty} size={20} />
                      )}
                    </button>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideosLatest />
    </Layout>
  )
}

export default VideoSingle
