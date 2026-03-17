import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext' // <-- Import cái này

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>   {/* <-- Bọc nó ở đây */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)