import React from 'react';
import { FooterItems } from './FooterItems';

export default function Footer({ Darkmode }) {
  const color = Darkmode ? '#202020' : '#f1f1f1'; // if darkmode is true, set background color to black
  const text = Darkmode ? '#f1f1f1' : '#202020'; // if darkmode is true, set text color to white

  return (
    // <!-- Footer -->
    <footer
      className='text-center text-lg-start'
      style={{ backgroundColor: color }}
    >
      {/* <!-- Section: Social media --> */}
      <section
        className='d-flex justify-content-between p-3'
        style={{ backgroundColor: color }}
      >
        {/* <!-- Left --> */}
        <div className='me-5 m-3'>
          <span style={{ color: text }}>
            Get connected with me on social networks:
          </span>
        </div>
        {/* <!-- Left --> */}

        {/* <!-- Right --> */}
        <div className='me-5'>
          {FooterItems.map((item) => (
            <a
              className={
                Darkmode
                  ? 'btn btn-floating btn-lg  m-1 btn-dark'
                  : 'btn btn-floating btn-lg  m-1 btn-light'
              }
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
