import { useEffect } from 'react'
import styles from './styles/loading.module.css'
import { useNavigate } from 'react-router'

function Root() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/home')
  }, [])

  return (
    <main className={styles.loadingScreen}>
      <h1>Loading...</h1>
    </main>
  )
}

export default Root
