import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

import Home from './components/pages/Home';
import Register from './components/pages/forms/auth/Register';
import GuestRegister from './components/pages/forms/auth/GuestRegister';
import Login from './components/pages/forms/auth/Login';
import Dashboard from './components/pages/Dashboard';
import AddAccount from './components/pages/forms/account/AddAccount';
import AddCategory from './components/pages/forms/category/AddCategory';
import ManageAccounts from './components/pages/ManageAccounts';
import ManageCategories from './components/pages/ManageCategories';
import Income from './components/pages/forms/transaction/Income';
import Expense from './components/pages/forms/transaction/Expense';
import EditCategory from './components/pages/forms/category/EditCategory';

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
        element: <GuestRoute />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/guest',
            element: <GuestRegister />,
          },
          {
            path: '/register',
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
          {
            path: '/account',
            element: <AddAccount />,
          },
          {
            path: '/category',
            element: <AddCategory />,
          },
          {
            path: '/manage-accounts',
            element: <ManageAccounts />,
          },
          {
            path: '/manage-categories',
            element: <ManageCategories />,
          },
          {
            path: '/income',
            element: <Income />,
          },
          {
            path: '/expense',
            element: <Expense />,
          },
          {
            path: '/edit-category/:id',
            element: <EditCategory />,
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
