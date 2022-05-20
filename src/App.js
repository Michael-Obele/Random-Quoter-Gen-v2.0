import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import Loading from './componets/Loading/Loading';
import Footer from './Footer';
import Stack from 'react-bootstrap/Stack';
import { FaTwitter, FaClipboard, FaWhatsapp } from 'react-icons/fa';

function App() {
  const [loading, setLoading] = useState(true);
  const [freeQuote, setfreeQuote] = useState();
  const [zenquotes, setZenquotes] = useState();
  const [count, setcount] = useState(0);
  const [bcolor, setbcolor] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((json) => {
        setfreeQuote(json);
        // setLoading(false);
        // console.log(json);
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
        console.log(json);
      });
    return setcount(0);
  }, [count == 49]);

  return (
    <div>
      {loading ? (
        <Card className='justify-content-center quote'>
          <Card.Body>
            <Loading />
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className='justify-content-center quote'>
            <Card.Body>
              <Stack direction='horizontal' gap={2}>
                <Card.Title>{freeQuote[count].author}</Card.Title>
                <div className='bg-light border ms-auto'></div>

                <Button
                  style={{
                    backgroundColor: 'green',
                    color: 'black',
                    borderColor: 'black',
                  }}
                >
                  <FaTwitter />
                </Button>
                <Button variant='secondary'>
                  <FaClipboard />
                </Button>
                <Button variant='secondary'>
                  <FaWhatsapp />
                </Button>
              </Stack>
              <Card.Text>{freeQuote[count].text}</Card.Text>
            </Card.Body>
            <Button
              id='next-qoute'
              variant='primary'
              onClick={() => setcount(count + 1)}
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
