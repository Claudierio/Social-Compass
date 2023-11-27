import Login from './components/login/Login'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Login/>
    </main>
  )
}
