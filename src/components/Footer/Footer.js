import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import './Footer.css';

export default function Footer() {
  return (
    <MDBFooter className='text-center text-light bg-dark'>
      {/* <div className='container p-4'></div> */}

      <div className='text-center p-3 bg-dark'>
        © {new Date().getFullYear()} Copyright:
        <a className='text-light logoName' href='https://moaconcept.xyz/'>
          MiChaelIsh
        </a>{' '}
        made with ❤️
      </div>
    </MDBFooter>
  );
}
