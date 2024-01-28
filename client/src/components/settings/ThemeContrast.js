import PropTypes from "prop-types"
import { useMemo } from "react"
// @mui
import { CssBaseline } from "@mui/material"
import {
  alpha,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material/styles"

//
import componentsOverride from "../../theme/overrides"

// ----------------------------------------------------------------------

ThemeContrast.propTypes = {
  children: PropTypes.node,
}

export default function ThemeContrast({ children }) {
  const defaultTheme = useTheme()

  const isLight = defaultTheme.palette.mode === "light"

  const shadowColor = isLight
    ? defaultTheme.palette.grey[500]
    : defaultTheme.palette.common.black

  const styles = {
    bgDefault: defaultTheme.palette.background.default,
    bgBold: defaultTheme.palette.grey[100],
    cardDefault: defaultTheme.components?.MuiCard?.styleOverrides?.root,
    cardBold: {
      zIndex: 0,
      position: "relative",
      borderRadius: Number(defaultTheme.shape.borderRadius) * 2,
      boxShadow: `0 0 1px 0 ${alpha(shadowColor, 0.48)}, 0 2px 4px -1px ${alpha(
        shadowColor,
        0.24
      )}`,
    },
  }

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        background: {
          ...defaultTheme.palette.background,
          default: styles.bgDefault,
        },
      },
      components: {
        MuiCard: {
          styleOverrides: {
            root: styles.cardDefault,
          },
        },
      },
    }),
    []
  )

  const theme = createTheme(themeOptions)

  theme.components = {
    ...componentsOverride(theme),
    MuiCard: themeOptions.components?.MuiCard,
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
