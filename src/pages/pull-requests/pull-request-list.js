import { List, Skeleton } from "antd"
import { gql, useQuery } from "@apollo/client"
import { range } from "ramda"

import { PullRequestItem } from "./pull-request-item"

const PullRequestsQuery = gql`
  query MyOpenPullRequests($states: [PullRequestState!]) {
    viewer {
      id
      pullRequests(
        first: 100
        orderBy: { field: CREATED_AT, direction: DESC }
        states: $states
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
          headRef {
            target {
              ... on Commit {
                status {
                  state
                }
              }
            }
          }
          score @client
        }
      }
    }
  }
`

export function PullRequestList({ states }) {
  const { data, loading, error } = useQuery(PullRequestsQuery, {
    variables: { states },
  })

  if (error) return <p>Error :(</p>

  const pullRequests = data?.viewer?.pullRequests?.nodes || []
  return (
    <>
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

      <div className="ant-pagination">
        <button className="ant-pagination-item">
          <a>Load More</a>
        </button>
      </div>
    </>
  )
}
