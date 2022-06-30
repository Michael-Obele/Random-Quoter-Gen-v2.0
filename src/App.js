import { Search } from './components/SearchUnit/Search';
import React, { useEffect, useState, useReducer } from 'react';
import { LightColors, DarkColors } from './Colors';
import NavBar from './components/NavBar/NavBar';
import StaticQuotes from './components/StaticQuotes/StaticQuotes';
import Footer from './components/Footer/Footer';
import * as red from './UseReducer';

function App() {
  var background = red.initialState.Darkmode
    ? DarkColors[red.initialState.randNum]
    : LightColors[red.initialState.randNum];
  // Getting Local Storage for Dark Mode
  useEffect(() => {
    const OldMode = JSON.parse(localStorage.getItem('Darkmode'));
    if (OldMode !== null) {
      dispatch({ type: red.Actions.SETMODE, payload: OldMode });
      if (OldMode) {
        setBcolor(DarkColors[red.initialState.randNum]);
        dispatch({ type: red.Actions.SETTEXT, payload: 'white' });
      } else {
        setBcolor(LightColors[red.initialState.randNum]);
        dispatch({ type: red.Actions.SETTEXT, payload: 'black' });
      }
    } else {
      localStorage.setItem('Darkmode', red.initialState.Darkmode);
    }
  }, []);
  // End of Getting Local Storage for Dark Mode

  // Beginning of the States
  const [bcolor, setBcolor] = useState(background);
  const [authors, setAuthors] = useState([]);
  const [value, setValue] = useState('');
  const [filteredFree, setFilteredFree] = useState([]);
  const [filteredZen, setFilteredZen] = useState([]);
  const [featured, setFeatured] = useState('');
  const [state, dispatch] = useReducer(red.reducer, red.initialState);
  //End of States

  // Fetching Authors
  useEffect(() => {
    if (!state.loading) {
      state.freeQuote.map((quote) =>
        dispatch({
          type: red.Actions.SETAUTHORS,
          payload: quote.author,
        })
      );
      state.zenquotes.map((quote) =>
        dispatch({
          type: red.Actions.SETAUTHORS,
          payload: quote.a,
        })
      );
    }
  }, [state.loading, state.freeQuote, state.zenquotes]);

  useEffect(() => {
    if (state.Authors.length > 0) {
      var set = new Set(state.Authors);
      setAuthors(Array.from(set));
      dispatch({ type: red.Actions.DISPLAY });
    }
  }, [state.Authors]);
  // End of Fetching Authors

  // Fetching Quotes
  useEffect(() => {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: red.Actions.ADDQUOTES,
          name: 'freeQuote',
          payload: json,
        });
      });
  }, []);
  const reload = state.count === 48;
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
  }, [reload]);
  // End of Fetching quotes

  // Setting Background on first load
  useEffect(() => {
    document.body.style = `background: ${bcolor}`;
  }, [bcolor]);
  // End of Setting Background on first load

  // buttons to change quotes
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
      changeColor(state.Darkmode);
    }
  };

  const nextQuote = () => {
    dispatch({ type: red.Actions.INCREMENT, payload: 1 });
    changeColor(state.Darkmode);
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
  // end of buttons to change quotes

  // Debugging State
  // useEffect(() => {
  //   console.log(state);
  // }, [state]);
  // End of Debugging State

  // Quotes

  // End of Quotes
  // Setting Darkmode for Local Storage
  useEffect(() => {
    localStorage.setItem('Darkmode', state.Darkmode);
  }, [state.Darkmode]);
  // End of Setting Darkmode for Local Storage

  return (
    <>
      <NavBar
        Darkmode={state.Darkmode}
        SwitchMode={SwitchMode}
        changeColor={changeColor}
        bcolor={bcolor}
      />
      <div role='main'>
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
      <Footer Darkmode={state.Darkmode} />
    </>
  );
}

export default App;
