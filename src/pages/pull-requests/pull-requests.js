import { Layout } from "layouts"
import { List, Skeleton } from "antd"
import { range } from "ramda"

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
  return (
    <Layout>
      <h1 order={1}>Pull Requests</h1>
      <PullRequests loading={false} pullRequests={[]} />
    </Layout>
  )
}
