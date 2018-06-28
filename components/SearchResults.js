import { graphql } from "react-apollo";
import gql from "graphql-tag";
import SearchResult from "./SearchResult";

function SearchResults({ data: { error, searchPayload } }) {
  if (error) return <div>Error loading videos.</div>;
  if (searchPayload && searchPayload.items && searchPayload.items.length) {
    return (
      <section>
        {searchPayload.items.map(item => (
          <SearchResult key={item.idObject.videoId} video={item} />
        ))}
      </section>
    );
  }
  return <div>Loading...</div>;
}

export const searchResults = gql`
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
export const searchResultsQueryVars = {
  query: "microconf"
};

export default graphql(searchResults, {
  options: {
    variables: searchResultsQueryVars
  },
  props: ({ data }) => {
    return {
      data
    };
  }
})(SearchResults);
