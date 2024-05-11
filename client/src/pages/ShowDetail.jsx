import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_SHOWS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import '../App.css';
import '../components/ShowDetailOne/index';
import ShowDetailOne from '../components/ShowDetailOne/index';

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



            <div className="card-body">
            <h2 className='detail-title'>{currentShow.name}</h2>
            <p className='detail-text'>{currentShow.description}</p>
            <p className='detail-price'><strong>Price:</strong>${currentShow.price}{' '}</p>
            <img src={`/images/${currentShow.image}`} alt={currentShow.name} />

            <ul className="list-group list-group-flush">
              
            </ul>



<ShowDetailOne show={currentShow} />




            </div>
          </div>
        )
      )}
    </>
  );
}

export default ShowDetail;
