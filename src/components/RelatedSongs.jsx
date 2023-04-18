/* eslint-disable react/jsx-indent */
import SongBar from './SongBar';

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) =>
  // console.log(data);
  // eslint-disable-next-line implicit-arrow-linebreak
  (
    <div className="flex flex-col">
      <h1 className="front-bold text-3xl text-white">
        Related Songs:
      </h1>

      <div className="mt-6 w-full flex flex-col">
        {data?.map((song, i) => (
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={() => handlePauseClick(song, i)}
            handlePlayClick={() => handlePlayClick(song, i)}
          />
        ))}
      </div>
    </div>
  );
export default RelatedSongs;
