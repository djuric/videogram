import React, { useState, useEffect } from "react"
import { useQuery, gql } from "@apollo/client"
import {
  getAuthToken,
  setAuthToken,
  setRefreshToken,
  removeAuthToken,
  removeRefreshToken,
  decodeAuthToken,
} from "../utils/auth"
import "../utils/notification"

export const AuthContext = React.createContext({
  user: {},
  isLoggedIn: false,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = () => {
    removeAuthToken()
    removeRefreshToken()
    setUser({})
    setIsLoggedIn(false)
  }

  const login = data => {
    const { authToken, refreshToken, user } = data
    setAuthToken(authToken)
    setRefreshToken(refreshToken)
    setUser(user)
    setIsLoggedIn(true)
  }

  const token = getAuthToken()
  const tokenDecoded = decodeAuthToken(token)

  const { data: { user: { id = 0 } = {} } = {} } = tokenDecoded

  const USER = gql`
    query User($id: ID!) {
      user(idType: DATABASE_ID, id: $id) {
        email
        id
        firstName
        lastName
        nicename
      }
    }
  `

  // TODO: dont call this if id = 0
  const { data: queryData } = useQuery(USER, {
    variables: { id },
    fetchPolicy: "network-only",
  })

  useEffect(() => {
    let user = {}
    let isLoggedIn = false

    if (queryData && queryData.user && queryData.user.id) {
      user = queryData.user
      isLoggedIn = true
    }

    setUser(user)
    setIsLoggedIn(isLoggedIn)
  }, [queryData])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
