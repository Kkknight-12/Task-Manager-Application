import PropTypes from "prop-types"
import { createContext, useEffect, useReducer } from "react"
// utils
import axios from "../utils/axios"
import { isValidToken, setSession } from "../utils/jwt"

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  LOGIN: (state, action) => {
    const { user, name } = action.payload
    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
}

function AuthProvider({ children }) {
  // console.log("AuthProvider")
  // useReducer Syntax
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken")
        const accessUser = localStorage.getItem("accessUser")

        if (accessToken && isValidToken(accessToken)) {
          const user = JSON.parse(accessUser)
          setSession(accessToken, user)

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          })
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    initialize()
  }, [])

  //  kniasdaasdasdght@gmail.com
  // knight@543
  const login = async (email, password) => {
    const { data } = await axios.post("/login", {
      email,
      password,
    })
    const { token: accessToken, user } = data
    // const accessUser = JSON.stringify({ user, name })

    setSession(accessToken, user)

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    })
  }

  const register = async (data) => {
    let { firstName: name, email, password } = data

    const response = await axios.post("/register", {
      email,
      password,
      name,
    })

    let { token: accessToken, user } = response.data
    // console.log("response", response.data)
    // const accessUser = JSON.stringify( user )

    setSession(accessToken, user)
    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    })
  }

  const logout = async () => {
    setSession(null)
    dispatch({ type: "LOGOUT" })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
