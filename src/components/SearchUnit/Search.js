import React from 'react';
import './Search.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { FaSearch } from 'react-icons/fa';

export function Search({
  setValue,
  text,
  filteredFree,
  filteredZen,
  display,
  value,
  authors,
  search,
  Search,
  Darkmode,
  featured,
}) {
  const bg = Darkmode ? 'dark' : 'light';
  const ctext = Darkmode ? 'white' : 'dark';
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      search();
    }
  };

  return (
    <Container id='searchQuotes' as='section'>
      <Card bg={bg} text={ctext} className='search-intro text-center'>
        <Card.Body>
          <Card.Title>Search For A Quote By The Author's Name!</Card.Title>
          <Card.Text>
            Search for the author's name to discover the entire quote. Simply
            type it into the box below.
          </Card.Text>
          <Card.Text>
            Do not be concerned if you do not locate a match. You may still see
            their name, which is chosen at random. Simply keep clicking &ldquo;
            Next Quote &rdquo;.
          </Card.Text>
        </Card.Body>
      </Card>
      <div id='search'>
        <label
          style={{
            color: text,
          }}
          htmlFor='search-quote'
          className='form-label'
        >
          Search For Quotes
        </label>
        <div className='input-group flex-nowrap'>
          <input
            className='form-control'
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={Darkmode ? { color: 'white', backgroundColor: 'black' } : {}}
            onKeyDown={(e) => onKeyDownHandler(e)}
            list='authors'
            id='search-quote'
            placeholder="Type an Authors' Name"
          />
          {display ? (
            <>
              <datalist id='authors'>
                {authors.map((author) => (
                  <option key={author} value={author} />
                ))}
              </datalist>
            </>
          ) : null}
          <button
            alt='search button'
            aria-label='search for author'
            className={`input-group-text btn bg-${bg} text-${ctext} btn-secondary btn-lg`}
            onClick={() => search()}
            disabled={value ? '' : 'disabled'}
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <Card bg={bg} text={ctext}>
        <Card.Header>Featured {featured ? `by ${featured}` : ''}</Card.Header>
        <ListGroup variant='flush'>
          {Search ? (
            <ListGroup.Item
              style={
                Darkmode ? { color: 'white', backgroundColor: 'black' } : {}
              }
            >
              <blockquote className='blockquote mb-0'>
                {filteredFree.length > 0 || filteredZen.length > 0 ? (
                  <>
                    {filteredFree.map((quote, index) => (
                      <>
                        <p key={index}> {quote.text} </p>
                        <footer
                          key={quote.author + index}
                          className='blockquote-footer'
                        >
                          {quote.author}
                        </footer>
                      </>
                    ))}
                    {filteredZen.map((quote, index) => (
                      <>
                        <p key={quote.c + index}> {quote.q} </p>
                        <footer
                          key={quote.a + quote.c + index}
                          className='blockquote-footer'
                        >
                          {quote.a}
                        </footer>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <p> Sorry Try Again to get quote from... </p>
                    <footer className='blockquote-footer'>
                      Someone 'More' Famous
                    </footer>
                  </>
                )}
              </blockquote>
            </ListGroup.Item>
          ) : (
            <ListGroup.Item
              style={
                Darkmode ? { color: 'white', backgroundColor: 'black' } : {}
              }
            >
              <blockquote className='blockquote mb-0'>
                <p> Search in the text box and see quote from... </p>
                <footer className='blockquote-footer'>Someone famous</footer>
              </blockquote>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
}
