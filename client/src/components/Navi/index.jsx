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
        className={currentPage === '/' ? 'nav-link active' : 'nav-link'}>
        Home
      </Link>
    </li>

    {/* ---------------------------------- SHOWS (ALL) --------------------------------  */}

    <li className="nav-item">
      <Link
        to="/Shows"
        className={currentPage === '/Shows' ? 'nav-link active' : 'nav-link'}>
        Shows & Events
      </Link>
    </li>

    {/* ---------------------------------- SHOP (ALL) --------------------------------  */}

    <li className="nav-item">
      <Link
        to="/Shop"
        className={currentPage === '/Shop' ? 'nav-link active' : 'nav-link'}>
        Shop
      </Link>
    </li>

    {/* ---------------------------------- log in conditional function --------------------------------  */}

    {showNavigation()}

    {/* ----------------------------------end --------------------------------  */}

  </ul>
);
}

export default Navi;