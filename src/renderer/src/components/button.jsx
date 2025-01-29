import styles from './button.module.css'

import React from 'react'

export default function Button({ name, onclick }) {
  return (
    <button onClick={onclick} className={styles.button}>
      {name}
    </button>
  )
}
