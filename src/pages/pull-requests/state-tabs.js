import { Tabs } from "antd"

import { PullRequestList } from "./pull-request-list"

export function StateTabs() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Open" key="open">
        <PullRequestList states={["OPEN"]} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Merged" key="merged">
        <PullRequestList states={["MERGED"]} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Closed" key="closed">
        <PullRequestList states={["CLOSED"]} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="All" key="all">
        <PullRequestList />
      </Tabs.TabPane>
    </Tabs>
  )
}
