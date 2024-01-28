import PropTypes from "prop-types"
//
import ThemeContrast from "./ThemeContrast"
import ThemeColorPresets from "./ThemeColorPresets"

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function ThemeSettings({ children }) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>{children}</ThemeContrast>
    </ThemeColorPresets>
  )
}
