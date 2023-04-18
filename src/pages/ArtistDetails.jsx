import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
// rome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import  { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import PlayPause from '../components/PlayPause';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const TopSongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  // console.log(`active song: ${JSON.stringify(activeSong)}`);
  // console.log(`is playing: ${isPlaying}`);

  const songName = song?.title || song?.attributes?.name;
  return (
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.title === songName ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.attributes?.artwork?.url.replace('{w}', '125').replace('{h}', '125')}
          alt={song?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className="text-xl font-bold text-white">
            {song?.attributes?.name}
          </p>
          <p className="text-base text-gray-300 mt-1">
            { song?.attributes?.albumName }
          </p>
        </div>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <Loader title="Searching artist details" />;
  if (error) return <Error />;

  const artist = artistData?.data[0]?.attributes;
  const artistSongs = artistData?.data[0].views['top-songs']?.data.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    console.log('Artist details handle play click');
    console.log(song);
    dispatch(setActiveSong({ song, artistData, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />
      <div className="flex flex-col">
        <h3 className="text-white text-2xl font-bold mb-8">{artist.name}'s Biography</h3>
        <p className="text-base text-white">
          {artist?.artistBio ? parse(artist?.artistBio) : 'No artist biography provided!'}
        </p>
      </div>
      <div className="flex flex-col mt-8">
        <h1 className="front-bold text-3xl text-white">
          Top Songs
        </h1>
        <div className="mt-6 w-full flex flex-col">
          {artistSongs?.map((song, i) => (
            <TopSongBar
              key={song?.id}
              song={song}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              handlePauseClick={() => handlePauseClick(song, i)}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
