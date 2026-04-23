import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminPanel from './admin/AdminPanel.jsx'

const root = createRoot(document.getElementById('root'))

if (window.location.pathname === '/admin') {
  root.render(<AdminPanel />)
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
