import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SET_SELECTED_VIDEO = gql`
  mutation setSelectedVideo($video: Video) {
    setSelectedVideo(video: $video) @client
  }
`;

export default ({ video }) => (
  <Mutation mutation={SET_SELECTED_VIDEO} variables={{ video }}>
    {setSelectedVideo => (
      <div
        onClick={setSelectedVideo}
        className="w-full lg:flex my-4 cursor-pointer"
      >
        <div
          className="h-48 lg:h-auto lg:w-64 flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage: `url('${video.snippet.thumbnails.high.url}')`
          }}
        />
        <div className="w-full border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-black font-bold text-xl mb-2">
              {video.snippet.title}
            </div>
            <p className="text-grey-darker text-base">
              {video.snippet.description}
            </p>
          </div>
          <div className="flex videos-center">
            <div className="text-sm">
              <a
                href={`https://www.youtube.com/channel/${
                  video.snippet.channelId
                }`}
                className="text-black leading-none"
              >
                {video.snippet.channelTitle}
              </a>
              <p className="text-grey-dark">{video.snippet.publishedAt}</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </Mutation>
);
