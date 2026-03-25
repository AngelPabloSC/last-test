import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { LoginProvider } from './context/LoginContext.jsx'
import { SnackbarProvider } from './context/SnackbarContext.jsx'
import { SidebarProvider } from './context/SidebarContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LoginProvider>
          <SnackbarProvider>
            <SidebarProvider>
              <App />
            </SidebarProvider>
          </SnackbarProvider>
        </LoginProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
