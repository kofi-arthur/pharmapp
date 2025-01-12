import styles from './button.module.css'

import React from 'react'

export default function Button({ name }) {
  return <button className={styles.button}>{name}</button>
}
