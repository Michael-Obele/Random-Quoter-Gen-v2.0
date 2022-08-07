import React, { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { FaTwitter, FaCopy } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import './animate.css';
import './RandomQuotes.css';

export function RandomQuotes({ Darkmode, freeQuote, loading, bgColor, text }) {
  const bg = Darkmode ? 'dark' : 'light';
  const textColor = Darkmode ? 'light' : 'dark';
  const [randNum, setRandNum] = useState(Math.floor(Math.random() * 1643));
  const [animate, setAnimate] = useState('fadeIn');
  // tooltip & Copy Text
  const [show, setShow] = useState();
  const copyText = () => {
    navigator.clipboard.writeText(
      `${freeQuote[randNum].text} — ${freeQuote[randNum].author}`
    );
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 1300);
  };
  const target = useRef(null);
  // end of tooltip & Copy Text

  // Fetching Authors
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate('fadeOut');
      setTimeout(() => {
        setRandNum(Math.floor(Math.random() * freeQuote.length));
        setAnimate('fadeIn');
      }, 500);
    }, 9000);
    return () => clearInterval(interval);
  }, [randNum, freeQuote.length]);
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
              <div className='position-absolute top-0 end-0'>
                <Button
                  style={{
                    backgroundColor: bgColor,
                    color: text,
                    bordercolor: text,
                  }}
                  target='_blank'
                  href={`https://twitter.com/intent/tweet? hashtags=quote&related=Dev_Obele&text=“${freeQuote[randNum].text}” —${freeQuote[randNum].author} from https://cutt.ly/myQuote`}
                  alt='share to twitter'
                  aria-label='share to twitter'>
                  <FaTwitter />
                </Button>
                <Button
                  style={{
                    backgroundColor: bgColor,
                    color: text,
                    bordercolor: text,
                  }}
                  alt='copy to clipboard'
                  aria-label='copy to clipboard'
                  ref={target}
                  onClick={copyText}>
                  <FaCopy />
                  <Overlay
                    target={target.current}
                    show={show}
                    placement='bottom'>
                    {(props) => (
                      <Tooltip
                        {...props}
                        style={{
                          position: 'absolute',
                          padding: '2px 10px',
                          color: 'white',
                          borderRadius: 3,
                          ...props.style,
                        }}>
                        Copied
                      </Tooltip>
                    )}
                  </Overlay>
                </Button>
                <Button
                  style={{
                    backgroundColor: bgColor,
                    color: text,
                    bordercolor: text,
                    fontSize: '17px',
                  }}
                  target='_blank'
                  href={`whatsapp://send?text=“${freeQuote[randNum].text}”—${freeQuote[randNum].author}`}
                  alt='share to whatsapp'
                  aria-label='send to whatsapp'>
                  <IoLogoWhatsapp />
                </Button>
              </div>
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
