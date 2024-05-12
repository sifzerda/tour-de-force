import dayjs from 'dayjs';

function ThoughtList({ thoughts }) {
  return (
    <ul className="list-group list-group-flush">
      {thoughts.map((thought, index) => {
        // Debugging
        console.log('Raw value of thought.createdAt:', thought.createdAt);
        console.log('Type of thought.createdAt:', typeof thought.createdAt);
        console.log('Formatted createdAt:', thought.formattedCreatedAt);

        // Format createdAt date
        const formattedDate = dayjs(parseInt(thought.createdAt)).format('DD/MM/YYYY');

        return (
          <li key={index} className="list-group-item">
            <strong>{thought.thoughtAuthor} said: </strong>
            <p>{thought.thoughtText}</p>
            {/* Use the formattedCreatedAt virtual property */}
            <p>Posted on: {formattedDate}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default ThoughtList;