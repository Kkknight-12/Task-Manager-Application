import jwtDecode from "jwt-decode"
// routes
// import { PATH_AUTH } from "../routes/paths"
//
import axios from "./axios"

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false
  }
  return true
  // const decoded = jwtDecode(accessToken)

  // console.log("DECODE", decoded.iat * 1000)
  // const currentTime = Date.now() / 1000

  // return decoded.iat > currentTime
}

const handleTokenExpired = (exp) => {
  let expiredTimer

  const currentTime = Date.now()
  let tokenTime = new Date(exp * 1000)
  tokenTime = exp + 7200

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = currentTime - tokenTime
  // console.log("timeLeft", timeLeft)

  clearTimeout(expiredTimer)

  expiredTimer = setTimeout(() => {
    // eslint-disable-next-line no-alert
    alert("Token expired")

    localStorage.removeItem("accessToken")

    window.location.href = "/"
  }, timeLeft)
}

const setSession = (accessToken, user) => {
  if (accessToken) {
    const { name, email } = user
    const accessUser = JSON.stringify({ name, email })
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("accessUser", accessUser)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    // This function below will handle when token is expired
    const { iat } = jwtDecode(accessToken) // ~5 days by minimals server
    // handleTokenExpired(iat)
  } else {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("accessUser")
    delete axios.defaults.headers.common.Authorization
  }
}

export { isValidToken, setSession }
