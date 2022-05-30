import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import StaticQuotes from './components/StaticQuotes/StaticQuotes';
import Footer from './components/Footer/Footer';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

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
      <Header />
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
      <div>
        <Container id='searchQuotes'>
          <div id='search'>
            <label htmlFor='search-quote' className='form-label'>
              Search For Quotes
            </label>
            <input
              className='form-control'
              list='datalistOptions'
              id='search-quote'
              placeholder='Type to search...'
              onClick={() => setDisplay(true)}
              onChange={(e) => setSearchvalue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete='none'
            />
            {display ? (
              <>
                <datalist id='datalistOptions'>
                  {zenquotes.map((x, i) => (
                    <option key={i} value={x.a} />
                  ))}
                  {freeQuote.map((x, i) => (
                    <option key={i} value={x.author} />
                  ))}
                </datalist>
              </>
            ) : null}
          </div>
          <Card>
            <Card.Header>Featured</Card.Header>
            <ListGroup variant='flush'>
              {!result ? (
                <ListGroup.Item>
                  <blockquote className='blockquote mb-0'>
                    <p> Search in the text box and see quote from... </p>
                    <footer className='blockquote-footer'>
                      Someone famous
                    </footer>
                  </blockquote>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <blockquote className='blockquote mb-0'>
                    <p>Working</p>
                    <footer className='blockquote-footer'>For now!</footer>
                  </blockquote>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
