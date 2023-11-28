import Login from './(general)/login/page'
import styles from './page.module.css'
import Register from './(general)/login/page'


export default function Home() {
  return (
    <main className={styles.main}>
      <Login/>
    </main>
  )
}
