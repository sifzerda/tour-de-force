import Cart from "../components/Cart";
import '../App.css';


const TicketPurchase = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Confirm Your Event Details</h2>
        </div>
        <div className="card-body">

          <div className="ticket-details">
            <p>Event: Awesome Concert</p>
            <p>Date: July 21, 2024</p>
            <p>Time: 7:00 PM</p>
            <p>Venue: The Grand Arena</p>
          </div>
          <button className="confirm-button">Confirm Purchase</button>
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default TicketPurchase;