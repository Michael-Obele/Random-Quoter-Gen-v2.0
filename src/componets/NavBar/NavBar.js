import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css';
import Container from 'react-bootstrap/Container';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' fixed='top'>
      <Container>
        <Navbar.Brand href='#welcome'>Random Quotes</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav>
            <Nav.Link eventKey={1} href='#quote-h1' aria-label='quotes'>
              Quotes
            </Nav.Link>
            <Nav.Link eventKey={2} href='#searchQuotes'>
              Search Quotes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
