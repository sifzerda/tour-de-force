import { Link } from 'react-router-dom';
import Cart from "../components/Cart";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data, loading, error } = useQuery(QUERY_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("Data:", data);

  let user;

  if (data) {
    user = data.user;
  }

  const renderOrderHistory = (user) => (
    user ? (
      <>
        <h2>Your Order History</h2>
        {user.orders.map((order) => (
          <div key={order._id} className="order-history-item">
            <h3 className='order-date-margin-bottom'>{new Date(parseInt(order.purchaseDate)).toLocaleDateString('en-AU')}</h3>
            <div className="order-products">
              {order.products.map(({ _id, image, name, price }, index) => (
                <div key={index} className="order-product">
                  <Link to={`/products/${_id}`}>
                    <img alt={name} src={`/images/${image}`} />
                  </Link>
                  <div className="product-details">
                    <Link to={`/products/${_id}`}>
                      <p className='merch-name'>{name}</p>
                    </Link>
                    <div className="price">${price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    ) : null
  );

  const renderTicketHistory = (user) => (
    user ? (
      <>
        <h2 className='text-add-margin-bottom'>Your Ticket History</h2>
        <div className="ticket-history">
          {user.tickets.map((ticket) => (
            <div key={ticket._id} className="ticket-card">
              <div className="dashed-line"></div>
              <div className="ticket-content">
                <h3>Purchased on: {new Date(parseInt(ticket.purchaseDate)).toLocaleDateString('en-AU')}</h3>
                <div className="ticket-details">
                  <p><strong>Show:</strong> {ticket.showName}</p>
                  <p><strong>Venue:</strong> {ticket.venue}</p>
                  <p><strong>Date & Time:</strong> {ticket.time}</p>
                </div>
              </div>
              <div className="barcode"></div>
            </div>
          ))}
        </div>
      </>
    ) : null
  );

  return (
    <>
      <h2>Welcome back <span>{user.firstName} {user.lastName}</span>!</h2>
      <Link to="/shop">← Back to Products</Link>
      <div className="container my-1">
        <div className="flex-container-x">
          <div className="flex-column-x">
            {renderTicketHistory(user)} 
          </div>
          <div className="flex-column-x">
            {renderOrderHistory(user)}  
          </div>
        </div>
        <Cart />
      </div>
    </>
  );
}

export default OrderHistory;