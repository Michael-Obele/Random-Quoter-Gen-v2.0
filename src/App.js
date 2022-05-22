import { Header } from './componets/Header/Header';
import { NavBar } from './componets/NavBar/NavBar';
import { StaticQuotes } from './componets/StaticQuotes/StaticQuotes';
import React, { useEffect, useState, useRef } from 'react';
import Footer from './componets/Footer/Footer';

function App() {
  const bColor = [
    '#f4acb7',
    '#ea8c55',
    '#B689FF',
    '#FF6F6F',
    '#8ecae6',
    '#48bfe3',
    '#9fffcb',
    '#87bfff',
    '#4cc9f0',
    '#ff9e00',
    '#b79ced',
    '#c879ff',
  ];

  const [loading, setLoading] = useState(true);
  const [freeQuote, setfreeQuote] = useState();
  const [randNum, setrandNum] = useState(
    Math.floor(Math.random() * bColor.length) + 1
  );
  const [zenquotes, setZenquotes] = useState();
  const [count, setcount] = useState(0);
  const [bcolor, setbcolor] = useState(bColor[randNum]);
  const [text, setText] = useState('black');

  const nextquote = () => {
    setcount(count + 1);
    setrandNum(Math.floor(Math.random() * bColor.length));
    setbcolor(bColor[randNum]);
    document.body.style = `background: ${bColor[randNum]}`;
  };

  // Quotes
  useEffect(() => {
    //set background color
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((json) => {
        setfreeQuote(json);
      });
    document.body.style = `background: ${bColor[randNum]}`;
    return setcount(0);
  }, []);
  useEffect(() => {
    fetch(
      'https://young-gorge-47284.herokuapp.com/https://zenquotes.io/api/quotes/'
    )
      .then((res) => res.json())
      .then((json) => {
        setZenquotes(json);
        setLoading(false);
      });
    return setcount(0);
  }, [count === 49]);
  // End of Quotes
  return (
    <>
      <NavBar />
      <Header />
      <StaticQuotes
        loading={loading}
        nextquote={nextquote}
        zenquotes={zenquotes}
        count={count}
        bcolor={bcolor}
        text={text}
      />
      {/* <!-- Footer --> */}
      <Footer />
      {/* <!-- Footer --> */}
    </>
  );
}

export default App;
