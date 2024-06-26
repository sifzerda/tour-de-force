import dayjs from 'dayjs'; // Import dayjs library
import { Link } from 'react-router-dom';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showFirstName = true,
}) => {
  // Check if thoughts is undefined or null
  if (!thoughts || !thoughts.length) {
    return <h3 className='post-head'>No Thoughts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showFirstName ? (
                <Link
                  className="text-light"
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    said on  {dayjs(thought.createdAt).format('DD/MM/YYYY')}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You said on {dayjs(thought.createdAt).format('DD/MM/YYYY')}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >

            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;