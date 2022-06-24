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
  console.log('color = ', color);
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
        role='button'
        borderColor='black'
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
      >
        <i className='fa fa-whatsapp'></i>
        <FaWhatsapp />
      </a>
    </footer>
  );
}
