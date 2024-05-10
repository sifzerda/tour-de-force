import ShowCard from '../ShowCard';

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