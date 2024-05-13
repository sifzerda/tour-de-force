import { Link } from 'react-router-dom';
import '../App' 

function TicketConfirmedPage() {
  return (
    <div className="confirmation-page">
      <div className="confirmation-content">
        <div className="confirmation-icon">
          <svg viewBox="0 0 512 512" className="confirmation-icon-svg">
            {/* Your SVG path here */}
          </svg>
        </div>
        <h1 className="confirmation-heading">Ticket Purchase Confirmed</h1>
        <p className="confirmation-message">
          Thank you for purchasing a ticket to a show! You will shortly receive an email with a copy of your ticket purchase and instructions on how to access the show.
        </p>
        <Link to="/" className="confirmation-button">
          Return to Site
        </Link>
      </div>
    </div>
  );
}

export default TicketConfirmedPage;