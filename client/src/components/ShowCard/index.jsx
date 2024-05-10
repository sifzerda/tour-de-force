import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers"
//import { useStoreContext } from "../../utils/GlobalState";
//import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
//import { idbPromise } from "../../utils/helpers";

function ShowCard({ show }) {


    const {
        name,
        description,
        image,
        price,
        venue
    } = show;

    const venue0 = venue[0]?.name;
    const venue1 = venue[1]?.name;
    const venue2 = venue[2]?.name;
    const venue3 = venue[3]?.name;
    const venue4 = venue[4]?.name;
    const venue5 = venue[5]?.name;


    return (
        <div className="card px-1 py-1">
            <Link to={`/show/${_id}`}>
                <img
                    alt={name}
                    src={`/images/${image}`}
                />
                <p>{name}</p>
            </Link>
            <div>
                <div>{quantity} {pluralize("item", quantity)} in stock</div>
                <span>${price}</span>
            </div>
            <button onClick={addToCart}>Add to cart</button>
        </div>
    );
}

export default ShowCard;









const ShowCard = ({ show }) => {
    const { name, description, image, venue, price } = show;

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
};

export default ShowCard;