import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Auth from "../../utils/auth";
import "../../App.css";

function Navi() {
  const currentPage = useLocation().pathname;
  const isLoggedIn = Auth.loggedIn();

  // login condition //

  function showNavigation() {
    if (isLoggedIn) {
      return (
        <React.Fragment>
          <li className="nav-item">
            <Link to="/account" className={currentPage === '/account' ? 'nav-link active' : 'nav-link'}>
              Account
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" onClick={() => Auth.logout()} className="nav-link">
              Logout
            </Link>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <li className="nav-item">
            <Link to="/signup" className={currentPage === '/signup' ? 'nav-link active' : 'nav-link'}>
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}>
              Login
            </Link>
          </li>
        </React.Fragment>
      );
    }
  }

  // end login condition function-----------------------------------------------//

  // ---------------------------------- MAIN NAVIGATION LINKS ----------//

  return (
    <ul className="nav nav-tabs">

{/* ---------------------------------- HOME --------------------------------  */}

      <li className="nav-item">
        <Link
          to="/"
          // This is a conditional (ternary) operator that checks to see if the current page is "Home"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>
          Home
        </Link>
      </li>

{/* ---------------------------------- SHOWS (ALL) --------------------------------  */}

      <li className="nav-item">
        <Link
          to="/Shows"
          // Check to see if the currentPage is `Shows`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === '/Shows' ? 'nav-link active' : 'nav-link'}>
          Shows & Events
        </Link>
      </li>

{/* ---------------------------------- SHOP (ALL) --------------------------------  */}

      <li className="nav-item">
        <Link
          to="/Shop"
          // Check to see if the currentPage is `Shop`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
          className={currentPage === '/Shop' ? 'nav-link active' : 'nav-link'}>
          Shop
        </Link>
      </li>

{/* ---------------------------------- log in conditional function --------------------------------  */}

<li className="nav-item">
        {showNavigation()}
      </li>


{/* ----------------------------------end --------------------------------  */}


    </ul>

  );
}

export default Navi;