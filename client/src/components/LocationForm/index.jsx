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
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatRows, setSeatRows] = useState([]);
  const [seatCols, setSeatCols] = useState([]);
  // if the show id doesn't match the url path id, render nothing
  if (_id !== id) {
    return null;
  }
  // function for selecting show venue dropdown
  const handleVenueChange = (event) => {
    const selectedVenue = event.target.value;
    setSelectedVenue(selectedVenue);
    const venueTimes = venue.find((venueItem) => venueItem.name === selectedVenue)?.time || [];
    setFilteredTimes(venueTimes);
    setSelectedTime(''); // Reset selected time
    setSelectedSeats([]); // Reset seat selection
    setShowAvailability(false); // Hide availability
  };

  // function for selecting show time dropdown
  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    setSelectedTime(selectedTime);
    setSelectedSeats([]); // Reset seat selection
    setShowAvailability(false); // Hide availability
  };

  // function for ensuring conditional rendering of elements (seat availability confirmation message) only once user selects a time and venue
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

  const handleSeatSelection = (row, col) => {
    setSelectedSeats([{ row, col }]);
  };

  // CREATE THE CONDITIONAL SEAT MAP ----------------------------------//

  // Function to convert row numbers to letters
  const convertToLetter = (row) => {
    return String.fromCharCode(row + 64);
  };

  // Function to take venue.seatRows and venue.seatCols and generate a seat grid/map
  const generateSeatMap = () => {
    // table rows stored in empty array
    const rows = [];
    // 1 row stage width of show.venue.seatCols
    rows.push(
      <tr key="stage">
        <td colSpan={seatCols} className="stage-cell">
          <div className="inner-stage">Stage</div>
        </td>
      </tr>
    );

    // 1 row VIP seats width of show.venue.seatCols
    rows.push(
      <tr key="vip">
        <td colSpan={seatCols} className="vip-cell">
          {/* Entire VIP row is a single button */}
          <button className="seat-button-row">
            VIP
          </button>
        </td>
      </tr>
    );

    // for Loop iterates over the number of seat rows
    for (let row = 1; row <= seatRows; row++) {
      // create an array called 'cells' to store the table cells 
      const cells = [];
      // Convert row number to letter
      const rowLabel = convertToLetter(row);
      for (let col = 1; col <= seatCols; col++) {
        // create a unique label for each seat
        const key = `seat-${row}-${col}`;
        // Add table cell to the array
        cells.push(
          <td key={key} className="seat-cell">
            {/* each row is a button for hover /active effect */}
            <button className="seat-button" onClick={() => handleSeatSelection(rowLabel, col)}>
              {rowLabel}-{col}
            </button>
          </td>
        );
      }
      // Wrap all cells of the row within a single button element for hover/active effect
      rows.push(
        <tr key={row}>
          <td colSpan={seatCols}>
            {/* each row is a button for hover /active effect */}
            <button className="seat-button-row">
              {cells}
            </button>
          </td>
        </tr>
      );
    }

    // Return the generated seat map of rows/cols
    return (
      <table className="seat-map">
        <tbody>{rows}</tbody>
      </table>
    );
  };

  // for ungreying 'get ticket' button once venue time selected and seat row clicked to confirm availability
  // will 'un-disable' if all these conditions are Boolean true
  const isFormValid = selectedVenue && selectedTime && selectedSeats.length > 0;

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

          {/* Ticket purchasing form */}
          <h5 className="card-title">Check ticket availability for {name}</h5>
          <form>
            <div className="ticket-form-group">
              <label htmlFor="exampleFormControlSelect1">Select Venue:</label>
              <select className="form-control" id="exampleFormControlSelect1" onChange={handleVenueChange} defaultValue="">
                <option value="" disabled>Select a venue</option>
                {venue.map((venueItem, index) => (
                  <option key={index} value={venueItem.name}>{venueItem.name}</option>
                ))}
              </select>
            </div>

            <div className="ticket-form-group">
              <label htmlFor="exampleFormControlSelect2">Select Date:</label>
              <select className="form-control" id="exampleFormControlSelect2" onChange={handleTimeChange} defaultValue="">
                <option value="" disabled>Select a time</option>
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
              <p>Date: {dayjs(parseInt(selectedTime)).format('DD/MM/YYYY')}</p>
              <h5>Seat Map:</h5>
              {generateSeatMap()}

              <p>Ticket Availability</p>
              {selectedSeats.length > 0 && (
                <div className="seat-selection-info">
                  <p>Seats are available</p>
                </div>
              )}
            </div>
          )}

<Link
            to={`/tickets/purchase/${id}?venue=${selectedVenue}&date=${selectedTime}`}
            className={`btn btn-primary ${!isFormValid && 'disabled'}`}
            onClick={isFormValid ? null : (e) => e.preventDefault()}
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LocationForm;