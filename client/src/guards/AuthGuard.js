// import React, { useState } from "react"

// export default function AuthGuard({ children }) {
//   const [isAuthenticated, setIsAutheticated] = useState(!false)

//   if (!isAuthenticated) {
//     return <h1 className="text-center">Please Login.</h1>
//   }

//   return <div>{children}</div>
// }

import PropTypes from "prop-types"
import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
// hooks
import useAuth from "../hooks/useAuth"
// pages
import Login from "../pages/auth/Login"
// components
import LoadingScreen from "../components/LoadingScreen"

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
}

export default function AuthGuard({ children }) {
  // authenticated when user logs in
  /*
  - 1 st time initialize when login page renders and
  - initialize function run in useEffect 
  -> JWTContext.js -> AuthProvider function else case  
  */
  const { isAuthenticated, isInitialized } = useAuth()
  // console.log("isInitialized", isInitialized)

  const { pathname } = useLocation()

  const [requestedLocation, setRequestedLocation] = useState(null)

  if (!isInitialized) {
    return <LoadingScreen />
  }

  /*
  - run on login screen 
  - before login  
  - 
  - if the user is not logged in and ask to to the Authenticated pages
  - send him back to the Login screen
  */
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      console.log("setting requestedLocation = pathname")
      setRequestedLocation(pathname)
    }
    return <Login />
  }

  // console.log("requestedLocation", requestedLocation)
  // console.log("pathname", pathname)

  /*
  - above condition has ran once ( user is not logged in )
  - or when user is logged in 
  - requestedLocation state has been set to pathname
  - but now the user is authenticated, pathname and request location are different
  ------------------
  - not logged in 
  - enter the location -> protected route
  - hit enter
  - requestedLocation has been set
  - again change the location in url( another protected route) without hitting enter
  - login in with correct password
  */
  if (requestedLocation && pathname !== requestedLocation) {
    console.log("pathname !== requestedLocation but Authenticated")
    setRequestedLocation(null)
    return <Navigate to={requestedLocation} />
  }

  return <>{children}</>
}
