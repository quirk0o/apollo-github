import { ApolloProvider } from "@apollo/client"
import { GitHubClient } from "api/client"
import { PullRequestsPage } from "pages/pull-requests/pull-requests"

export function App() {
  return (
    <ApolloProvider client={new GitHubClient()}>
      <PullRequestsPage />
    </ApolloProvider>
  )
}
