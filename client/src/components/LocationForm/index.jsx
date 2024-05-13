import { useState } from 'react'; // Import useState from React
import { Link, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import '../../App.css';

function LocationForm({ show }) {
  const { _id, name, description, venue, image, price } = show;
  const { id } = useParams();
  const [selectedVenue, setSelectedVenue] = useState('');
  const [filteredTimes, setFilteredTimes] = useState([]);

  if (_id !== id) {
    return null;
  }

  const handleVenueChange = (event) => {
    const selectedVenue = event.target.value;
    setSelectedVenue(selectedVenue);
    const venueTimes = venue.find(venueItem => venueItem.name === selectedVenue)?.time || [];
    setFilteredTimes(venueTimes);
  };

  const handleTimeChange = (event) => {
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
            <option value="" disabled selected>Select a venue</option>
            {venue.map((venueItem, index) => (
              <option key={index} value={venueItem.name}>{venueItem.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeDropdown">Select Time:</label>
          <select id="timeDropdown" onChange={handleTimeChange}>
            <option value="" disabled selected>Select a time</option>
            {selectedVenue ? (
              filteredTimes.map((timeItem, idx) => (
                <option key={idx} value={timeItem.time}>{dayjs(parseInt(timeItem.time)).format('DD/MM/YYYY')}</option>
              ))
            ) : (
              <option disabled>Select a venue to see times</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}

export default LocationForm;