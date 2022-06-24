import React from 'react';
import './Header.css';
import { ReactComponent as Svg } from '../SVGHeader/quote.svg';
import '../SVGHeader/quoteSvg.css';

export default function Header({}) {
  return (
    <header>
      {/* <div className='image-container '>
        <h1 id='welcome'>Welcome to My Quote Generator App</h1>
        <h1 className='text'>
          You can succeed after failure but you can't succeed after giving up.
        </h1>
        <h3>There's no shame in losing, only in accepting defeat!</h3>
      </div> */}
      <Svg />
    </header>
  );
}
