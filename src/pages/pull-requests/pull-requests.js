import { Layout } from "layouts"
import { gql, useQuery } from "@apollo/client"

import { PullRequestList } from "./pull-request-list"

const PullRequestsQuery = gql`
  query MyOpenPullRequests {
    viewer {
      pullRequests(
        first: 100
        orderBy: { field: CREATED_AT, direction: DESC }
        states: [OPEN]
      ) {
        nodes {
          id
          title
          url
          state
          isDraft
          changedFiles
          additions
          deletions
          score @client
        }
      }
    }
  }
`

export function PullRequestsPage() {
  const { data, loading, error } = useQuery(PullRequestsQuery)

  if (error) return <p>Error :(</p>

  const pullRequests = data?.viewer?.pullRequests?.nodes || []

  return (
    <Layout>
      <h1 order={1}>Pull Requests</h1>
      <PullRequestList loading={loading} pullRequests={pullRequests} />
    </Layout>
  )
}
