import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  HttpLink,
} from "@apollo/client"
import fetch from "isomorphic-fetch"
import { relayStylePagination } from "@apollo/client/utilities"
import {
  getAuthToken,
  getRefreshToken,
  setAuthToken,
  isTokenExpired,
} from "../utils/auth"

const link = new HttpLink({
  fetch,
  uri: process.env.GATSBY_WORDPRESS_GRAPHQL,
})

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        favorites: relayStylePagination(),
      },
    },
  },
})

const refreshAuthToken = async () => {
  const refreshToken = getRefreshToken()
  const query = `
  mutation RefreshAuthToken($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(input: $input) {
      authToken
    }
  }`

  const refreshTokenRequest = await fetch(
    process.env.GATSBY_WORDPRESS_GRAPHQL,
    {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            clientMutationId: "",
            jwtRefreshToken: refreshToken,
          },
        },
      }),
    }
  )

  const {
    data: { refreshJwtAuthToken },
  } = await refreshTokenRequest.json()

  if (refreshJwtAuthToken && refreshJwtAuthToken.authToken) {
    setAuthToken(refreshJwtAuthToken.authToken)
    return refreshJwtAuthToken.authToken
  }

  return false
}

const authMiddleware = new ApolloLink(async (operation, forward) => {
  let token = getAuthToken()
  const isExpired = isTokenExpired(token)

  if (isExpired) {
    const refreshedToken = await refreshAuthToken()
    if (refreshedToken) {
      token = refreshedToken
    }
  }

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  })
  return forward(operation)
})

export const client = new ApolloClient({
  cache,
  link: from([authMiddleware, link]),
})
