import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SHOWS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import ShowDetailOne from '../components/ShowDetailOne/index';
import LocationForm from '../components/LocationForm';

import '../App.css';

//import ThoughtForm from '../components/ThoughtForm';
//import { QUERY_THOUGHTS } from '../utils/queries';
//import Cart from '../components/Cart';
//import { useStoreContext } from '../utils/GlobalState';
//import {  REMOVE_FROM_CART,  UPDATE_CART_QUANTITY,  ADD_TO_CART,  UPDATE_PRODUCTS, } from '../utils/actions';
//import { idbPromise } from '../utils/helpers';

function ShowDetail() {
  const { id } = useParams();
  const [currentShow, setCurrentShow] = useState({});

  // GET shows data
  const { loading: showsLoading, data: showsData } = useQuery(QUERY_SHOWS);

  useEffect(() => {
    if (showsData && showsData.shows) {
      const foundShow = showsData.shows.find((show) => show._id === id);
      setCurrentShow(foundShow);
    }
  }, [showsData, id]);


  return (
    <>
      {showsLoading ? (
        <div className="container my-1">
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        currentShow && (
          <div className="container my-1">



<div className='banner-image'>

<img className='banner-image' src={`/images/${currentShow.image}`} alt={currentShow.name} />

</div>



            <Link to={`/shows/${currentShow._id}`}>← Back to Show Info</Link>
            <div className="card-body">
              <h2 className='detail-title'>{currentShow.name}</h2>
              <p className='detail-text'>{currentShow.description}</p>
              <p className='detail-price'><strong>Price:</strong>${currentShow.price}{' '}</p>
              <img src={`/images/${currentShow.image}`} alt={currentShow.name} />
            </div>

{/* ------------------------ insert currentShow.ticketDesc ----------------*/}
{/* ------------------------ insert currentShow.ticketDesc ----------------*/}
{/* ------------------------ insert currentShow.ticketDesc ----------------*/}
{/* ------------------------ insert currentShow.ticketDesc ----------------*/}
{/* ------------------------ insert currentShow.ticketDesc ----------------*/}


<p className='detail-price'><strong>Find Tickets:</strong></p>
            {/* Pass the venues of the current show as props to LocationForm */}


<LocationForm show={currentShow} />



{/* ------------------------ insert currentShow.ticketDesc ----------------*/}
{/* ------------------------ insert currentShow.ticketDesc ----------------*/}
{/* ------------------------ insert currentShow.ticketDesc ----------------*/}
{/* ------------------------ insert currentShow.ticketDesc ----------------*/}
{/* ------------------------ insert currentShow.ticketDesc ----------------*/}
{/* ------------------------ insert currentShow.ticketDesc ----------------*/}

            <ShowDetailOne show={currentShow} />

          </div>
        )
      )}
    </>
  );
}

export default ShowDetail;