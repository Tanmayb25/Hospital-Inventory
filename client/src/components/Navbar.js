import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {
    Link
  } from "react-router-dom";
function navbar() {
 
  return (
    <div>
      

      <Navbar collapseOnSelect sticky="top"  expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand >Hospital Inventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto mx-5">
              {/* <Nav.Link className="mx-2" as={Link} to="/Gallery">Gallery</Nav.Link> */}
              <Nav.Link eventKey="2" className="mx-2" as={Link} to="/Home">Home</Nav.Link>
              <Nav.Link eventKey="3" className="mx-2" as={Link} to="/About">About</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              {/* <Nav.Link eventKey={2} href="#dankmemes">
                Dank memes
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>

    </div>
  )
}

export default navbar
