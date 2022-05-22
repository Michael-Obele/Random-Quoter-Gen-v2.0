import React from 'react';
import './Header.css';

export function Header({}) {
  return (
    <header>
      <div className='fade-in'>
        <h1 id='welcome'>Welcome to My Quote Generator App</h1>
        <h2>
          You can succeed after failure but you can't succeed after giving up.
        </h2>
        <h3>There's no shame in losing, only in accepting defeat!</h3>
      </div>
    </header>
  );
}
