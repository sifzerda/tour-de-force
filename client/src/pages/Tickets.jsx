import { Link } from 'react-router-dom';
import '../App' 
import LocationForm from '../components/LocationForm';

function Tickets() {
  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <div className="confirmation-icon">

        </div>
        <h1 className="confirmation-heading">Subscription Confirmed</h1>
        <p className="confirmation-message">
          Thank you for subscribing to our newsletter! You have been added to our list and will now receive updates about upcoming shows and events.
        </p>



<LocationForm />



        <Link to="/" className="confirmation-button">
          Return to Site
        </Link>
      </div>
    </div>
  );
}

export default Tickets;