import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import Player from "../components/Player";

export default () => (
  <div>
    <Header />
    <div className="flex flex-col-reverse md:flex-row">
      <div className="md:w-1/2">
        <SearchResults />
      </div>
      <div className="md:w-1/2">
        <Player />
      </div>
    </div>
  </div>
);
