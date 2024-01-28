import { useState } from "react"
import { Outlet } from "react-router-dom"
// @mui
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"
import DashboardHeader from "./header"

//hooks
import useResponsive from "../../hooks/useResponsive"
import useCollapseDrawer from "../../hooks/useCollapseDrawer"
//
import Sidebar from "./navbar/Sidebar"
// config
import { HEADER, NAVBAR } from "../../config"

// ----------------------------------------------------------------------

const MainStyle = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapseClick",
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create("margin-left", {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}))

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const { collapseClick, isCollapse } = useCollapseDrawer()

  const [open, setOpen] = useState(false)

  return (
    <Box
      sx={{
        display: { lg: "flex" },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader
        isCollapse={isCollapse}
        onOpenSidebar={() => setOpen(true)}
      />
      {/* outlet help us render the child components */}
      <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle collapseClick={collapseClick}>
        <Outlet />
      </MainStyle>
    </Box>
  )
}
