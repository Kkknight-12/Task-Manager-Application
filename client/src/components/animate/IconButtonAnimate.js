import PropTypes from "prop-types"
import { m } from "framer-motion"
import { forwardRef } from "react"
// @mui
import { Box, IconButton } from "@mui/material"

// ----------------------------------------------------------------------

/* 
console.log('CHILD', children);
icon: "eva:arrow-right-fill"
sx: {width: 20, height: 20} */
const IconButtonAnimate = forwardRef(
  ({ children, size = "medium", ...other }, ref) => (
    <AnimateWrap size={size}>
      {/* other => className - arrow left | right, onClick */}
      {/* Other {className: 'button-container css-v6qumb', onClick: ƒ} */}
      <IconButton className="button-Icon-mui" size={size} {...other}>
        {children}
      </IconButton>
    </AnimateWrap>
  )
)

IconButtonAnimate.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "inherit",
    "default",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
}

export default IconButtonAnimate

// ----------------------------------------------------------------------

const varSmall = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
}

const varMedium = {
  hover: { scale: 1.09 },
  tap: { scale: 0.97 },
}

const varLarge = {
  hover: { scale: 1.08 },
  tap: { scale: 0.99 },
}

AnimateWrap.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
}

function AnimateWrap({ size, children, sx }) {
  const isSmall = size === "small"
  const isLarge = size === "large"

  return (
    <Box
      className="button-animate"
      // https://www.framer.com/docs/component/
      component={m.div}
      whileTap="tap"
      whileHover="hover"
      variants={(isSmall && varSmall) || (isLarge && varLarge) || varMedium}
      sx={{
        display: "inline-flex",
      }}
    >
      {children}
    </Box>
  )
}
