import styles from "./app.module.css"
import { ReactComponent as Logo } from "assets/logo.svg"

export function App() {
  return (
    <div className={styles.app}>
      <Logo className={styles.logo} />
    </div>
  )
}
