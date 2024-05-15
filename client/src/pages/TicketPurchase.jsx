import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SHOWS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
//import ShowDetailOne from '../components/ShowDetailOne/index';
//import LocationForm from '../components/LocationForm';
import Cart from "../components/Cart";
import '../App.css';

function TicketPurchase() {
  const params = useParams();
  const { venue, date } = params;
  const id = params.id.split('?')[0]; // Extracting the id from the URL
  const [currentShow, setCurrentShow] = useState({});
  const { loading: showsLoading, data: showsData } = useQuery(QUERY_SHOWS, {
    variables: { id },
  });

  useEffect(() => {
    if (showsData && showsData.shows) {
      const foundShow = showsData.shows.find((show) => show._id === id);
      setCurrentShow(foundShow || {});
    }
  }, [showsData, id]);

  const confirmPurchase = () => {
    // Handle purchase confirmation logic here
    console.log('Purchase confirmed!');
  };

  return (
    <>
      {showsLoading ? (
        <div className="container my-1">
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h2>Please Confirm Your Event Details</h2>
            </div>
            <div className="card-body">

              <div className="ticket-details">
                <p>Event: {currentShow.name}</p>
                <p>Date: {currentShow.date}</p>
                <p>Venue: {venue}</p>
                <p>Price: ${currentShow.price}</p>
              </div>
              <button className="confirm-button" onClick={confirmPurchase}>Confirm Purchase</button>
            </div>
          </div>
          <Cart />
        </div>
      )}
    </>
  );
}

export default TicketPurchase;