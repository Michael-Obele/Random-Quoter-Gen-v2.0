import { RandomQuotes } from './components/RandomQuote/RandomQuotes';
import { Search } from './components/SearchUnit/Search';
import React, { useEffect, useState, useReducer } from 'react';
import { LightColors, DarkColors } from './Colors';
import NavBar from './components/NavBar/NavBar';
import StaticQuotes from './components/StaticQuotes/StaticQuotes';
import Footer from './components/Footer/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './Error/Error';
import * as red from './UseReducer';

function App() {
  var background = red.initialState.Darkmode
    ? DarkColors[red.initialState.randNum]
    : LightColors[red.initialState.randNum];
  // Getting Local Storage for Dark Mode
  useEffect(() => {
    const OldMode = JSON.parse(localStorage.getItem('Darkmode'));
    if (OldMode !== null) {
      dispatch({ type: red.Actions.SetMode, payload: OldMode });
      if (OldMode) {
        setBcolor(DarkColors[red.initialState.randNum]);
        dispatch({ type: red.Actions.SetText, payload: 'white' });
      } else {
        setBcolor(LightColors[red.initialState.randNum]);
        dispatch({ type: red.Actions.SetText, payload: 'black' });
      }
    } else {
      localStorage.setItem('Darkmode', red.initialState.Darkmode);
    }
  }, []);
  // End of Getting Local Storage for Dark Mode

  // Beginning of the States
  const [bgColor, setBcolor] = useState(background);
  const [authors, SetAuthors] = useState([]);
  const [searchQuotes, SearchQuotes] = useState([]);
  const [value, setValue] = useState('');
  const [filteredFree, setFilteredFree] = useState([]);
  const [filteredZen, setFilteredZen] = useState([]);
  const [featured, setFeatured] = useState('');
  const [state, dispatch] = useReducer(red.reducer, red.initialState);
  //End of States

  // Fetching Authors
  useEffect(() => {
    if (!state.loading) {
      state.freeQuote.map(
        (quote) => (
          dispatch({
            type: red.Actions.SetAuthors,
            payload: quote.author,
          }),
          dispatch({
            type: red.Actions.SetQuotes,
            payload: quote.text + ' - ' + quote.author,
          })
        )
      );
      state.zenquotes.map(
        (quote) => (
          dispatch({
            type: red.Actions.SetAuthors,
            payload: quote.a,
          }),
          dispatch({
            type: red.Actions.SetQuotes,
            payload: quote.q + ' - ' + quote.a,
          })
        )
      );
    }
  }, [state.loading, state.freeQuote, state.zenquotes]);

  useEffect(() => {
    if (state.Authors.length > 0) {
      var set = new Set(state.Authors);
      SetAuthors(Array.from(set));
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
          type: red.Actions.AddQuotes,
          name: 'freeQuote',
          payload: json,
        });
      });
  }, []);
  // const reload = state.count === 48;
  // useEffect(() => {
  //   fetch(
  //     'https://moa-redirect-cors.herokuapp.com/https://zenquotes.io/api/quotes/'
  //   )
  //     .then((res) => res.json())
  //     .then((json) => {
  //       dispatch({
  //         type: red.Actions.AddQuotes,
  //         name: 'zenquotes',
  //         payload: json,
  //       });
  //       dispatch({ type: red.Actions.LOADING });
  //     });
  //   return dispatch({ type: red.Actions.RESET });
  // }, [reload]);
  // End of Fetching quotes

  // Setting Background on first load
  useEffect(() => {
    document.body.style = `background: ${bgColor}`;
  }, [bgColor]);
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
    dispatch({ type: red.Actions.SwitchMode });
  };
  const searchAuthor = () => {
    dispatch({ type: red.Actions.SearchQuotes });
    setFeatured(value);
    setFilteredFree(state.freeQuote.filter((quote) => quote.author === value));
    setFilteredZen(state.zenquotes.filter((quote) => quote.a === value));
    SearchQuotes(
      state.Quotes.filter((quote) =>
        quote.toLowerCase().includes(value.toLowerCase())
      )
    );
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
        bgColor={bgColor}
      />
      <div role='main'>
        <ErrorBoundary
          fallback={
            <Error
              bgColor={bgColor}
              text={state.text}
              Darkmode={state.Darkmode}
            />
          }>
          <RandomQuotes
            Darkmode={state.Darkmode}
            freeQuote={state.freeQuote}
            loading={state.loading}
            bgColor={bgColor}
            text={state.text}
          />
        </ErrorBoundary>
        <ErrorBoundary
          fallback={
            <Error
              bgColor={bgColor}
              text={state.text}
              Darkmode={state.Darkmode}
            />
          }>
          <StaticQuotes
            loading={state.loading}
            nextQuote={nextQuote}
            prevQuote={prevQuote}
            zenquotes={state.zenquotes}
            count={state.count}
            bgColor={bgColor}
            text={state.text}
            Darkmode={state.Darkmode}
          />
        </ErrorBoundary>
      </div>
      <Search
        setValue={setValue}
        searchQuotes={searchQuotes}
        value={value}
        text={state.text}
        searchAuthor={searchAuthor}
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
