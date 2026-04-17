import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LoginProvider } from './context/LoginContext.jsx'
import { SnackbarProvider } from './context/SnackbarContext.jsx'
import { SidebarProvider } from './context/SidebarContext.jsx'

const container = document.getElementById('root')
const app = (

    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider>
          <LoginProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </LoginProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>

)

if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
