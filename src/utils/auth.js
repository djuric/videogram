import jwtDecode from "jwt-decode"

const localStorageRefreshTokenKey = "refreshToken"

// Authentication token is stored in memory.
let authToken = {
  token: "",
}

export const isBrowser = () => typeof window !== "undefined"

export const getAuthToken = () => {
  return authToken.token
}

export const setAuthToken = token => {
  authToken.token = token
}

export const removeAuthToken = () => {
  authToken = {
    token: "",
  }
}

export const decodeAuthToken = token => {
  let tokenDecoded = false

  try {
    tokenDecoded = jwtDecode(token)
  } catch {
    return false
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

// Check if the token exists and has valid format.
export const isValidToken = token => {
  if (!token) return false

  try {
    jwtDecode(token)
  } catch {
    return false
  }

  return true
}

// Check if token is expired.
export const isExpiredToken = token => {
  const decoded = jwtDecode(token)
  const leeway = 60
  const timeNow = Math.floor(Date.now() / 1000)

  const timeExpires = decoded.exp + leeway
  const timeDiff = timeExpires - timeNow

  return timeDiff < 0 ? true : false
}
