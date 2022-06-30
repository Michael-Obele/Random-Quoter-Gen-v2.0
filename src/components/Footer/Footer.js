import React from 'react';
import { FooterItems } from './FooterItems';

export default function Footer({ Darkmode }) {
  const bg = Darkmode ? 'dark' : 'light'; // if darkmode is true, set background color to black
  const text = Darkmode ? 'white' : 'dark'; // if darkmode is true, set text color to white

  return (
    // <!-- Footer -->
    <footer className={`text-center text-lg-start`}>
      {/* <!-- Section: Social media --> */}
      <section
        className={`d-flex justify-content-between p-3 bg-${bg} text-${text}`}
      >
        {/* <!-- Left --> */}
        <div className='me-5 m-3'>
          <span>Get connected with me on social networks:</span>
        </div>
        {/* <!-- Left --> */}

        {/* <!-- Right --> */}
        <div className='me-5'>
          {FooterItems.map((item) => (
            <a
              className={`btn btn-floating btn-lg  m-1 btn-${bg}`}
              key={item.name}
              target='_blank'
              style={{ borderColor: 'inherit' }}
              href={item.href}
              aria-label={item.aria}
              role='button'
            >
              {item.icon}
            </a>
          ))}
        </div>
        {/* <!-- Right --> */}
      </section>
      {/* <!-- Section: Social media --> */}
    </footer>
    // <!-- Footer -->
  );
}
