import ShowCardList from '../components/ShowCardList';
//import shows from '../../../server/config/seeds';
import { useQuery } from '@apollo/client';
import { QUERY_SHOWS } from '../utils/queries';
import Cart from "../components/Cart";

const Shows = () => {
  const { loading, error, data } = useQuery(QUERY_SHOWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div className="container">
      <h1>Shows</h1>

      {data && <ShowCardList shows={data.shows} />}
      <Cart />
    </div>
  );
};

export default Shows;

