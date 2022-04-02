import { ReactComponent as Logo } from "assets/logo.svg"
import { gql, useQuery } from "@apollo/client"

import styles from "./current-user.module.css"

const getUser = gql`
  query CurrentUser {
    viewer {
      login
    }
  }
`

export function CurrentUser() {
  const { data, loading, error } = useQuery(getUser)

  if (loading) return <Logo className={styles.logo} />
  if (error) return <p>Error :(</p>

  return (
    <>
      <Logo className={styles.logo} />
      <h2 className={styles.welcome}>Hello {data.viewer.login}!</h2>
    </>
  )
}
