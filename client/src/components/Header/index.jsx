
import { Link } from 'react-router-dom';

function Header() {
  return (

      <header>
      <h1>
          <Link to="/">
            <span role="img" aria-label="shopping bag">🛍️</span>
            tour de force
          </Link>
        </h1>
      </header>


  );
}

export default Header;