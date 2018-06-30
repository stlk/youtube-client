import { graphql } from "react-apollo";
import gql from "graphql-tag";
import SearchResult from "./SearchResult";
import Query from "./Query";

const SEARCH_QUERY = gql`
  {
    search @client {
      searchQuery @client
    }
  }
`;

export const SEARCH_RESULTS = gql`
  query search($query: String!) {
    searchPayload(query: $query)
      @rest(
        type: "SearchPayload"
        path: "search?q=:query&maxResults=5&type=video&part=snippet&key=AIzaSyDodBabSEpQ3yjRJAE4DoPYcE2anT73Vu8"
      ) {
      items @type(name: "Item") {
        etag
        idObject: id @type(name: "Id") {
          videoId @export(as: "id")
        }
        snippet @type(name: "Snippet") {
          publishedAt
          title
          description
          channelId
          channelTitle
          thumbnails @type(name: "Thumbnails") {
            high @type(name: "Url") {
              url
            }
          }
        }
      }
    }
  }
`;

export default () => (
  <Query query={SEARCH_QUERY}>
    {({ search }) => (
      <Query query={SEARCH_RESULTS} variables={{ query: search.searchQuery }}>
        {({ searchPayload }) =>
          searchPayload && searchPayload.items && searchPayload.items.length ? (
            <section>
              {searchPayload.items.map(item => (
                <SearchResult key={item.idObject.videoId} video={item} />
              ))}
            </section>
          ) : null
        }
      </Query>
    )}
  </Query>
);
