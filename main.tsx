import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainAppWrapper from './MainAppWrapper'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainAppWrapper />
  </StrictMode>,
)
