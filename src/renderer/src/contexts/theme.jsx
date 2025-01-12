import React, { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const rootElement = document.documentElement
    const storedTheme = localStorage.getItem('pharmapp-theme')
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (storedTheme) {
      setTheme(storedTheme)
      rootElement.setAttribute('data-theme', storedTheme === 'dark' ? 'dark' : null)
    } else {
      const systemTheme = userPrefersDark ? 'dark' : 'light'
      setTheme(systemTheme)
      localStorage.setItem('pharmapp-theme', systemTheme)
      rootElement.setAttribute('data-theme', systemTheme)
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeContext
