
const ShowCard = ({ image, name, description, date, venue, price }) => {
  return (
    <div className="show-card">
      <img src={image} alt={name} />
      <div className="show-details">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Date: {new Date(date).toLocaleDateString()}</p>
        <p>Venue: {venue.map(v => v.name).join(', ')}</p>
        <p>Price: ${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ShowCard;