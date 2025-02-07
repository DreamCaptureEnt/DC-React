import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Gallery from './sections/Gallery.jsx'
import Admin from './sections/Admin.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import ProtectedRoute from './components/ProtectRoute.jsx'
import { AnimatePresence } from 'framer-motion'
import '@fortawesome/fontawesome-free/css/all.min.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/gallery/:id',
    element: <Gallery />,
  },
  {
    path: '/admin-login',
    element: <AdminLogin />,
    errorElement: <ErrorPage />
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Admin />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AnimatePresence mode='wait'>
        <RouterProvider router={router}/>
      </AnimatePresence>
  </StrictMode>,
)

