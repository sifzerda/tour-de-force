import { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import '../../App.css';

function LocationForm({ show }) {
  const { _id, name, description, venue, image, price } = show;
  const { id } = useParams();
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [filteredTimes, setFilteredTimes] = useState([]);
  const [showAvailability, setShowAvailability] = useState(false);

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
    setSelectedTime(selectedTime);
  };

  const handleCheckAvailability = (event) => {
    event.preventDefault();
    if (!selectedVenue || !selectedTime) {
      alert("Please select a venue and time to see seat availability");
    } else {
      setShowAvailability(true);
    }
  };

  return (
    <div className='ticket-form-container'>






<div className="card">
        <Link to={`/Shows/${_id}`}>
          <img className="card-img-top" alt={name} src={`/images/${image}`} />
          <p>{name}</p>
        </Link>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">Price: ${price}</p>


{/* ----------------------------------- ticket purchasing form ------------------------*/}

{/* Ticket purchasing form */}
          <h5 className="card-title">Check ticket availability for {name}</h5>

          <form>

            <div className="ticket-form-group">
              <label htmlFor="exampleFormControlSelect1">Select Venue:</label>
              <select className="form-control" id="exampleFormControlSelect1" onChange={handleVenueChange}>
                <option value="" disabled selected>Select a venue</option>
                {venue.map((venueItem, index) => (
                  <option key={index} value={venueItem.name}>{venueItem.name}</option>
                ))}
              </select>
            </div>

            <div className="ticket-form-group">
              <label htmlFor="exampleFormControlSelect2">Select Date & Time:</label>
              <select className="form-control" id="exampleFormControlSelect2" onChange={handleTimeChange}>
                <option value="" disabled selected>Select a time</option>
                {selectedVenue && filteredTimes.map((timeItem, idx) => (
                  <option key={idx} value={timeItem.time}>{dayjs(parseInt(timeItem.time)).format('DD/MM/YYYY')}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleCheckAvailability}>Check availability</button>
          
          </form>

{/* ----------------------------------- end form ----------------------------------------*/}

{/* Availability card */}

          {showAvailability && (
            <div className="availability-card">
              <h5>Availability for {name}</h5>
              <p>Venue: {selectedVenue}</p>
              <p>Time: {dayjs(parseInt(selectedTime)).format('DD/MM/YYYY')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationForm;