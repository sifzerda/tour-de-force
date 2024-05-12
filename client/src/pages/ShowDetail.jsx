import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SHOWS } from '../utils/queries';
import { ADD_THOUGHT } from '../utils/mutations';
import spinner from '../assets/spinner.gif';
import '../App.css';
import '../components/ShowDetailOne/index';
import ShowDetailOne from '../components/ShowDetailOne/index';
import Auth from '../utils/auth';

//import ThoughtList from '../components/ThoughtList';
//import ThoughtForm from '../components/ThoughtForm';
//import { QUERY_THOUGHTS } from '../utils/queries';

//import Cart from '../components/Cart';
//import { useStoreContext } from '../utils/GlobalState';
//import {  REMOVE_FROM_CART,  UPDATE_CART_QUANTITY,  ADD_TO_CART,  UPDATE_PRODUCTS, } from '../utils/actions';
//import { idbPromise } from '../utils/helpers';

function ShowDetail() {

  const { id } = useParams();
  const [currentShow, setCurrentShow] = useState({});
  const [thoughtText, setThoughtText] = useState('');
  const [addThought, { loading: thoughtLoading, error: thoughtError }] = useMutation(ADD_THOUGHT);

  // GET shows data
  const { loading: showsLoading, data: showsData } = useQuery(QUERY_SHOWS);
  
  // GET thoughts data
 //   const { loading: thoughtsLoading, data: thoughtsData } = useQuery(QUERY_THOUGHTS);
  
    useEffect(() => {
      if (showsData && showsData.shows) {
        const foundShow = showsData.shows.find((show) => show._id === id);
        setCurrentShow(foundShow);
      }
    }, [showsData, id]);

    const handleThoughtChange = (event) => {
      setThoughtText(event.target.value);
    };

    const handleThoughtSubmit = async (event) => {
      event.preventDefault();
      try {
        console.log('Submitting thought...');
        console.log('showId:', id);
        console.log('thoughtText:', thoughtText);
        
        await addThought({
          variables: { showId: id, thoughtText },
          refetchQueries: [{ query: QUERY_SHOWS }] // Optionally refetch the shows list
        });
        
        console.log('Thought submitted successfully!');
        
        setThoughtText('');
      } catch (err) {
        // Handle error
        console.error('Error creating thought:', err);
      }
    };

    return (
      <>
        {showsLoading ? (
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
                
{/*-------------------- Form to add thought -------------------------------------------------------------- */}
                
<div className='post-box'>
                <h3 className='post-head'>Seen the show? Leave a Review!</h3>
                {Auth.loggedIn() ? (
                  <>
                    <form onSubmit={handleThoughtSubmit}>
                      <div className="col-12 col-lg-9">
                        <textarea
                          name="thoughtText"
                          placeholder="Share your thoughts..."
                          value={thoughtText}
                          className="form-input w-100"
                          style={{ lineHeight: '1.5', resize: 'vertical' }}
                          onChange={handleThoughtChange}
                        ></textarea>
                      </div>

                      <div className="col-12 col-lg-3">
                        <button className="btn btn-primary btn-block py-3" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                    {thoughtError && <p>Error: {thoughtError.message}</p>}
                  </>
                ) : (
                  <p>
                    You need to be logged in to share a review. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                  </p>
                )}
              </div>

              {/* Show details */}
              <ShowDetailOne show={currentShow} />
            </div>
          </div>
        )
      )}
    </>
  );
}

export default ShowDetail;