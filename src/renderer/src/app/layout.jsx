import styles from '../styles/applayout.module.css'

import React from 'react'
import { Outlet } from 'react-router'

import NavigationBar from '../components/navigation'

function Layout() {
  return (
    <main className={styles.mainLayout}>
      <NavigationBar />
      <section className={styles.appRender}>
        <Outlet />
      </section>
    </main>
  )
}

export default Layout
