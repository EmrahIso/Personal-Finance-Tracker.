import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

import ProtectedRoute from './components/ProtectedRoute';

import Home from './components/pages/Home';
import Register from './components/pages/Register';
import GuestRegister from './components/pages/GuestRegister';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/guest-register',
        element: <GuestRegister />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
