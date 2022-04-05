import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { relayStylePagination } from "@apollo/client/utilities"

import { config } from "config"

export function GitHubClient() {
  const httpLink = new HttpLink({
    uri: config.apiUrl(),
    headers: {
      Authorization: `Bearer ${config.accessToken()}`,
    },
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${path}`
        )
      )
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })

  const link = ApolloLink.from([errorLink, httpLink])
  const cache = new InMemoryCache({
    typePolicies: {
      PullRequest: {
        fields: {
          score(_, { readField }) {
            const additions = readField("additions")
            const deletions = readField("deletions")
            const changedFiles = readField("changedFiles")
            const headRef = readField("headRef")

            const failurePenalty =
              headRef?.target?.status?.state === "FAILURE" ? 10 : 0

            const score =
              Math.floor(
                Math.abs(additions - deletions) / 100 +
                  Math.pow(changedFiles, 2) / 100
              ) + failurePenalty
            return score || 1
          },
        },
      },
    },
  })

  return new ApolloClient({
    link,
    cache,
  })
}
