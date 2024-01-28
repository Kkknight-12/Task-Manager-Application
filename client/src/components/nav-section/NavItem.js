import PropTypes from "prop-types"
import { NavLink as RouterLink } from "react-router-dom"
// @mui
import { Box, Link, ListItemText, Typography, Tooltip } from "@mui/material"
//
// import Iconify from "../../Iconify"
import {
  ListItemStyle as ListItem,
  ListItemTextStyle,
  ListItemIconStyle,
} from "./style"
// import { isExternalLink } from ".."

// ----------------------------------------------------------------------

ListItem.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.string),
}

// ----------------------------------------------------------------------

// HANDLE SHOW ITEM BY ROLE

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  isCollapse: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    caption: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
}

export function NavItemRoot({
  item,
  isCollapse,
  open = false,
  active,
  onOpen,
}) {
  const { title, path, icon, info, children, disabled, caption, roles } = item

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle
        disableTypography
        primary={title}
        secondary={
          <Tooltip title={caption || ""} arrow>
            <Typography
              noWrap
              variant="caption"
              component="div"
              sx={{ textTransform: "initial", color: "text.secondary" }}
            >
              {caption}
            </Typography>
          </Tooltip>
        }
        isCollapse={isCollapse}
      />
      {/* {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )} */}
    </>
  )

  //   if (children) {
  //     return (
  //       <ListItem
  //         onClick={onOpen}
  //         activeRoot={active}
  //         disabled={disabled}
  //         roles={roles}
  //       >
  //         {renderContent}
  //       </ListItem>
  //     )
  //   }

  return (
    <ListItem
      component={RouterLink}
      to={path}
      activeRoot={active}
      disabled={disabled}
      roles={roles}
    >
      {renderContent}
    </ListItem>
  )
}

export function NavItemSub({ item, open = false, active = false, onOpen }) {
  const { title, path, info, children, disabled, caption, roles } = item

  const renderContent = (
    <>
      {/* <DotIcon active={active} /> */}
      {/* <ListItemText
        disableTypography
        primary={title}
        secondary={
          <Tooltip title={caption || ""} arrow>
            <Typography
              noWrap
              variant="caption"
              component="div"
              sx={{ textTransform: "initial", color: "text.secondary" }}
            >
              {caption}
            </Typography>
          </Tooltip>
        }
      /> */}
      {info && info}
      {/* {children && <ArrowIcon open={open} />} */}
    </>
  )

  //   if (children) {
  //     return (
  //       <ListItem
  //         onClick={onOpen}
  //         activeSub={active}
  //         subItem
  //         disabled={disabled}
  //         roles={roles}
  //       >
  //         {renderContent}
  //       </ListItem>
  //     )
  //   }
}
