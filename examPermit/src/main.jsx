import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
     toastOptions={{
      className: '',
      style: {
        padding: '16px',
        color: 'rgb(124, 124, 124)',
        fontWeight: 'bold'
      },
      success: {
        style: {
          border: '1px solid rgb(108, 197, 90)',
          color: 'rgba(52, 95, 43, 0.7)',
        },
      },
      error: {
        style: {
          border: '1px solid rgb(196, 89, 89)',
          color: 'rgba(196, 89, 89, 0.70)',
        },
      }}}
    />
  </StrictMode>,
)
