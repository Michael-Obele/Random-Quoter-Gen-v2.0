import React, { useEffect, useState, useRef } from 'react';
import './StaticQuotes.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Loading from '../Loading/Loading';
import { ReactComponent as Twitter } from './twitter.svg';
import { ReactComponent as Whatsapp } from './whatsapp.svg';
import { ReactComponent as Copy } from './ftcopy.svg';

export function StaticQuotes({
  loading,
  nextquote,
  zenquotes,
  count,
  bcolor,
  text,
}) {
  // tooltip & Copy Text
  const [show, setShow] = useState();
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
  return (
    <div className='quote-body'>
      {loading ? (
        <Card className='justify-content-center'>
          <Card.Body>
            <Loading />
          </Card.Body>
        </Card>
      ) : (
        <>
          <div className='quote-body' id='quote-body'>
            <h1 className='text-center' id='quote-h1'>
              Quotes...Next Quotes...More Quotes
            </h1>
            <Card id='quote-card'>
              <div className='position-absolute bottom-0 end-0'>
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
                  <Twitter />
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
                  <Copy />
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
                  <Whatsapp />
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
          </div>
        </>
      )}
    </div>
  );
}
