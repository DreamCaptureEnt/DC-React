import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Gallery from './sections/Gallery.jsx'
import Admin from './sections/Admin.jsx'
import './index.css'
import ErrorPage from './components/ErrorPage.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import ProtectedRoute from './components/ProtectRoute.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </StrictMode>,
)