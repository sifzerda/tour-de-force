import { Link, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import '../../App.css';

function LocationForm({ show }) {
    const { _id, name, description, venue, image, price } = show;
    const { id } = useParams();

    if (_id !== id) {
        return null;
    }

    const handleVenueChange = (event) => {
        // Handle venue selection
        const selectedVenue = event.target.value;
        // Your logic here
    };

    const handleTimeChange = (event) => {
        // Handle time selection
        const selectedTime = event.target.value;
        // Your logic here
    };

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
                <div>
                    <label htmlFor="venueDropdown">Select Venue:</label>
                    <select id="venueDropdown" onChange={handleVenueChange}>
                        {venue.map((venueItem, index) => (
                            <option key={index} value={venueItem.name}>{venueItem.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="timeDropdown">Select Time:</label>
                    <select id="timeDropdown" onChange={handleTimeChange}>
                        {venue.map((venueItem, index) => (
                            venueItem.time.map((timeItem, idx) => (
                                <option key={idx} value={timeItem.time}>{dayjs(parseInt(timeItem.time)).format('DD/MM/YYYY')}</option>
                            ))
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default LocationForm;