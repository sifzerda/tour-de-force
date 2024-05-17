import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
//import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
//import { idbPromise } from "../../utils/helpers";
import "../../App.css";

function ShowCard({ show }) {
    // Destructuring show props
    const { _id, name, description, venue, image, price } = show;

    return (
        <div className="card">


            <Link to={`/Shows/${_id}`}>
                <img
                    className="card-img-top" alt={name} src={`/images/${image}`} />

            </Link>

            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text-2">Price: ${price}</p>
                <h5 className=''>Venues:</h5>
                <ul className="list-group list-group-flush">
                    {venue.map((venueItem, index) => (
                        <li key={index} className="list-group-item">
                            <strong>{venueItem.name}</strong>
                            <ul>
                                {venueItem.time.map((timeItem, idx) => {
                                    //console.log("TimeItem =", timeItem); //  debugging
                                    //console.log("TimeItem.time =", timeItem.time); // debugging 
                                    const formattedDate = new Date(parseInt(timeItem.time)).toLocaleDateString('en-AU');
                                    return <li key={idx}>{formattedDate}</li>;
                                })}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ShowCard;