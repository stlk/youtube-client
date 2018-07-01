import Header from "../components/Header";

export default () => (
  <div>
    <Header />
    <div className="bg-white md:p-4 my-8 max-w-lg h-64 mx-auto">
      <p className="mb-4">
        Simple youtube client build using Apollo GraphQL Client, Next.js and
        Tailwind CSS.
      </p>
      <p className="mb-4">
        I wanted to explore how viable is using Apollo Client as REST client and
        local state management.
      </p>
      <p className="mb-4">
        You can see the source code on{" "}
        <a href="https://github.com/stlk/youtube-client">Github.com</a>.
      </p>
    </div>
  </div>
);
