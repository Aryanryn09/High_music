import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => {
  const songName = song?.title || song?.attributes?.name;
  const activeSongName = activeSong?.title || activeSong?.attributes?.name;
  // console.log(`PLAYPAUSE COMPONENT: ${songName}`);
  return (
    (isPlaying && activeSongName === songName) ? (
      <FaPauseCircle
        size={35}
        className="text-gray-300"
        onClick={handlePause}
      />
    ) : (
      <FaPlayCircle
        size={35}
        className="text-gray-300"
        onClick={handlePlay}
      />
    )
  );
};

export default PlayPause;
