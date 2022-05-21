import React, { useEffect, useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Loading from './componets/Loading/Loading';
import Footer from './Footer';
import Stack from 'react-bootstrap/Stack';
import { FaTwitter, FaClipboard } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';

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
  const [show, setShow] = useState();
  const [zenquotes, setZenquotes] = useState();
  const [count, setcount] = useState(0);
  var tcol = 'black';
  const [bcolor, setbcolor] = useState(bColor[randNum]);
  const [text, setText] = useState(tcol);

  const nextquote = () => {
    setcount(count + 1);
    setrandNum(Math.floor(Math.random() * bColor.length));
    setbcolor(bColor[randNum]);
    document.body.style = `background: ${bColor[randNum]}`;
  };

  // tooltip
  const copyText = () => {
    navigator.clipboard.writeText(
      `${zenquotes[count].q} — ${zenquotes[count].a}`
    );
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1300);
  };
  const target = useRef(null);

  // Quotes
  useEffect(() => {
    //set background color
    document.body.style = `background: ${bColor[randNum]}`;
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((json) => {
        setfreeQuote(json);
      });
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
    <div>
      {loading ? (
        <Card className='justify-content-center'>
          <Card.Body>
            <Loading />
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className='justify-content-center'>
            <div className='position-absolute top-0 end-0'>
              <Button
                style={{
                  backgroundColor: bcolor,
                  color: text,
                  borderColor: text,
                }}
                target='_blank'
                href={`https://twitter.com/intent/tweet?hashtags=quotes&related=Dev_Obele&text=“${zenquotes[count].q}”—${zenquotes[count].a}`}
                alt='share to twitter'
                aria-label='share to twitter'
              >
                <FaTwitter />
              </Button>
              <Button
                style={{
                  backgroundColor: bcolor,
                  color: text,
                  borderColor: text,
                }}
                alt='copy to clipboard'
                aria-label='copy to clipboard'
                ref={target}
                onClick={copyText}
              >
                <FaClipboard />
              </Button>
              <Overlay target={target.current} show={show} placement='bottom'>
                {(props) => (
                  <Tooltip id='overlay-example' {...props}>
                    Copied
                  </Tooltip>
                )}
              </Overlay>
              <Button
                style={{
                  backgroundColor: bcolor,
                  color: text,
                  borderColor: text,
                  fontSize: '17px',
                }}
                target='_blank'
                href={`whatsapp://send?text=“${zenquotes[count].q}”—${zenquotes[count].a}`}
                alt='share to whatsapp'
                aria-label='send to whatsapp'
              >
                <BsWhatsapp />
              </Button>
            </div>
            <Card.Body>
              <Card.Title id='Author'>{zenquotes[count].a}</Card.Title>
              <Card.Text id='quote'>{zenquotes[count].q}</Card.Text>
            </Card.Body>
            <Button
              id='next-qoute'
              style={{
                backgroundColor: bcolor,
                color: text,
                borderColor: text,
              }}
              onClick={nextquote}
            >
              Next Quote
            </Button>
          </Card>
        </>
      )}
      {/* <!-- Footer --> */}
      <Footer />
      {/* <!-- Footer --> */}
    </div>
  );
}

export default App;
