import { Layout } from "layouts"

import { StateTabs } from "./state-tabs"

export function PullRequestsPage() {
  return (
    <Layout>
      <h1 order={1}>Pull Requests</h1>
      <StateTabs />
    </Layout>
  )
}
