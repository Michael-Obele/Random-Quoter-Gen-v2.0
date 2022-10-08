import React, { useState, useRef } from 'react';
import './Error.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Error({ bgColor, text, Darkmode }) {
  const bg = Darkmode ? 'dark' : 'light';
  const textColor = Darkmode ? 'light' : 'dark';

  return (
    <div id='Error'>
      <section className='error'>
        <Card bg={bg} text={textColor} className='justify-content-center'>
          <Card.Body>
            <Card.Title>Error</Card.Title>
            <Card.Text>Oops...Task failed successfully!</Card.Text>
            <Card.Text>This section of the app was broken.</Card.Text>
            <Card.Text>Reload or ignore and continue using the app.</Card.Text>
            <Button
              style={{
                backgroundColor: bgColor,
                color: text,
              }}
              onClick={() => window.location.reload()}
              alt='reload'
              aria-label='reload the page'>
              Reload
            </Button>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}
