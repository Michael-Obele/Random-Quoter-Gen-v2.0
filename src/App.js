import React, { useEffect, useState, useReducer } from 'react';
import { bColor } from './Colors';
import { FaSearch } from 'react-icons/fa';
import NavBar from './components/NavBar/NavBar';
import StaticQuotes from './components/StaticQuotes/StaticQuotes';
import Footer from './components/Footer/Footer';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import * as red from './UseReducer';

function App() {
  const [bcolor, setBcolor] = useState(bColor[red.initialState.randNum]);
  const [authors, setAuthors] = useState([]);
  const [value, setValue] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [featured, setFeatured] = useState('');
  const [state, dispatch] = useReducer(red.reducer, red.initialState);
  /*End of States*/
  useEffect(() => {
    if (!state.loading) {
      state.freeQuote.map((quote) => {
        dispatch({
          type: red.Actions.SETAUTHORS,
          payload: quote.author,
        });
      });
      state.zenquotes.map((quote) => {
        dispatch({
          type: red.Actions.SETAUTHORS,
          payload: quote.a,
        });
      });
    }
  }, [state.loading]);

  useEffect(() => {
    if (state.Authors.length > 0) {
      var set = new Set(state.Authors);
      setAuthors(Array.from(set));
      dispatch({ type: red.Actions.DISPLAY });
    }
  }, [state.Authors]);

  const changeColor = () => {
    dispatch({
      type: red.Actions.RANDOM,
      payload: Math.floor(Math.random() * bColor.length),
    });
    setBcolor(bColor[state.randNum]);
    if (bColor[state.randNum] !== undefined) {
      document.body.style = `background: ${bColor[state.randNum]}`;
    }
  };

  const prevQuote = () => {
    if (state.count > 0) {
      dispatch({ type: red.Actions.DECREMENT, payload: 1 });
      changeColor();
    }
  };

  const nextQuote = () => {
    dispatch({ type: red.Actions.INCREMENT, payload: 1 });
    changeColor();
  };

  const SwitchMode = () => {
    dispatch({ type: red.Actions.SWITCHMODE });
  };
  const search = () => {
    var filter1 = state.freeQuote.filter((quote) => quote.author === value);
    var filter2 = state.zenquotes.filter((quote) => quote.a === value);
    dispatch({ type: red.Actions.SEARCH_QUOTES });
    setFeatured(value);
    setFiltered(filter1);
  };

  useEffect(() => {}, [state]);

  // Quotes
  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: red.Actions.ADDQUOTES,
          name: 'freeQuote',
          payload: json,
        });
        document.body.style = `background: ${bColor[state.randNum]}`;
      });
  }, []);
  useEffect(() => {
    fetch(
      'https://moa-redirect-cors.herokuapp.com/https://zenquotes.io/api/quotes/'
    )
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: red.Actions.ADDQUOTES,
          name: 'zenquotes',
          payload: json,
        });
        dispatch({ type: red.Actions.LOADING });
      });
    return dispatch({ type: red.Actions.RESET });
  }, [state.count === 48]);
  // End of Quotes

  return (
    <>
      <NavBar Darkmode={state.Darkmode} SwitchMode={SwitchMode} />
      <div id='main' role='main'>
        <StaticQuotes
          loading={state.loading}
          nextQuote={nextQuote}
          prevQuote={prevQuote}
          zenquotes={state.zenquotes}
          count={state.count}
          bcolor={bcolor}
          text={state.text}
          Darkmode={state.Darkmode}
        />
      </div>
      <div>
        <Container id='searchQuotes'>
          <div id='search'>
            <label htmlFor='search-quote' className='form-label'>
              Search For Quotes
            </label>
            <div className='input-group flex-nowrap'>
              <input
                className='form-control'
                onChange={(e) => setValue(e.target.value)}
                value={value}
                list='authors'
                id='search-quote'
                placeholder="Type an Authors' Name"
              />
              {state.display ? (
                <>
                  <datalist id='authors'>
                    {authors.map((author) => (
                      <option key={author} value={author} />
                    ))}
                  </datalist>
                </>
              ) : null}
              <button
                className='input-group-text'
                onClick={() => search()}
                disabled={value ? '' : 'disabled'}
              >
                <FaSearch />
              </button>
            </div>
          </div>
          <Card>
            <Card.Header>
              Featured {featured ? `by ${featured}` : ''}
            </Card.Header>
            <ListGroup variant='flush'>
              {state.Search ? (
                <ListGroup.Item>
                  <blockquote className='blockquote mb-0'>
                    {filtered.length > 0 ? (
                      <>
                        {filtered.map((quote) => (
                          <>
                            <p> {quote.text} </p>
                            <footer className='blockquote-footer'>
                              {quote.author}
                            </footer>
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        {' '}
                        <p> Sorry Try Again to get quote from... </p>
                        <footer className='blockquote-footer'>
                          Someone 'More' Famous
                        </footer>
                      </>
                    )}
                  </blockquote>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <blockquote className='blockquote mb-0'>
                    <p> Search in the text box and see quote from... </p>
                    <footer className='blockquote-footer'>
                      Someone famous
                    </footer>
                  </blockquote>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Container>
      </div>
      <Footer Darkmode={state.Darkmode} />
    </>
  );
}

export default App;
