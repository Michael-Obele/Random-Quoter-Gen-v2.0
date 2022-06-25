import { Search } from './components/SearchUnit/Search';
import React, { useEffect, useState, useReducer } from 'react';
import { LightColors, DarkColors } from './Colors';
import NavBar from './components/NavBar/NavBar';
import StaticQuotes from './components/StaticQuotes/StaticQuotes';
import Footer from './components/Footer/Footer';
import * as red from './UseReducer';

function App() {
  const background = red.initialState.Darkmode
    ? DarkColors[red.initialState.randNum]
    : LightColors[red.initialState.randNum];
  const [bcolor, setBcolor] = useState(background);
  const [authors, setAuthors] = useState([]);
  const [value, setValue] = useState('');
  const [filteredFree, setFilteredFree] = useState([]);
  const [filteredZen, setFilteredZen] = useState([]);
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

  const changeColor = (DarkMode = !state.Darkmode) => {
    dispatch({
      type: red.Actions.RANDOM,
      payload: DarkMode
        ? Math.floor(Math.random() * DarkColors.length)
        : Math.floor(Math.random() * LightColors.length),
    });

    if (DarkMode) {
      if (DarkColors[state.randNum] !== undefined) {
        setBcolor(DarkColors[state.randNum]);
        document.body.style = `background: ${DarkColors[state.randNum]}`;
      }
    } else {
      if (LightColors[state.randNum] !== undefined) {
        setBcolor(LightColors[state.randNum]);
        document.body.style = `background: ${LightColors[state.randNum]}`;
      }
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
    dispatch({ type: red.Actions.SEARCH_QUOTES });
    setFeatured(value);
    setFilteredFree(state.freeQuote.filter((quote) => quote.author === value));
    setFilteredZen(state.zenquotes.filter((quote) => quote.a === value));
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

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
        document.body.style = `background: ${LightColors[state.randNum]}`;
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
      <NavBar
        Darkmode={state.Darkmode}
        SwitchMode={SwitchMode}
        changeColor={changeColor}
      />
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
        <Search
          setValue={setValue}
          value={value}
          text={state.text}
          search={search}
          Darkmode={state.Darkmode}
          Search={state.Search}
          filteredFree={filteredFree}
          filteredZen={filteredZen}
          authors={authors}
          display={state.display}
          featured={featured}
        />
      </div>
      <Footer Darkmode={state.Darkmode} />
    </>
  );
}

export default App;
