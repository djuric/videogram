import jwtDecode from "jwt-decode"

const localStorageAuthTokenKey = "authToken"
const localStorageRefreshTokenKey = "refreshToken"

export const isBrowser = () => typeof window !== "undefined"

export const getAuthToken = () => {
  return isBrowser() && window.localStorage.getItem(localStorageAuthTokenKey)
}

export const setAuthToken = token => {
  window.localStorage.setItem(localStorageAuthTokenKey, token)
}

export const removeAuthToken = () => {
  window.localStorage.removeItem(localStorageAuthTokenKey)
}

export const decodeAuthToken = token => {
  let tokenDecoded = false

  try {
    tokenDecoded = jwtDecode(token)
  } catch (e) {
    console.log("Can't decode the JWT token.")
  }

  return tokenDecoded
}

export const getRefreshToken = () => {
  return isBrowser() && window.localStorage.getItem(localStorageRefreshTokenKey)
}

export const setRefreshToken = token => {
  window.localStorage.setItem(localStorageRefreshTokenKey, token)
}

export const removeRefreshToken = () => {
  window.localStorage.removeItem(localStorageRefreshTokenKey)
}

export const isTokenExpired = token => {
  if (!token) return null

  const decoded = jwtDecode(token)
  const leeway = 60
  const timeNow = Math.floor(Date.now() / 1000)

  const timeExpires = decoded.exp + leeway
  const timeDiff = timeExpires - timeNow

  return timeDiff < 0 ? true : false
}
