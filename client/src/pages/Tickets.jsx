import { Link } from 'react-router-dom';
import '../App' 

function Tickets() {
  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <div className="confirmation-icon">
          <svg viewBox="0 0 512 512" className="confirmation-icon-svg">
            {/* Your SVG path here */}
          </svg>
        </div>
        <h1 className="confirmation-heading">Subscription Confirmed</h1>
        <p className="confirmation-message">
          Thank you for subscribing to our newsletter! You have been added to our list and will now receive updates about upcoming shows and events.
        </p>
        <Link to="/" className="confirmation-button">
          Return to Site
        </Link>
      </div>
    </div>
  );
}

export default Tickets;