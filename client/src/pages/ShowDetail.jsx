import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SHOWS } from '../utils/queries';
import { ADD_THOUGHT } from '../utils/mutations';
import spinner from '../assets/spinner.gif';
import Auth from '../utils/auth';
import ThoughtList from '../components/ThoughtList';
import Cart from "../components/Cart";
import '../App.css';

function ShowDetail() {
  const { id } = useParams();
  const [currentShow, setCurrentShow] = useState({});
  const [thoughtText, setThoughtText] = useState('');

  // GET thoughts data
  const [addThought, { loading: thoughtLoading, error: thoughtError }] = useMutation(ADD_THOUGHT);

  // GET shows data
  const { loading: showsLoading, data: showsData } = useQuery(QUERY_SHOWS);

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
        refetchQueries: [{ query: QUERY_SHOWS }]
      });

      console.log('Thought submitted successfully!');

      setThoughtText('');
    } catch (err) {
      console.error('Error creating thought:', err);
    }
  };

  return (
    <>
      {showsLoading || thoughtLoading ? (
        <div className="container my-1">
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        currentShow && (
          <>
            <Link to="/Shows" className='back-to-shows link-with-margin'>← Check Out What Else is On</Link>
            <div className="container my-1-3">
              <div className="card-body">
                <h2 className='detail-title'>{currentShow.name}</h2>
                <p className='detail-text'>{currentShow.description}</p>
                <div className="divider-2" />
                <p className='detail-price'><strong>Price:</strong>${currentShow.price}{' '}</p>

                <div className="container my-1-4">
                  <Link to={`/tickets/${currentShow._id}`} className="ticket-link">
                    <p>
                      <span className="ticket-icon">🎟️</span>
                      <span className="ticket-icon">🎟️</span>
                      <span className="ticket-icon">🎟️</span>
                      <span className="ticket-icon">🎟️</span>
                      Find Tickets to {currentShow.name}
                      <span className="ticket-icon">🎟️</span>
                      <span className="ticket-icon">🎟️</span>
                      <span className="ticket-icon">🎟️</span>
                      <span className="ticket-icon">🎟️</span>
                    </p>
                  </Link>
                </div>

                <img src={`/images/${currentShow.image}`} alt={currentShow.name} />
              </div>
              {/*--------------------------- Form to add thought -----------------------------------------------------------------*/}
              <div className='post-box'>
                <h3 className='post-head'>Seen the show? Leave a Review!</h3>
                {Auth.loggedIn() ? (
                  <>
                    {/* Center the form */}
                    <div className="row justify-content-center">
                      <form onSubmit={handleThoughtSubmit} className="col-lg-9">
                        <textarea
                          name="thoughtText"
                          placeholder="Share your thoughts..."
                          value={thoughtText}
                          className="form-input w-100"
                          style={{ lineHeight: '1.5', resize: 'vertical' }}
                          onChange={handleThoughtChange}
                        ></textarea>
                        <button className="btn btn-primary btn-block py-3" type="submit">
                          Submit
                        </button>
                      </form>
                    </div>
                    {thoughtError && <p>Error: {thoughtError.message}</p>}
                  </>
                ) : (
                  <p>
                    You need to be logged in to share a review. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                  </p>
                )}
              </div>

              <div className='post-box'>
                <h3 className='post-head'>What others are saying about the show</h3>
                <ThoughtList thoughts={currentShow.thoughts} />
              </div>
              <Cart />
            </div>
          </>
        )
      )}
    </>
  );
}

export default ShowDetail;