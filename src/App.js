import React, { useEffect, useState, useReducer } from 'react';
import { bColor } from './Colors';
import NavBar from './components/NavBar/NavBar';
import StaticQuotes from './components/StaticQuotes/StaticQuotes';
import Footer from './components/Footer/Footer';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import * as red from './UseReducer';

function App() {
  const [zenquotes, setZenquotes] = useState();
  const [bcolor, setBcolor] = useState(bColor[red.initialState.randNum]);
  const [display, setDisplay] = useState(false);
  const [state, dispatch] = useReducer(red.reducer, red.initialState);

  const nextQuote = () => {
    dispatch({ type: red.Actions.INCREMENT, payload: 1 });
    dispatch({
      type: red.Actions.RANDOM,
      payload: Math.floor(Math.random() * bColor.length) + 1,
    });
    setBcolor(bColor[state.randNum]);
    document.body.style = `background: ${bColor[state.randNum]}`;
  };

  const SwitchMode = () => {
    dispatch({ type: red.Actions.SWITCHMODE });
  };

  console.log(state);

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
        setZenquotes(json);
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
      {/* <Header /> */}
      <div id='main' role='main'>
        <StaticQuotes
          loading={state.loading}
          nextQuote={nextQuote}
          zenquotes={zenquotes}
          count={state.count}
          bcolor={bcolor}
          text={state.text}
          Darkmode={state.Darkmode}
        />
      </div>
      <Footer Darkmode={state.Darkmode} />
    </>
  );
}

export default App;
