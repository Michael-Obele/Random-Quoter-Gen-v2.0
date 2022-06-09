import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import StaticQuotes from './components/StaticQuotes/StaticQuotes';

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
  const [allAuthors, setAllAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [freeQuote, setFreeQuote] = useState();
  const [randNum, setRandNum] = useState(
    Math.floor(Math.random() * bColor.length) + 1
  );
  const [zenquotes, setZenquotes] = useState();
  const [count, setCount] = useState(0);
  const [bcolor, setBcolor] = useState(bColor[randNum]);
  const [display, setDisplay] = useState(false);
  const [result, setResult] = useState(false);
  const [text, setText] = useState('black');
  const [searchvalue, setSearchvalue] = useState('');

  const nextQuote = () => {
    setCount((state) => state + 1);
    setRandNum(Math.floor(Math.random() * bColor.length));
    setBcolor(bColor[randNum]);
    document.body.style = `background: ${bColor[randNum]}`;
  };
  var pushAuth = (auth) => {
    var arr = [];
    if (auth[0].author !== undefined) {
      auth.map((x) => arr.push(x.author));
    }
    if (auth[0].a !== undefined) {
      auth.map((x) => arr.push(x.a));
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setResult(true);
    }
  };

  // Quotes
  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((json) => {
        setFreeQuote(json);
        pushAuth(json);
        document.body.style = `background: ${bColor[randNum]}`;
      });
  }, []);
  useEffect(() => {
    fetch(
      'https://moa-redirect-cors.herokuapp.com/https://zenquotes.io/api/quotes/'
    )
      .then((res) => res.json())
      .then((json) => {
        setZenquotes(json);
        pushAuth(json);
        setLoading(false);
      });
    return setCount(0);
  }, [count === 48]);
  // End of Quotes
  useEffect(() => {
    if (!loading) {
      setAllAuthors([freeQuote, zenquotes]);
    }
    return () => {
      console.log('allAuthors');
    };
  }, [zenquotes]);
  if (result) {
    console.log(allAuthors);
  }

  return (
    <>
      <NavBar />
      <div id='main' role='main'>
        <StaticQuotes
          loading={loading}
          nextQuote={nextQuote}
          zenquotes={zenquotes}
          count={count}
          bcolor={bcolor}
          text={text}
        />
      </div>
    </>
  );
}

export default App;
