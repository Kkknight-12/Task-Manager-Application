import PropTypes from "prop-types"
import { useMemo } from "react"
// @mui
import {
  alpha,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material/styles"
//
import componentsOverride from "../../theme/overrides"
//
import palette from "../../theme/palette"

// ----------------------------------------------------------------------

ThemeColorPresets.propTypes = {
  children: PropTypes.node,
}

export default function ThemeColorPresets({ children }) {
  const defaultTheme = useTheme()

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: { name: "default", ...palette.light.primary },
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha("#2065D1", 0.24)}`,
      },
    }),
    []
  )

  const theme = createTheme(themeOptions)

  theme.components = componentsOverride(theme)

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
