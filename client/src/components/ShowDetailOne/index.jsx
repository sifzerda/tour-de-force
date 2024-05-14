import { Link, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import '../../App.css';
//import ThoughtList from '../ThoughtList';

function ShowDetailOne({ show }) {
    // Destructuring show props to get data values
    const { _id, name, description, venue, image, price } = show;
    const { id } = useParams(); // Get the _id from the URL path

    // if id of show matches id of url, render show
    if (_id !== id) {
        // If no match, render nothing
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
                                    const formattedDate = dayjs(parseInt(timeItem.time)).format('DD/MM/YYYY');
                                    return <li key={idx}>{formattedDate}</li>;
                                })}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

{/* ------------------------ Thoughts list ------------------------------------*/}
        {/*     <ThoughtList thoughts={thoughts} />  */}



        </div>
    );
}

export default ShowDetailOne;