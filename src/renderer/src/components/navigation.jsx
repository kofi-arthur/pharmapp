import styles from './navigation.module.css'

import React, { useContext } from 'react'

import ThemeContext from '../contexts/theme'

export default function NavigationBar() {
  const { theme, setTheme } = useContext(ThemeContext)

  function handleSelectTheme(selectedTheme) {
    setTheme(selectedTheme)
    localStorage.setItem('pharmapp-theme', selectedTheme)
  }

  return (
    <nav className={styles.navigationBar}>
      <div className={styles.navigation}></div>

      <div className={styles.extra}>
        <div className={styles.path}>
          <div className={styles.option} onClick={() => handleSelectTheme('light')}>
            <i className="fal fa-sun-bright"></i>
            <p>Light</p>
          </div>

          <div className={styles.option} onClick={() => handleSelectTheme('dark')}>
            <i className="fal fa-moon"></i>
            <p>Dark</p>
          </div>
          <div
            className={styles.selector}
            style={
              theme === 'light' ? { transform: 'translateX(0)' } : { transform: 'translateX(94%)' }
            }
          ></div>
        </div>
      </div>
    </nav>
  )
}
