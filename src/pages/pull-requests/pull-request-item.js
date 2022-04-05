import { List, Tag } from "antd"

export function PullRequestItem({ id, title, url, isDraft }) {
  const actions = isDraft
    ? []
    : [
        <a key="list-to-draft" onClick={() => {}}>
          make draft
        </a>,
      ]

  return (
    <List.Item actions={actions}>
      <List.Item.Meta title={<a href={url}>{title}</a>} />
      <div>{isDraft && <Tag>DRAFT</Tag>}</div>
    </List.Item>
  )
}
