import { Fragment } from "react";
import gql from "graphql-tag";
import Query from "./Query";

export const SELECTED_VIDEO = gql`
  {
    selectedVideo @client {
      id
      title
      description
      channelId
      channelTitle
      publishedAt
    }
  }
`;

export default () => (
  <div className="w-full md:px-4 my-8">
    <div className="bg-white md:p-4 flex flex-col justify-between leading-normal">
      <Query query={SELECTED_VIDEO}>
        {({ selectedVideo }) =>
          selectedVideo ? (
            <Fragment>
              <iframe
                className="m-auto max-w-full"
                width="560"
                height="315"
                src={`https://www.youtube-nocookie.com/embed/${
                  selectedVideo.id
                }?rel=0`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <div className="p-4 mb-8">
                <div className="text-black font-bold text-xl mb-2">
                  {selectedVideo.title}
                </div>
                <p className="text-grey-darker text-base">
                  {selectedVideo.description}
                </p>
              </div>
              <div className="flex">
                <div className="text-sm">
                  <a
                    href={`https://www.youtube.com/channel/${
                      selectedVideo.channelId
                    }`}
                    className="text-black leading-none"
                  >
                    {selectedVideo.channelTitle}
                  </a>
                  <p className="text-grey-dark">{selectedVideo.publishedAt}</p>
                </div>
              </div>
            </Fragment>
          ) : (
            "Please select video"
          )
        }
      </Query>
    </div>
  </div>
);
