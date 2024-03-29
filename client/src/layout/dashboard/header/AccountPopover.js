import { useState } from "react"
// @mui
import { alpha } from "@mui/material/styles"
import { Box, Divider, Typography, Stack, MenuItem } from "@mui/material"
// components
import MenuPopover from "../../../components/MenuPopover"
import { IconButtonAnimate } from "../../../components/animate"
import useAuth from "../../../hooks/useAuth"
import { dispatch } from "../../../redux/store"
//actions
import { clearTasks } from "../../../redux/slices/taskSlice"
import MyAvatar from "../../../components/MyAvatar"

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: "/",
  },
  {
    label: "Settings",
    linkTo: "/",
  },
]

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null)
  const {
    logout,
    user: { name, email },
  } = useAuth()

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const logoutUser = () => {
    logout()
    dispatch(clearTasks())
  }

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {/* <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} /> */}

        <MenuItem onClick={logoutUser} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  )
}
