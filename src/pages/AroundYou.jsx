import { useState } from 'react';
import { useSelector } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

// rome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
  // const [country, setCountry] = useState('');
  const [country] = useState('PH');
  const [loading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  // eslint-disable-next-line no-console
  console.log(country);

  // Uncomment this and get your API key from your account at geo.ipify.com
  /* useEffect(() => {
    axios.get(`https://geo.ipify.org/api/v1?apiKey=GEO_IPIFY_API_KEY_HERE`)
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]); */

  if (isFetching && loading) return <Loader title="Loading songs around you" />;
  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left">
        Around You <span className="font-black">{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
