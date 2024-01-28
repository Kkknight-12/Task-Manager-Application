// routes
import Router from "./routes"
// theme
import ThemeProvider from "./theme"
// components
import ThemeSettings from "./components/settings"
import { ProgressBarStyle } from "./components/ProgressBar"
import NotistackProvider from "./components/NotistackProvider"

export default function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        <NotistackProvider>
          <ProgressBarStyle />
          <Router />
        </NotistackProvider>
      </ThemeSettings>
    </ThemeProvider>
  )
}
