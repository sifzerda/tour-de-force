import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";
import { QUERY_SHOWS } from '../utils/queries';

const Home = () => {
  // Fetch shows data using the query
  const { loading, error, data } = useQuery(QUERY_SHOWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>What's On</h1>
      <Carousel />


      {/* a list of links to each show */}
      <div>
        <h2>All Shows</h2>
        <div className="link-list">
        <ul className="show-list">
        <div className="divider" />
          {data.shows.map(show => (
            <li key={show._id}>
              <Link className="show-link" to={`/Shows/${show._id}`}>
              <span>{show.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </div>
      <div className="divider" />
      <Cart />
    </div>
    
  );
};

export default Home;