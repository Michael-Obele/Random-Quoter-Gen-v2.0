import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import './animate.css';

export function RandomQuotes({ Darkmode, freeQuote, loading }) {
  const bg = Darkmode ? 'dark' : 'light';
  const textColor = Darkmode ? 'light' : 'dark';
  const [randNum, setRandNum] = useState(
    Math.floor(Math.random() * freeQuote.length)
  );
  const [animate, setAnimate] = useState('fadeIn');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate('fadeOut');
      setTimeout(() => {
        setRandNum(Math.floor(Math.random() * freeQuote.length));
        setAnimate('fadeIn');
      }, 1000);
    }, 8000);
    return () => clearInterval(interval);
  }, [randNum]);
  return (
    <section id='Random-Quotes' className='quote-body'>
      <Card bg={bg} text={textColor} className='justify-content-center'>
        <Card.Body>
          {loading ? (
            <>
              <Placeholder as={Card.Title} className='author' animation='glow'>
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder className='quote' as={Card.Text} animation='glow'>
                <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                <Placeholder xs={8} />
              </Placeholder>
            </>
          ) : (
            <>
              {freeQuote[randNum].author !== null ? (
                <Card.Title className={`author ${animate}`}>
                  {freeQuote[randNum].author}
                </Card.Title>
              ) : (
                <Card.Title className={`author ${animate} `}>
                  Unknown
                </Card.Title>
              )}
              <Card.Text className={`quote ${animate}`}>
                {freeQuote[randNum].text}
              </Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </section>
  );
}
