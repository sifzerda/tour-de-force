import '../../App.css'

import { Link } from 'react-router-dom';

function Header() {
  return (

      <header>
      <p className='logo-text'>
          <Link to="/">
            tour de force
          </Link>

          <span><img className='logo-img' src="../../public/images/mic.png" alt="Microphone" /></span> 
        </p>
      </header>
  );
}

export default Header;