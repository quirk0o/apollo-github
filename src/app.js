import { ApolloProvider } from "@apollo/client"
import { GitHubClient } from "api/client"
import { WelcomePage } from "pages/welcome"

export function App() {
  return (
    <ApolloProvider client={new GitHubClient()}>
      <WelcomePage />
    </ApolloProvider>
  )
}
