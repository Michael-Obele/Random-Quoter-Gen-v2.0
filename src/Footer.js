import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter
      className='text-center text-white fixed-bottom'
      style={{ backgroundColor: '#21081a' }}
    >
      <div className='container p-4'></div>

      <div
        className='text-center p-3'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © {new Date().getFullYear()} Copyright:
        <a className='text-white' href='https://moaconcept.xyz/'>
          MiChaelIsh
        </a>
      </div>
    </MDBFooter>
  );
}
