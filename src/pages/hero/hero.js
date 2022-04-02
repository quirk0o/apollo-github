import styles from "./hero.module.css"

export function HeroPage({children}) {
  return (
    <main className={styles.layout}>
      <div className={styles.content}>
        {children}
      </div>
    </main>
  )
}
