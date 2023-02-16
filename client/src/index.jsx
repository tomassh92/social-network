import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthContextProvider } from "./context/authContext"
import { DarkModeContextProvider } from "./context/darkModeContext"

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
)
