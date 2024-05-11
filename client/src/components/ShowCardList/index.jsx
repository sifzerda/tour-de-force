import ShowCard from '../ShowCard';
import "../../App.css";

function ShowCardList({ shows }) {
  return (
      <div className="show-card-list">
          {shows.map((show, index) => (
              <ShowCard key={index} show={show} />
          ))}
      </div>
  );
}

export default ShowCardList;