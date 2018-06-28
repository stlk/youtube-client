import { ApolloClient } from "apollo-boost";
import { RestLink } from "apollo-link-rest";
import { InMemoryCache } from "apollo-boost";
let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  const fetch = require("node-fetch");
  global.Headers = fetch.Headers;
  global.fetch = fetch;
}

const restLink = new RestLink({
  uri: "https://www.googleapis.com/youtube/v3/"
});

function create(initialState) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: restLink,
    cache: new InMemoryCache().restore(initialState || {})
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
