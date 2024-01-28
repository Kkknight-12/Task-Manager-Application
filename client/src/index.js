import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
// redux
import { store, persistor } from "./redux/store"
// context
import { AuthProvider } from "./contexts/JWTContext"
import { CollapseDrawerProvider } from "./contexts/CollapseDrawerContext"
//
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CollapseDrawerProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CollapseDrawerProvider>
      </PersistGate>
    </ReduxProvider>
  </AuthProvider>
  // </React.StrictMode>
)
