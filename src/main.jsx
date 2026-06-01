import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminPanel from './admin/AdminPanel.jsx'

// Always start at the top — prevent browser from restoring scroll to last position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

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
