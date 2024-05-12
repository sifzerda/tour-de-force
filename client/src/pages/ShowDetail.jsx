import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_SHOWS } from '../utils/queries';
import spinner from '../assets/spinner.gif';
import '../App.css';
import '../components/ShowDetailOne/index';
import ShowDetailOne from '../components/ShowDetailOne/index';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';
import { QUERY_THOUGHTS } from '../utils/queries';

//import Cart from '../components/Cart';
//import { useStoreContext } from '../utils/GlobalState';
//import {  REMOVE_FROM_CART,  UPDATE_CART_QUANTITY,  ADD_TO_CART,  UPDATE_PRODUCTS, } from '../utils/actions';
//import { idbPromise } from '../utils/helpers';

function ShowDetail() {

  const { id } = useParams();
  const [currentShow, setCurrentShow] = useState({});
  
  // GET shows data
  const { loading: showsLoading, data: showsData } = useQuery(QUERY_SHOWS);
  
  // GET thoughts data
    const { loading: thoughtsLoading, data: thoughtsData } = useQuery(QUERY_THOUGHTS);
  
    useEffect(() => {
      if (showsData && showsData.shows) {
        const foundShow = showsData.shows.find((show) => show._id === id);
        setCurrentShow(foundShow);
      }
    }, [showsData, id]);
  
    return (
      <>
        {(showsLoading || thoughtsLoading) ? (
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
  
                {/* user thoughts/comments*/}

                <div className='flex-row justify-center'>
                  <div className='col-12 col-md-10 mb-3 p-3' style={{ border: '1px dotted #1a1a1a' }}>
                    <ThoughtForm />
                  </div>
  
                 <div className='col-12 col-md-8 mb-3'>
{/*                    {/* Pass thoughtsData to ThoughtList */}
                    <ThoughtList thoughts={thoughtsData?.thoughts || []} title='Some feed for Thoughts...' />
                 </div>
                </div>
  
{/*                {/* generated show detail card   /}            */}
                <ShowDetailOne show={currentShow} />           
              </div>
            </div>
          )
        )}
      </>
    );
  }
  
  export default ShowDetail;
