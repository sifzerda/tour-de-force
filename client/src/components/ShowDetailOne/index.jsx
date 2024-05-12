import { Link, useParams } from "react-router-dom";
import '../../App.css';

function ShowDetailOne({ show }) {
    // Destructuring show props
    const { _id, name, description, venue, image, price, thoughts } = show;
    const { id } = useParams(); // Get the _id from the URL path

    // Check if the _id from the URL path matches the _id of the current show
    if (_id !== id) {
        // If not matching, return null to render nothing
        return null;
    }

    return (
        <div className="card">
            <Link to={`/Shows/${_id}`}>
                <img className="card-img-top" alt={name} src={`/images/${image}`} />
                <p>{name}</p>
            </Link>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">Price: ${price}</p>
                <ul className="list-group list-group-flush">
                    {venue.map((venueItem, index) => (
                        <li key={index} className="list-group-item">
                            <strong>Venue: {venueItem.name}</strong>
                            <ul>
                                {venueItem.time.map((timeItem, idx) => {
                                    console.log("TimeItem =", timeItem); //  debugging
                                    console.log("TimeItem.time =", timeItem.time); // debugging 
                                    const formattedDate = new Date(parseInt(timeItem.time)).toLocaleDateString('en-AU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    });
                                    return <li key={idx}>{formattedDate}</li>;
                                })}
                            </ul>
                        </li>
                    ))}
                </ul>


            </div>

{/*  ----------------------------------- thoughts ------------------------ */}

                {/* Render thoughts list */}
                <ul className="list-group list-group-flush">
                    {thoughts.map((thought, index) => (
                        <li key={index} className="list-group-item">
                            <strong>{thought.thoughtAuthor} said: </strong>
                            <p>{thought.thoughtText}</p>
                            <p>Posted on: {new Date(thought.createdAt).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>






        </div>










    );
}

export default ShowDetailOne;