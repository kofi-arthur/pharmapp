import './styles/all.css'
import './styles/index.css'
import './styles/fonts.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from 'react-router'

import Root from './root.jsx'
import AppLayout from './app/layout.jsx'
import Home from './app/home.jsx'
import { ThemeProvider } from './contexts/theme.jsx'

const router = createBrowserRouter(
  createRoutesFromChildren([
    <Route path="/" element={<Root />} />,
    <Route element={<AppLayout />}>
      <Route path="/home" element={<Home />} />,
    </Route>
  ])
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
