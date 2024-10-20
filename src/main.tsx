import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '@/App'
import Login from '@/pages/Login'
import Docs from '@/pages/Docs';
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Router>
  </StrictMode>,
)
