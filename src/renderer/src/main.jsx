import './styles/all.css'
import './styles/index.css'
import './styles/fonts.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router'

import { ThemeProvider } from './contexts/theme.jsx'

import Root from './root.jsx'
import AppLayout from './app/layout.jsx'
import Home from './app/home.jsx'
import Sell from './app/sell.jsx'
import Sales from './app/sales.jsx'
import Inventory from './app/inventory.jsx'
import NotFound from './app/notFound.jsx'

const router = createBrowserRouter(
  createRoutesFromChildren([
    <Route path="/" element={<Root />} />,
    <Route element={<AppLayout />}>
      <Route path="/home" element={<Home />} />,
      <Route path="/sell" element={<Sell />} />,
      <Route path="/sales" element={<Sales />} />,
      <Route path="/inventory" element={<Inventory />} />,
    </Route>,
    <Route path="*" element={<NotFound />} key="404" />
  ])
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
