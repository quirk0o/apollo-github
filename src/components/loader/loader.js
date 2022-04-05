import { ReactComponent as Logo } from "assets/logo.svg"

import styles from "./loader.module.css"

export function Loader() {
  return <Logo className={styles.logo} />
}
