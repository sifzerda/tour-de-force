//import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
//import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
//import { idbPromise } from "../../utils/helpers";

function ShowCard({ show }) {
    // Destructuring show props
    const { name, description, venue, image, price } = show;

    return (
        <div className="card">
            <img src={image} alt={name} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">Price: ${price}</p>
                <ul className="list-group list-group-flush">
                    {venue.map((venueItem, index) => (
                        <li key={index} className="list-group-item">
                            <strong>Venue: {venueItem.name}</strong>
                            <ul>
                                {venueItem.time.map((timeItem, idx) => (
                                    <li key={idx}>{new Date(timeItem.time).toLocaleString()}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ShowCard;