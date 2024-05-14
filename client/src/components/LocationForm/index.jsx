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
  const [seatRows, setSeatRows] = useState([]);
  const [seatCols, setSeatCols] = useState([]);

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
      // Assuming selectedVenue contains seat data
      const venueData = venue.find(venueItem => venueItem.name === selectedVenue);
      if (venueData) {
        setSeatRows(venueData.seatRows);
        setSeatCols(venueData.seatCols);
      }
    }
  };

  // CREATE THE SEAT MAP ----------------------------------//

// Function to convert row numbers to letters
const convertToLetter = (row) => {
  // Add 64 to get ASCII value of capital letters starting from 'A'
  return String.fromCharCode(row + 64);
};

  // Function to generate table rows and columns based on seatRows and seatCols
  const generateSeatMap = () => {
    // Initialize an array to store the table rows
    const rows = [];

  // 1 row stage
  rows.push(
    <tr key="stage">
      <td colSpan={seatCols} className="stage-cell">
        <div className="inner-stage">Stage</div>
      </td>
    </tr>
  );

  // 1 row VIP seats
  rows.push(
    <tr key="vip">
      <td colSpan={seatCols} className="vip-cell">
        {/* Wrap the entire row within a single button element */}
        <button className="seat-button-row">
          VIP
        </button>
      </td>
    </tr>
  );

  // for Loop iterates over the number of seat rows
  for (let row = 1; row <= seatRows; row++) {
    // create an array called 'cells' to hold the table cells 
    const cells = [];
    // Convert row number to letter
    const rowLabel = convertToLetter(row);
    for (let col = 1; col <= seatCols; col++) {
      // Generate a unique label for each seat
      const key = `seat-${row}-${col}`;
      // Add table cell to the array
      cells.push(
        <td key={key} className="seat-cell">
          {rowLabel}-{col}
        </td>
      );
    }
    // Wrap all cells of the row within a single button element
    rows.push(
      <tr key={row}>
        <td colSpan={seatCols}>
          {/* Wrap the entire row within a single button element */}
          <button className="seat-button-row">
            {cells}
          </button>
        </td>
      </tr>
    );
  }

  // Return the generated table rows
  return (
    <table className="seat-map">
      <tbody>{rows}</tbody>
    </table>
  );
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
              <label htmlFor="exampleFormControlSelect2">Select Date:</label>
              <select className="form-control" id="exampleFormControlSelect2" onChange={handleTimeChange}>
                <option value="" disabled selected>Select a time</option>
                {selectedVenue && filteredTimes.map((timeItem, idx) => (
                  // ** parse needed to convert from string to number
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
              <p>Date: {dayjs(parseInt(selectedTime)).format('DD/MM/YYYY')}</p>
              <h5>Seat Map:</h5>
              {generateSeatMap()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationForm;