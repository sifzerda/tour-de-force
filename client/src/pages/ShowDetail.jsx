import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_SHOWS } from '../utils/queries';
import spinner from '../assets/spinner.gif';

//import Cart from '../components/Cart';
//import { useStoreContext } from '../utils/GlobalState';
//import {  REMOVE_FROM_CART,  UPDATE_CART_QUANTITY,  ADD_TO_CART,  UPDATE_PRODUCTS, } from '../utils/actions';
//import { idbPromise } from '../utils/helpers';


function ShowDetail() {

  const { id } = useParams();
  const [currentShow, setCurrentShow] = useState({});
  const { loading, data } = useQuery(QUERY_SHOWS);


  useEffect(() => {

    if (data && data.shows) {
      const foundShow = data.shows.find((show) => show._id === id);
      setCurrentShow(foundShow);
    }
  }, [data, id]);


  return (
    <>
      {loading ? (
        <div className="container my-1">
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        currentShow && (
          <div className="container my-1">
            <Link to="/Shows">← Check Out What Else is On</Link>

            <h2>{currentShow.name}</h2>
            <p>{currentShow.description}</p>
            <p><strong>Price:</strong>${currentShow.price}{' '}</p>
            <img src={`/images/${currentShow.image}`} alt={currentShow.name} />
          </div>
        )
      )}
    </>
  );
}

export default ShowDetail;
