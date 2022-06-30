import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { ReactComponent as Logo } from './Logo/Logo.svg';
import './Logo/Logo.css';
import './NavBar.css';
import { IoMdColorPalette } from 'react-icons/io';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import Container from 'react-bootstrap/Container';

export default function NavBar({ Darkmode, SwitchMode, changeColor, bgColor }) {
  const [isDarkMode, setDarkMode] = useState(Darkmode);

  // Local Storage for Dark Mode
  useEffect(() => {
    const OldMode = JSON.parse(localStorage.getItem('Darkmode'));
    if (OldMode !== null) {
      setDarkMode(OldMode);
    }
  }, []);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    SwitchMode();
    changeColor();
  };
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg={Darkmode ? 'dark' : 'light'}
      variant={Darkmode ? 'dark' : 'light'}
      fixed='top'
    >
      <Container>
        <Navbar.Brand href='#'>
          <Logo
            className='logo'
            style={Darkmode ? { fill: 'white' } : { fill: 'black' }}
          />
          <span className='logo-text'>Random Quotes</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav>
            <Nav.Link eventKey={1} href='#quote-body' aria-label='quotes'>
              Quotes
            </Nav.Link>
            <Nav.Link eventKey={2} href='#searchQuotes'>
              Search Quotes
            </Nav.Link>
          </Nav>
          <DarkModeSwitch
            style={{ marginLeft: '1rem' }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={30}
          />
          <IoMdColorPalette
            style={{ marginLeft: '1rem', color: bgColor, cursor: 'pointer' }}
            size={35}
            onClick={() => {
              changeColor(Darkmode);
            }}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
