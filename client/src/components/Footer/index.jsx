//import React from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faGithub, faGoogle, faLinkedin, faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
//import { faCode } from '@fortawesome/free-solid-svg-icons';

//import  { useState } from 'react';
//import axios from 'axios';
import SubscribeForm from "../SubscribeForm";
import "../../App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { MDBFooter, MDBContainer, MDBIcon, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';

//import { Container, Row, Col } from 'react-bootstrap';

function Footer () {
  
  return (

    
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='https://facebook.com/' role='button'>
            <MDBIcon fab icon='facebook-f' id= 'i-facebook' className='bigger-icon' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.twitter.com/' role='button'>
            <MDBIcon fab icon='twitter'  id= 'i-twitter' className='bigger-icon'/>
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.google.com/' role='button'>
            <MDBIcon fab icon='google'  id= 'i-google' className='bigger-icon'/>
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.instagram.com/' role='button'>
            <MDBIcon fab icon='instagram'  id= 'i-instagram' className='bigger-icon'/>
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://www.linkedin.com/' role='button'>
            <MDBIcon fab icon='linkedin-in'  id= 'i-linkedin' className='bigger-icon'/>
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' href='https://github.com/sifzerda/tour-de-force' role='button'>
            <MDBIcon fab icon='github'  id= 'i-github' className='bigger-icon'/>
          </MDBBtn>
        </section>

        <section className='mb-4'>
          <p>
            Find us on social media.
          </p>
        </section>

<SubscribeForm />

        <section className=''>
          <MDBRow>
            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
                  </a>
                </li>
              </ul>
            </MDBCol>

            <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Links</h5>

              <ul className='list-unstyled mb-0'>
                <li>
                  <a href='#!' className='text-white'>
                    Link 1
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 2
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 3
                  </a>
                </li>
                <li>
                  <a href='#!' className='text-white'>
                    Link 4
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