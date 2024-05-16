import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SHOWS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
//import ShowDetailOne from '../components/ShowDetailOne/index';
//import LocationForm from '../components/LocationForm';
import Cart from "../components/Cart";
import '../App.css';
import PayPalPayment from '../components/PayPalPayment';
import Auth from "../utils/auth";

function TicketPurchase() {
  const params = useParams();
  const id = params.id.split('?')[0];
  const queryParams = new URLSearchParams(window.location.search);
  const venue = queryParams.get('venue') || '';
  const dateParam = queryParams.get('date') || '';

  // Convert and format the timestamp using dayjs
  const date = new Date(parseInt(dateParam)).toLocaleDateString('en-AU');

  //console.log('Venue:', venue); ---- debugging 
  //console.log('Date Param:', dateParam); ---- debugging
  //console.log('Formatted Date:', date); ---- debugging

  const [currentShow, setCurrentShow] = useState({});
  const [showPayPal, setShowPayPal] = useState(false);
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
    if (!Auth.loggedIn()) {
      alert('Please log in or sign up to finalize your purchase.');
      return;
    }
    console.log('New PayPal window opened');
    setShowPayPal(true);
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
              <h2>Confirm Your Event Details</h2>
            </div>
            <div className="card-body">
              <div className="ticket-details">
                <p>Event: {currentShow.name}</p>
                <p>Date: {date}</p>
                <p>Venue: {venue}</p>
                <p>Price: ${currentShow.price}</p>
              </div>

{/* go back button --------------------------------------------------------------*/}
<Link to={`/tickets/${currentShow._id}`}>← Select a different venue or date</Link>
              {Auth.loggedIn() ? (
                <button className="confirm-button" onClick={confirmPurchase}>Confirm Purchase</button>
              ) : (
                <button className="confirm-button" onClick={() => alert('Please log in to finalize your purchase.')}>
                  Confirm Purchase
                </button>
              )}
              {showPayPal && (
                <div className="paypal-div">
                  <p>PayPal goes here</p>
                  <PayPalPayment />
                </div>
              )}
            </div>
          </div>
          {/* Include Cart component */}
          <Cart />
        </div>
      )}
    </>
  );
}

export default TicketPurchase;