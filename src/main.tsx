import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './poster-theme.css'
import './portrait-poster.css'
import './crt-hud.css'
import './project-system-flow.css'
import './github-activity.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
