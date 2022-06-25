import React from 'react';
import {
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from 'react-icons/fa';
// import './Footer.css';

export default function Footer({ Darkmode }) {
  const color = Darkmode ? '#202020' : '#f1f1f1'; // if darkmode is true, set background color to black
  return (
    <footer
      className='footer mt-auto text-center text-white'
      style={{ backgroundColor: color }}
    >
      {/* <!-- Twitter --> */}

      <a
        className={
          Darkmode
            ? 'btn btn-floating btn-lg  m-1 btn-dark'
            : 'btn btn-floating btn-lg  m-1 btn-light'
        }
        href='https://twitter.com/Dev_Obele'
        alt='Link to my Twitter profile'
        aria-label='Twitter Link'
        role='button'
        bordercolor='black'
      >
        <FaTwitter />
      </a>

      {/* <!-- Google --> */}
      <a
        className={
          Darkmode
            ? 'btn btn-floating btn-lg  m-1 btn-dark'
            : 'btn btn-floating btn-lg  m-1 btn-light'
        }
        href='mailto:amachree9630@gmail.com'
        role='button'
        aria-label='Email Link'
      >
        <FaGoogle />
      </a>

      {/* <!-- Instagram --> */}
      <a
        className={
          Darkmode
            ? 'btn btn-floating btn-lg  m-1 btn-dark'
            : 'btn btn-floating btn-lg  m-1 btn-light'
        }
        href='https://www.instagram.com/moa_concepts/'
        role='button'
        aria-label='Instagram Link'
      >
        <FaInstagram />
      </a>

      {/* <!-- Linkedin --> */}
      <a
        className={
          Darkmode
            ? 'btn btn-floating btn-lg  m-1 btn-dark'
            : 'btn btn-floating btn-lg  m-1 btn-light'
        }
        href='https://www.linkedin.com/in/michael-amachree-1b71b8210/'
        role='button'
        aria-label='Link to my Linkedin profile'
      >
        <FaLinkedin />
      </a>
      {/* <!-- Github --> */}
      <a
        className={
          Darkmode
            ? 'btn btn-floating btn-lg  m-1 btn-dark'
            : 'btn btn-floating btn-lg  m-1 btn-light'
        }
        href='https://github.com/Michael-Obele'
        role='button'
        aria-label='Link to my Github profile'
      >
        <FaGithub />
      </a>
      {/* <!-- Whatsapp --> */}
      <a
        className={
          Darkmode
            ? 'btn btn-floating btn-lg  m-1 btn-dark'
            : 'btn btn-floating btn-lg  m-1 btn-light'
        }
        href='https://wa.me/2349069170098?text=Hey,I%20love%20your%20App!'
        role='button'
        aria-label='Whatsapp Link'
      >
        <i className='fa fa-whatsapp'></i>
        <FaWhatsapp />
      </a>
    </footer>
  );
}
