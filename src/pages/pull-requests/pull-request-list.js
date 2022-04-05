import { List, Skeleton } from "antd"
import { gql, useQuery } from "@apollo/client"
import { range } from "ramda"

import { PullRequestItem } from "./pull-request-item"

const PullRequestsQuery = gql`
  query MyPullRequests(
    $states: [PullRequestState!]
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    viewer {
      id
      pullRequests(
        first: $first
        after: $after
        last: $last
        before: $before
        orderBy: { field: CREATED_AT, direction: DESC }
        states: $states
      ) {
        edges {
          cursor
          node {
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
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`

export function PullRequestList({ states }) {
  const { data, loading, error, fetchMore } = useQuery(PullRequestsQuery, {
    variables: { states, first: 10 },
  })

  if (error) return <p>Error :(</p>

  const pullRequests = data?.viewer?.pullRequests?.edges || []
  const pageInfo = data?.viewer?.pullRequests?.pageInfo

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
          pullRequests.map((pr) => (
            <PullRequestItem key={pr.id} {...pr.node} />
          ))}
      </List>

      <div className="ant-pagination">
        {pageInfo?.hasNextPage && (
          <button
            className="ant-pagination-item"
            onClick={() =>
              fetchMore({ variables: { after: pageInfo?.endCursor } })
            }
          >
            <a>Load More</a>
          </button>
        )}
      </div>
    </>
  )
}
