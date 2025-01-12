import { Link } from 'react-router'
import styles from '../styles/notfound.module.css'

import React from 'react'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1>404</h1>
      <p>The page you are looking for does not exist</p>
      <Link to={'/'}>Go Home</Link>
    </main>
  )
}
