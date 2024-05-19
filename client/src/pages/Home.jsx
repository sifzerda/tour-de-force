import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Cart from "../components/Cart";
import Carousel from "../components/Carousel";
import { QUERY_SHOWS } from '../utils/queries';
import ReactPlayer from 'react-player';
import '../App.css';

const Home = () => {
  // Fetch shows data using the query
  const { loading, error, data } = useQuery(QUERY_SHOWS);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleVideoLinkClick = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
  };

  return (
    <div className="container">
      <h1 className='whats-on'>What's On</h1>
      <Carousel />
    
      {/* Links to each show */}
      <div>
        <h2>All Shows</h2>
        <div className="link-list">
          <ul className="show-list">
            <div className="divider" />
            {data.shows.map(show => (
              <li key={show._id}>
                <a className="show-link" href={`/Shows/${show._id}`}>
                  <span>{show.name}</span>
                </a>
                <button onClick={() => handleVideoLinkClick(show.videoUrl)}>Watch Video</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Video player */}
      <div className="youtube-video-container">
        <div className="video-wrapper">
          {selectedVideoUrl && (
            <ReactPlayer
              url={selectedVideoUrl}
              controls
            />
          )}
        </div>
      </div>

      <div className="divider" />
      <Cart />
    </div>
  );
};

export default Home;