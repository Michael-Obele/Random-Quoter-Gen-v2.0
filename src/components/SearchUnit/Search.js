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
  searchQuotes,
  searchAuthor,
  Search,
  Darkmode,
  featured,
}) {
  const bg = Darkmode ? 'dark' : 'light';
  const ctext = Darkmode ? 'white' : 'dark';
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      searchAuthor();
    }
  };

  return (
    <Container id='Search-Quotes' as='section'>
      <Card bg={bg} text={ctext} className='searchAuthor-intro text-center'>
        <Card.Body>
          <Card.Title className='title'>
            Search For A Quote By The Author's Name!
          </Card.Title>
          <Card.Text className='text'>
            To find the whole quote, look up the author's name. Simply enter it
            into the text box below.
          </Card.Text>
          <Card.Text className='text'>
            You can also search for a word to get all quotes associated with it.
          </Card.Text>
          <Card.Text className='text'>
            Don't be concerned if you don't find a match. You might still see
            their name or that word chosen at random. Continue by clicking
            &ldquo; Next Quote &rdquo;.
          </Card.Text>
        </Card.Body>
      </Card>
      <div id='searchAuthor'>
        <label
          style={{
            color: text,
          }}
          htmlFor='searchAuthor-quote'
          className='form-label'>
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
            id='searchAuthor-quote'
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
            alt='searchAuthor button'
            aria-label='searchAuthor for author'
            className={`input-group-text btn bg-${bg} text-${ctext} btn-secondary btn-lg`}
            onClick={() => searchAuthor()}
            disabled={value ? '' : 'disabled'}>
            <FaSearch />
          </button>
        </div>
      </div>
      <Card bg={bg} text={ctext}>
        <Card.Header>Featured {featured ? `by '${featured}'` : ''}</Card.Header>
        <ListGroup variant='flush'>
          {Search ? (
            <ListGroup.Item
              style={
                Darkmode ? { color: 'white', backgroundColor: 'black' } : {}
              }>
              <blockquote className='blockquote mb-0'>
                {filteredFree.length > 0 ||
                filteredZen.length > 0 ||
                searchQuotes.length > 0 ? (
                  <>
                    {filteredFree.map((quote, index) => (
                      <>
                        <p key={index}> {quote.text} </p>
                        <footer
                          key={quote.author + index}
                          className='blockquote-footer'>
                          {quote.author}
                        </footer>
                      </>
                    ))}
                    {filteredZen.map((quote, index) => (
                      <>
                        <p key={quote.c + index}> {quote.q} </p>
                        <footer
                          key={quote.a + quote.c + index}
                          className='blockquote-footer'>
                          {quote.a}
                        </footer>
                      </>
                    ))}
                    {searchQuotes.map((quote, index) => (
                      <>
                        <p key={quote + index}> {quote} </p>
                        <footer
                          key={quote.a + quote.c + index}
                          className='blockquote-footer'>
                          {featured}
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
              }>
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
