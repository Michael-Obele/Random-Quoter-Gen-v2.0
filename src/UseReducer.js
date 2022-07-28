import { LightColors } from './Colors';

export const initialState = {
  count: 0,
  loading: true,
  text: 'black',
  randNum: Math.floor(Math.random() * LightColors.length),
  Darkmode: false,
  Authors: [],
  Quotes: [],
  freeQuote: [],
  zenquotes: [],
  display: false,
  Search: false,
};
export const Actions = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  LOADING: 'LOADING',
  RESET: 'RESET',
  RANDOM: 'RANDOM',
  AddQuotes: 'AddQuotes',
  SwitchMode: 'SwitchMode',
  MergeQuotes: 'MergeQuotes',
  SetAuthors: 'SetAuthors',
  SetQuotes: 'SetQuotes',
  DISPLAY: 'DISPLAY',
  SearchQuotes: 'SearchQuotes',
  SetMode: 'SetMode',
  SetText: 'SetText',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INCREMENT:
      return { ...state, count: state.count + action.payload };
    case Actions.DECREMENT:
      return { ...state, count: state.count - action.payload };
    case Actions.RESET:
      return { ...state, count: 0 };
    case Actions.LOADING:
      return { ...state, loading: false };
    case Actions.RANDOM:
      return { ...state, randNum: action.payload };
    case Actions.SwitchMode:
      return {
        ...state,
        Darkmode: !state.Darkmode,
        text: state.Darkmode ? 'black' : 'white',
      };
    case Actions.AddQuotes:
      return { ...state, [action.name]: action.payload };
    case Actions.SetAuthors:
      return { ...state, Authors: state.Authors.concat(action.payload) };
    case Actions.SetQuotes:
      return { ...state, Quotes: state.Quotes.concat(action.payload) };
    case Actions.DISPLAY:
      return { ...state, display: true };
    case Actions.SearchQuotes:
      return { ...state, Search: true };
    case Actions.SetMode:
      return { ...state, Darkmode: action.payload };
    case Actions.SetText:
      return { ...state, text: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
