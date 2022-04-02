import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"

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
  const cache = new InMemoryCache()

  return new ApolloClient({
    link,
    cache,
  })
}
