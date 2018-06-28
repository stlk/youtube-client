import SearchIcon from "../components/icons/search";

export default () => (
  <form action="#" className="flex">
    <input
      type="text"
      className="border border-grey py-2 px-2"
      placeholder="Search"
    />
    <button
      type="submit"
      className="border-t border-r border-b border-grey py-2 px-6 bg-grey-lighter hover:bg-grey-light text-grey-darker fill-current"
    >
      <SearchIcon />
    </button>
  </form>
);
