import { Link } from 'react-router-dom';
import Cart from "../components/Cart";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  const renderOrderHistory = (user) => 

    user ? (
      <>
        <h2>
          Order History for {user.firstName} {user.lastName}
        </h2>
        {user.orders.map((order) => (
          <div key={order._id} className="my-2">
            <h3>
              {new Date(parseInt(order.purchaseDate)).toLocaleDateString('en-AU')}
            </h3>
            <div className="flex-row">
              {order.products.map(({ _id, image, name, price }, index) => (
                <div key={index} className="card px-1 py-1">
                  <Link to={`/products/${_id}`}>
                    <img alt={name} src={`/images/${image}`} />
                    <p>{name}</p>
                  </Link>
                  <div>
                    <span>${price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    ) : null

    {/*     create a function called const renderTicketHistory then second renderOrderHistory below to renderTicketHistory*/}

  return (
    <>
      <div className="container my-1">
        <Link to="/shop">← Back to Products</Link>
        <div className="flex-container">
          <div className="flex-column">
            {renderOrderHistory(user)}
          </div>
          <div className="flex-column">
            {renderOrderHistory(user)}
          </div>
        </div>
        <Cart />
      </div>
      <div className='col-container'>{`
        .flex-container {
          display: flex;
          justify-content: space-between;
        }
        .flex-column {
          flex: 1;
          margin: 0 10px;
        }
      `}</div>
    </>
  );
}

export default OrderHistory;


