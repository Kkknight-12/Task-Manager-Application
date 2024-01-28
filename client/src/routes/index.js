import ReactDOM from "react-dom/client"
import { Navigate, useRoutes, useLocation } from "react-router-dom"
// layout
import DashboardLayout from "../layout/dashboard"
import LogoOnlyLayout from "../layout/LogoOnlyLayout"
//
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import { ViewTask, AddTask } from "../pages/dashboard"
import AuthGuard from "../guards/AuthGuard"
import GuestGuard from "../guards/GuestGuard"
import Page404 from "../pages/Page404"

// import useAuth from "../hooks/useAuth"

export default function Router() {
  // const { isAuthenticated } = useAuth()

  return useRoutes([
    // {
    //   path: "/",
    //   element: !isAuthenticated ? (
    //     <Login />
    //   ) : (
    //     <Navigate to="/dashboard/view" replace />
    //   ),
    // },
    {
      path: "/",
      children: [
        { element: <Navigate to="/auth/login" replace />, index: true },
        {
          path: "/auth/login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "/auth/register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        // this component will remain static
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      // children will render | change w.r.t path
      children: [
        // OUTLET
        // child components will be rendered with help of outlet from react-router-dom
        { element: <Navigate to="/dashboard/view" replace />, index: true },
        { path: "view", element: <ViewTask /> },
        { path: "add", element: <AddTask /> },
        { path: "edit/:id", element: <AddTask /> },
      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ])
}
