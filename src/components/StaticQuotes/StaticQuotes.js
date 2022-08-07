import React, { useState, useRef } from 'react';
import './StaticQuotes.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Loading from '../Loading/Loading';
import { FaTwitter, FaCopy } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

export default function StaticQuotes({
  loading,
  nextQuote,
  zenquotes,
  count,
  bgColor,
  text,
  Darkmode,
  prevQuote,
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
  const bg = Darkmode ? 'dark' : 'light';
  const textColor = Darkmode ? 'light' : 'dark';

  return (
    <div id='Static-Quotes'>
      {loading ? (
        <section className='quote-body'>
          <Card bg={bg} text={textColor} className='justify-content-center'>
            <Card.Body>
              <Loading />
            </Card.Body>
          </Card>
        </section>
      ) : (
        <>
          <section className='quote-body'>
            <Card bg={bg} text={textColor} id='quote-card'>
              <div className='position-absolute top-0 end-0'>
                <Button
                  style={{
                    backgroundColor: bgColor,
                    color: text,
                    bordercolor: text,
                  }}
                  target='_blank'
                  href={`https://twitter.com/intent/tweet? hashtags=quote&related=Dev_Obele&text=“${zenquotes[count].q}” —${zenquotes[count].a} from https://cutt.ly/myQuote`}
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
                </Button>
                <Overlay target={target.current} show={show} placement='bottom'>
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
                <Button
                  style={{
                    backgroundColor: bgColor,
                    color: text,
                    bordercolor: text,
                    fontSize: '17px',
                  }}
                  target='_blank'
                  href={`whatsapp://send?text=“${zenquotes[count].q}”—${zenquotes[count].a}`}
                  alt='share to whatsapp'
                  aria-label='send to whatsapp'>
                  <IoLogoWhatsapp />
                </Button>
              </div>
              <Card.Body>
                <Card.Title id='Author'>{zenquotes[count].a}</Card.Title>
                <Card.Text id='quote'>{zenquotes[count].q}</Card.Text>
              </Card.Body>
              <div className='position-absolute bottom-0 start-0'>
                <Button
                  id='next-quote'
                  style={{
                    backgroundColor: bgColor,
                    color: text,
                    bordercolor: text,
                  }}
                  onClick={prevQuote}>
                  <span className='d-none d-md-block'>Previous Quote</span>
                  <span className='d-block d-md-none'>
                    <MdArrowBackIos />
                  </span>
                </Button>
              </div>
              <div className='position-absolute bottom-0 end-0'>
                <Button
                  id='next-quote'
                  style={{
                    backgroundColor: bgColor,
                    color: text,
                    bordercolor: text,
                  }}
                  onClick={nextQuote}>
                  <span className='d-none d-md-block'>Next Quote</span>
                  <span className='d-block d-md-none'>
                    <MdArrowForwardIos />
                  </span>
                </Button>
              </div>
            </Card>
          </section>
        </>
      )}
    </div>
  );
}
