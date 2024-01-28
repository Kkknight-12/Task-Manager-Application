import PropTypes from "prop-types"
// @mui
import { styled } from "@mui/material/styles"
import { Popover } from "@mui/material"

// ----------------------------------------------------------------------

const ArrowStyle = styled("span")(({ arrow, theme }) => {
  const SIZE = 12

  const POSITION = -(SIZE / 2) // -6

  const borderStyle = `solid 1px ${theme.palette.grey[500_12]}`
  // const borderStyle = `solid 3px ${theme.palette.success.dark}`;

  /* 
  - borderRadius : tl tr br bl
  */
  const topStyle = {
    borderRadius: "0 0 3px 0",
    top: POSITION,
    borderBottom: borderStyle,
    borderRight: borderStyle,
  }
  const bottomStyle = {
    borderRadius: "3px 0 0 0",
    bottom: POSITION,
    borderTop: borderStyle,
    borderLeft: borderStyle,
  }
  const leftStyle = {
    borderRadius: "0 3px 0 0",
    left: POSITION,
    borderTop: borderStyle,
    borderRight: borderStyle,
  }
  const rightStyle = {
    // borderRadius: '0 3px 0 0',
    /*  
    -6 will push half box outside the popmenu
    - 12 will push the whole box outside
    */
    right: POSITION,
    borderBottom: borderStyle,
    borderLeft: borderStyle,
  }

  return {
    // arrow will not be shown when screen size is less than 600px
    display: "none",
    [theme.breakpoints.up("sm")]: {
      zIndex: 1,
      width: SIZE,
      height: SIZE,
      content: "''",
      display: "block",
      position: "absolute",
      transform: "rotate(-135deg)",
      background: theme.palette.background.paper,
      // background: theme.palette.error.dark,
    },
    // Top
    ...(arrow === "top-left" && { ...topStyle, left: 20 }),
    ...(arrow === "top-center" && {
      ...topStyle,
      left: 0,
      right: 0,
      margin: "auto",
    }),
    ...(arrow === "top-right" && { ...topStyle, right: 20 }),
    // Bottom
    ...(arrow === "bottom-left" && { ...bottomStyle, left: 20 }),
    ...(arrow === "bottom-center" && {
      ...bottomStyle,
      left: 0,
      right: 0,
      margin: "auto",
    }),
    ...(arrow === "bottom-right" && { ...bottomStyle, right: 20 }),
    // Left
    ...(arrow === "left-top" && { ...leftStyle, top: 20 }),
    ...(arrow === "left-center" && {
      ...leftStyle,
      top: 0,
      bottom: 0,
      margin: "auto",
    }),
    ...(arrow === "left-bottom" && { ...leftStyle, bottom: 20 }),
    // Right
    ...(arrow === "right-top" && { ...rightStyle, top: 20 }),
    /*  
    - position: absolute -> relative to the nearest parent with position relative
    - form top 20, bottom 0 , margin auto -> margin will be vertical, 
    - auto will push arrow
    - box little below the middle ( vertically)
    */
    ...(arrow === "right-center" && {
      ...rightStyle,
      top: 20,
      bottom: 0,
      margin: "auto",
    }),
    ...(arrow === "right-bottom" && { ...rightStyle, bottom: 20 }),
  }
})

// ----------------------------------------------------------------------

MenuPopover.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
  disabledArrow: PropTypes.bool,
  arrow: PropTypes.oneOf([
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
    "left-top",
    "left-center",
    "left-bottom",
    "right-top",
    "right-center",
    "right-bottom",
  ]),
}
export default function MenuPopover({
  children,
  arrow = "top-right",
  disabledArrow,
  sx,
  ...other
}) {
  return (
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      // Props applied to the Paper element.
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          /*
        - overflow property
        - visible - Default. The overflow is not clipped.
        - The content renders outside the element's box
        */
          overflow: "inherit",
          ...sx,
        },
      }}
      // sx={{ p: 10, width: 200, ...sx, overflow: 'inherit' }}
      {...other}
    >
      {!disabledArrow && <ArrowStyle arrow={arrow} />}

      {children}
    </Popover>
  )
}
