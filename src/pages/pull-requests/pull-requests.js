import { gql, useQuery } from "@apollo/client"
import { List, Skeleton } from "antd"
import { Layout } from "layouts"
import { range } from "ramda"

const pullRequestsQuery = gql`
  query MyOpenPullRequests {
    viewer {
      pullRequests(
        first: 100
        orderBy: { field: CREATED_AT, direction: DESC }
        states: [OPEN]
      ) {
        nodes {
          title
          url
          state
        }
      }
    }
  }
`

function PullRequests({ loading, pullRequests }) {
  return (
    <List>
      {loading &&
        range(0, 5).map((i) => (
          <List.Item>
            <Skeleton
              loading={loading}
              key={i}
              active
              title={false}
              paragraph={{ rows: 1 }}
            />
          </List.Item>
        ))}

      {!loading &&
        pullRequests.map((pr) => (
          <List.Item>
            <a href={pr.url}>{pr.title}</a>
          </List.Item>
        ))}
    </List>
  )
}

export function PullRequestsPage() {
  const { data, loading, error } = useQuery(pullRequestsQuery)

  if (error) return <p>Error :(</p>

  const pullRequests = data?.viewer?.pullRequests?.nodes || []

  return (
    <Layout>
      <h1 order={1}>Pull Requests</h1>
      <PullRequests loading={loading} pullRequests={pullRequests} />
    </Layout>
  )
}
