import { List, Tag } from "antd"
import { gql, useMutation } from "@apollo/client"
import { useCallback } from "react"

import styles from "./pull-request-item.module.css"
import { ComplexityBadge } from "./complexity-badge"

const MakeDraftMutation = gql`
  mutation MakeDraft($pullRequestId: ID!, $title: String) {
    convertPullRequestToDraft(input: { pullRequestId: $pullRequestId }) {
      pullRequest {
        id
        isDraft
      }
    }

    updatePullRequest(input: { pullRequestId: $pullRequestId, title: $title }) {
      pullRequest {
        id
        title
      }
    }
  }
`

export function PullRequestItem({ id, title, url, isDraft }) {
  const [makeDraft, result] = useMutation(MakeDraftMutation)
  const handleMakeDraft = useCallback(() => {
    return makeDraft({
      variables: {
        pullRequestId: id,
        title: `I'M NOT DONE WITH THIS! ${title}`,
      },
    })
  }, [makeDraft, id, title])

  const actions = isDraft
    ? []
    : [
        <a key="list-to-draft" onClick={handleMakeDraft}>
          make draft
        </a>,
      ]

  return (
    <List.Item actions={actions}>
      <List.Item.Meta title={<a href={url}>{title}</a>} />
      <div className={styles.attributes}>
        <ComplexityBadge score={42} />
        {isDraft && <Tag>DRAFT</Tag>}
      </div>
    </List.Item>
  )
}
