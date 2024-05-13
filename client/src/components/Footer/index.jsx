
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook, faGoogle, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


//import  { useState } from 'react';
//import axios from 'axios';
import SubscribeForm from "../SubscribeForm";
import "../../App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { MDBFooter, MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';

//import { Container, Row, Col } from 'react-bootstrap';

function Footer() {

  return (

    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>

          <p>
            Follow us on social media.
          </p>

          <div className="icons-wrapper">

          <div className="icon-container">
            <a href="https://facebook.com" className="icon">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
          </div>

          <div className="icon-container">
            <a href="https://twitter.com" className="icon">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </div>

          <div className="icon-container">
            <a href="https://google.com" className="icon">
              <FontAwesomeIcon icon={faGoogle} size="2x" />
            </a>
          </div>

          <div className="icon-container">
            <a href="https://instagram.com" className="icon">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>

          <div className="icon-container">
            <a href="https://linkedin.com" className="icon">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>

          <div className="icon-container">
            <a href="https://github.com/sifzerda/tour-de-force" className="icon">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </div>
          </div>

        </section>

        <SubscribeForm />

        <section className=''>
          <MDBRow>
            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Business</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Advertising
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Career
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Media
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>LEGAL</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Private Policy
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Security
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Terms of Use
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Help</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Event Cancellations
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Live Chat
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Contact Us
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Exclusive</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    VIP
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Special Offers
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    My TDF
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Festivals
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;