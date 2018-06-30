import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { RestLink } from "apollo-link-rest";
import { withClientState } from "apollo-link-state";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  const fetch = require("node-fetch");
  global.Headers = fetch.Headers;
  global.fetch = fetch;
}

function create(initialState) {
  const restLink = new RestLink({
    uri: "https://www.googleapis.com/youtube/v3/"
  });

  // This is the same cache you pass into new ApolloClient
  const cache = new InMemoryCache().restore(initialState || {});

  const stateLink = withClientState({
    cache,
    defaults: {
      search: {
        __typename: "Search",
        searchQuery: ""
      }
    },
    resolvers: {
      Mutation: {
        setSearchQuery: (_, { query }, { cache }) => {
          cache.writeData({
            data: {
              search: {
                __typename: "Search",
                searchQuery: query
              }
            }
          });
        }
      }
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([stateLink, restLink, errorLink]),
    cache
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
