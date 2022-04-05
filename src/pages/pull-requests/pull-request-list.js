import { List, Skeleton } from "antd"
import { range } from "ramda"

import { PullRequestItem } from "./pull-request-item"

export function PullRequestList({ loading, pullRequests }) {
  return (
    <List>
      {loading &&
        range(0, 5).map((i) => (
          <List.Item key={i}>
            <Skeleton
              loading={loading}
              active
              title={false}
              paragraph={{ rows: 1 }}
            />
          </List.Item>
        ))}

      {!loading &&
        pullRequests.map((pr) => <PullRequestItem key={pr.id} {...pr} />)}
    </List>
  )
}
