import React, { useEffect, useState } from 'react';
import Header from './componets/Header/Header';
import NavBar from './componets/NavBar/NavBar';
import StaticQuotes from './componets/StaticQuotes/StaticQuotes';
import Footer from './componets/Footer/Footer';
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

  const [loading, setLoading] = useState(true);
  const [freeQuote, setfreeQuote] = useState();
  const [randNum, setrandNum] = useState(
    Math.floor(Math.random() * bColor.length) + 1
  );
  const [zenquotes, setZenquotes] = useState();
  const [count, setcount] = useState(0);
  const [bcolor, setbcolor] = useState(bColor[randNum]);
  const [display, setdisplay] = useState(false);
  const [text, setText] = useState('black');
  const [searchvalue, setsearchvalue] = useState('');

  const nextquote = () => {
    setcount((state) => state + 1);
    setrandNum(Math.floor(Math.random() * bColor.length));
    setbcolor(bColor[randNum]);
    document.body.style = `background: ${bColor[randNum]}`;
  };
  const allquotes = () => {
    var arr = [],
      auth = [];
    if (freeQuote || zenquotes) {
      console.log('Working');
      arr.push(freeQuote);
      arr.push(zenquotes);
      setdisplay(true);
    }
    // arr[0].map((x) => auth.push(x.author));
    // arr[1].map((x) => auth.push(x.a));
    // console.log(auth);
    // return <option value='Sanday' />;
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log(searchvalue);
    }
  };

  // Quotes
  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((json) => {
        setfreeQuote(json);
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
        setLoading(false);
      });
    return setcount(0);
  }, [count === 4]);
  // End of Quotes
  return (
    <>
      <NavBar />
      <Header />
      <div id='main' role='main'>
        <StaticQuotes
          loading={loading}
          nextquote={nextquote}
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
              onClick={() => setdisplay(true)}
              onChange={(e) => setsearchvalue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <datalist id='datalistOptions'>
              {display ? (
                <>
                  <option value='San Francisco' />
                  {zenquotes.map((x, i) => (
                    <option key={i} value={x.a} />
                  ))}
                </>
              ) : null}
            </datalist>
          </div>
          <Card>
            <Card.Header>Featured</Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                {' '}
                <blockquote className='blockquote mb-0'>
                  <p> Search in the text box and see quote from... </p>
                  <footer className='blockquote-footer'>Someone famous</footer>
                </blockquote>
              </ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Card>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;
