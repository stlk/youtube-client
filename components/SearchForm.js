import SearchIcon from "../components/icons/search";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SET_SEARCH_QUERY = gql`
  mutation setSearchQuery($query: String!) {
    setSearchQuery(query: $query) @client
  }
`;

export default () => {
  let input;
  return (
    <Mutation mutation={SET_SEARCH_QUERY}>
      {setSearchQuery => (
        <form
          className="flex"
          onSubmit={e => {
            e.preventDefault();
            setSearchQuery({ variables: { query: input.value } });
          }}
        >
          <input
            type="text"
            className="border border-grey py-2 px-2"
            placeholder="Search"
            ref={node => {
              input = node;
            }}
          />

          <button
            type="submit"
            className="border-t border-r border-b border-grey py-2 px-6 bg-grey-lighter hover:bg-grey-light text-grey-darker fill-current"
          >
            <SearchIcon />
          </button>
        </form>
      )}
    </Mutation>
  );
};
