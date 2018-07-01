import Link from "next/link";
import SearchForm from "./SearchForm";

const Header = () => (
  <header className="bg-white">
    <div className="container mx-auto px-4">
      <div className="flex items-center flex-col md:flex-row md:justify-between py-4">
        <h1>
          <Link href="/">
            <a className="no-underline text-grey-darkest">
              <span className="text-red">youtube</span> client
            </a>
          </Link>
        </h1>
        <SearchForm />
        <div className="flex items-center mt-4 lg:mt-0">
          <Link href="/about">
            <a>
              <img
                src="https://avatars0.githubusercontent.com/u/450975?s=460&v=4"
                alt="avatar"
                className="rounded-full w-8"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
